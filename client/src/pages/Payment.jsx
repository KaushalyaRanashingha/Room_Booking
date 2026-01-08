import axios from "axios";
import { useParams } from "react-router-dom";

function Payment() {
  const { id } = useParams();

  const payNow = async () => {
    const res = await axios.post(
      `http://localhost:5000/api/payment/create-checkout-session/${id}`,
      {},
      { withCredentials: true }
    );

    window.location.href = res.data.url;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Secure Payment</h2>
      <button onClick={payNow}>Pay with Card</button>
    </div>
  );
}

export default Payment;
