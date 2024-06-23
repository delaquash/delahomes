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

// interface CustomRequest extends Request {
//   userId?: any;
// }

// interface Decoded {
//   id: string;
//   // iat: Date;
//   // exp: Date;
// }

// export const jwtParse = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader:any = req.headers.authorization;
// console.log(authHeader, "This is authheader token")

//     /* The `if (authHeader && authHeader.startsWith("Bearer "))` condition is checking if the
//     `authHeader` exists and if it starts with the string "Bearer ". This is a common pattern used to
//     validate and extract JWT (JSON Web Token) from the Authorization header in HTTP requests. */
//     if (authHeader && authHeader.startsWith("Bearer ")) {
//       // try {
//         const token = authHeader.split(' ')[1]
//          // Log the extracted token
//          console.log('Extracted Token:', token);
//         if (!token) {
//           console.error('Token is undefined');
//           return res.status(403).json({ message: 'Invalid token format' });
//         }

//         jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
//           if (err) {
//             console.error('Token verification error:', err);
//             return res.status(403).json({ message: 'Invalid token' });
//           }

//           if (typeof decoded === 'object' && decoded !== null) {
//             req.userId = (decoded as { userId: string }).userId;
//           }

//           next();
//         });
//       // } catch (err) {
//       //   console.error('Error during token verification:', err);
//       //   res.status(403).json({ message: 'Invalid token' });
//       // }
//     } else {
//       res.status(401).json({ message: 'No token provided' });
//     }
// };


// export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
//   // Check if the request headers contains the authorization key
//   const authHeader: any = req.headers.authorization;
//   console.log(authHeader, "This is authHeader")
//   const token = authHeader.split(" ")[1];
//   console.log(token, "This is auth token")
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET as string);
//     console.log(decoded)
//     if (typeof decoded === "object" && decoded !== null) {
//       req.userId = (decoded as { userId: string }).userId;
//     }
//     next();
//   } catch (err) {
//     console.error(err)
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };


export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization, "This is authHeader");

  // Option 1: Splitting at First Space Only (safer)
  const parts = req.headers.authorization?.split(" ", 1);
  if (!parts || parts.length !== 2) {
    console.log("Authorization header does not contain a token in expected format.");
    return res.status(401).json({ message: "Unauthorized" }); // Handle invalid header
  }
  const [, token] = parts; // Destructuring assignment

  try {
    // Define an interface for expected payload structure
    interface Decoded {
      userId: string; // Assuming 'userId' exists in the payload
      // Add other expected properties here
    }

    const decoded = jwt.verify(token, process.env.SECRET as string) as Decoded;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized" });
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
