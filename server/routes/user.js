import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import verifyUser from "../middlewares/verifyUser.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyUser, updateUser);

// DELETE USER
router.delete("/:id", verifyUser, deleteUser);

// GET A USER
router.get("/:id",verifyUser, getUser);

// GET ALL USERS
router.get("/", verifyAdmin , getUsers);

export default router;