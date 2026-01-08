const User = require("../models/User");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

// ADMIN AUTH
exports.loginPage = (req, res) => {
  res.render("admin/login");
};

exports.login = async (req, res) => {
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

// DASHBOARD
exports.dashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const rooms = await Room.countDocuments();
    const bookings = await Booking.countDocuments();
    const payments = await Payment.countDocuments();

    const recentBookings = await Booking.find()
      .populate("user")
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
    res.status(500).send("Server Error");
  }
};

//USERS
exports.user = async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin/user", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//ROOMS (ADMIN)
exports.room = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.render("admin/room", { rooms });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch rooms");
  }
};

exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    await Room.create({
      roomNumber,
      type,
      price,
      status,
      image,
    });

    res.redirect("/api/admin/room");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add room");
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status } = req.body;
    const data = { roomNumber, type, price, status };

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    await Room.findByIdAndUpdate(req.params.id, data);
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
    res.status(500).send("Delete failed");
  }
};

//BOOKINGS
exports.booking = async (req, res) => {
  const bookings = await Booking.find().populate("user room");
  res.render("admin/booking", { bookings });
};

//PAYMENTS
exports.payment = async (req, res) => {
  const payments = await Payment.find().populate("user");
  res.render("admin/payment", { payments });
};

//RESERVATIONS
exports.reservation = async (req, res) => {
  const reservations = await Booking.find().populate("user room");
  res.render("admin/reservation", { reservations });
};

exports.approveReservation = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.redirect("/api/admin/reservation");
};

exports.rejectReservation = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.redirect("/api/admin/reservation");
};
