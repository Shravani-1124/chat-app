import { useState, useEffect, useContext, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
   const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "rooms", "general", "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-area">
      <div className="chat-header">
  <span>General Chat</span>

  <button onClick={handleLogout}>
    Logout
  </button>
</div>

      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.text}
            senderName={msg.senderName}
            isSent={msg.senderId === user?.uid}
          />
        ))}

        <div ref={messagesEndRef}></div>
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatWindow;