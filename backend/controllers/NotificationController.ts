import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import mongoose, { Mongoose } from "mongoose";
import CourseModel from "../models/CourseModel";
import NotificationModel from "../models/NotificationModel";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { redis } from "../utils/redis";
import { IOrder } from "../models/OrderModel"; 



export const getNotifications = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationModel.find().sort({ createdAt: -1 });
        res.status(200).json({ 
            success: true, 
            notification 
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
});

export const updateNotification = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
    try {
        const notification = await NotificationModel.findById(req.params.id)
        if(!notification){
            return next(new ErrorHandler('Notification not found', 404))
        } else {
            notification.status ? notification.status = "read" : notification.status
        }

        await notification.save();

        const notifications = await NotificationModel.find().sort({ createdAt: -1 })
        res.status(200).json({ 
            success: true, 
            notifications 
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
})