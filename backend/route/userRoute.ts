import express from "express";
import { createCurrentUser, updateUser, getCurrentUser, getUser } from "../controllers/userController";
import {  jwtParse } from "../middleware/auth";
import { ExpressValidator } from "../middleware/validation";
const router = express.Router();

router.post("/createuser", ExpressValidator, jwtParse,  createCurrentUser );
router.put("/updateuser/:userId", jwtParse, ExpressValidator, updateUser);
router.get("/getuser/:userId", jwtParse, ExpressValidator, getCurrentUser);
router.get("/user/:id", jwtParse, ExpressValidator, getUser);

export default router;
