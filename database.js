import mysql from "mysql2";
export { getMovies, getMovie, insertMovie, updateMovie, deleteMovie };
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getMovies() {
  const [rows] = await pool.query("SELECT * FROM movie");
  return rows;
}

async function getMovie(id) {
  console.log("Fetching movie with ID:", id);
  const [rows] = await pool.query("SELECT * FROM movie WHERE movie_id = ?", [
    id,
  ]);
  console.log("Rows fetched:", rows);
  return rows[0];
}

async function insertMovie(movie) {
  const {
    movie_id,
    genre_id,
    nama_movie,
    deskripsi_movie,
    duration_movie,
    realese_movie,
    sampul_depan,
    sampul_belakang,
    video_movie,
    video_trailler,
  } = movie;

  const query = `
    INSERT INTO movie (
      movie_id,
      genre_id,
      nama_movie,
      deskripsi_movie,
      duration_movie,
      realese_movie,
      sampul_depan,
      sampul_belakang,
      video_movie,
      video_trailler
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    movie_id,
    genre_id,
    nama_movie,
    deskripsi_movie,
    duration_movie,
    realese_movie,
    sampul_depan,
    sampul_belakang,
    video_movie,
    video_trailler,
  ];

  const [result] = await pool.query(query, values);
  return result.insertId;
}

async function updateMovie(movie_id, updatedMovie) {
  const {
    genre_id,
    nama_movie,
    deskripsi_movie,
    duration_movie,
    realese_movie,
    sampul_depan,
    sampul_belakang,
    video_movie,
    video_trailler,
  } = updatedMovie;

  const query = `
    UPDATE movie SET
      genre_id = ?,
      nama_movie = ?,
      deskripsi_movie = ?,
      duration_movie = ?,
      realese_movie = ?,
      sampul_depan = ?,
      sampul_belakang = ?,
      video_movie = ?,
      video_trailler = ?
    WHERE movie_id = ?
  `;

  const values = [
    genre_id,
    nama_movie,
    deskripsi_movie,
    duration_movie,
    realese_movie,
    sampul_depan,
    sampul_belakang,
    video_movie,
    video_trailler,
    movie_id, // kondisi WHERE di akhir
  ];

  const [result] = await pool.query(query, values);
  return result.affectedRows > 0;
}

async function deleteMovie(movie_id) {
  const query = `DELETE FROM movie WHERE movie_id = ?`;
  const [result] = await pool.query(query, [movie_id]);
  return result.affectedRows > 0;
}
