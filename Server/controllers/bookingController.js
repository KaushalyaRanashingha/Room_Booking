// controllers/bookingController.js
exports.createBooking = async (req, res) => {
  const { room, checkin, checkout } = req.body;

  const conflict = await Booking.findOne({
    room,
    status: { $ne: "Rejected" },
    $or: [
      { checkin: { $lt: checkout, $gte: checkin } },
      { checkout: { $gt: checkin, $lte: checkout } },
      { checkin: { $lte: checkin }, checkout: { $gte: checkout } },
    ],
  });

  if (conflict) {
    return res.status(400).json({
      message: "Room already booked for selected dates",
    });
  }

  const booking = await Booking.create(req.body);
  res.json(booking);
};
