import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.status(200).json({ message: "Auth route is working!" });
});

router.post("/register", registerUser);

export default router;