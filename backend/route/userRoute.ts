import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  createUser,
  getCurrentUser
} from "../controllers/userController";
import { verifyUser } from "../utils/verifyUser";
import { jwtCheck, JwtParser } from "../middleware/auth";
import { ExpressValidator } from "../middleware/validation";
const router = express.Router();

router.get("/", jwtCheck, JwtParser, getCurrentUser)
router.post("/", jwtCheck, createUser )
router.put("/",jwtCheck,JwtParser,ExpressValidator, updateUser);

export default router;
