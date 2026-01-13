import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";              
import PaymentSuccess from "./pages/PaymentSuccess";
import Booking from "./pages/Booking";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/payment/:bookingId" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/book/:roomId" element={<Booking />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/payment/:bookingId" element={<Payment />} />

      </Routes>
    </Router>
  );
}

export default App;
