const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");
const sendBookingEmail = require("../utils/sendEmail");


router.post("/create-checkout-session/:bookingId", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate("user");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: "Room Booking",
            },
            unit_amount: booking.total * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success/${booking._id}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      customer_email: booking.user.email,
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment failed" });
  }
});

module.exports = router;
