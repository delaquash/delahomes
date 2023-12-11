import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
} from "../controllers/listController";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.post("/update/:id", verifyUser, updateListing);
// router.post();

export default router;
