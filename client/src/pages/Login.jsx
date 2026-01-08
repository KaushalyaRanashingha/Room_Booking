import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");

      navigate("/"); 

    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Login to continue your booking</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          <div className="login-footer">
            <span>Don’t have an account?</span>
            <a href="/register">Register</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
