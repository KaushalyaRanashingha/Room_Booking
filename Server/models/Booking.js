const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  fromDate: String,
  toDate: String,
  totalAmount: Number,
  paid: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
