import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditFilmForm({ onFilmUpdated }) {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/films/${id}`)
      .then(res => res.json())
      .then(data => setFilm(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["country", "producer", "long_time", "age", "synopsis"].includes(name)) {
      setFilm({
        ...film,
        descriptiom: { ...film.descriptiom, [name]: value }
      });
    } else {
      setFilm({ ...film, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/films/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(film)
    });
    const result = await response.json();
    if (result.success) {
      onFilmUpdated(result.film);
    }
  };

  if (!film) return <p>Загрузка...</p>;

  return (
    <form onSubmit={handleSubmit} className="film-form">
      <fieldset>
        <legend>Редактирование фильма</legend>
        <input name="name" placeholder="Название" value={film.name} onChange={handleChange} />
        <input name="preview" placeholder="Ссылка на постер" value={film.preview} onChange={handleChange} />
        <input name="year" placeholder="Год" value={film.year} onChange={handleChange} />
        <input name="category" placeholder="Категория" value={film.category} onChange={handleChange} />
        <input name="rating" placeholder="Рейтинг" value={film.rating} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <legend>Описание</legend>
        <input name="country" placeholder="Страна" value={film.descriptiom.country} onChange={handleChange} />
        <input name="producer" placeholder="Режиссёр" value={film.descriptiom.producer} onChange={handleChange} />
        <input name="long_time" placeholder="Длительность фильма" value={film.descriptiom.long_time} onChange={handleChange} />
        <input name="age" placeholder="Возрастное ограничение" value={film.descriptiom.age} onChange={handleChange} />
        <textarea name="synopsis" placeholder="Краткое описание фильма" value={film.descriptiom.synopsis} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <legend>Ссылки</legend>
        <input name="link_to_film" placeholder="Ссылка на фильм" value={film.link_to_film} onChange={handleChange} />
        <input name="link_to_trailer" placeholder="Ссылка на трейлер" value={film.link_to_trailer} onChange={handleChange} />
      </fieldset>

      <button type="submit">Сохранить изменения</button>
    </form>
  );
}
