import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "movieapp",
});

try {
  const result = await pool.query("SELECT * FROM movie");
  console.log(result[0]);
} catch (error) {
  console.error("Query error:", error);
}
