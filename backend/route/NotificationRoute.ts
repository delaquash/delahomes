import express from "express";
import { getNotifications } from "../controllers/NotificationController";
import { authorization, isUserAuthenticated } from "../middleware/auth";
const router = express.Router();

router.post("/get-all-notifications", isUserAuthenticated, authorization("admin"), getNotifications)
export default router;