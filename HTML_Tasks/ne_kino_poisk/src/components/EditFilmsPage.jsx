import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EditFilmsPage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/films")
      .then(res => res.json())
      .then(data => setFilms(Object.values(data)));
  }, []);

  return (
    <div className="films-container">
      {films.map((film, index) => (
        <div key={index} className="film-card">
          <img src={film.preview} alt={film.name} />
          <h3>{film.name}</h3>
          <p>{film.year}, {film.category}</p>
          <p>Рейтинг: {film.rating}</p>
          <Link to={`/edit/${film.id}`} className="edit-link">
            Редактировать
          </Link>
        </div>
      ))}
    </div>
  );
}
