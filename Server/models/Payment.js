const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true, // Make sure frontend sends booking ID
  },
  nameOnCard: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  securityCode: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // Admin approval
  createdAt: { type: Date, default: Date.now },
});

// Explicitly set collection name
module.exports = mongoose.model("Payment", PaymentSchema, "payments");
