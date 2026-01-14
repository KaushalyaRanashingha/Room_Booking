const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  checkIn: Date,
  checkOut: Date,
  status: { type: String, default: "Booked" }
});

module.exports = mongoose.model("Reservation", reservationSchema);