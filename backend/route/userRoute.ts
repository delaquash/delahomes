import express from "express";
import {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser
} from "../controllers/userController";
import { jwtCheck, JwtParse } from "../middleware/auth";
import { ExpressValidator } from "../middleware/validation";
const router = express.Router();

router.get("/", jwtCheck, JwtParse, getCurrentUser)
router.post("/", jwtCheck, createCurrentUser )
router.put("/",jwtCheck, ExpressValidator, updateCurrentUser);

export default router;
