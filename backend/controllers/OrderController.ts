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


export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
    //   if (typeof req.body === 'string') {
    //     req.body = JSON.parse(req.body);
    //   }
    //   console.log(req.body, "This is before destructuring")
    //   // const { courseId, payment_info } = req.body;
    //   const courseId = req.body["courseId"];
    //   const payment_info = req.body["payment_info"];
    //  console.log(req.body.courseId, "this is after destructuring")
    //  if (!courseId || typeof courseId !== 'string') {
    //   return next(new ErrorHandler("Missing or invalid courseId", 400));
    // }

    if (typeof req.body === 'string') {
      req.body = JSON.parse(req.body);  // Parse body if it's a string
    }
    
    // Clone the request body for debugging purposes
    const clonedBody = JSON.parse(JSON.stringify(req.body));
    console.log(clonedBody, "This is a cloned body snapshot");
    
    console.log(req.body, "This is before destructuring");
    
    // Accessing courseId and payment_info manually
    const courseId = req.body["courseId"];
    const payment_info = req.body["payment_info"]; // payment_info can be undefined
    
    // Log both courseId and payment_info after assignment
    console.log(courseId, "This is the extracted courseId");
    console.log(payment_info, "This is the extracted payment_info");
    
    // Check if courseId is missing or invalid
    if (!courseId || typeof courseId !== 'string') {
      return next(new ErrorHandler("Missing or invalid courseId", 400));
    }
    
    // Payment_info is optional; only validate if it exists
    if (payment_info !== undefined && typeof payment_info !== 'object') {
      console.log("Invalid payment_info");
      return next(new ErrorHandler("Invalid payment information", 400));
    }
    

      /* The line `const user = await User.findById(req.user?._id);` 
    is querying the database to find a user based on the `_id` 
    property of the `req.user` object. */
      const user = await User.findById(req.user?._id);
      // console.log(user, "this is user ID")

      // if (!user) return next(new ErrorHandler("User not found", 404));

      /* The line `const courseExistInUser = user?.courses.some((course: any)=>course._id.toString() ===
    courseID);` is checking if a course with a specific `courseID` exists in the `courses` array of
    the `user` object. */
      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );
      // console.log(courseExistInUser, "this is existing user")
      if (courseExistInUser){
        return next(new ErrorHandler("You have already purchased this course", 400));
      }
        

      const course = await CourseModel.findById(courseId);
      // console.log(course, "this is course ID")
      if (!course) return next(new ErrorHandler("Course not found", 404));


      const data: any = {
        userId: user?._id,
        courseId: course._id,
        payment_info : payment_info !== undefined ? payment_info : null
      };
      // console.log(data, "this is data")

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
        userId: user?._id,
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



