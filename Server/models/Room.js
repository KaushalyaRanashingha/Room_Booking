const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  type: String,
  price: Number,
  status: { type: String, default: "Available" },
  image: String
});

module.exports = mongoose.model("Room", roomSchema, "rooms" );
