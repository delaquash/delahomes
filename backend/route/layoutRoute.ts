import express from "express";
import { authorization, isUserAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, editLayoutType } from "../controllers/LayoutController";

const router = express.Router();
router.post("/create-layout",isUserAuthenticated, authorization("admin"), createLayout);
router.put("/edit-layout",isUserAuthenticated, authorization("admin"), editLayout);
router.put("/layout-type",isUserAuthenticated, authorization("admin"), editLayoutType);
export default router;