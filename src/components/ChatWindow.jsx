import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"

function ChatWindow() {
  return (
    <div className="chat-area">

      <div className="chat-header">
        John
      </div>

      <div className="messages">
        <MessageBubble text="Hello!" isSent={false} />
        <MessageBubble text="Hi there!" isSent={true} />
      </div>

      <MessageInput />

    </div>
  )
}

export default ChatWindow