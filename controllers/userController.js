import pool from "../db.js";

export async function getAllUsers(req, res, next) {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    try {
        const result = await pool.query(
            "SELECT id, name, email FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

export async function createNewUser(req, res, next) {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }

    try {
        const result = await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email",
            [name, email]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).send("Email already exists");
        }

        next(error);
    }
}

export async function updateUser(req, res, next) {
    const userId = Number(req.params.id);
    const { name, email } = req.body;

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }

    try {
        const result = await pool.query(
            `UPDATE users
             SET name = $1, email = $2
             WHERE id = $3
             RETURNING id, name, email`,
            [name, email, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        res.json(result.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).send("Email already exists");
        }

        next(error);
    }
}

export async function deleteUser(req, res, next) {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    try {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING id",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}