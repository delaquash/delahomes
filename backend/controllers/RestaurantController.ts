import { NextFunction, Request, Response } from "express";
// import Listing from "../models/listModel";
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";

 declare module "express" {
    interface Request {
      userId?: any; // Replace 'any' with the actual type of your user object
    }
  }


// export const createRestaurant = async(req: Request, res: Response, next: NextFunction) => {
//     try {
//       const existingUser = await Restaurant.findOne({ user: req.userId });
//       if(existingUser){
//         return next(errorHandler(409, "User restaurant already exist..."))
//       }
//       // const imageUrl = await uploadImage(req.file as Express.Multer.File);

//       // const restaurant = new Restaurant(req.body);
//       // restaurant.imageUrl = uploadeResponse.url;
//       // restaurant.user = new mongoose.Types.ObjectId(req.userId);
//       // restaurant.lastUpdated = new Date();

//       const image = req.file as Express.Multer.File;
//       if (!image) {
//         return res.status(400).json({ message: "Image file is required" });
//       }
//       const base64Image = Buffer.from(image.buffer).toString("base64");
//       const dataURI = `data:${image.mimetype};base64,${base64Image}`;
//       const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
//       const restaurant = new Restaurant(req.body);
//       restaurant.imageUrl = uploadResponse.url;
//       restaurant.user = new mongoose.Types.ObjectId(req.userId);
//       restaurant.lastUpdated = new Date();
//       await restaurant.save();
//       res.status(201).send(restaurant);
//         } catch (error: any) {
//           console.log(error);
//           if (error.name === 'TimeoutError') {
//             res.status(499).json({ message: 'Request Timeout' });
//           } else {
//             res.status(500).json({ message: "Something went wrong" });
//           }
//     }
// }




  // const uploadImage = async (file: Express.Multer.File) => {
  //   const image = file;
  //   const base64Image = Buffer.from(image.buffer).toString("base64");
  //   const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
  //   const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  //   return uploadResponse.url;
  // };
