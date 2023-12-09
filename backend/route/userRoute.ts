import express from "express";
import { updateUser, deleteUser } from "../controllers/userController";
import { verifyUser } from "../utils/verifyUser";
const router = express.Router();

router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);

export default router;
