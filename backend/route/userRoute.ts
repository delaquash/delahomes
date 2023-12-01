import express from "express";
import { updateUser } from "../controllers/userController";
const router = express.Router();
router.post("/update/:id", updateUser);
export default router;
