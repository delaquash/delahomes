import { NextFunction, Response } from "express";
import OrderModel from "../models/OrderModel";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";

export const createOrder = CatchAsyncError(async(data: any,res: Response, next: NextFunction)=> {
  try {
    const order = await OrderModel.create(data);
    res.status(200).json({
        success: true,
        order,
    });

} catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
}
});

// get all users ---only for admin

export const getAllOrderServices = async(res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    orders
  })
}