function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Chat App</h2>

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