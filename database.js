import mysql from "mysql2";
export { getMovies, getMovie, insertMovie };
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
  const [rows] = await pool.query("SELECT * FROM movie WHERE id = ?", [id]);
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
