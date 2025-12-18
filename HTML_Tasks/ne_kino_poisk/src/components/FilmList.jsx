import { useState, useEffect } from "react";
import { HashRouter, NavLink, Routes, Route } from "react-router-dom";

import FilmCard from "./FilmCard";
import AddFilmForm from "./AddingFilm";
import EditFilmForm from "./EditingFilm";
import EditFilmsPage from "./EditFilmsPage";
import FilmPage from "./FilmPage";

import "../styles/navigationmenu.css";


function FilmsPage({ films }) {
  return (
    <div className="films-container">
      {films.map((film, index) => (
        <FilmCard key={index} film={film} />
      ))}
    </div>
  );
}

export default function FilmList({role, onLogout}) {
  const [films, setFilms] = useState([]);
  const [openFilms, setOpenFilms] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/films")
      .then(res => res.json())
      .then(data => setFilms(Object.values(data)));
  }, []);

  const handleFilmAdded = (newFilm) => {
    setFilms([...films, newFilm]);
  };

  const handleFilmUpdated = (updatedFilm) => {
    setFilms(films.map(f => f.id === updatedFilm.id ? updatedFilm : f));
  };

  return (
    <HashRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>
        <nav className="navbar">
          <NavLink to="/" className="navbar-brand">🥔НеКиноПоиск</NavLink>
          <ul className="navbar-menu">
            {role === "admin" && (
              <>
                <li className="navbar-item">
                  <button className="dropdown-btn">
                    Работа с фильмами
                  </button>
                  <ul className="dropdown-menu">
                    <li><NavLink to="/create-new_films">Добавить фильмы</NavLink></li>
                    <li><NavLink to="/edit_films">Редактировать фильмы</NavLink></li>
                  </ul>
                </li>

                <li className="navbar-item">
                  <button className="dropdown-btn">
                    Работа с пользователями
                  </button>
                  <ul className="dropdown-menu">
                    <li><NavLink to="/create-user">Добавить пользователя</NavLink></li>
                    <li><NavLink to="/edit-user">Редактировать пользователя</NavLink></li>
                  </ul>
                </li>
              </>
            )}

            <li className="Logout-li">
              <button className="logout-btn" onClick={onLogout}>
                Выйти
              </button>
            </li>
          </ul>
        </nav>

        <div style={{ flex: 1, width: "100%" }}>
          <Routes>
            <Route path="/" element={<FilmsPage films={films} />} />
            <Route path="/create-new_films" element={<AddFilmForm onFilmAdded={handleFilmAdded} />} />
            <Route path="/film/:id" element={<FilmPage films={films} />} />
            <Route path="/edit_films" element={<EditFilmsPage />} />
            <Route path="/edit/:id" element={<EditFilmForm onFilmUpdated={handleFilmUpdated} />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}
