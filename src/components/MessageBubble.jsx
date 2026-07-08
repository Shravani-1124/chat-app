function MessageBubble({ text, senderName, isSent }) {
  return (
    <div className={`message ${isSent ? "sent" : "received"}`}>
      <div className="sender-name">
        {senderName}
      </div>

      <div>
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;

