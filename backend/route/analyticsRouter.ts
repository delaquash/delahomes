import express from "express";

import { isUserAuthenticated, authorization } from "../middleware/auth";
import { generateUserAnalytics } from "../controllers/analyticsController";

const router = express.Router();
router.get("/analytics", generateUserAnalytics)
export default router;