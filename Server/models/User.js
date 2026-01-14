const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  email: { type: String, unique: true },
  phone: String,
  gender: String,
  password: String,
  role: { type: String, default: "client" }
});

module.exports = mongoose.model("customers", userSchema);