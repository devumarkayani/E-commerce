import { useState } from "react";
import "./chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // send message function
  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <>
      {/* Chat Button */}
      <div
        className="chat-btn"
        onClick={() => setOpen(!open)}
        role="button"
        aria-label="Open chat"
      >
        <i className="fas fa-comment-dots"></i>
      </div>

      {/* Chat Box */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            AI Assistant 🤖
          </div>

          {/* Messages */}
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className="msg">
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..."
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
            />

            <button onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;