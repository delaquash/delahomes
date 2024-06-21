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
  userId?: any;
}

interface Decoded {
  id: string;
  // iat: Date;
  // exp: Date;
}

export const jwtParse = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization;
  console.log("AuthHeader:", token); // Log the authorization header

  // const token = authHeader.split(" ")[1].trim();
  // console.log("Extracted Token:", token); // Log the extracted token

  if (!token) {
    console.error("Token is undefined");
    return res.status(403).json({ message: "Invalid token format" });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("Please provide secret key");
  }
console.log(token, "Before verification")
  const decodedAccesToken  = jwt.verify(
    token,
    process.env.JWT_SECRET) as Decoded
    
    // (err: any, decoded: any) => {
    //   if (err) {
    //     console.error("Token verification error:", err, token);
    //     return res.status(403).json({ message: "Invalid token" });
    //   }

    //   if (typeof decoded === "object" && decoded !== null) {
    //     req.userId = (decoded as { userId: string }).userId;
    //   }
      console.log(decodedAccesToken, "After verification")
      req.userId = {userId: decodedAccesToken.id}
      next();
    }
    // if (authHeader && authHeader.startsWith("Bearer")) {
    // //   try {
    //     const token = authHeader.split(' ')[1].trim();
    //     console.log('Extracted Token:', token); // Log the extracted token

    //     if (!token) {
    //       console.error('Token is undefined');
    //       return res.status(403).json({ message: 'Invalid token format' });
    //     }

    //     if (!process.env.JWT_SECRET) {
    //       throw new Error("Please provide secret key");
    //     }

    //     jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    //       if (err) {
    //         console.error('Token verification error:', err);
    //         return res.status(403).json({ message: 'Invalid token' });
    //       }

    //       if (typeof decoded === 'object' && decoded !== null) {
    //         req.userId = (decoded as { userId: string }).userId;
    //       }

    //       next();
    //     });
    //   } catch (err) {
    //     console.error('Error during token verification:', err);
    //     res.status(403).json({ message: 'Invalid token' });
    //   }
    // } else {
    //   res.status(401).json({ message: 'No token provided' });
    // }
  // );
// };


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
