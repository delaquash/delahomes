import express from "express";
import { authorization, isUserAuthenticated } from "../middleware/auth";
import { createLayout, editLayout } from "../controllers/LayoutController";

const router = express.Router();
router.post("/create-layout",isUserAuthenticated, authorization("admin"), createLayout);
router.post("/edit-layout",isUserAuthenticated, authorization("admin"), editLayout);
export default router;