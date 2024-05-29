import express from "express";
import {
  updateUser,
  // deleteUser,
  // getUser,
  createUser,
  getCurrentUser
} from "../controllers/userController";
import { jwtCheck, JwtParse } from "../middleware/auth";
import { ExpressValidator } from "../middleware/validation";
const router = express.Router();


router.post("/", jwtCheck, createUser )
router.put("/",  jwtCheck, JwtParse,ExpressValidator, updateUser);
router.get("/",   getCurrentUser)

export default router;
