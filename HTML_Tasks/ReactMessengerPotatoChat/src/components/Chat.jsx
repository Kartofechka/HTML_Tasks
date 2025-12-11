import { useState, useEffect, useRef } from "react";

export default function Chat({ chatId, chats, addMessage, currentUser }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    addMessage(chatId, currentUser, input);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats[chatId].messages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 77px)",
        backgroundColor: "#111",
        color: "#fff",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          scrollbarWidth: "none",
          msOverflowStyle: "none", 
        }}
        className="messages-container"
      >
        {chats[chatId].messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "6px" }}>
            <b style={{ color: currentUser === msg.from ? "orange" : "#ccc" }}>
              {currentUser === msg.from ? "Я" : msg.from}:
            </b>{" "}
            <span style={{ color: "#e9e2e2ff" }}>{msg.text}</span>{" "}
            <span style={{ color: "gray" }}>({msg.time})</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "10px",
          borderTop: "1px solid #333",
          backgroundColor: "#222",
          flexShrink: 0,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          style={{ flex: 1 }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={{ background: "#375A7f", color: "#fff" }}>
          Отправить
        </button>
      </div>
    </div>
  );
}
