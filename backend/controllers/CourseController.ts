import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import mongoose from "mongoose";
import CourseModel from "../models/CourseModel";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/CatchAsyncError";

// To upload a course
export const uploadCourse = CatchAsyncError(async(req: Request, res:Response, next:NextFunction))=> {
    try {
        
    } catch (error: any) {
        return next (new ErrorHandler(error.message, 500))
        
    }
}
