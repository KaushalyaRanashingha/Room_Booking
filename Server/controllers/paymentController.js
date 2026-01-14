const Booking = require("../models/Booking");
const sendInvoice = require("../utils/sendInvoice");

exports.makePayment = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { paymentStatus: "Paid" },
    { new: true }
  ).populate("user room");

  await sendInvoice(booking);
  res.json({ message: "Payment successful" });
};