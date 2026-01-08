const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.get("/", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Invalid room ID" });
  }
});

module.exports = router;
