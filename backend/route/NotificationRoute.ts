import express from "express";
import { getNotifications, updateNotification } from "../controllers/NotificationController";
import { authorization, isUserAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/userController";
const router = express.Router();

router.get("/get-all-notifications",updateAccessToken, isUserAuthenticated, authorization("admin"), getNotifications)
router.put("/update-notification/:id",updateAccessToken, isUserAuthenticated, authorization("admin"), updateNotification)
export default router;