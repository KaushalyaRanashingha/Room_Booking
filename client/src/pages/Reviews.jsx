import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navBar1";
import Footer from "../components/Footer";
import axios from "axios";
import "../style/Review.css";

function Review() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = location.state || {};

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const stars = [1, 2, 3, 4, 5];

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/reservation", {
        bookingId,
        rating,
        feedback,
      });
      alert("Review submitted successfully!");
      navigate("/Home"); 
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="review-container">
        <h2>Write a Review</h2>
        <p>Booking ID: {bookingId}</p>

        <div className="star-rating">
          {stars.map((star) => (
            <span
              key={star}
              className={`star ${
                star <= (hoverRating || rating) ? "filled" : ""
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              &#9733;
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Review;