const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController"); // correct path

// Create payment
router.post("/", PaymentController.createPayment); // must be a function

// Get all payments (optional)
router.get("/", PaymentController.getPayments); // must be a function

module.exports = router;
