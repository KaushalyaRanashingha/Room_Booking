import { Link } from "react-router-dom";
import "./AdminDashboard.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/add-room">Add Room</Link></li>
        <li><Link to="/admin/bookings">Bookings</Link></li>
        <li><Link to="/">Go to Website</Link></li>
      </ul>
    </div>
  );
}
