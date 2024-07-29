import express from "express";
import { signin, signout, socialAuth } from "../controllers/authController";
import { isUserAuthenticated } from "../middleware/auth";

// import { admin } from "../middleware/auth";

const router = express.Router();

router.post("/signin",  signin);
// router.post("/google", google);
router.post("/social-auth", socialAuth);
router.get("/signout", isUserAuthenticated, signout);

export default router;
