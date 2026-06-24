import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Sidebar() {
  const { user } = useContext(AuthContext);
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
        placeholder="Search contacts..."
        className="search-bar"
      />

      <div className="contact-list">
        <div className="contact">John</div>
        <div className="contact">Sarah</div>
        <div className="contact">Mike</div>
        <div className="contact">Emma</div>
      </div>
    </div>
  )
}

export default Sidebar