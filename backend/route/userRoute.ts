import express from "express";
import { activateUser, RegisterUser } from "../controllers/userController";
<<<<<<< HEAD
// import {   jwtParse } from "../middleware/auth";
=======
import {  admin, jwtParse } from "../middleware/auth";
>>>>>>> parent of b37e429 ("Refactored authController, auth middleware, and routes to update authentication logic and token verification")
import { ExpressValidator } from "../middleware/validation";

const router = express.Router();

router.post("/registeruser", ExpressValidator, RegisterUser);
router.post("/activate-user", activateUser)
// router.put("/updateuser/:userId", jwtParse, ExpressValidator, updateUser);
// router.get("/getuser/:userId", jwtParse,  getCurrentUser);
// router.get("/:id", jwtParse,  getUser);
// router.get("/list/:userId", jwtParse,    getUserList )

export default router;
