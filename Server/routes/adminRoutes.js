const express = require("express");
const router = express.Router();
const admin = require("../middleware/adminMiddleware");
const ctrl = require("../controllers/adminController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/login", ctrl.loginPage);
router.post("/login", ctrl.login);
router.get("/logout", ctrl.logout);
router.get("/dashboard", admin, ctrl.dashboard);

router.get("/dashboard", admin, ctrl.dashboard);
router.get("/user", admin, ctrl.user);

router.get("/room", admin, ctrl.room);
router.post("/room/add", admin, upload.single("image"), ctrl.addRoom);
router.post("/room/update/:id", admin, upload.single("image"), ctrl.updateRoom);
router.post("/room/delete/:id", admin, ctrl.deleteRoom);

router.get("/booking", admin, ctrl.booking);
router.get("/payment", admin, ctrl.payment);
router.get("/reservation", admin, ctrl.reservation);
router.post("/reservation/approve/:id", admin, ctrl.approveReservation);
router.post("/reservation/reject/:id", admin, ctrl.rejectReservation);

module.exports = router;