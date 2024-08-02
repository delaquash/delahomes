import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import  ErrorHandler  from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/jwt";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { redis } from "../utils/redis";
import { createActivationToken } from "./userController";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/SendMail";

const isUserAuthenticated= CatchAsyncError(async(req:Request, res: Response, next:NextFunction)=> {
  const access_token = req.cookies.access_token;
  if(!access_token){
    return next(new ErrorHandler("Please login to access this resources", 400))
  }
})


interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const RegisterUser = CatchAsyncError(
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
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


// Activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = CatchAsyncError(async(req:  Request, res: Response, next:NextFunction)=> {
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


interface ISignInData {
  email: string;
  password: string;
}

const signin = CatchAsyncError( async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const { email, password } = req.body as ISignInData;
    if(!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }
    
    const validUser = await User.findOne({ email })./* In the provided code snippet, the `select`
    method is used in a Mongoose query to explicitly
    include or exclude certain fields from the query
    result. */
    select("+password");
    if (!validUser) return next(new ErrorHandler( "User not found...", 404,));

    const isComparePassword = await validUser.comparePassword(password);
    if (!isComparePassword) return next(new ErrorHandler("Password is incorrect...", 404,));
    
    sendToken(validUser, 200, res)
  } catch (error:any) {
    next(new ErrorHandler(error.message, 500));
  }
})


const signout = CatchAsyncError(async( req: Request, res: Response, next: NextFunction)=> {
      try {
        res.cookie("access_token", "", {maxAge: 1});
        res.cookie("refresh_token", "", {maxAge: 1});
        const userID = req.user?._id || "";
  
        redis.del(userID)
        res.status(200).json({
          success: true,
          message: "Logged out successfully" 
        });
      } catch (error:any) {
        return next(new ErrorHandler(error.message, 500)); 
      }
    })

    // / Extend the Express Request interface to include the user property
    declare module "express" {
      interface Request {
        user?: any; // Replace 'any' with the actual type of your user object
      }
    }

    // const google = async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const user = await User.findOne({ email: req.body.email });
    //     if (user) {
    //       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    //       // destructured password from the other attribute so we wont be seein password in DB
    //       const { password: pass, ...rest } = user._doc;
    //       res
    //         .cookie("access_token", token, { httpOnly: true })
    //         .status(200)
    //         .json(rest);
    //     } else {
    //       const generatedPassword =
    //         /* `Math.random().toString(36).slice(-8)` is generating a random string of 8 characters. */
    //         Math.random() /* The `toString(36)` method is converting a number to a string representation
    //         using base 36. In base 36, the digits range from 0 to 9 and then from A to Z.
    //         This method is commonly used to generate random alphanumeric strings. */
    //           .toString(
    //             36
    //           ) /* The `slice(-8)` method is used to extract the last 8 characters from a string.
    //         In the given code, it is used to generate a random alphanumeric string of
    //         length 8. The `Math.random().toString(36)` generates a random number between 0
    //         and 1 and converts it to a string representation using base 36. The `slice(-8)`
    //         then extracts the last 8 characters from this string, resulting in a random
    //         string of length 8. */
    //           .slice(-8) + Math.random().toString(36).slice(-8);
    //       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
    //       const newUserPassword = new User({
    //         /* The code `username: req.body.name.split(" ").join("").toLowerCase() +
    //         Math.random().toString(36).slice(-4)` is generating a unique username for the user based on
    //         their name. */
    //         username:
    //           req.body.name.split(" ").join("").toLowerCase() +
    //           Math.random().toString(36).slice(-4),
    //         email: req.body.email,
    //         password: hashedPassword,
    //         avatar: req.body.imageUrl,
    //       });
    //       await newUserPassword.save();
    //       const token = jwt.sign(
    //         { id: newUserPassword._id },
    //         process.env.JWT_SECRET
    //       );
    //       const { password: pass, ...rest } = newUserPassword._doc;
    //       res
    //         .cookie("access_token", token, { httpOnly: true })
    //         .status(200)
    //         .json(rest);
    //     }
    //   } catch (error) {
    //     next(error);
    //   }
    // };

    interface ISocialAuth {
      name: string;
      email: string;
      avatar: string;
    }
    
     const socialAuth = CatchAsyncError(async (req: Request, res:Response, next:NextFunction)=> {
        try {
          const { email, name, avatar } = req.body as ISocialAuth;
          const user = await User.findOne({ email });
          if (!user) {
            const newUser = await User.create({ email, name, avatar });
            sendToken(newUser, 200, res)
          }else {
            sendToken(user, 200, res)
          }
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 400))
        }
    })
    

export { signin,
    //  google,
    socialAuth,
      signout
     };


