import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import mongoose, { Mongoose } from "mongoose";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/CourseModel";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { redis } from "../utils/redis";
import { IOrder } from "../models/OrderModel"; 
import sendEmail from "../utils/SendMail";
import User from "../models/userModel";
// import ejs from "ejs";
// import path from "path";



export const createOrder = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
    try {
        const {courseID, payment_info} = req.body as IOrder;

    /* The line `const user = await User.findById(req.user?._id);` 
    is querying the database to find a user based on the `_id` 
    property of the `req.user` object. */
    const user = await User.findById(req.user?._id);

    if(!user) return next(new ErrorHandler("User not found", 404));

    const courseExistInUser = user?.courses.some((course: any)=>course._id.toString() === courseID);
    if(!courseExistInUser) return next(new ErrorHandler("Course not found", 404));
    
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})