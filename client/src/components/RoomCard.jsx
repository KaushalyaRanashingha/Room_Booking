export default function RoomCard({ room }) {
  return (
    <div className="room-card">
      <img src={room.image} alt={room.name} />
      <div className="room-info">
        <h3>{room.name}</h3>
        <p>${room.price}/night</p>
        <button className="btn-primary">Book Now</button>
      </div>
    </div>
  );
}
