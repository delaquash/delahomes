import express from "express";
import { createListing } from "../controllers/listController";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyUser, createListing);
// router.post();
// router.post();
// router.post();

export default router;
