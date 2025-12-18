import { useNavigate } from "react-router-dom";

export default function FilmCard({ film }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/film/${film.id}`);
  };

  return (
    <div className="film-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={film.preview} alt={film.name} />
      <h3>{film.name}</h3>
      <p>{film.year}, {film.category}</p>
      <p>Рейтинг: {film.rating}</p>
    </div>
  );
}
