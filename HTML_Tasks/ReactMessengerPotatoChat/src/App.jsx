import { useState } from "react";
import { HashRouter, NavLink, Routes, Route } from "react-router-dom";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "./App.css";

import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Autorisation from "./components/autorisation";
import Game2048 from "./components/Game";

import chatsData from "../src/data_base/chats.json";

function getChatId(userId1, userId2) {
  const [a, b] = [userId1, userId2].sort();
  return `${a}!${b}`;
}

function App() {
  const [chats, setChats] = useState(chatsData);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const addChat = (userId1, userId2) => {
    const chatId = getChatId(userId1, userId2);
    if (!chats[chatId]) {
      setChats(prevChats => ({ ...prevChats, [chatId]: { messages: [] } }));
    }
    return chatId;
  };

  const addMessage = (chatId, from, text) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChats(prevChats => ({
      ...prevChats,
      [chatId]: {
        messages: [...prevChats[chatId].messages, { from, text, time: now }]
      }
    }));
  };

  return (
    <>
      {!isAuthorized ? (
        <Autorisation onSuccess={(username) => {
          setCurrentUser(username);
          setIsAuthorized(true);
        }} />
      ) : (
        <HashRouter>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <a className="navbar-brand" href="#">Потато чат</a>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item"><NavLink className="nav-link" to="/uno">Чаты</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/Мега-вторая-страница">Музыка</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/Дикая-третья-страница">Игры</NavLink></li>
                </ul>
              </div>
            </nav>

            <div style={{ flex: 1, width: "100%" }}>
              <Routes>
                <Route
                  path="/uno"
                  element={<Page1 chats={chats}
                                  addChat={addChat}
                                  addMessage={addMessage} 
                                  currentUser={currentUser} 
                          />}
                />
                <Route path="/Мега-вторая-страница" element={<Page2 />} />
                <Route path="/Дикая-третья-страница" element={<Page3 />} />
              </Routes>
            </div>
          </div>
        </HashRouter>
      )}
    </>
  );
}

export default App;
