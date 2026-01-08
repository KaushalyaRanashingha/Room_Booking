const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  rating: Number,
  comment: String
});

module.exports = mongoose.model("Review", reviewSchema);
