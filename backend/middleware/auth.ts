import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import  ErrorHandler  from '../utils/errorHandler';
import { CatchAsyncError } from './CatchAsyncError';
import { redis } from '../utils/redis';
import { IUser } from '../types/ModelTypes/UserModel';
import { updateAccessToken } from '../controllers/userController';


export const isUserAuthenticated= CatchAsyncError(async(req:Request, res: Response, next:NextFunction)=> {
  const access_token = req.cookies.access_token;
  if(!access_token){
    return next(new ErrorHandler("Please login to access this resources", 400))
  }
  const decoded = jwt.decode(access_token) as JwtPayload
  if(!decoded) {
    return next(new ErrorHandler("access token not valid", 400))
  }

  // check if the access token is expired
  if(decoded.exp && decoded.exp <= Date.now() / 1000) {
    try {
      await updateAccessToken(req, res, next)
    } catch (error) {
      return next(error)
    }
  } else {
    const user = await redis.get(decoded.id);
    // console.log(user, "this user is from redis")
    if(!user) {
      return next(new ErrorHandler("User not found! Please sign up to access this resources", 400))
    }
    req.user = JSON.parse(user);
    next();
  }
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

