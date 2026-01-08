const nodemailer = require("nodemailer");

const sendEmail = async (booking) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Room Booking" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "Booking Confirmation",
      html: `
        <h2>Booking Confirmed </h2>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Room:</strong> ${booking.roomName}</p>
        <p><strong>Check-in:</strong> ${booking.startDate}</p>
        <p><strong>Check-out:</strong> ${booking.endDate}</p>
        <p><strong>Total Amount:</strong> LKR ${booking.totalAmount}</p>
        <br/>
        <p>Thank you for booking with us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(" Booking email sent");
  } catch (error) {
    console.error(" Email error:", error.message);
  }
};

module.exports = sendEmail;
