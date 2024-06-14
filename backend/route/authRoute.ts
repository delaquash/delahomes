import express from "express";
import { signin, signup,  signout } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
// router.post("/google", google);
router.post("/signout", signout);

export default router;
