import { useState } from "react";

export default function AddFilmForm({ onFilmAdded }) {
  const [film, setFilm] = useState({
    name: "",
    preview: "",
    year: "",
    category: "",
    rating: ""
  });

  const handleChange = (e) => {
    setFilm({ ...film, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/films", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(film)
    });
    const result = await response.json();
    if (result.success) {
      onFilmAdded(result.film);
      setFilm({ name: "", preview: "", year: "", category: "", rating: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Название" value={film.name} onChange={handleChange} />
      <input name="preview" placeholder="Ссылка на постер" value={film.preview} onChange={handleChange} />
      <input name="year" placeholder="Год" value={film.year} onChange={handleChange} />
      <input name="category" placeholder="Категория" value={film.category} onChange={handleChange} />
      <input name="rating" placeholder="Рейтинг" value={film.rating} onChange={handleChange} />
      <button type="submit">Добавить фильм</button>
    </form>
  );
}
