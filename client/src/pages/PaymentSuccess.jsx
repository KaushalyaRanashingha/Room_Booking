import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PaymentSuccess() {
  const { id } = useParams();

  useEffect(() => {
    axios.post(
      `http://localhost:5000/api/booking/mark-paid/${id}`,
      {},
      { withCredentials: true }
    );
  }, [id]);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Payment Successful 🎉</h2>
      <p>Your booking is confirmed.</p>
    </div>
  );
}

export default PaymentSuccess;