const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");

// Create payment
router.post("/", PaymentController.createPayment);

// Get all payments (admin)
router.get("/", PaymentController.getPayments);
router.get("/pdf/:id", PaymentController.generatePdf);


// Approve payment (admin)
router.put("/approve/:id", PaymentController.approvePayment);

module.exports = router;
