import { useState } from "react";
import Chat from './Chat';
import usersData from "../data_base/users.json";

export default function Page1({ chats, addMessage, currentUser }) {
  const [activeChat, setActiveChat] = useState(null);

  const userChats = usersData.users[currentUser]?.chats || [];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "30% 70%",
      height: "calc(100vh - 56px)",
      width: "100%"
    }}>
      <div style={{ background: "#333", color: "#fff", padding: 20, boxSizing: "border-box" }}>
        <h4>Мои чаты</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {userChats.map(chatId => {
            const otherUser = chatId.split("!").find(u => u !== currentUser);
            const isActive = activeChat === chatId;
            return (
              <li key={chatId}>
                <button
                  className={`btn w-100 mb-2 ${isActive ? "btn-primary" : "btn-dark"}`}
                  onClick={() => setActiveChat(chatId)}
                >
                  {otherUser}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div style={{ background: "#222", color: "#fff", padding: 10 }}>
        {activeChat ? (
          <Chat
            chatId={activeChat}
            chats={chats}
            addMessage={addMessage}
            currentUser={currentUser}
          />
        ) : (
          <p>Выберите чат слева</p>
        )}
      </div>
    </div>
  );
}
