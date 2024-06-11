import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { createRestaurant } from "../controllers/listController";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

router.post("/", UploadImage.single("imageFile"), validateMyRestaurantRequest, createRestaurant)

export default router;