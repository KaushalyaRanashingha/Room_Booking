import { Link } from "react-router-dom";
import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure fontawesome is imported

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <span>StayScape</span>
        </Link>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/rooms">Rooms</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {/* Profile Icon */}
        <li className="profile-icon">
          <Link to="/profile">
            <i className="fas fa-user-circle"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
