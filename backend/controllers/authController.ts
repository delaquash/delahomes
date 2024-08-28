import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import ErrorHandler from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/jwt";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { redis } from "../utils/redis";
import { createActivationToken } from "./userController";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/SendMail";
import { IUser } from "../types/ModelTypes/UserModel";



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
        path.join(__dirname, "../mail/activation-mail.ejs"),
        data
      );
      console.log("This is html");
      try {
        await sendEmail({
          email: user.email,
          subject: "Account Activation",
          template: "activation-mail.ejs",
          data,
        });
        console.log(user.email);
        res.status(201).json({
          success: true,
          message: `User created successfully! Please check your mail: ${user.email} to activate`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
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

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_code, activation_token } =
        req.body as IActivationRequest;

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation Code", 400));
      }

      const { name, email, password } = newUser.user;
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
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface ISignInData {
  email: string;
  password: string;
}

const signin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ISignInData;
      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      /* In the provided code snippet, the `select`
    method is used in a Mongoose query to explicitly
    include or exclude certain fields from the query
    result. */
      const validUser = await User.findOne({ email }).select("+password");
      if (!validUser) return next(new ErrorHandler("User not found...", 404));

      const isComparePassword = await validUser.comparePassword(password);
      if (!isComparePassword)
        return next(new ErrorHandler("Password is incorrect...", 400));

      sendToken(validUser, 200, res);
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

const signout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userID = req.user?._id || "";

      redis.del(userID);
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// / Extend the Express Request interface to include the user property
declare module "express" {
  interface Request {
    user?: any; // Replace 'any' with the actual type of your user object
  }
}

interface ISocialAuth {
  name: string;
  email: string;
  avatar: string;
}

const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuth;
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = await User.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export { signin, socialAuth, signout };
