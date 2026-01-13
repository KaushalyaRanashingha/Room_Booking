const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "Available" },
  image: String
});

module.exports = mongoose.model("Room", roomSchema);
