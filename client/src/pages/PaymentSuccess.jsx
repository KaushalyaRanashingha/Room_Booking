import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/navBar1";
import Footer from "../components/Footer";
import axios from "axios";
import "../style/paymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = location.state || {};

  const [payment, setPayment] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        // Fetch all payments from the API
        const res = await axios.get("http://localhost:5000/api/payment");
        
        // Find the specific payment matching the bookingId and 'Paid' status
        const paymentData = res.data.find(
          (p) => (p.booking?._id === bookingId || p.booking === bookingId) && p.status === "Paid"
        );

        if (paymentData) {
          setPayment(paymentData);
          setShowPopup(true);
          setLoading(false);
          return true; // Signal to stop polling
        }
        return false;
      } catch (err) {
        console.error("Error fetching payment status:", err);
        return false;
      }
    };

    // Initial check on component mount
    fetchPaymentStatus();

    // Set up polling to check every 3 seconds
    const interval = setInterval(async () => {
      const isApproved = await fetchPaymentStatus();
      if (isApproved) {
        clearInterval(interval); // Stop polling once approved
      }
    }, 3000);

    // Clean up interval when user leaves the page
    return () => clearInterval(interval);
  }, [bookingId]);

  // Helper to calculate nights dynamically
  const calculateNights = (inDate, outDate) => {
    if (!inDate || !outDate) return 0;
    const diff = new Date(outDate) - new Date(inDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handlePopupClick = () => {
    setShowPopup(false);
  };

  if (!bookingId) {
    return (
      <div className="text-center py-5">
        <h3>Payment Successfull</h3>
        <button onClick={() => navigate("/")} className="btn btn-primary">Go Home</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="payment-success-container py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              
              {/* Approval Notification Popup */}
              {showPopup && (
                <div className="alert alert-success alert-dismissible fade show shadow-sm mb-4" role="alert">
                  <strong>Success!</strong> Your payment has been approved by the admin.
                  <button type="button" className="btn-close" onClick={handlePopupClick}></button>
                </div>
              )}

              <div className="card shadow border-0">
                <div className="card-body p-4 text-center">
                  {!payment ? (
                    <div className="py-4">
                      <div className="spinner-border text-primary mb-3" role="status"></div>
                      <h4 className="text-muted">Waiting for Admin Approval...</h4>
                      <p className="small text-secondary">Your transaction is being verified. Please stay on this page.</p>
                    </div>
                  ) : (
                    <div className="payment-details animate__animated animate__fadeIn">
                      <div className="mb-4">
                        <div className="display-4 text-success mb-2">✔</div>
                        <h2 className="fw-bold">Payment Successful!</h2>
                      </div>

                      <div className="text-start bg-light p-3 rounded mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Booking ID:</span>
                          <span className="fw-medium">#{payment.booking?._id?.slice(-6)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Room:</span>
                          <span className="fw-medium">{payment.booking?.room?.type || "Standard Room"}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Stay Duration:</span>
                          <span className="fw-medium">
                            {calculateNights(payment.booking?.checkin, payment.booking?.checkout)} Nights
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 border-top pt-2">
                          <span className="fw-bold">Amount Paid:</span>
                          <span className="fw-bold text-primary">LKR {payment.amount}</span>
                        </div>
                      </div>

                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-primary btn-lg"
                          onClick={() => navigate("/review", { state: { bookingId } })}
                        >
                          Write a Review
                        </button>
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => navigate("/")}
                        >
                          Return to Home
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;