import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from "../controllers/listController";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.put("/update/:id", verifyUser, updateListing);
router.get("/get-list/:id", verifyUser, getListing);
// routr.get("/get",)
// router.post();

export default router;
