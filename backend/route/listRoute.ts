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
<<<<<<< HEAD
router.put("/update/:id", verifyUser, updateListing);
router.get("/get-list/:id",  getListing);
router.get("/get", getList)
// router.post();
=======
router.post("/update/:id", verifyUser, updateListing);
router.get("/get/:id",  getListing);
router.get("/get", getList)

>>>>>>> backend

export default router;
