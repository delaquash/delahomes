import express from "express";
import { createCurrentUser, getUserList, updateUser, getCurrentUser, getUser } from "../controllers/userController";
import {  admin, jwtParse } from "../middleware/auth";
import { ExpressValidator } from "../middleware/validation";

const router = express.Router();

router.post("/createuser", ExpressValidator, jwtParse, createCurrentUser );
router.put("/updateuser/:userId", jwtParse, ExpressValidator, updateUser);
router.get("/getuser/:userId", jwtParse,  getCurrentUser);
router.get("/:id", jwtParse,  getUser);
router.get("/list/:userId", jwtParse,    getUserList )

export default router;
