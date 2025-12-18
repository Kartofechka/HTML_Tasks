import { useParams } from "react-router-dom";
import "../styles/filmpage.css";

export default function FilmPage({ films }) {
  const { id } = useParams();
  const film = films.find(f => String(f.id) === id);

  if (!film) {
    return <p style={{ color: "#fff", textAlign: "center" }}>Фильм не найден</p>;
  }

  const info = film.descriptiom;

  return (
    <section className="film-page">
      <div className="film-poster">
        <img src={film.preview} alt={film.name} />
      </div>

      <div className="film-info">
        <h2 className="film-title">{film.name}</h2>
        <p className="film-meta">
          <span>{film.year}</span> • <span>{film.category}</span>
        </p>
        <p className="film-rating">⭐ Рейтинг: {film.rating}</p>

        <div className="film-details">
          <p><strong>Страна:</strong> {info.country}</p>
          <p><strong>Режиссёр:</strong> {info.producer}</p>
          <p><strong>Длительность:</strong> {info.long_time}</p>
          <p><strong>Возраст:</strong> {info.age}</p>
        </div>

        <p className="film-synopsis">{info.synopsis}</p>

        <div className="trailer-player">
          <iframe
            width="600"
            height="350"
            src={film.link_to_trailer.replace("watch?v=", "embed/")}
            title="Трейлер"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="film-player">
          <iframe
            width="1080"
            height="620"
            src={film.link_to_film.replace("watch?v=", "embed/")}
            title="Фильм"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </section>
  );
}
