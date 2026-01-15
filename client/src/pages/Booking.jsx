import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Booking() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  // 🔐 Protect route
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch room details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/room/${roomId}`)
      .then((res) => setRoom(res.data))
      .catch(() => alert("Room not found"));
  }, [roomId]);

  // Calculate days & amount
  useEffect(() => {
    if (checkIn && checkOut && room) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = (end - start) / (1000 * 60 * 60 * 24);

      if (diff > 0) {
        setDays(diff);
        setTotal(diff * room.price);
      } else {
        setDays(0);
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, room]);

  const handleBooking = async () => {
    if (!user) return;

    try {
      const res = await axios.post("http://localhost:5000/api/booking", {
        userId: user._id,
        roomId,
        checkIn,
        checkOut,
        days,
        amount: total,
      });

      navigate(`/payment/${res.data.bookingId}`);
    } catch (err) {
      alert("Booking failed");
    }
  };

  if (!room || !user) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: "600px", margin: "40px auto" }}>
        <h2>Room Booking</h2>

        <img
          src={`http://localhost:5000${room.image}`}
          alt="room"
          style={{ width: "100%", borderRadius: "10px" }}
        />

        <h3>Room {room.roomNumber}</h3>
        <p>Type: {room.type}</p>
        <p>Price per night: ${room.price}</p>

        <hr />

        <h3>Customer Details</h3>
        <input value={user.name || ""} disabled />
        <input value={user.email || ""} disabled />
        <input value={user.phone || ""} disabled />

        <h3>Booking Details</h3>

        <label>Check-in Date</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label>Check-out Date</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        {days > 0 && (
          <>
            <p>Nights: {days}</p>
            <h3>Total Amount: ${total}</h3>
          </>
        )}

        <button
          onClick={handleBooking}
          disabled={!checkIn || !checkOut || days <= 0}
        >
          Proceed to Payment
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Booking;