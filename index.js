import express from "express";
import { getMovies } from "./database.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const movies = await getMovies();
    res.status(200).json(movies);
  } catch (err) {
    console.error("Error getting movies:", err);
    res.status(500).json({ error: "Gagal mengambil data movie." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
