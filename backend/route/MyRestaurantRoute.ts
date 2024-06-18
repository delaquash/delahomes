import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { createRestaurant } from "../controllers/MyRestaurantRoute";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { jwtParse } from "../middleware/auth";

const router = express.Router();

router.post("/", UploadImage.single("imageFile"), validateMyRestaurantRequest, jwtParse, createRestaurant)

export default router;