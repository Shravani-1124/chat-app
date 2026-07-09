import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { rtdb } from "../firebase";
import { ref, onValue } from "firebase/database";

function Sidebar() {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState({});
  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "rooms"),
    (snapshot) => {
      const roomList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRooms(roomList);
    }
  );

  return () => unsubscribe();
}, []);
 useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "users"),
    (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userList);
    }
  );

  return () => unsubscribe();
}, []);
useEffect(() => {
  const statusRef = ref(rtdb, "status");

  const unsubscribe = onValue(statusRef, (snapshot) => {
    const data = snapshot.val() || {};
    setStatuses(data);
  });

  return () => unsubscribe();
}, []);

const createRoom = async () => {
  try {
    await addDoc(collection(db, "rooms"), {
      name: "New Room",
      createdBy: user.uid,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

return (
    <div className="sidebar">
      <div className="user-info">
        <img
          src={user.photoURL}
          alt="Profile"
          className="profile-pic"
        />

        <h3>{user.displayName}</h3>
      </div>

      <input
        type="text"
        placeholder="Search rooms..."
        className="search-bar"
      />

      <button onClick={createRoom}>
        + New Room
      </button>

      <div className="contact-list">
        {rooms.map((room) => (
          <Link
            key={room.id}
            to={`/room/${room.id}`}
            className="contact"
          >
            {room.name}
          </Link>
          
        ))}
        <h4>Users</h4>

{users.map((u) => (
  <div key={u.uid} className="contact">
    <span
      style={{
        display: "inline-block",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        marginRight: "8px",
        backgroundColor:
          statuses[u.uid]?.state === "online"
            ? "limegreen"
            : "gray",
      }}
    />

    {u.name}
  </div>
))}
      </div>
    </div>
  );
}

export default Sidebar;