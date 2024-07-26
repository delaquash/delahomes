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