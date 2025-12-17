import filmsData from "../data_base/films.json";
import FilmCard from "./film_card";

export default function FilmList() {
  return (
    <div className="films-container">
      {Object.values(filmsData.films).map((film, index) => (
        <FilmCard key={index} film={film} />
      ))}
    </div>
  );
}
