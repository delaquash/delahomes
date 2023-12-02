import express from "express";
import { updateUser } from "../controllers/userController";
import { verifyUser } from "../utils/verifyUser";
const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);

export default router;
