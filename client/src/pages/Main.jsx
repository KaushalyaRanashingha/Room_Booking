// src/pages/Main.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/Main.css";
import { getRooms } from "../services/api";
import "@fortawesome/fontawesome-free/css/all.min.css";

import roomImg1 from "../assets/images/a.webp";
import roomImg2 from "../assets/images/b.webp";
import roomImg3 from "../assets/images/c.webp";
import roomImg4 from "../assets/images/d.webp";

export default function Main() {  
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);
      } catch (err) {
        console.error("Error fetching rooms:", err);

        setRooms([
          { _id: 1, name: "Deluxe Room", description: "A cozy room with premium amenities.", price: 120, image: roomImg1 },
          { _id: 2, name: "Suite Room", description: "Spacious suite with king-size bed.", price: 220, image: roomImg2 },
          { _id: 3, name: "Standard Room", description: "Comfortable and affordable room.", price: 80, image: roomImg3 },
          { _id: 4, name: "Presidential Suite", description: "Luxurious suite with private pool.", price: 450, image: roomImg4 }
        ]);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="main-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Luxury & Comfort Redefined</h1>
            <p>Experience world-class hospitality and unforgettable stays.</p>
            <button className="btn-primary">Explore Rooms</button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-bar">
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search hotels, locations, or rooms..." />
          <button className="btn-primary">Search</button>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <h2>Our Premium Services</h2>
        <p className="services-subtitle">Enjoy top-notch amenities to make your stay unforgettable.</p>
        <div className="services-grid">
          <div className="service-card"><i className="fas fa-utensils"></i><h4>Gourmet Food</h4><p>Delicious meals prepared by top chefs</p></div>
          <div className="service-card"><i className="fas fa-parking"></i><h4>Parking</h4><p>Safe & spacious parking for all guests</p></div>
          <div className="service-card"><i className="fas fa-wifi"></i><h4>Free WiFi</h4><p>High-speed internet in all rooms and public areas</p></div>
          <div className="service-card"><i className="fas fa-swimming-pool"></i><h4>Swimming Pool</h4><p>Indoor & outdoor pools with lounge areas</p></div>
          <div className="service-card"><i className="fas fa-user-md"></i><h4>Doctor on Call</h4><p>24/7 medical assistance for emergencies</p></div>
          <div className="service-card"><i className="fas fa-car"></i><h4>Car Rental</h4><p>Convenient car rentals directly from the hotel</p></div>
        </div>
      </section>

      {/* Popular Hotels */}
      <section className="rooms">
        <h2>Our Popular Hotels</h2>
        <p className="rooms-caption">Hand-picked hotels offering comfort, luxury, and premium amenities.</p>
        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <div key={room._id} className="room-card">
              <div className="room-img-wrapper">
                <img src={room.image || [roomImg1, roomImg2, roomImg3, roomImg4][index % 4]} alt={room.name} />
                <span className="price-badge">${room.price}/night</span>
                <div className="room-overlay">
                  <div className="room-rating">{[...Array(4)].map((_, i) => (<i key={i} className="fas fa-star"></i>))}<i className="fas fa-star-half-alt"></i></div>
                  <button className="btn-primary">Book Now</button>
                </div>
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.description.length > 80 ? room.description.slice(0, 80) + "..." : room.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
