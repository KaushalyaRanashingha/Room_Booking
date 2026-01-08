import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/RoomDetails.css";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/room/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Room not found", err);
      }
    };
    fetchRoom();
  }, [id]);

  if (!room) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="room-details-container">
        <h2>Room {room.roomNumber}</h2>
        {room.image && (
          <img
            src={`http://localhost:5000${room.image}`}
            alt={room.type}
            className="room-image"
          />
        )}
        <p>Type: {room.type}</p>
        <p>Price: ${room.price}</p>
        <p>Status: {room.status}</p>

        <h3>Booking Form</h3>
        <form className="booking-form">
          <label>Check-in Date:</label>
          <input type="date" name="checkin" required />

          <label>Check-out Date:</label>
          <input type="date" name="checkout" required />

          <label>Food Option:</label>
          <select name="food">
            <option value="with_food">With Food</option>
            <option value="without_food">Without Food</option>
          </select>

          <label>Total Amount:</label>
          <input
            type="number"
            name="amount"
            placeholder={room.price}
            readOnly
          />

          <button type="submit">Book Now</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default RoomDetails;
