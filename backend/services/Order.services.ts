import { NextFunction } from "express";
import OrderModel from "../models/OrderModel";
import { CatchAsyncError } from "../middleware/CatchAsyncError";

export const createOrder = CatchAsyncError(async(data: any, next: NextFunction)=> {
    const order = await OrderModel.create(data);
    next(order)
})