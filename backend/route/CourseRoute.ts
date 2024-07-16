import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { uploadCourse } from "../controllers/CourseController";
import { validateMyCourseRequest } from "../middleware/validation";
import { isUserAuthenticated, authorization } from "../middleware/auth";
// import { jwtParse } from "../middleware/auth";

const router = express.Router();
router.post("/create-course", isUserAuthenticated, authorization("admin"))
export default router;
