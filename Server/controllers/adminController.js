const User = require("../models/User");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

// ---------------- ADMIN AUTH ----------------
exports.loginPage = (req, res) => {
  res.render("admin/login");
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials
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

// ---------------- DASHBOARD ----------------
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

// ---------------- USERS ----------------
exports.user = async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin/user", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

<<<<<<< HEAD
//edit user details
exports.userEdit = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.redirect("/api/admin/user");
    }

    res.render("admin/userEdit", {
  user,
  currentPath: "/api/admin/user",
});
  } catch (err) {
    console.error("userEdit page error:", err);
    res.redirect("/api/admin/user");
  }
};
//update user data in admins
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      role,
    });

    res.redirect("/api/admin/user");
  } catch (err) {
    console.error("updateUser error:", err);
    res.redirect("/api/admin/user");
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/api/admin/user");
  } catch (err) {
    console.error("deleteUser error:", err);
    res.redirect("/api/admin/user");
  }
};


// --- ROOMS (ADMIN) ---
=======
// ---------------- ROOMS ----------------
>>>>>>> 3f2331e (Update server logic, admin UI, and add upload assets)
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

    await Room.create({
      roomNumber,
      type,
      price,
      status: status || "Available",
      image: req.file ? req.file.filename : ""
    });

    res.redirect("/api/admin/room");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add room");
  }
};

exports.editRoomPage = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.render("admin/editRoom", { room });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading edit page");
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const updateData = {
      roomNumber: req.body.roomNumber,
      type: req.body.type,
      price: req.body.price,
      status: req.body.status
    };

    if (req.file) updateData.image = req.file.filename;

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

// ---------------- BOOKINGS ----------------
exports.booking = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("room")
      .populate("user")
      .sort({ createdAt: -1 });

    res.render("admin/booking", { bookings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching bookings");
  }
};

// ---------------- PAYMENTS ----------------
exports.payment = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("booking")
      .populate("user")
      .sort({ createdAt: -1 });

    res.render("admin/payment", { payments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching payments");
  }
};

// ---------------- APPROVE PAYMENT ----------------
exports.approvePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findById(paymentId).populate("booking");

    if (!payment) return res.status(404).json({ error: "Payment not found" });

    if (payment.status === "Paid")
      return res.status(400).json({ error: "Payment already approved" });

    payment.status = "Paid";
    await payment.save();

    // ---------------- GENERATE PDF ----------------
    const doc = new PDFDocument();
    const fileName = `Booking_${payment.booking._id}.pdf`;
    const filePath = path.join(__dirname, "..", "public", fileName);

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("Booking & Payment Details", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Customer Name: ${payment.booking.name}`);
    doc.text(`Email: ${payment.booking.email}`);
    doc.text(`Mobile: ${payment.booking.mobile}`);
    doc.text(`Room: ${payment.booking.roomType}`);
    doc.text(`Check-in: ${payment.booking.checkin.toDateString()}`);
    doc.text(`Check-out: ${payment.booking.checkout.toDateString()}`);
    doc.text(`Total Nights: ${payment.booking.totalNights}`);
    doc.text(`Total Amount Paid: LKR ${payment.amount}`);
    doc.text(`Payment Status: ${payment.status}`);
    doc.end();

    // ---------------- SEND EMAIL ----------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: payment.booking.email,
      subject: "Payment Approved - Booking Details",
      text: `Your payment has been approved. Download your booking PDF here: http://localhost:5000/${fileName}`,
      html: `<p>Your payment has been approved.</p>
             <p><a href="http://localhost:5000/${fileName}" target="_blank">Download PDF</a></p>`
    });

    // Response for AJAX call
    res.json({ message: "Payment approved and email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment approval failed" });
  }
};

// ---------------- RESERVATIONS ----------------
exports.reservation = async (req, res) => {
  try {
    const reservations = await Booking.find()
      .populate("room")
      .populate("user")
      .sort({ createdAt: -1 });

    res.render("admin/reservation", { reservations });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching reservations");
  }
};

exports.approveReservation = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "Approved" });
    res.redirect("/api/admin/reservation");
  } catch (err) {
    console.error(err);
    res.status(500).send("Approval failed");
  }
};

exports.rejectReservation = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "Rejected" });
    res.redirect("/api/admin/reservation");
  } catch (err) {
    console.error(err);
    res.status(500).send("Rejection failed");
  }
};
