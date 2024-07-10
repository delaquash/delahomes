import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt, { GetPublicKeyOrSecret, Jwt, Secret } from "jsonwebtoken";
import { errorHandler } from '../utils/errorHandler';
import User from '../models/userModel';

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
      interface Request {
          user?: IUser;
      }
  }
}


export const isUserAuthenticated= CatchAsyncError(async(req:Request, res: Response, next:NextFunction)=> {
  const access_token = req.cookies.access_token as string;
  console.log(access_token, "This is access token")
  console.log(req.cookies.access_token, "This is cookies token")

  if(!access_token){
    return next(new ErrorHandler("Please login to access this resources", 400))
  }
  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;
  console.log(decoded, "This is decoded")
  if(!decoded) {
    return next(new ErrorHandler("access token not valid", 400))
  }
  const user = await redis.get(decoded.id);
  console.log(user, "This is user")
  if(!user) {
    return next(new ErrorHandler("User not found", 400))
  }
  req.user = JSON.parse(user);
  next();
})



// export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.headers.authorization, "This is authHeader");

//   // Option 1: Splitting at First Space Only (safer)
//   const parts = req.headers.authorization?.split(" ", 1);
//   if (!parts || parts.length !== 2) {
//     console.log("Authorization header does not contain a token in expected format.");
//     return res.status(401).json({ message: "Unauthorized" }); // Handle invalid header
//   }
//   const [, token] = parts; // Destructuring assignment

//   try {
//     // Define an interface for expected payload structure
//     interface Decoded {
//       userId: string; // Assuming 'userId' exists in the payload
//       // Add other expected properties here
//     }

//     const decoded = jwt.verify(token, process.env.SECRET as string) as Decoded;
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// export const admin = (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // Ensure user is logged in and has data
//       if (!req.user || !req.user.isAdmin) {
//         throw new Error("Not authorized as an admin");
//       }
//       console.log(req)
//       // Proceed to the next middleware or route handler
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Unauthorized: Admin access required" });
//     }
//   };
