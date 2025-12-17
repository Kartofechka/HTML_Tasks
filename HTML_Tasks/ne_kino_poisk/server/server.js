import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

app.use(express.json());

const filePath = path.join(process.cwd(), "src/data_base/films.json");

app.get("/api/films", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data.films);
});

app.post("/api/films", (req, res) => {
  const newFilm = req.body;

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const filmKey = `film_${Object.keys(data.films).length}`;
  data.films[filmKey] = newFilm;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  res.json({ success: true, film: newFilm });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
