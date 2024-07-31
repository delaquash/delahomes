import express from "express";
import { isUserAuthenticated } from "../middleware/auth";
import { createLayout } from "../controllers/LayoutController";

const router = express.Router();
router.post("/create-layout", createLayout)
export default router;