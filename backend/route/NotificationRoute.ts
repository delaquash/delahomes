import express from "express";
import { getNotifications, updateNotification } from "../controllers/NotificationController";
import { authorization, isUserAuthenticated } from "../middleware/auth";
<<<<<<< HEAD
import { updateAccessToken } from "../controllers/userController";
=======
>>>>>>> origin/frontend
const router = express.Router();

router.get("/get-all-notifications", isUserAuthenticated, authorization("admin"), getNotifications)
router.put("/update-notification/:id", isUserAuthenticated, authorization("admin"), updateNotification)
export default router;