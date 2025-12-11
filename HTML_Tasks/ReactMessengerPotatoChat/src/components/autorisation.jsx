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
      onSuccess(username);
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <section className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundColor: "#121212" }}>
      <div
        className="card bg-dark text-light shadow-lg"
        style={{
          maxWidth: "320px",
          width: "100%",
          borderRadius: "12px"
        }}
      >
        <div className="card-body p-4">
          <h3 className="fw-bold mb-4 text-center">Вход</h3>
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="mb-3 w-100">
              <label className="form-label">Имя пользователя</label>
              <input
                type="text"
                className="form-control bg-secondary text-light border-0"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3 w-100">
              <label className="form-label">Пароль</label>
              <input
                type="password"
                className="form-control bg-secondary text-light border-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-danger mb-2">{error}</p>}

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Войти
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
