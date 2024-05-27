import express from "express";
import {
  updateUser,
  deleteUser,
  getUserList,
  getUser,
  createUser
} from "../controllers/userController";
import { verifyUser } from "../utils/verifyUser";
import { jwtCheck, JwtParser } from "../middleware/auth";
import { ExpressValidator } from "../middleware/validation";
const router = express.Router();


router.put("/",jwtCheck,JwtParser,ExpressValidator, updateUser);

router.post("/",  createUser )

export default router;
