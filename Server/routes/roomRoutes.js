const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error("GET ALL ROOMS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

// GET single room by ID
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    console.error("GET ROOM BY ID ERROR:", err);
    res.status(500).json({ message: "Failed to fetch room" });
  }
});

module.exports = router;
