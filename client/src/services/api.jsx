import axios from "axios";

const ROOM_API = "http://localhost:5000/api/rooms";
const FOOD_API = "http://localhost:5000/api/food"; 

export const getRooms = async () => {
  const res = await axios.get(ROOM_API);
  return res.data;
};

export const addRoom = async (roomData) => {
  const res = await axios.post(ROOM_API, roomData);
  return res.data;
};

export const updateRoom = async (id, roomData) => {
  const res = await axios.put(`${ROOM_API}/${id}`, roomData);
  return res.data;
};

export const deleteRoom = async (id) => {
  const res = await axios.delete(`${ROOM_API}/${id}`);
  return res.data;
};

// ✅ ADD THIS
export const getFood = async () => {
  const res = await axios.get(FOOD_API);
  return res.data;
};
