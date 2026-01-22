const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");

// Create a new payment (POST)
router.post("/", PaymentController.createPayment);

// Get all payments (for admin dashboard)
router.get("/", PaymentController.getAllPayments);

// Get single payment by id (optional)
router.get("/:id", PaymentController.getPaymentById);

module.exports = router;
