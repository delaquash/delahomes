import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { createRestaurant } from "../controllers/listController";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.post("/", UploadImage.single("imageFile"), validateMyRestaurantRequest, jwtCheck,jwtParse, createRestaurant)

export default router;