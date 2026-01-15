import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/Rooms.css";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <>
      <Navbar />
      <div className="rooms-container">
        <h2>Available Rooms</h2>
        <div className="rooms-grid">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="room-card"
              onClick={() => navigate(`/book/${room._id}`)}
            >
              {room.image && (
                <img
                  src={`http://localhost:5000${room.image}`}
                  alt={room.type}
                />
              )}
              <h3>Room {room.roomNumber}</h3>
              <p>Type: {room.type}</p>
              <p>Price: ${room.price}</p>
              <p>Status: {room.status}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Rooms;