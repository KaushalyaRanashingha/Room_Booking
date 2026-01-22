import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      
      <div className="navbar-logo">
        <Link to="/">
          <span>StayScape</span>
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Rooms</Link></li>
        <li><Link to="/contact">Review</Link></li>
        <li className="login-btn"><Link to="/login">Login</Link></li>
      </ul>

    </nav>
  );
}

export default Navbar;
