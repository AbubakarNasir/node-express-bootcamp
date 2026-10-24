import pool from "../db.js";
import argon2 from "argon2";

export async function registerUser(req, res, next) {
    const { name, email, password } = req.body;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required",
            });
        }

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                message: "Please provide a valid email address",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
            });
        }

        const passwordHash = await argon2.hash(password);

        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, name, email`,
            [name.trim(), email.trim().toLowerCase(), passwordHash]
        );

        return res.status(201).json({
            message: "User registered successfully.",
            user: result.rows[0],
        });
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "An account with this email already exists.",
            });
        }

        console.error("Registration error:", error);

        return res.status(500).json({
            message: "An unexpected error occurred during registration.",
        });
    }
}