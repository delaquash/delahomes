import express from "express";
import {
  updateUser,
  deleteUser,
  getUserList,
} from "../controllers/userController";
import { verifyUser } from "../utils/verifyUser";
const router = express.Router();

router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/listing/:id", verifyUser, getUserList);

export default router;
