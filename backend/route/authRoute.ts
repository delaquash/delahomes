import express from "express";
import { signin,   signout } from "../controllers/authController";
import { isUserAuthenticated } from "../middleware/auth";

const router = express.Router();

// router.post("/signup", signup);
router.post("/signin",  signin);
// router.post("/google", google);
router.post("/signout", isUserAuthenticated, signout);

export default router;
