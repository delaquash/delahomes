import express from "express";
import {deleteUser, activateUser,updateUserByAdmin,getAllUsers, getUserInfo, RegisterUser,  updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo } from "../controllers/userController";

// import {  admin } from "../middleware/auth";

import { ExpressValidator } from "../middleware/validation";
import { authorization, isUserAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/registeruser", ExpressValidator, RegisterUser);
router.post("/activate-user", activateUser);
router.get("/refresh_token", updateAccessToken);
router.get("/me", isUserAuthenticated, getUserInfo);
router.put("/update-user-info", isUserAuthenticated, updateUserInfo);
router.put("/update-user-password", isUserAuthenticated, updatePassword)
router.put("/update-profile-avatar", isUserAuthenticated, updateProfilePicture)
router.get("/get-all-user", isUserAuthenticated,authorization("admin"), getAllUsers)
router.put("/admin-update-user", isUserAuthenticated,authorization("admin"), updateUserByAdmin);
router.delete("/delete-user/:id", isUserAuthenticated,authorization("admin"), deleteUser);

export default router;
