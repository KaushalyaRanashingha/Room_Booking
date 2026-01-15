const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("Nodemailer Error:", error);
  } else {
    console.log("Nodemailer is ready to send messages");
  }
});

module.exports = transporter;