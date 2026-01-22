import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/navBar1";
import Footer from "../components/Footer";
import axios from "axios";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = location.state || {};

  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (!bookingId) return;
    const fetchPayment = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/payment");
        const paymentData = res.data.find(p => p.booking._id === bookingId && p.status === "Paid");
        setPayment(paymentData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPayment();
  }, [bookingId]);

  if (!payment) return <p>Waiting for admin approval...</p>;

  return (
    <>
      <Navbar />
      <div className="payment-success-container">
        <h2>Payment Successful!</h2>
        <div className="payment-summary">
          <p>Booking ID: {payment.booking._id}</p>
          <p>Room: {payment.booking.roomType}</p>
          <p>Check-in: {new Date(payment.booking.checkin).toDateString()}</p>
          <p>Check-out: {new Date(payment.booking.checkout).toDateString()}</p>
          <p>Total Nights: {payment.booking.totalNights}</p>
          <p>Amount Paid: LKR {payment.amount}</p>
          <button onClick={() => navigate("/review", { state: { bookingId } })}>
            Write a Review
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
