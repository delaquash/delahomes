import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// import { errorHandler } from "./errorHandler";

// Extend the Express Request interface to include the user property
declare module "express" {
  interface Request {
    user?: any; // Replace 'any' with the actual type of your user object
  }
}

// export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
//   const tokenFromBody = req.body.access_token;
//   // Check if token is in cookies
//   const tokenFromCookie = req.cookies.access_token;
//   const token = tokenFromCookie;
//   if (!token) return next(errorHandler(401, "User not authenticated."));
//   if (!process.env.JWT_SECRET) {
//     throw new Error("Secret key is not defined");
//   }
//   jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
//     // console.log(process.env.JWT_SECRET);
//     if (err) return next(errorHandler(403, "Forbidden"));
//     req.user = user;
//     next();
//   });
// };
