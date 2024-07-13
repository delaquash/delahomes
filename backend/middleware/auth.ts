import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import  ErrorHandler  from '../utils/errorHandler';
import { CatchAsyncError } from './CatchAsyncError';
import { redis } from '../utils/redis';
import { IUser } from '../types/ModelTypes/UserModel';

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
      interface Request {
          user?: IUser;
      }
  }
}


export const isUserAuthenticated= CatchAsyncError(async(req:Request, res: Response, next:NextFunction)=> {
  const access_token = req.cookies.access_token;
  console.log(access_token, "this is access token");
  if(!access_token){
    return next(new ErrorHandler("Please login to access this resources", 400))
  }
  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload
  console.log(decoded, "this is decoded token")
  if(!decoded) {
    return next(new ErrorHandler("access token not valid", 400))
  }
  const user = await redis.get(decoded.id);
  console.log(user, "this user is from redis")
  if(!user) {
    return next(new ErrorHandler("User not found", 400))
  }
  req.user = JSON.parse(user);
  next();
})


export const authorization = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `This ${req.user?.role} is not authorized to perform this operation`,
          403
        )
      );
    }
    next();
  };
};

