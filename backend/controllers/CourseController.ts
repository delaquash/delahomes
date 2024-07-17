import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import mongoose from "mongoose";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/CourseModel";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/CatchAsyncError";

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
})
