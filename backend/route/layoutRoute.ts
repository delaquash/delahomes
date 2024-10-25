import express from "express";
import { authorization, isUserAuthenticated } from "../middleware/auth";
import { createLayout, deleteLayout, editLayout, getLayout } from "../controllers/LayoutController";
<<<<<<< HEAD
import { updateAccessToken } from "../controllers/userController";

const router = express.Router();
router.post("/create-layout", isUserAuthenticated, authorization("admin"), createLayout);
router.put("/edit-layout", isUserAuthenticated, authorization("admin"), editLayout);
router.get("/get-layout/:type", getLayout);
router.delete("/delete-layout",isUserAuthenticated, deleteLayout)
=======

const router = express.Router();
router.post("/create-layout",isUserAuthenticated, authorization("admin"), createLayout);
router.put("/edit-layout",isUserAuthenticated, authorization("admin"), editLayout);
router.get("/get-type", getLayout);
router.delete("/delete-layout", deleteLayout)
>>>>>>> origin/frontend
export default router;