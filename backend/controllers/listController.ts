import { NextFunction, Request, Response } from "express";
import Listing from "../models/listModel";
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import { SortOrder } from "mongoose";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";


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



async function uploadImages(imageFiles: Express.Multer.File[]) {
  if (!imageFiles || !Array.isArray(imageFiles)) {
      throw new Error('No image files provided or invalid data format');
  }

  const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
