import express from "express";

import { isUserAuthenticated, authorization } from "../middleware/auth";
import { generateCourseAnalytics, generateUserAnalytics } from "../controllers/analyticsController";

const router = express.Router();
router.get("/get-user-analytics", isUserAuthenticated, authorization("admin"), generateUserAnalytics);
router.get("/get-course-analytics", isUserAuthenticated, authorization("admin"), generateCourseAnalytics);
export default router;