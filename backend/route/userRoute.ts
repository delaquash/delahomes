import express from "express";
import { createCurrentUser, updateUser, getCurrentUser } from "../controllers/userController";
import {  jwtParse } from "../middleware/auth";
import { ExpressValidator } from "../middleware/validation";
const router = express.Router();
// import { auth } from 'express-oauth2-jwt-bearer';

// router.get("/",   jwtParse, getCurrentUser)
router.post("/createuser", ExpressValidator, jwtParse,  createCurrentUser );
router.put("/updateuser/:userId", jwtParse, ExpressValidator, updateUser);
router.get("/getuser/:userId", jwtParse, ExpressValidator, getCurrentUser)


export default router;
