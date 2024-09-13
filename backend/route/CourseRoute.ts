import express from "express";
import {
  uploadCourse,
  editCourse,
  getAllCourses,
  getSingleCourse,
  getAllCourse,
  getCourseByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
  deleteCourse,
  generateVideoUrl,
} from "../controllers/CourseController";
import { validateMyCourseRequest } from "../middleware/validation";
import { isUserAuthenticated, authorization } from "../middleware/auth";
import { updateAccessToken } from "../controllers/userController";


const router = express.Router();
router.post(
  "/create-course",
  updateAccessToken,
  isUserAuthenticated,
  authorization("admin"),
  uploadCourse
);
router.put(
  "/edit-course/:id",
  updateAccessToken,
  isUserAuthenticated,
  authorization("admin"),
  editCourse
);
router.get("/single-course/:id", getSingleCourse);
router.get("/get-courses", getAllCourse);
router.get("/user-course-content/:id", updateAccessToken,isUserAuthenticated, getCourseByUser);
router.post("/add-question", updateAccessToken,isUserAuthenticated, addQuestion);
router.post("/add-answer", updateAccessToken,isUserAuthenticated, addAnswer);
router.put("/add-review/:id", updateAccessToken,isUserAuthenticated, addReview);
router.put(
  "/add-reply/",
  updateAccessToken,
  isUserAuthenticated,
  authorization("admin"),
  addReplyToReview
);
router.get(
  "/get-all-courses",
  updateAccessToken,
  isUserAuthenticated,
  authorization("admin"),
  getAllCourses
);
router.delete(
  "/delete-course/:id",
  updateAccessToken,
  isUserAuthenticated,
  authorization("admin"),
  deleteCourse
);

router.post(
  "/get-video-otp",
  updateAccessToken,
  isUserAuthenticated,
  generateVideoUrl
)

export default router;

//
