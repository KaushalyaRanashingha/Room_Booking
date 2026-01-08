const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  amount: Number,
  status: { type: String, default: "pending" },
  paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
