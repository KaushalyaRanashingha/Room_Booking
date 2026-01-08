import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/About.css";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-container">
        <div className="about-hero">
          <h1>About Our Room Booking System</h1>
          <p>
            Simple, secure, and smart room reservations made for everyone
          </p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Who We Are</h2>
            <p>
              Our Room Booking System is designed to make hotel and room
              reservations easy, fast, and reliable. We help users find,
              book, and manage rooms with just a few clicks.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <ul>
              <li>✔ Easy online room booking</li>
              <li>✔ Secure user registration & login</li>
              <li>✔ Real-time room availability</li>
              <li>✔ Admin room & booking management</li>
              <li>✔ Responsive design for all devices</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to simplify the room booking process by providing
              a user-friendly platform with modern technology, ensuring a
              smooth experience for both customers and administrators.
            </p>
          </section>

          <section className="about-section">
            <h2>Why Choose Us?</h2>
            <p>
              We focus on performance, security, and usability. Whether you're
              booking a room or managing bookings as an admin, our system
              ensures efficiency and reliability.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
