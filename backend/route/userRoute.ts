import express from "express";
import {
  deleteUser,
  updateUserByAdmin,
  getAllUsers,
  getUserInfo,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
} from "../controllers/userController";

import { ExpressValidator } from "../middleware/validation";
import { authorization, isUserAuthenticated } from "../middleware/auth";

const router = express.Router();



router.get("/refresh_token", updateAccessToken);
router.get("/me", updateAccessToken ,isUserAuthenticated, getUserInfo);
router.put("/update-user-info", updateAccessToken ,isUserAuthenticated, updateUserInfo);
router.put("/update-user-password", updateAccessToken ,isUserAuthenticated, updatePassword);
router.put("/update-profile-avatar", updateAccessToken ,isUserAuthenticated, updateProfilePicture);
router.get(
  "/get-all-user",
  updateAccessToken,
  isUserAuthenticated,
  authorization("admin"),
  getAllUsers
);
router.put(
  "/admin-update-user",
  updateAccessToken,
  isUserAuthenticated,
  authorization("admin"),
  updateUserByAdmin
);
router.delete(
  "/delete-user/:id",
  updateAccessToken,
  isUserAuthenticated,
  authorization("admin"),
  deleteUser
);

export default router;
