import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt, { GetPublicKeyOrSecret, Jwt, Secret } from "jsonwebtoken";
import { errorHandler } from '../utils/errorHandler';
import User from '../models/userModel';

// Extend the Express Request interface to include the user property
declare module "express" {
  interface Request {
    user?: any; // Replace 'any' with the actual type of your user object
  }
}


export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(authHeader && authHeader?.startsWith("Bearer ")) {
       try {
             // Split the 'Bearer' prefix and the token
          const token = authHeader.split(' ')[1];
            if(!process.env.JWT_SECRET) {
              throw new Error("Please provide secret key");
            }
            // Verify the token using jwt.verify method
            jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
              // if (err) {
              //   // If there is an error during verification, respond with 403 (Forbidden)
              //   return res.status(403).json({ message: 'Invalid token....' });
              // }
              // Attach the user object (decoded payload) to the request object
              req.user = user;
        
              // Proceed to the next middleware or route handler
              next();
            })
          }
         catch (err) {
          // If there is an error during verification, respond with 403 (Forbidden)
          res.status(403).json({ message: 'Invalid token' });
        }
      } 
  }

  export const admin = (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure user is logged in and has data
      if (!req.user || !req.user.isAdmin) {
        throw new Error("Not authorized as an admin");
      }
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized: Admin access required" });
    }
  };
