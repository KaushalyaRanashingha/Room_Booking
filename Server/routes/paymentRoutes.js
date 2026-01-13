const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  const booking = await Booking.findById(req.body.bookingId)
    .populate("user")
    .populate("room");

  booking.isPaid = true;
  await booking.save();

  await sendEmail(
    booking.user.email,
    "Booking Confirmed",
    `
Room: ${booking.room.name}
Check-in: ${booking.checkIn}
Check-out: ${booking.checkOut}
Total: Rs ${booking.total}
    `
  );

  res.json({ success: true });
});

module.exports = router;
