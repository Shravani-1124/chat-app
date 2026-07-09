import Sidebar from "./components/sidebar";
import ChatWindow from "./components/ChatWindow";
import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <ProtectedRoute>
      <div className="container">
        <Sidebar />

        <Routes>
          <Route
            path="/"
            element={<Navigate to="/room/general" replace />}
          />

          <Route
            path="/room/:roomId"
            element={<ChatWindow />}
          />
        </Routes>
      </div>
    </ProtectedRoute>
  );
}

export default App;