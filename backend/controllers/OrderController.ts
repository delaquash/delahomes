require("dotenv").config();

import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import CourseModel from "../models/CourseModel";
import NotificationModel from "../models/NotificationModel";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import sendEmail from "../utils/SendMail";
import User from "../models/userModel";
import { getAllOrderServices } from "../services/Order.services";
import ejs from "ejs";
import path from "path";
import { IOrder } from "../models/OrderModel";


export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {courseId, payment_info} = req.body as IOrder;

    const user = await User.findById(req.user?._id);

    const courseExistInUser = user?.courses.some((course:any)=> course._id.toString() === courseId);

    if(courseExistInUser){
        return next(new ErrorHandler("You have already purchased this course", 400));
    }

    const course = await CourseModel.findById(courseId);

    if(!course){
        return next(new ErrorHandler("Course not found", 400));
    }

    const data:any = {
        courseId:course._id,
        userId:req.user?._id,
        payment_info
    }

    const mailData = {
        order:{
            _id:course._id.toString().slice(0,6),
            name:course.name,
            price:course.price,
            date:new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})
        }
    }       

    const html = ejs.renderFile(path.join(__dirname,"../mail/order-confirmation.ejs"), {order:mailData});

    try{
        if(user){
            await sendEmail({
                email:user.email,
                subject:"Order Confirmation",
                template:"order-confirmation.ejs",
                data:mailData
            })
        }
        
    }catch(error:any){
        return next(new ErrorHandler(error.message, 400));
    }

    user?.courses.push(course?._id);

    await user?.save();

   await NotificationModel.create({
        user:user?._id,
        title:"New Order",
        message:`You have a new order from ${course?.name}`
    });

    if (typeof course.purchased !== 'number') {
        course.purchased = parseInt(course.purchased || '0');
    }

    course.purchased += 1;

    await course.save();

    createOrder(data,res,next);

}catch(error:any){
    return next(new ErrorHandler(error.message, 400));
}
})


// get all users ---only for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrderServices(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);



