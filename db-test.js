import "dotenv/config";
import pool from "./db.js";

try {
  const result = await pool.query(
    "SELECT id, name, email FROM users ORDER BY id"
  );

  console.log("Users retrieved successfully!");
  console.table(result.rows);
} catch (error) {
  console.error("Database query failed:", error.message);
} finally {
  await pool.end();
}