const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { bookingId, nameOnCard, cardNumber, expiryDate, securityCode, amount } = req.body;

    const payment = await Payment.create({
      booking: bookingId,
      nameOnCard,
      cardNumber,
      expiryDate,
      securityCode,
      amount,
      status: "Pending",
    });

    res.status(201).json({ message: "Payment submitted successfully", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment submission failed" });
  }
};

// Get all payments for the Admin
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate({
        path: 'booking',
        populate: { path: 'user' } 
      })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};
