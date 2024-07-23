import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import mongoose, { Mongoose } from "mongoose";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/CourseModel";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { redis } from "../utils/redis";
import sendEmail from "../utils/SendMail";
// import ejs from "ejs";
// import path from "path";

export interface IOrder {
    
}
