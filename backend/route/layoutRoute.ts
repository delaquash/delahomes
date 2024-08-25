import express from "express";
import { authorization, isUserAuthenticated } from "../middleware/auth";
import { createLayout, deleteLayout, editLayout, getLayout } from "../controllers/LayoutController";

const router = express.Router();
router.post("/create-layout",isUserAuthenticated, authorization("admin"), createLayout);
router.put("/edit-layout",isUserAuthenticated, authorization("admin"), editLayout);
router.get("/get-type", getLayout);
router.delete("/delete-layout", deleteLayout)
export default router;