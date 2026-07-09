import { useState, useEffect, useContext, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { signOut } from "firebase/auth";
import { auth, db, rtdb } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

function ChatWindow() {
  const { roomId } = useParams();

  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});

  const { user } = useContext(AuthContext);

  const messagesEndRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  // Messages listener
  useEffect(() => {
    const q = query(
      collection(db, "rooms", roomId, "messages"),
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
  }, [roomId]);

  // Typing listener
  useEffect(() => {
    const typingRef = ref(rtdb, `typing/${roomId}`);

    const unsubscribe = onValue(typingRef, (snapshot) => {
      setTypingUsers(snapshot.val() || {});
    });

    return () => unsubscribe();
  }, [roomId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-area">
      <div className="chat-header">
        <span>{roomId}</span>

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

        {Object.values(typingUsers).some(
          (u) => u.typing && u.name !== user?.displayName
        ) && (
          <p>Someone is typing...</p>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatWindow;