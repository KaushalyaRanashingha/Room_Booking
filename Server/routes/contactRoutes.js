const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contactController");

// MUST be a function
router.post("/", ContactController.sendMessage);

module.exports = router;
