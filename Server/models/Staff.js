const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String
});

module.exports = mongoose.model("Staff", staffSchema);
