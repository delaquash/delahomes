import express from "express";
import { activateUser, getUserInfo, RegisterUser, updateAccessToken } from "../controllers/userController";

// import {  admin } from "../middleware/auth";

import { ExpressValidator } from "../middleware/validation";
import { isUserAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/registeruser", ExpressValidator, RegisterUser);
router.post("/activate-user", activateUser);
router.get("/refresh_token", updateAccessToken);
router.get("/me", isUserAuthenticated, getUserInfo)

export default router;
