import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import mongoose from "mongoose";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/CourseModel";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { redis } from "../utils/redis";

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
        
        await redis.set(courseID, JSON.stringify(course));
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
      console.log(courseID, "this is course ID")
      const userCourseList = req.user?.courses; // Retrieve user's course list from req.user in auth.ts
      console.log(userCourseList, "this is user course list")
        // Check if the user has access to the course
      const isCourseExist = userCourseList?.find(
        (course: any) => course._id.toString() === courseID
      );
      console.log(isCourseExist,"This is course exist")
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