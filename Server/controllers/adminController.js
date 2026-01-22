const User = require("../models/User");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

/* =========================
   ADMIN AUTH
========================= */
exports.loginPage = (req, res) => {
  res.render("admin/login");
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "123456") {
    req.session.admin = true;
    return res.redirect("/api/admin/dashboard");
  }

  res.redirect("/api/admin/login");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/api/admin/login");
  });
};

/* =========================
   DASHBOARD
========================= */
exports.dashboard = async (req, res) => {
  try {
    // Variable names updated to plural to match your views
    const users = await User.countDocuments();
    const rooms = await Room.countDocuments();
    const bookings = await Booking.countDocuments({ status: "Approved" });
    const payments = await Payment.countDocuments();

    const recentBookings = await Booking.find()
      .populate("room")
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("admin/dashboard", {
      users,
      rooms,
      bookings,
      payments,
      recentBookings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Dashboard error");
  }
};

/* =========================
   USERS
========================= */
exports.user = async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin/user", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch users");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/api/admin/user");
  } catch (err) {
    console.error(err);
    res.redirect("/api/admin/user");
  }
};

/* =========================
   ROOMS
========================= */
exports.room = async (req, res) => {
  try {
    // Variable name matches view expectations
    const rooms = await Room.find();
    res.render("admin/room", { rooms });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch rooms");
  }
};

// ADDED: This function allows you to view the Edit Room page
exports.editRoomPage = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).send("Room not found");
    res.render("admin/editRoom", { room });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading edit page");
  }
};

exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status } = req.body;

    await Room.create({
      roomNumber,
      type,
      price,
      status: status || "Available",
      image: req.file ? req.file.filename : "",
    });

    res.redirect("/api/admin/room");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add room");
  }
};

// ADDED: Logic to handle room data updates
exports.updateRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status } = req.body;
    const updateData = { roomNumber, type, price, status };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Room.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/api/admin/room");
  } catch (err) {
    console.error(err);
    res.status(500).send("Update failed");
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.redirect("/api/admin/room");
  } catch (err) {
    console.error(err);
    res.redirect("/api/admin/room");
  }
};

/* =========================
   BOOKINGS
========================= */
exports.booking = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("room")
      .sort({ createdAt: -1 });

    res.render("admin/booking", { bookings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch bookings");
  }
};

// Logic for Staff/Admin to approve reservations
exports.approveReservation = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: "Approved",
    });
    res.redirect("/api/admin/booking");
  } catch (err) {
    console.error(err);
    res.redirect("/api/admin/booking");
  }
};

exports.rejectReservation = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: "Rejected",
    });
    res.redirect("/api/admin/booking");
  } catch (err) {
    console.error(err);
    res.redirect("/api/admin/booking");
  }
};

/* =========================
   PAYMENTS
========================= */
exports.payment = async (req, res) => {
  try {
    // Only populate 'booking' and the 'room' inside that booking
    const payments = await Payment.find()
      .populate({
        path: 'booking',
        populate: { path: 'room' } 
      })
      .sort({ createdAt: -1 });

    res.render("admin/payment", { payments });
  } catch (err) {
    console.error("Payment Fetch Error:", err);
    res.status(500).send("Failed to fetch payments");
  }
};

/* =========================
   APPROVE PAYMENT 
========================= */
exports.approvePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment)
      return res.status(404).json({ error: "Payment not found" });

    if (payment.status === "Paid")
      return res.status(400).json({ error: "Payment already approved" });

    payment.status = "Paid";
    await payment.save();

    res.json({ message: "Payment approved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment approval failed" });
  }
};