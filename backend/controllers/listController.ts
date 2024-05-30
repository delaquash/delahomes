import { NextFunction, Request, Response } from "express";
import Listing from "../models/listModel";
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import { SortOrder } from "mongoose";
import Restaurant from "../models/restaurant";


 declare module "express" {
    interface Request {
      userId?: any; // Replace 'any' with the actual type of your user object
    }
  }


export const createRestaurant = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const existingUser = await Restaurant.find({ user: req.userId });
      if(existingUser){
        return next(errorHandler(409, "User restaurant already exist..."))
      }
      
    } catch (error) {
      next(errorHandler(500, "Server error..."))
    }
}