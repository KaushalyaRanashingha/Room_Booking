import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/navBar1";
import Footer from "../components/Footer";
import "../style/Booking.css";

function Booking() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    room: "",
    checkin: null,
    checkout: null,
    totalNights: 0,
    totalPrice: 0,
  });

  /* FETCH ROOMS */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/room")
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  /*SELECT ROOM */
  useEffect(() => {
    const room = rooms.find(r => r._id === formData.room);
    setSelectedRoom(room || null);
  }, [formData.room, rooms]);

  /* FETCH BLOCKED DATES  */
  useEffect(() => {
    if (!formData.room) return;

    axios
      .get(`http://localhost:5000/api/booking/unavailable/${formData.room}`)
      .then(res => {
        const disabled = [];
        res.data.forEach(b => {
          let current = new Date(b.checkin);
          const end = new Date(b.checkout);

          while (current < end) {
            disabled.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
        });

        setUnavailableDates(disabled);
      })
      .catch(err => console.error(err));
  }, [formData.room]);

  /* CALCULATE PRICE */
  useEffect(() => {
    if (formData.checkin && formData.checkout && selectedRoom) {
      const nights = Math.ceil(
        (formData.checkout - formData.checkin) / (1000 * 60 * 60 * 24)
      );

      if (nights > 0) {
        setFormData(prev => ({
          ...prev,
          totalNights: nights,
          totalPrice: nights * selectedRoom.price,
        }));
      }
    }
  }, [formData.checkin, formData.checkout, selectedRoom]);

  /* HANDLERS */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* SUBMIT BOOKING */
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!formData.room || !formData.checkin || !formData.checkout) {
      return alert("Please select room and dates");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/booking", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        room: formData.room,
        checkin: formData.checkin,
        checkout: formData.checkout,
        totalAmount: formData.totalPrice,
      });

      navigate("/payment", {
        state: {
          bookingId: res.data._id,
          totalAmount: formData.totalPrice,
        },
      });

    } catch (err) {
      alert(err.response?.data?.message || "Room already booked for selected dates");
    }
  };

  return (
    <>
      <Navbar />

      <div className="booking-container">
        <h2>Book Your Room</h2>

        <div className="booking-content">
          {/* FORM*/}
          <form className="booking-form" onSubmit={handleBooking}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              required
              onChange={handleChange}
            />

            <select name="room" required onChange={handleChange}>
              <option value="">-- Select Room --</option>
              {rooms.map(room => (
                <option key={room._id} value={room._id}>
                  {room.type} - LKR {room.price}
                </option>
              ))}
            </select>

            <label>Check-in</label>
            <DatePicker
              selected={formData.checkin}
              onChange={(date) =>
                setFormData({ ...formData, checkin: date, checkout: null })
              }
              excludeDates={unavailableDates}
              minDate={new Date()}
              placeholderText="Select check-in date"
            />

            <label>Check-out</label>
            <DatePicker
              selected={formData.checkout}
              onChange={(date) =>
                setFormData({ ...formData, checkout: date })
              }
              excludeDates={unavailableDates}
              minDate={formData.checkin}
              placeholderText="Select check-out date"
            />

            <button type="submit" className="submit-btn">Proceed to Payment</button>
          </form>

          {/* SUMMARY */}
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <p><span>Room:</span> <span>{selectedRoom?.type || "-"}</span></p>
            <p><span>Price/night:</span> <span>LKR {selectedRoom?.price || "-"}</span></p>
            <p><span>Check-in:</span> <span>{formData.checkin ? formData.checkin.toLocaleDateString() : "-"}</span></p>
            <p><span>Check-out:</span> <span>{formData.checkout ? formData.checkout.toLocaleDateString() : "-"}</span></p>
            <p><span>Nights:</span> <span>{formData.totalNights}</span></p>
            <strong>Total: LKR {formData.totalPrice}</strong>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Booking;
