import express from "express";
import { isUserAuthenticated, authorization } from "../middleware/auth";
import { generateCourseAnalytics, generateOrderAnalytics, generateUserAnalytics } from "../controllers/analyticsController";

const router = express.Router();
router.get("/get-user-analytics", isUserAuthenticated, authorization("admin"), generateUserAnalytics);
router.get("/get-course-analytics", isUserAuthenticated, authorization("admin"), generateCourseAnalytics);
router.get("/get-order-analytics", isUserAuthenticated, authorization("admin"), generateOrderAnalytics);
export default router;