import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
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
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="contact-page">
        <div className="contact-container">

          {/* LEFT */}
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p>Have questions? Reach out to us anytime.</p>

            <div className="info">
              <p><strong>Email:</strong> support@roombooking.com</p>
              <p><strong>Phone:</strong> +94 77 123 4567</p>
              <p><strong>Location:</strong> Colombo, Sri Lanka</p>
            </div>

            {/* GOOGLE MAP */}
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.08359142631!2d79.8292692!3d6.9270786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cfdfdb5d5%3A0x5b6d9b9d3b2f9b17!2sColombo!5e0!3m2!1sen!2slk!4v1710000000000"
              width="100%"
              height="250"
              style={{ border:0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>

          </div>

          {/* RIGHT */}
          <div className="contact-form">
            <h3>Send a Message</h3>

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
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
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
      </div>

      <Footer />
    </>
  );
}

export default Contact;
