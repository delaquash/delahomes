import express from "express";
import { authorization, isUserAuthenticated } from "../middleware/auth";
import { createLayout, deleteLayout, editLayout, getLayout } from "../controllers/LayoutController";
import { updateAccessToken } from "../controllers/userController";

const router = express.Router();
router.post("/create-layout",updateAccessToken, isUserAuthenticated, authorization("admin"), createLayout);
router.put("/edit-layout",updateAccessToken, isUserAuthenticated, authorization("admin"), editLayout);
router.get("/get-type", getLayout);
router.delete("/delete-layout", deleteLayout)
export default router;