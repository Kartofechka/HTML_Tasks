import { useState, useEffect, useRef } from "react";
import "../assets/chatStyles.css";

export default function Chat({ chatId, chats, addMessage, currentUser, autoMessage }) {
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    addMessage(chatId, currentUser, input);
    setInput("");
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats[chatId].messages]);

  useEffect(() => {
    if (!autoMessage) return;

    const timer = setTimeout(() => {
      const otherUser = chatId.split("!").find((u) => u !== currentUser);
      addMessage(chatId, otherUser, autoMessage);
    }, 120000);

    return () => clearTimeout(timer);
  }, [chatId, currentUser, addMessage, autoMessage]);

  return (
    <div className="chat-container">
      <div className="messages-container" ref={messagesContainerRef}>
        {chats[chatId].messages.map((msg, i) => {
          const isMine = currentUser === msg.from;
          return (
            <div key={i} className={`message-block ${isMine ? "mine" : "other"}`}>
              <div className="message-author">{isMine ? "Я" : msg.from}</div>
              <div className="message-bubble">
                <span>{msg.text}</span>
                <div className="message-time">{msg.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
}
