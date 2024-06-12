import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { createRestaurant } from "../controllers/listController";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { jwtCheck, JwtParse } from "../middleware/auth";

const router = express.Router();

router.post("/", UploadImage.single("imageFile"), validateMyRestaurantRequest, jwtCheck,JwtParse, createRestaurant)

export default router;