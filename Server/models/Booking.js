const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  roomId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  checkIn: Date,
  checkOut: Date,
  totalAmount: Number,
  isPaid: { type: Boolean, default: false }
});

module.exports = mongoose.model("Booking", bookingSchema);