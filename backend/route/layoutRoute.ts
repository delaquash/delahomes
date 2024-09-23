import express from "express";
import { authorization, isUserAuthenticated } from "../middleware/auth";
import { createLayout, deleteLayout, editLayout, getLayout } from "../controllers/LayoutController";
import { updateAccessToken } from "../controllers/userController";

const router = express.Router();
router.post("/create-layout", isUserAuthenticated, authorization("admin"), createLayout);
router.put("/edit-layout", isUserAuthenticated, authorization("admin"), editLayout);
router.get("/get-layout", getLayout);
router.delete("/delete-layout",isUserAuthenticated, deleteLayout)
export default router;