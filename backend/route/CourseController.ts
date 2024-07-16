import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { uploadCourse } from "../controllers/CourseController";
import { validateMyRestaurantRequest } from "../middleware/validation";
// import { jwtParse } from "../middleware/auth";

const router = express.Router();

export default router;
