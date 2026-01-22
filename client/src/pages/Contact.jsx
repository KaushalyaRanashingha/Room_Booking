import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navBar1";
import Footer from "../components/Footer";
import "../style/Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/contact", form);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We’d love to hear from you. Drop us a message anytime.</p>
      </section>

      <div className="contact-content">
        {/* LEFT: Contact Info */}
        <div className="contact-info">
          <h2>Contact Details</h2>
          <p>Reach out to us through any of the channels below.</p>
          <div className="info">
            <p><strong>Email:</strong> support@roombooking.com</p>
            <p><strong>Phone:</strong> +94 77 123 4567</p>
            <p><strong>Location:</strong> Colombo, Sri Lanka</p>
          </div>
          <div className="map-container">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.08359142631!2d79.8292692!3d6.9270786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cfdfdb5d5%3A0x5b6d9b9d3b2f9b17!2sColombo!5e0!3m2!1sen!2slk!4v1710000000000"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="contact-form">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject (optional)"
              value={form.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
