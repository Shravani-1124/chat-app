import { useState, useContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function MessageInput() {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await addDoc(
        collection(db, "rooms", "general", "messages"),
        {
          text: text,
          senderId: user.uid,
          senderName: user.displayName,
          senderPhoto: user.photoURL,
          timestamp: serverTimestamp(),
        }
      );

      setText("");
      console.log("Message sent!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="message-input">
       <input
  type="text"
  placeholder="Type a message..."
  value={text}
  onChange={(e) => setText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  }}
/>

      <button onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default MessageInput;