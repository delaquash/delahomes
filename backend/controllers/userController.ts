require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { IUser } from "../types/ModelTypes/UserModel";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/SendMail";
import { redis } from "../utils/redis";
import { getAllUserServices, getUserByID, updateUserRoleServices } from "../services/user.service";
import cloudinary from "cloudinary";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { activationCode, user },
    process.env.ACTIVATION_TOKEN_SECRET as Secret,
    {
      expiresIn: "3h",
    }
  );
  return { token, activationCode };
};


<<<<<<< HEAD
// this is a middleware to update access token and not a route, reason for next()
=======

>>>>>>> origin/frontend
const updateAccessToken =CatchAsyncError(async(req: Request, res: Response, next:NextFunction)=>{
  try {
    const refresh_token = req.cookies.refresh_token as string;
    
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload
    
    if(!decoded){
      return next(new ErrorHandler("Invalid refresh token", 400))
    }
    const session = await redis.get(decoded.id as string)
    
    if(!session){
      return next(new ErrorHandler("Please log in to access this session", 400))
    }
      const user = JSON.parse(session)
      const accessToken = jwt.sign({id: user._id},process.env.ACCESS_TOKEN as string, {
        expiresIn: "2h",
      });
      const refreshToken = jwt.sign({ id: user._id}, process.env.REFRESH_TOKEN as string, {
        expiresIn: "5d",
      })

      req.user = user;

      res.cookie("access-token", accessToken, accessTokenOptions);
      res.cookie("refresh-token", refreshToken, refreshTokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800)
<<<<<<< HEAD
     return next()
=======
      res.status(200).json({
        success: "true",
        accessToken
      })
>>>>>>> origin/frontend
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500))
  }
})


 const getUserInfo = CatchAsyncError(async(req:Request, res: Response, next:NextFunction) => {
  try {
    const userID = req.user?._id;
    getUserByID(userID, res)
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400))
  }
})

interface IUpdateUserInfo {
  name: string;
  email: string;
}

const updateUserInfo = CatchAsyncError(async(req: Request, res:Response, next:NextFunction)=> {
  try {
    const { email, name } = req.body as IUpdateUserInfo;
    const userID = req.user._id;
    const user = await User.findById(userID)
    if(user && email) {
      const isEmailExist = await User.findOne({ email});
      if(isEmailExist  && isEmailExist._id.toString() !== userID) {

        return next(new ErrorHandler("Email already exist...", 400))
      }
      user.email = email;
    }
    if(name && user){
      user.name = name
    }

    await user?.save()

    await redis.set(userID, JSON.stringify(user));

    res.status(201).json({
      success: true,
      user
    })
  } catch (error: any) {
    console.error("Error updating user info:", error);
    return next(new ErrorHandler(error.message, 500))
  }
});

interface IPassword {
  oldPassword: string;
  newPassword: string;
}

const updatePassword = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const { newPassword, oldPassword } = req.body as IPassword;
    if(!newPassword || !oldPassword) {
      return next(new ErrorHandler("Please provide both old and new password", 400))
    }
    const userID = req.user._id;
    const user = await User.findById(userID).select("+password")
    if(!user || user?.password === undefined) {
      return next(new ErrorHandler("User not found", 404))
      }
      const isPasswordMatch = await user?.comparePassword(oldPassword)
      if(!isPasswordMatch) {
        return next(new ErrorHandler("Old password is incorrect", 400))
        }
        user.password = newPassword;
        await user?.save();
        await redis.set(req.user?._id, JSON.stringify(user));

        res.status(201).json({
          success: true,
          user
        })
  } catch (error: any) {
    console.log(error)
    return next(new ErrorHandler(error.message, 400))  
  }
})

interface IProfilePicture {
  avatar: string;
}

const updateProfilePicture = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const { avatar } = req.body;
    const userID = req.user._id;
    const user = await User.findById(userID);
    if(avatar && user) {
      // if user have one avatar then call this
      if(user?.avatar?.public_id) {
        //  first delete the old image
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url
        }
      } else {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url
        }
      }
    }
    await user?.save();
    await redis.set(userID, JSON.stringify(user));
    res.status(201).json({
      success: true,
      user
      })
  } catch (error: any) { 
    return next(new ErrorHandler(error.message, 400))  
  }
})

// get all users ---only for admin
 const getAllUsers = CatchAsyncError(async( req: Request, res: Response, next: NextFunction)=> {
  try {
    getAllUserServices(res)
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400))
  }
})

// update user --- only for admin
const updateUserByAdmin =  CatchAsyncError(async( req: Request, res: Response, next: NextFunction)=>{
  try {
<<<<<<< HEAD
    const { id, email, role } = req.body
    const isUserExist = await User.findOne({ email })
    if(isUserExist) {
      const id = isUserExist._id;
      updateUserRoleServices(res, id, role)
    } else {
      res.status(400).json({
        success: false,
        message: "User not found"
      })
    } 
=======
    const { id, role } = req.body
    updateUserRoleServices(res, id, role)
>>>>>>> origin/frontend
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400))
  }
})

 const deleteUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      // delete from MongoDB
<<<<<<< HEAD
      await User.findByIdAndDelete(id);
      // delete from redis
      await redis.del(id);
      // response
=======
      await User.deleteOne({ id });
      // delete from redis
      await redis.del(id);
>>>>>>> origin/frontend
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export {
  updateAccessToken,
  getUserInfo,
  updateUserInfo, 
  updatePassword,
  updateProfilePicture,
  getAllUsers,
  updateUserByAdmin,
  deleteUser
<<<<<<< HEAD
=======
//     getCurrentUser,
//     createCurrentUser,
//     updateUser,
//     getUser,
//     getUserList ED35D4D
>>>>>>> origin/frontend
};
