import { useState } from "react";
import usersData from "../data_base/users.json";

export default function Autorisation({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = usersData.users;

    if (users[username] && users[username].password === password) {
      setError("");
      const role = users[username].role;   
      onSuccess(username, role);
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a1a1a",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "320px",
          width: "100%",
          backgroundColor: "#262626",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.6)"
        }}
      >
        <h3
          style={{
            fontWeight: "600",
            marginBottom: "24px",
            textAlign: "center",
            color: "#ffa500"
          }}
        >
          Вход
        </h3>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              marginBottom: "16px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ffa500",
              backgroundColor: "#333",
              color: "#fff",
              outline: "none"
            }}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ffa500",
              backgroundColor: "#333",
              color: "#fff",
              outline: "none"
            }}
          />

          {error && (
            <p style={{ color: "#ff4d00", fontSize: "14px", marginBottom: "12px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              marginTop: "8px",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ffa500",
              color: "#1a1a1a",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff7f00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ffa500")}
          >
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}
