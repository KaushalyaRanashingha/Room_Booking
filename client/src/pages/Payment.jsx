import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/navBar1"; // Make sure file name matches exactly
import Footer from "../components/Footer";
import axios from "axios";
import "../style/Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingId, totalAmount } = location.state || {};

  const [formData, setFormData] = useState({
    bookingId: bookingId || "",
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
    amount: totalAmount || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!formData.bookingId) { 
      return alert("Booking ID missing!");
    }

    try {
      await axios.post("http://localhost:5000/api/payment", formData);
      alert("Payment submitted! Await admin approval.");
      navigate("/payment-success");
    } catch (err) {
      console.error(err);
      alert("Payment submission failed!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="payment-container">
        <h2>Payment Information</h2>
        <form onSubmit={handlePayment} className="payment-form">
          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="xxxx xxxx xxxx xxxx"
              required
            />
          </div>

          <div className="form-group">
            <label>Expiry Date (MM/YY)</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
          </div>

          <div className="form-group">
            <label>Security Code (CVV)</label>
            <input
              type="text"
              name="securityCode"
              value={formData.securityCode}
              onChange={handleChange}
              placeholder="123"
              required
            />
          </div>

          <div className="form-group">
            <label>Total Amount (LKR)</label>
            <input type="number" name="amount" value={formData.amount} readOnly />
          </div>

          <button type="submit" className="submit-btn">Pay Now</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Payment;
