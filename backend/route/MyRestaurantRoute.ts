import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { createRestaurant } from "../controllers/listController";

const router = express.Router();

router.post("/", UploadImage.single("imageFile"), createRestaurant)

export default router;