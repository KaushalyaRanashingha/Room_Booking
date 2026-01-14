const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

router.post("/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("room");
  booking.paid = true;
  await booking.save();

  await sendEmail(
    booking.email,
    "Booking Confirmed",
    `Your room ${booking.room.roomNumber} is booked successfully.`
  );

  res.json({ success: true });
});

module.exports = router;
