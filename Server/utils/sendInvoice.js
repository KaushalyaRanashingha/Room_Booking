const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

module.exports = async (booking) => {
  const doc = new PDFDocument();
  let buffers = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.text(`Invoice`);
  doc.text(`Room: ${booking.room.roomNumber}`);
  doc.text(`Total: Rs ${booking.totalAmount}`);
  doc.end();

  const pdf = Buffer.concat(buffers);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: booking.user.email,
    subject: "Booking Invoice",
    text: "Thank you for your payment",
    attachments: [{ filename: "invoice.pdf", content: pdf }],
  });
};
