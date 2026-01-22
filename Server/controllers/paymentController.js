// controllers/paymentController.js
const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

exports.createPayment = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    if (!bookingId || !amount)
      return res.status(400).json({ error: "Booking ID and amount required" });

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const payment = await Payment.create({
      booking: bookingId,
      amount,
      status: "Pending",
    });

    res.status(201).json({ message: "Payment submitted!", paymentId: payment._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment submission failed" });
  }
};
