import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
  getList
} from "../controllers/listController";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.post("/update/:id", verifyUser, updateListing);
router.get("/get/:id",  getListing);
router.get("/get", getList)


export default router;
