const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: "adminsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, 
  })
);

/*VIEW ENGINE*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/*STATIC FILES*/
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/*ROUTES*/
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/room", roomRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);


/*TEST ROUTE*/
app.get("/", (req, res) => {
  res.send("Room Booking Backend Running");
});

/*SERVER START*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});