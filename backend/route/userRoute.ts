import express from "express";
import {
  updateUser,
  deleteUser,
  getUserList,
  getUser,
  createUser
} from "../controllers/userController";
import { verifyUser } from "../utils/verifyUser";
import { jwtCheck } from "../middleware/auth";
const router = express.Router();

router.put("/", updateUser);

router.post("/",jwtCheck,  createUser )

export default router;
