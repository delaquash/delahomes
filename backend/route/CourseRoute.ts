import express from "express";
import UploadImage from "../utils/CloudinaryStorage";
import { uploadCourse, editCourse } from "../controllers/CourseController";
import { validateMyCourseRequest } from "../middleware/validation";
import { isUserAuthenticated, authorization } from "../middleware/auth";
// import { jwtParse } from "../middleware/auth";

const router = express.Router();
router.post("/create-course", isUserAuthenticated, authorization("admin"), uploadCourse);
router.put("/edit-course/:id", isUserAuthenticated, authorization("admin"), editCourse)
export default router;
