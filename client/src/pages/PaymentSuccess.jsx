import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import "../style/paymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const { bookingId, paymentId } = location.state || {};
  const [pdfUrl, setPdfUrl] = useState("");

  const handleDownloadPdf = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payment/pdf/${paymentId}`);
      setPdfUrl(res.data.url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF");
    }
  };

  return (
    <>
      <Navbar />
      <div className="payment-success-container">
        <h2>Thank You!</h2>
        <p>Your payment has been submitted successfully.</p>
        <button onClick={handleDownloadPdf}>Download PDF</button>
        {pdfUrl && (
          <p>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Click here to view PDF</a>
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
