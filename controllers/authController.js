import pool from "../db.js";
import argon2 from "argon2";

export async function registerUser(req, res) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
        const { name, email, password } = req.body ?? {};

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Name, email, and password are required as valid strings.",
            });
        }

        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (!emailPattern.test(normalizedEmail)) {
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
            [normalizedName, normalizedEmail, passwordHash]
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

export async function loginUser(req, res) {
    const { email, password } = req.body ?? {};

    try {
        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const result = await pool.query(
            `SELECT id, name, email, password_hash
            FROM users
            WHERE email = $1`,
            [normalizedEmail]
        );

        const user = result.rows[0];

        if (!user || !user.password_hash) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const passwordIsValid = await argon2.verify(
            user.password_hash,
            password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        return res.status(200).json({
            message: "Login successful.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "An unexpected error occurred during login.",
        });
    }
}