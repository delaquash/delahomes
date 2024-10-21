<<<<<<< HEAD
require("dotenv").config();

=======
>>>>>>> origin/frontend
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
<<<<<<< HEAD
import { IOrder } from "../models/OrderModel";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {courseId, payment_info} = req.body as IOrder;

    // Validate Payment Info
    if(payment_info) {
        if("id" in payment_info) {
            const paymentIntentId = payment_info.id;
            const paymentIntent = await stripe.paymentIntents.retrieve(
                paymentIntentId
            )

            if(paymentIntent.status !== "succeeded") {
                return next(new ErrorHandler("Payment not authorized!", 400));
            
            }
        }
    }

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
=======
import { redis } from "../utils/redis";


export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body;

      /* The line `const user = await User.findById(req.user?._id);` 
    is querying the database to find a user based on the `_id` 
    property of the `req.user` object. */
      const user = await User.findById(req.user?._id);
    //   console.log(user, "this is user ID")

      // if (!user) return next(new ErrorHandler("User not found", 404));

      /* The line `const courseExistInUser = user?.courses.some((course: any)=>course._id.toString() ===
    courseID);` is checking if a course with a specific `courseID` exists in the `courses` array of
    the `user` object. */
      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );
      // console.log(courseExistInUser, "this is existing user")
      if (courseExistInUser)
        return next(new ErrorHandler("You have already purchased this course", 400));

      const course = await CourseModel.findById(courseId);
      if (!course) return next(new ErrorHandler("Course not found", 404));


      const data: any = {
        userId: user?._id,
        courseId: course._id,
        payment_info
      };

      const mailData = {
        order: {
          name: course.name,
          price: course.price,
          _id: course._id.toString().slice(0, 6),
          date: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mail/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendEmail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(course?._id)

      await user?.save()

      await NotificationModel.create({
        userID: user?._id,
        title: "New Order",
        message: `You have a new order for ${course.name} course`,
      });

      course.purchased ? course.purchased +=1 : course.purchased;

      await course.save();

      createOrder(data, res, next)
     
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
>>>>>>> origin/frontend


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



