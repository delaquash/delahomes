import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { createRestaurant } from "../controllers/RestaurantController";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { jwtParse } from "../middleware/auth";

const router = express.Router();
router.post("/signup", )
router.post("/", UploadImage.single("imageFile"), validateMyRestaurantRequest, jwtParse, createRestaurant)

export default router;