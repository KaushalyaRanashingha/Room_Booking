import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import FoodCard from "../components/FoodCard";
import Navbar from "../components/Navbar";
import "../style/Home.css";
import { getRooms, getFood } from "../services/api";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);

        const foodData = await getFood();
        setFood(foodData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>MAKE YOURSELF AT HOME IN OUR HOTEL</h1>
          <p>Up maids me an ample stood given. Certainty say suffering his him collected intention promotion...</p>
          <button className="btn-primary">Book Now</button>
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-form">
        <input type="text" placeholder="Location" />
        <input type="date" />
        <input type="date" />
        <input type="number" placeholder="Rooms for" />
        <button className="btn-primary">Search</button>
      </section>

     {/*Services*/}
     <section className="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <i className="fas fa-utensils"></i>
          <h4>Food</h4>
          <p>Delicious meals served all day</p>
        </div>
        <div className="service-card">
      <i className="fas fa-parking"></i>
      <h4>Parking</h4>
      <p>Spacious and secure parking</p>
    </div>
    <div className="service-card">
      <i className="fas fa-wifi"></i>
      <h4>Free Wifi</h4>
      <p>Stay connected anywhere</p>
    </div>
    <div className="service-card">
      <i className="fas fa-coffee"></i>
      <h4>Breakfast</h4>
      <p>Fresh breakfast served daily</p>
    </div> 
    <div className="service-card">
      <i className="fas fa-swimming-pool"></i>
      <h4>Swimming</h4>
      <p>Indoor and outdoor pools</p>
    </div>
    <div className="service-card">
      <i className="fas fa-user-md"></i>
      <h4>Doctor on Call</h4>
      <p>Available 24/7 for emergencies</p>
    </div>
    <div className="service-card">
      <i className="fas fa-car"></i>
      <h4>Car Rental</h4>
      <p>Rent cars easily from our hotel</p>
    </div>
    <div className="service-card">
      <i className="fas fa-concierge-bell"></i>
      <h4>Other</h4>
      <p>Additional services for comfort</p>
    </div>
      </div>
     </section>

      {/* Rooms */}
      <section className="rooms">
        <h2>Our Popular Hotels</h2>
        <p className="rooms-caption">
          Explore our most popular hotels with top amenities and cozy rooms for your stay.
        </p>

        <div className="rooms-grid">
          {rooms.map(room => (
            <div key={room._id} className="room-card">
              <img src={room.image} alt={room.name} className="room-img" />
              <div className="room-info">
                <h3>{room.name}</h3>
                <p className="room-description">{room.description}</p>
                <p className="room-price">${room.price} / night</p>
                <button className="btn-primary">Book Now</button>
              </div>
           </div>
          ))}
        </div>
      </section>

      {/* Food Menu */}
      <section className="food-menu">
        <h2>Food Menu</h2>
        <div className="food-grid">
          {food.map(item => <FoodCard key={item._id} food={item} />)}
        </div>
      </section>
    </div>
  );
}