const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to DB
    await Contact.create({ name, email, message });

    //Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("CONTACT ERROR 👉", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};
