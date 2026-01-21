import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/Rooms.css";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      }
    };
    fetchRooms();
=======
    axios.get("http://localhost:5000/api/room")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
>>>>>>> 25cea0c (Add room images, update booking, payment, and admin features)
  }, []);

  return (
    <>
      <Navbar />
      <div className="rooms-container">
        <h2>Available Rooms</h2>
        {rooms.length === 0 && <p>No rooms available</p>}
        <div className="rooms-grid">
          {rooms.map((room) => (
            <div key={room._id} className="room-card">
              {room.image && <img src={`http://localhost:5000/uploads/${room.image}`} alt={room.type} />}
              <h3>{room.type}</h3>
              <p>Price: LKR {room.price}</p>
              <button
                onClick={() => navigate("/Booking", { state: { room } })}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Rooms;
