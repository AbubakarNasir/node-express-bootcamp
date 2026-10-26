import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access token required.",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!authHeader.startsWith("Bearer ") || !token) {
        return res.status(401).json({
            message: "Invalid authorization header format.",
        });
    }
}