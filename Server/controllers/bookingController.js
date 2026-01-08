const Booking = require("../models/Booking");
const Room = require("../models/Room");

exports.createBooking = async (req, res) => {
  const room = await Room.findById(req.body.room);

  const nights =
    (new Date(req.body.checkOut) - new Date(req.body.checkIn)) /
    (1000 * 60 * 60 * 24);

  const roomAmount = nights * room.price;
  const foodAmount = req.body.food ? nights * 1000 : 0;

  const booking = await Booking.create({
    ...req.body,
    nights,
    roomAmount,
    foodAmount,
    totalAmount: roomAmount + foodAmount,
  });

  res.json(booking);
};
