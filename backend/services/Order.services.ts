<<<<<<< HEAD
require("dotenv").config();
import { NextFunction, Response } from "express";
import OrderModel from "../models/OrderModel";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";

export const createOrder = CatchAsyncError(async(data: any,res: Response, next: NextFunction)=> {
  const order = await OrderModel.create(data)
    
    res.status(201).json({
        success: true,
        order,
    })
});
=======
import { NextFunction, Response } from "express";
import OrderModel from "../models/OrderModel";
import { CatchAsyncError } from "../middleware/CatchAsyncError";

export const createOrder = CatchAsyncError(async(data: any,res: Response)=> {
    const order = await OrderModel.create(data);
    res.status(201).json({
        success: true,
        order
      })
})
>>>>>>> origin/frontend

// get all users ---only for admin

export const getAllOrderServices = async(res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    orders
  })
}