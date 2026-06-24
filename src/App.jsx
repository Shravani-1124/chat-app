import { useContext } from "react";
import Login from "./components/Login";
import Sidebar from "./components/sidebar";
import ChatWindow from "./components/ChatWindow";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="container">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;