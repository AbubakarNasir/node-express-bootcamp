import pool from "../db.js";

export function authorizeAdmin(req, res, next) {
    // authenticateToken must run before this middleware.
    const userId = req.user?.sub;

    if (!userId) {
        return res.status(401).json({
            message: "Authenticated user ID is missing.",
        });
    }

    pool.query(
        "SELECT role FROM users WHERE id = $1",
        [userId]
    )
        .then((result) => {
            const user = result.rows[0];

            if (!user) {
                return res.status(401).json({
                    message: "User account not found.",
                });
            }

            if (user.role !== "admin") {
                return res.status(403).json({
                    message: "Forbidden. Admin access required.",
                });
            }

            next();
        })
        .catch((error) => {
            console.error("Authorization error:", error);

            return res.status(500).json({
                message: "An unexpected authorization error occurred.",
            });
        });
}
