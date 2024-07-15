require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Restaurant from "../models/restaurant";
import { IUser } from "../types/ModelTypes/UserModel";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/SendMail";
import { redis } from "../utils/redis";
import { getUserByID } from "../services/user.service";
import cloudinary from "cloudinary";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";

// Extend the Express Request interface to include the user property
// declare module "express" {
//   interface Request {
//     user?: any; // Replace 'any' with the actual type of your user object
//   }
// }

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

const RegisterUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }
      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      
      const html = await ejs.renderFile(
        path.join(__dirname, "../mail/activation-mail.ejs"),data
      );
      console.log("This is html")
      try {
        await sendEmail({
          email: user.email,
          subject: "Account Activation",
          template: "activation-mail.ejs",
          data
        });
        console.log(user.email)
        res.status(201).json({
          success: true,
          message:
            `User created successfully! Please check your mail: ${user.email} to activate`,
          activationToken: activationToken.token,
        });
      } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

const createActivationToken = (user: any): IActivationToken => {
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


// Activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}


const activateUser = CatchAsyncError(async(req:  Request, res: Response, next:NextFunction)=> {
  try {
    const {activation_code, activation_token} = req.body as IActivationRequest;

    const newUser: {user: IUser; activationCode: string} =jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET as string
    ) as {user: IUser; activationCode:string}

    if(newUser.activationCode !== activation_code){
        return next(new ErrorHandler("Invalid activation Code", 400))
    }

    const {name, email, password} = newUser.user;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
      }
    const user = await User.create({
      name,
      email,
      password,
      });
      res.status(201).json({
        success: true,
        msg: "User created successfully",
        user,
      })
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
})

const updateAccessToken =CatchAsyncError(async(req: Request, res: Response, next:NextFunction)=>{
  try {
    const refresh_token = req.cookies.refresh_token as string;
    
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload
    
    if(!decoded){
      return next(new ErrorHandler("Invalid refresh token", 400))
    }
    const session = await redis.get(decoded.id as string)
    
    if(!session){
      return next(new ErrorHandler("Invalid refresh token", 400))
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
      res.status(200).json({
        success: "true",
        accessToken
      })
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
      if(isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400))
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
    return next(new ErrorHandler(error.message, 400))
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
        await user?.save()
        await redis.set(req.user?._id, JSON.stringify(user));

        res.status(201).json({
          success: true,
          user
        })
  } catch (error: any) {
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


// const createCurrentUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { name, email, password, address, city, country } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       res.status(400);
//       throw new Error("User already exists");
//     }

//     const newUser = new User({
//       name,
//       email,
//       address,
//       city,
//       country
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json({ message: "User saved successfully."});
//   } catch (error) {
//     next(error);
//   }
// };

// const updateUser = async (req: Request, res: Response, next: NextFunction) => {

//   try {
//       // Extract userId from request parameters (assuming route pattern)
//       const userId = req.params.userId;

//     const { name, address, city, country } = req.body;
//     const user = await User.findById(userId)

//     if (!user) {
//       console.log("User not found");
//       return next(errorHandler(404, "User not found"));
//     }

//     user.name = name;
//     user.country = country;
//     user.city = city;
//     user.address = address;
// ``
//     await user.save()
//     res.status(201).send(user)
//   } catch (error) {
//     console.error("Error in updateUser:", error);
//     next(error);
//   }
// };

// const getUserList = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const listing = await Restaurant.find({ userRef: req.params.id });
//         res.status(200).json(listing);
//       } catch (error) {
//         next(error);
//       }
// };

// const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const currentUser = await User.findOne({ _id: req.params.userId })
//     if(!currentUser){
//       return next(errorHandler(404, "User not found"));
//     }
//     res.status(200).json(currentUser)
//   } catch (error) {
//    next(error);

//   }
// }

// const getUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return next(errorHandler(404, "No user with that id exists"));
//     }
//     // Remove password from the response
//     const {password: pass, ...rest} = user._doc;
//     res.status(200).json(rest);
//     // console.log(rest, user)
//   } catch (error) {
//     next(error);
//   }
// }

export {
  RegisterUser,
  activateUser,
  updateAccessToken,
  getUserInfo,
  updateUserInfo, 
  updatePassword,
  updateProfilePicture
//     getCurrentUser,
//     createCurrentUser,
//     updateUser,
//     getUser,
//     getUserList
};
