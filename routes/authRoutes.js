import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.status(200).json({ message: "Auth route is working!" });
});

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;