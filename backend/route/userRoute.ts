import express from "express";
import { RegisterUser } from "../controllers/userController";
import {  admin, jwtParse } from "../middleware/auth";
import { ExpressValidator } from "../middleware/validation";

const router = express.Router();

router.post("/registeruser", ExpressValidator, RegisterUser);
// router.put("/updateuser/:userId", jwtParse, ExpressValidator, updateUser);
// router.get("/getuser/:userId", jwtParse,  getCurrentUser);
// router.get("/:id", jwtParse,  getUser);
// router.get("/list/:userId", jwtParse,    getUserList )

export default router;
