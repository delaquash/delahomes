import express from "express";
import { signin, signout, socialAuth, RegisterUser, activateUser } from "../controllers/authController";
import { isUserAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/registeruser", RegisterUser);
router.post("/activate-user", activateUser);
router.post("/signin",  signin);
// router.post("/google", google);
router.post("/social-auth", socialAuth);
router.get("/signout", isUserAuthenticated, signout);

export default router;
