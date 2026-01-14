import { Link } from "react-router-dom";
import { deleteRoom } from "../services/api";

export default function AdminRoomCard({ room }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await deleteRoom(room._id);
      window.location.reload();
    }
  };

  return (
    <div className="admin-room-card">
      <img src={room.image} alt={room.name} />
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <p>Price: ${room.price}</p>
      <div className="admin-room-actions">
        <Link to={`/admin/edit-room/${room._id}`} className="btn">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}