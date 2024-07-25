import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import mongoose, { Mongoose } from "mongoose";
import CourseModel from "../models/CourseModel";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { redis } from "../utils/redis";
import { IOrder } from "../models/OrderModel"; 
import sendEmail from "../utils/SendMail";
import User from "../models/userModel";
import ejs from "ejs";
import path from "path";



export const createOrder = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
    try {
        const {courseID, payment_info} = req.body as IOrder;

    /* The line `const user = await User.findById(req.user?._id);` 
    is querying the database to find a user based on the `_id` 
    property of the `req.user` object. */
    const user = await User.findById(req.user?._id);

    if(!user) return next(new ErrorHandler("User not found", 404));

    /* The line `const courseExistInUser = user?.courses.some((course: any)=>course._id.toString() ===
    courseID);` is checking if a course with a specific `courseID` exists in the `courses` array of
    the `user` object. */
    const courseExistInUser = user?.courses.some((course: any)=>course._id.toString() === courseID);
    if(!courseExistInUser) return next(new ErrorHandler("Course not found", 404));

    const course = await CourseModel.findById(courseID);
    if(!course) return next(new ErrorHandler("Course not found", 404));

    const data: any = {
        userID: user?._id,
        courseID: course._id
    }

    createOrder(data, res, next)

    const mailData = {
        order: {
            name: course.name,
            price: course.price,
            _id: course._id.splice(0, 6),
            date: new Date().toLocaleDateString("en-US",{
                day: "numeric",
                month: "long",
                year: "numeric"
            })
        }
    }

    const html = await ejs.renderFile(
        path.join(__dirname, "../mail/order-confirmation.ejs"),
        mailData
    )
    
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})