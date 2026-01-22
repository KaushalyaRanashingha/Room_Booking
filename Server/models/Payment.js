const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
