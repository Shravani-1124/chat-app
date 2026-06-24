import { useEffect } from 'react'
import './App.css'
import Sidebar from "./components/sidebar"
import ChatWindow from "./components/ChatWindow"

function App() {
  



  return (
    <div className="container">
    <Sidebar />
    <ChatWindow />
  </div>
     
)
}

export default App