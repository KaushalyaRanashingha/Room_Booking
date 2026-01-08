import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
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
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/payment/:bookingId" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/book/:roomId" element={<Booking />} />

      </Routes>
    </Router>
  );
}

export default App;
