const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  status: { type: String, enum: ["Available", "Occupied"], default: "Available" },
});

module.exports = mongoose.model("rooms", roomSchema);
