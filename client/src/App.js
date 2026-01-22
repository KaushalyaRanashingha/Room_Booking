import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";  
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />  
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
