import { NextFunction, Response } from "express";
import CourseModel from "../models/CourseModel";
import { CatchAsyncError } from "../middleware/CatchAsyncError";

export const createCourse = CatchAsyncError(async(data: any, res: Response)=> {
    const course = await CourseModel.create(data);
    res.status(201).json({
        status: 'success',
        course
    });
});

export const getAllCourseServices = async(res: Response) => {
    const courses = await CourseModel.find().sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      courses
    })
  }