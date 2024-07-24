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
    const {courseID, payment_info} = req.body as IOrder;

    /* The line `const user = await User.findById(req.user?._id);` 
    is querying the database to find a user based on the `_id` 
    property of the `req.user` object. */
    const user = await User.findById(req.user?._id);

    


})