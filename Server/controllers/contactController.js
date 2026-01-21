const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Generate PDF for approved payment
exports.generatePdf = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("booking");

    if (!payment) return res.status(404).json({ message: "Payment not found" });
    if (payment.status !== "Approved") return res.status(400).json({ message: "Payment not approved yet" });

    const doc = new PDFDocument();
    const fileName = `Booking_${payment.booking._id}.pdf`;
    const filePath = path.join(__dirname, "..", "public", fileName);

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("Booking & Payment Details", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Customer Name: ${payment.booking.name}`);
    doc.text(`Email: ${payment.booking.email}`);
    doc.text(`Mobile: ${payment.booking.mobile}`);
    doc.text(`Room: ${payment.booking.roomType}`);
    doc.text(`Check-in: ${payment.booking.checkin.toDateString()}`);
    doc.text(`Check-out: ${payment.booking.checkout.toDateString()}`);
    doc.text(`Total Nights: ${payment.booking.totalNights}`);
    doc.text(`Total Amount Paid: LKR ${payment.amount}`);
    doc.text(`Payment Status: ${payment.status}`);

    doc.end();

    // Send file URL
    res.json({ message: "PDF generated", url: `http://localhost:5000/${fileName}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF generation failed", error: err.message });
  }
};
