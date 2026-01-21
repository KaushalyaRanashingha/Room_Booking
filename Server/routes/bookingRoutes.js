// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

/* ================= CREATE BOOKING ================= */
router.post("/", async (req, res) => {
  try {
    const { room, checkin, checkout } = req.body;

    // 🔴 CHECK FOR DATE CLASH
    const conflict = await Booking.findOne({
      room,
      $or: [
        {
          checkin: { $lt: new Date(checkout) },
          checkout: { $gt: new Date(checkin) }
        }
      ]
    });

    if (conflict) {
      return res.status(400).json({
        message: "Room already booked for selected dates"
      });
    }

    const booking = await Booking.create(req.body);
    res.status(201).json(booking);

  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
});

module.exports = router;
