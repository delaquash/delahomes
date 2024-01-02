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

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id !== req.params.id) {
    console.log("Unauthorized update attempt");
    return next(errorHandler(401, "You can only update your account..."));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          username: req.body.username,
          avatar: req.body.avatar,
          password: req.body.password,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found");
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser?._doc;
    res.status(200).json(rest);
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
  } catch (error) {
    next(error);    
  }
}

export { updateUser, deleteUser, getUserList, getUser };
