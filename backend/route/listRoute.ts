import express from "express";
import { createListing, deleteListing } from "../controllers/listController";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
// router.post();
// router.post();

export default router;
