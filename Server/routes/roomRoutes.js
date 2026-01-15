const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const multer = require("multer");

// image upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// GET ALL ROOMS
router.get("/", async (req, res) => {
  try {
    const room = await Room.find();
    res.status(200).json(room);
  } catch (err) {
    console.error("GET ROOMS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

// ADD ROOM
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const room = new Room({
      roomNumber: req.body.roomNumber,
      type: req.body.type,
      price: req.body.price,
      status: req.body.status,
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await room.save();
    res.status(201).json({ message: "Room added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add room", error: err.message });
  }
});

module.exports = router;
