import express from "express";
import {
  getMovies,
  getMovie,
  insertMovie,
  updateMovie,
  deleteMovie,
} from "./database.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/movies", async (req, res) => {
  try {
    const movies = await getMovies();
    res.status(200).json(movies);
  } catch (err) {
    console.error("Error getting movies:", err);
    res.status(500).json({ error: "Gagal mengambil data movie." });
  }
});

app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id);
  try {
    const movie = await getMovie(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    res
      .status(500)
      .json({ message: "Error fetching movie", error: error.message });
  }
});

app.patch("/movies/:id", async (req, res) => {
  const movie_id = req.params.id;
  const updatedMovie = req.body;

  try {
    const success = await updateMovie(movie_id, updatedMovie);

    if (success) {
      res.status(200).json({ message: "Movie updated successfully." });
    } else {
      res.status(404).json({ message: "Movie not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
});

app.delete("/movies/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const success = await deleteMovie(movieId);
    if (success) {
      res.json({ message: "Movie deleted successfully" });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
});

app.post("/movies", async (req, res) => {
  const movie = req.body; // Data movie yang dikirim dalam body request
  try {
    const movieId = await insertMovie(movie);
    res.status(201).json({
      message: "Movie created successfully",
      movieId: movieId, // Mengirimkan ID movie yang baru dibuat
    });
  } catch (error) {
    res.status(500).json({ message: "Error inserting movie", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
