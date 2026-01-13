import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handlePayment = async () => {
    await axios.post("http://localhost:5000/api/payment", {
      bookingId
    });

    navigate("/success");
  };

  return (
    <div>
      <h2>Payment</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Payment;
