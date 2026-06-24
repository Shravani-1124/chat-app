import Sidebar from "./components/sidebar";
import ChatWindow from "./components/ChatWindow";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <ProtectedRoute>
      <div className="container">
        <Sidebar />
        <ChatWindow />
      </div>
    </ProtectedRoute>
  );
}

export default App;