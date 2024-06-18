import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { createRestaurant, getMyRestaurant } from "../controllers/MyRestaurantRoute";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { jwtParse } from "../middleware/auth";

const router = express.Router();

router.post("/", UploadImage.single("imageFile"), jwtParse, validateMyRestaurantRequest,  createRestaurant)
router.get("/", jwtParse,getMyRestaurant )
export default router;