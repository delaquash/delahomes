import express from "express";
import { signin,   signout } from "../controllers/authController";
<<<<<<< HEAD
import { isUserAuthenticated } from "../middleware/auth";
=======
import { admin, jwtParse } from "../middleware/auth";
>>>>>>> parent of b37e429 ("Refactored authController, auth middleware, and routes to update authentication logic and token verification")

const router = express.Router();

// router.post("/signup", signup);
router.post("/signin",  signin);
// router.post("/google", google);
router.post("/signout", signout);

export default router;
