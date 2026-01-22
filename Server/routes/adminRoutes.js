const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const multer = require("multer"); 
const path = require("path"); 

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// --- Admin Auth ---
router.get("/login", AdminController.loginPage);
router.post("/login", AdminController.login);
router.get("/logout", AdminController.logout);

// --- Dashboard ---
router.get("/dashboard", AdminController.dashboard);

// --- User Management ---
router.get("/user", AdminController.user);
router.get("/user/delete/:id", AdminController.deleteUser);

// --- Room Management ---
router.get("/room", AdminController.room);
// Added 'upload.single' to the 'add' route to ensure images are saved
router.post("/room/add", upload.single("image"), AdminController.addRoom);
router.get("/room/delete/:id", AdminController.deleteRoom);
router.get("/room/edit/:id", AdminController.editRoomPage);
router.post("/room/update/:id", upload.single("image"), AdminController.updateRoom);

// --- Booking Management ---
router.get("/booking", AdminController.booking);
router.get("/booking/approve/:id", AdminController.approveReservation);
router.get("/booking/reject/:id", AdminController.rejectReservation);
router.get("/reservation", AdminController.reservation);
// --- Payment Management ---
router.get("/payment", AdminController.payment);
router.post("/payment/approve/:id", AdminController.approvePayment);

module.exports = router;