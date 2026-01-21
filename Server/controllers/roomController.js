const Room = require("../models/Room");

exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, type, price } = req.body;
    
    const image = req.file ? req.file.filename : null;

    await Room.create({ roomNumber, type, price, image });
    res.redirect("/api/admin/room"); 
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add room");
  }
};
