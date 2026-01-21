const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// Get all rooms
router.get("/", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

// Get single room by id
router.get("/:id", async (req, res) => {
  try {

    const room = await Room.find();
    res.status(200).json(room);
  } catch (err) {
    console.error("GET ROOMS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch rooms" });

    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });

}
});

module.exports = router;
