import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import mongoose, { Mongoose } from "mongoose";
import { createCourse, getAllCourseServices } from "../services/course.service";
import CourseModel from "../models/CourseModel";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { redis } from "../utils/redis";
import sendEmail from "../utils/SendMail";
import ejs from "ejs";
import path from "path";
import NotificationModel from "../models/NotificationModel";


// To upload a course
export const uploadCourse = CatchAsyncError(async(req: Request, res:Response, next:NextFunction)=> {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if(thumbnail){
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
                });
                data.thumbnail = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
        }   
        createCourse( data, res,next)
    } catch (error: any) {
        return next (new ErrorHandler(error.message, 500))
        
    }
});

// Edit Course
export const editCourse = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if(thumbnail){
             await cloudinary.v2.uploader.destroy(thumbnail.public_id)
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
                });
                data.thumbnail = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }
        const courseID = req.params.id;
        const course = await CourseModel.findByIdAndUpdate(courseID, {
            $set: data,
            }, 
            {
                new: true,
            },
        )
        res.status(200).json({
            success: true,
            course
            })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});

// Get single course without purchasing
// redis was added to cache the request
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseID = req.params.id;
      const isCachedExist = await redis.get(courseID);

      if (isCachedExist) {
        const course = JSON.parse(isCachedExist);
        
        res.status(200).json(course);
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        
        await redis.set(courseID, JSON.stringify(course), "EX", 604800);
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all courses
export const getAllCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCachedExist = await redis.get("allCourses");

      if (isCachedExist) {
        const courses = JSON.parse(isCachedExist);
        
        res.status(200).json({
          success: true,
          courses
        });
      } else {
        const course = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        
        await redis.set("allCourses", JSON.stringify(course));
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

// get course content --- only for valid user
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseID = req.params.id; // Extract course ID from request parameters
      
      const userCourseList = req.user?.courses; // Retrieve user's course list from req.user in auth.ts
      
        // Check if the user has access to the course
      const isCourseExist = userCourseList?.find(
        (course: any) => course._id.toString() === courseID
      );
      // If the course is not in the user's course list, return an error
      if(!isCourseExist){
        return next(new ErrorHandler("You are not eligible to access this course", 404));
      };
      // Find and return the course details
      const course = await CourseModel.findById(courseID);
      const content = course?.courseData;
      res.status(200).json({
        success: true,
        content
        });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);


// add questions in a course
interface IQuestionData {
  question: string;
  courseID: string;
  contentID: string
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { contentID, courseID, question } = req.body as IQuestionData;
      const course = await CourseModel.findById(courseID);

      if (!mongoose.Types.ObjectId.isValid(contentID)) {
        return next(new ErrorHandler("Invalid content ID", 404));
      }
      // This array method below are the same
      const courseContent = course?.courseData.find((item: any)=> item._id.equals(contentID))
      // const courseContent = course?.courseData.find(
      //   (course: any) => course._id === courseID
      // );
      if(!courseContent){
        return next(new ErrorHandler("Invalid content ID", 400));
      };

      // create a new question object
      const newQuestion: any = {
        question,
        user:req.user,
        questionReplies: []
      }

      // add this question to our course content
      courseContent?.questions.push(newQuestion);

      await NotificationModel.create({
        userID:req.user?._id,
        title: "New Question Received",
        message: `You have a new order for ${courseContent.title} course`,
      });

      // save the course
      await course?.save();
      
      // Response
      res.status(200).json({
        success: true,
        course
        });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);


interface IAnswer {
  answer: string;
  questionID: string;
  courseID: string;
  contentID: string;
}

export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, contentID, courseID, questionID } = req.body as IAnswer;

      const course = await CourseModel.findById(courseID);

      /* This code snippet is checking if the `contentID` provided in the request body is a valid MongoDB
    ObjectId. In MongoDB, each document has a unique identifier called ObjectId. */
      if (!mongoose.Types.ObjectId.isValid(contentID)) {
        return next(new ErrorHandler("Invalid content ID", 404));
      }
      // This array method below are the same
      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentID)
      );
      // const courseContent = course?.courseData.find(
      //   (course: any) => course._id === courseID
      // );
      if (!courseContent) {
        return next(new ErrorHandler("Invalid content ID", 400));
      }

      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionID)
      );

      if (!question) {
        return next(new ErrorHandler("Invalid question ID", 400));
      }
      // create a new answer object
      const newAnswer: any = {
        user: req.user,
        answer,
      };
      // add answer to the course content
      question.questionReplies?.push(newAnswer);

      // save the question
      await course?.save();

      if (req.user?._id === question.user._id) {
        // create a notification'
        await NotificationModel.create({
          userID:req.user?._id,
          title: "New Answer Received",
          message: `You have a new order for ${courseContent.title} course`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mail/question-replies.ejs"),
          data
        );

        try {
          await sendEmail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-replies.ejs",
            data,
          });
        } catch (error: any) {
          next(new ErrorHandler(error.message, 500));
        }
      }
      // Response
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);


interface IReviewData {
  review: string;
  rating: number;
  userID: string;
}

export const addReview = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const {review, rating} = req.body as IReviewData;
    if(!review && !rating){
      return next(new ErrorHandler("Please add a review and rating", 400));
    }
    const userCourseList = req.user?.courses;
    const courseId = req.params.id;

    // check if courses exist
    const courseExist = userCourseList.some((course:any)=> course._id.toString() === courseId.toString());
    if (!courseExist) {
      return next(new ErrorHandler("Course does not exist", 404));
      }

      const courses = await CourseModel.findById(courseId);
      if (!courses) {
        return next(new ErrorHandler("Course does not exist", 404));
        }

      const reviewData: any = {
        user: req.user,
        comment: review,
        rating
      }

    courses?.reviews?.push(reviewData);
    
    // ratings
    /* The code snippet you provided is calculating the average rating for a course based on the
    ratings given in the reviews. Here's a breakdown of what the code is doing: */
    let avg = 0;

    courses?.reviews.forEach((rev: any)=> {
      avg += rev.rating;
    })

    if(courses){
      courses.ratings = avg / courses.reviews.length;
    }
    
    await courses?.save();

    const notifications = {
      title: "New Review Received",
      message: `${req.user?.name} has given a review in ${courses?.name}`
    }

    // create notification
    
    res.status(200).json({
      success: true,
      courses
    });

  } catch (error: any) {
    next(new ErrorHandler(error.message, 500));
  }
})

interface IAddReviewDAta {
  comment: string;
  courseID: string;
  reviewID: string
}

export const addReplyToReview = CatchAsyncError(async(req: Request, res:Response, next:NextFunction)=> {
  try {
    const {comment, courseID, reviewID } = req.body as IAddReviewDAta
    const course = await CourseModel.findById(courseID);
    if(!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const review = course?.reviews.find((rev: any)=> rev._id.toString() === reviewID);
    if(!review) {
      return next(new ErrorHandler("Review not found", 404));
      }

    const reviewData: any = {
      user: req.user,
      comment,
    }

    if(!review.commentReplies){
      review.commentReplies = [];
    }
    // course?.reviews.push(reviewData);
    review?.commentReplies?.push(reviewData);

    await course?.save()

    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      course
    })
  } catch (error: any) {
    next(new ErrorHandler(error.message, 500));
  }
})

// get all users ---only for admin
export const getAllCourses = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
  try {
    getAllCourseServices(res)
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400))
  }
})

// delete course
export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await CourseModel.findById(id);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      // delete from MongoDB
      await course.deleteOne({ id });
      // delete from redis
      await redis.del(id);
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);