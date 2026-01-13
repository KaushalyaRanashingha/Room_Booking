import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Booking() {
  const { id } = useParams(); // room id
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  axios
    .get(`http://localhost:5000/api/room/${id}`)
    .then(res => setRoom(res.data))
    .catch(err => {
      console.error(err.response?.data);
      alert("Room not found");
    });
}, [id]);


  useEffect(() => {
    if (room && checkIn && checkOut) {
      const days =
        (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24);
      setTotal(days > 0 ? days * room.price : 0);
    }
  }, [checkIn, checkOut, room]);

  if (!room || !user) return <p>Loading...</p>;

  const submitBooking = async () => {
    const res = await axios.post("http://localhost:5000/api/booking", {
      user: user._id,
      room: room._id,
      checkIn,
      checkOut,
      total
    });

    navigate(`/payment/${res.data._id}`);
  };

  return (
    <div>
      <h2>Booking Room {room.roomNumber}</h2>

      <input value={user.name} disabled />
      <input value={user.email} disabled />

      <input type="date" onChange={e => setCheckIn(e.target.value)} />
      <input type="date" onChange={e => setCheckOut(e.target.value)} />

      <h3>Total: ${total}</h3>

      <button onClick={submitBooking}>Proceed to Payment</button>
    </div>
  );
}

export default Booking;
