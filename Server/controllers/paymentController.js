const Payment = require("../models/Payment");
const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { bookingId, nameOnCard, cardNumber, expiryDate, securityCode, amount } = req.body;

    if (!bookingId) return res.status(400).json({ message: "Booking ID is required" });

    const payment = await Payment.create({
      booking: bookingId,
      nameOnCard,
      cardNumber,
      expiryDate,
      securityCode,
      amount,
    });

    res.status(201).json({ message: "Payment saved", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment submission failed", error: err.message });
  }
};

// Admin approves payment
exports.approvePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    ).populate("booking");

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    // Send email to customer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to: payment.booking.email,
      subject: "Payment Approved",
      html: `<h2>Payment Approved</h2>
             <p>Dear ${payment.booking.name},</p>
             <p>Your payment of LKR ${payment.amount} for booking ${payment.booking._id} has been approved.</p>`,
    });

    res.json({ message: "Payment approved and email sent", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Approval failed", error: err.message });
  }
};

// Get all payments (admin)
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("booking").sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch payments", error: err.message });
  }
};
