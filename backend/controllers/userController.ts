import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import Listing from "../models/listModel";

// Extend the Express Request interface to include the user property
declare module "express" {
  interface Request {
    user?: any; // Replace 'any' with the actual type of your user object
  }
}

const createUser = async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if(existingUser){
      return res.status(200).send({msg: "User already exist.."})
    }
    const newUser = new User(req.body)
    await newUser.save()
    res.status(201).json(newUser.toObject()) 
   } catch (error) {
    console.error("Error in creating user:", error);
    next(error);
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {


  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId)

    if (!user) {
      console.log("User not found");
      return next(errorHandler(404, "User not found"));
    }

    user.name = name;
    user.country = country;
    user.city = city;
    user.addressLine1 = addressLine1; 

    await user.save()
    res.status(201).send(user)
  } catch (error) {
    console.error("Error in updateUser:", error);
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id !== req.params.id) {
    console.log("Unauthorized update attempt");
    return next(errorHandler(401, "You can only delete your account..."));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully...");
  } catch (error) {
    next(error);
  }
};

const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listing.."));
  }
};


const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "No user with that id exists"));
    }
    // Remove password from the response
    const {password: pass, ...rest} = user._doc;
    res.status(200).json(rest);
    // console.log(rest, user)
  } catch (error) {
    next(error);    
  }
}

export { updateUser, deleteUser, getUserList, getUser, createUser };
