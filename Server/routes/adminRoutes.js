const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

router.get("/login", AdminController.loginPage);
router.post("/login", AdminController.login);
router.get("/logout", AdminController.logout);

router.get("/dashboard", AdminController.dashboard);

router.get("/user", AdminController.user);
router.get("/user/delete/:id", AdminController.deleteUser);

router.get("/room", AdminController.room);
router.post("/room/add", AdminController.addRoom);
router.get("/room/delete/:id", AdminController.deleteRoom);

router.get("/booking", AdminController.booking);
router.get("/booking/approve/:id", AdminController.approveReservation);
router.get("/booking/reject/:id", AdminController.rejectReservation);

router.get("/payment", AdminController.payment);
router.post("/payment/approve/:id", AdminController.approvePayment);


module.exports = router;
