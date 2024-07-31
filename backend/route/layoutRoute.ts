import express from "express";
import { authorization, isUserAuthenticated } from "../middleware/auth";
import { createLayout } from "../controllers/LayoutController";

const router = express.Router();
router.post("/create-layout",isUserAuthenticated, authorization("admin"), createLayout)
export default router;