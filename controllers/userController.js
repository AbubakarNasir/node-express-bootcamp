import users from "../data/user.js";
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

export function createNewUser(req, res) {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }

    const newUser = {
        id: users[users.length - 1].id + 1,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
}

export function updateUser(req, res) {
    const userId = Number(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }

    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }

    users[userIndex] = { id: userId, name, email };
    res.json(users[userIndex]);
}

export function deleteUser(req, res) {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }

    users.splice(userIndex, 1);
    res.status(204).send();
}