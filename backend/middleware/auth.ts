import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt, { GetPublicKeyOrSecret, Jwt, Secret } from "jsonwebtoken";
import { errorHandler } from '../utils/errorHandler';
import User from '../models/userModel';

// Extend the Express Request interface to include the user property
// declare module "express" {
//   interface Request {
//     userId?: string // Replace 'any' with the actual type of your user object
//   }
// }

interface CustomRequest extends Request {
  userId?: string;
}

export const jwtParse = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader, "Authheader token")

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(' ')[1];
      console.log(token)
      if (!process.env.JWT_SECRET) {
        throw new Error("Please provide secret key");
      }
      jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
        console.error(token, "This is token generated with no error message for invalid token")
        if (err) {
          console.error('Token verification error:', err);
          return res.status(403).json({ message: 'Invalid token...' });
        }
        
        if (typeof decoded === 'object' && decoded !== null) {
          req.userId = (decoded as { userId: string }).userId;
        }
        next();
      });
    } catch (err) {
      res.status(403).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

  export const admin = (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure user is logged in and has data
      if (!req.user || !req.user.isAdmin) {
        throw new Error("Not authorized as an admin");
      }
      console.log(req)
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized: Admin access required" });
    }
  };
