const User = require("../models/User");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

// --- ADMIN AUTH ---
exports.loginPage = (req, res) => {
  res.render("admin/login");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  //hardcoded credentials
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

// --- DASHBOARD ---
exports.dashboard = async (req, res) => {
  try {
    const user = await User.countDocuments();
    const room = await Room.countDocuments();
    const booking = await Booking.countDocuments({ status: "Approved" });
    const payment = await Payment.countDocuments();

    const recentBookings = await Booking.find()
      .populate("room")
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("admin/dashboard", {
      user,
      room,
      booking,
      payment,
      recentBookings
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Dashboard error");
  }
};

// --- USERS ---
exports.user = async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin/user", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// --- ROOMS (ADMIN) ---
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
    const image = req.file ? req.file.filename : ""; // Store just the filename

    await Room.create({
      roomNumber,
      type,
      price,
      status: status || "Available", // Default to Available if not provided
      image,
    });

    res.redirect("/api/admin/room");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add room");
  }
};

// NEW: This fetches a single room's data to show in an Edit Form
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
    res.status(500).send("Delete failed");
  }
};

// --- BOOKINGS & RESERVATIONS ---
exports.booking = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user room");
    res.render("admin/booking", { bookings });
  } catch (err) {
    res.status(500).send("Error fetching bookings");
  }
};

exports.payment = async (req, res) => {
  try {
    const payments = await Payment.find().populate("user");
    res.render("admin/payment", { payments });
  } catch (err) {
    res.status(500).send("Error fetching payments");
  }
};

exports.reservation = async (req, res) => {
  try {
    const reservations = await Booking.find().populate("user room");
    res.render("admin/reservation", { reservations });
  } catch (err) {
    res.status(500).send("Error fetching reservations");
  }
};

exports.approveReservation = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "Approved" });
    res.redirect("/api/admin/reservation");
  } catch (err) {
    res.status(500).send("Approval failed");
  }
};

exports.rejectReservation = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "Rejected" });
    res.redirect("/api/admin/reservation");
  } catch (err) {
    res.status(500).send("Rejection failed");
  }
};