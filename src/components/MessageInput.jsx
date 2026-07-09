import { useState, useContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db , rtdb} from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { ref, set } from "firebase/database";
import EmojiPicker from "emoji-picker-react";


function MessageInput() {
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { user } = useContext(AuthContext);
  const { roomId } = useParams();
   const typingRef = ref(
  rtdb,
  `typing/${roomId}/${user?.uid}`
);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await addDoc(
        collection(db, "rooms", roomId, "messages"),
        {
          text: text,
          senderId: user.uid,
          senderName: user.displayName,
          senderPhoto: user.photoURL,
          timestamp: serverTimestamp(),
        }
      );

      setText("");
      await set(typingRef, {
  typing: false,
  name: user.displayName,
});
      console.log("Message sent!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="message-input">
      <button
  onClick={() => setShowPicker(!showPicker)}
>
  😀
</button>
{showPicker && (
  <EmojiPicker />
)}
       <input
  type="text"
  placeholder="Type a message..."
  value={text}
  onChange={async (e) => {
  setText(e.target.value);

  await set(typingRef, {
    typing: true,
    name: user.displayName,
  });
}}
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