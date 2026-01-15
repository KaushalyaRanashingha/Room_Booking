// routes/adminRoutes.js
const express = require("express");
const router = express.Router();

const admin = require("../middleware/adminMiddleware");
const ctrl = require("../controllers/adminController");
const multer = require("multer");
const path = require("path");
const Room = require("../models/Room");
const User = require("../models/User");

// Multer storage for room images
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// AUTH
router.get("/login", ctrl.loginPage);
router.post("/login", ctrl.login);
router.get("/logout", ctrl.logout);

// DASHBOARD
router.get("/dashboard", admin, ctrl.dashboard);

// USERS
router.get("/user", admin, ctrl.user);
router.get("/user/edit/:id", admin, ctrl.userEdit);
router.post("/user/update/:id", admin, ctrl.updateUser);
router.post("/user/delete/:id", admin, ctrl.deleteUser);

// ROOMS
router.get("/room", admin, ctrl.room);
router.get("/room/edit/:id", admin, ctrl.editRoomPage);
router.post("/room/add", admin, upload.single("image"), ctrl.addRoom);
router.post("/room/update/:id", admin, upload.single("image"), ctrl.updateRoom);
router.post("/room/delete/:id", admin, ctrl.deleteRoom);

// BOOKINGS / PAYMENTS / RESERVATIONS
router.get("/booking", admin, ctrl.booking);
router.get("/payment", admin, ctrl.payment);
router.get("/reservation", admin, ctrl.reservation);
router.post("/reservation/approve/:id", admin, ctrl.approveReservation);
router.post("/reservation/reject/:id", admin, ctrl.rejectReservation);

module.exports = router;
