import express from "express";
import { getAllUsers, getUserById, createNewUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", (getAllUsers));

router.get("/:id", (getUserById));

router.post("/", (createNewUser));

router.put("/:id", (updateUser));

router.delete("/:id", (deleteUser));

export default router;