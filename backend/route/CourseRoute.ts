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
} from "../controllers/CourseController";
import { validateMyCourseRequest } from "../middleware/validation";
import { isUserAuthenticated, authorization } from "../middleware/auth";


const router = express.Router();
router.post(
  "/create-course",
  isUserAuthenticated,
  authorization("admin"),
  uploadCourse
);
router.put(
  "/edit-course/:id",
  isUserAuthenticated,
  authorization("admin"),
  editCourse
);
router.get("/single-course/:id", getSingleCourse);
router.get("/get-courses", getAllCourse);
router.get("/user-course-content/:id", isUserAuthenticated, getCourseByUser);
router.post("/add-question", isUserAuthenticated, addQuestion);
router.post("/add-answer", isUserAuthenticated, addAnswer);
router.put("/add-review/:id", isUserAuthenticated, addReview);
router.put(
  "/add-reply/",
  isUserAuthenticated,
  authorization("admin"),
  addReplyToReview
);
router.get(
  "/get-all-courses",
  isUserAuthenticated,
  authorization("admin"),
  getAllCourses
);
router.delete(
  "/delete-course/:id",
  isUserAuthenticated,
  authorization("admin"),
  deleteCourse
);
export default router;

//
