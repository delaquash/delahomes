import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import User from "../models/userModel";
import { generateLast12MonthsData } from "../utils/analytics.generator";

export const generateUserAnalytics = CatchAsyncError(async(req: Request, res: Response, next:NextFunction)=> {
    try {
        const user = generateLast12MonthsData(User)
        res.status(200).json({
            success: true,
            user
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
})