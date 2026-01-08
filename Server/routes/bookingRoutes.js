const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");

router.post("/", auth, async (req, res) => {
  const booking = await Booking.create({
    user: req.user.id,
    room: req.body.roomId,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    totalAmount: req.body.totalAmount
  });

  await sendEmail(req.user.email, booking);

  res.json({ bookingId: booking._id });
});

module.exports = router;
