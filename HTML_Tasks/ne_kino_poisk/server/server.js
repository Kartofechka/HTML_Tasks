import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

const filePath = path.join(process.cwd(), "src/data_base/films.json");

app.get("/api/films", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data.films);
});

app.post("/api/films", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const filmId = Object.keys(data.films).length + 1;
  const newFilm = { id: filmId, ...req.body };       
  data.films[`film_${filmId}`] = newFilm;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  res.json({ success: true, film: newFilm });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/api/films/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const film = Object.values(data.films).find(f => f.id == req.params.id);
  if (film) {
    res.json(film);
  } else {
    res.status(404).json({ error: "Фильм не найден" });
  }
});

app.put("/api/films/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const filmKey = Object.keys(data.films).find(
    key => data.films[key].id == req.params.id
  );

  if (filmKey) {
    data.films[filmKey] = { ...data.films[filmKey], ...req.body };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    res.json({ success: true, film: data.films[filmKey] });
  } else {
    res.status(404).json({ error: "Фильм не найден" });
  }
});

app.delete("/api/films/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const filmKey = Object.keys(data.films).find(
    key => data.films[key].id == req.params.id
  );

  if (filmKey) {
    const deletedFilm = data.films[filmKey];
    delete data.films[filmKey];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    res.json({ success: true, film: deletedFilm });
  } else {
    res.status(404).json({ error: "Фильм не найден" });
  }
});