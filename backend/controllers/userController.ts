require ("dotenv").config();
import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { CatchAsyncError } from "../middleware/CatchAsyncError"
import  ErrorHandler  from "../utils/errorHandler";
import Restaurant from "../models/restaurant";
import { IUser } from "../types/ModelTypes/UserModel";
import jwt, { Secret } from "jsonwebtoken";
// Extend the Express Request interface to include the user property
// declare module "express" {
//   interface Request {
//     user?: any; // Replace 'any' with the actual type of your user object
//   }
// }

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?:string;
}

 const RegistarUser = CatchAsyncError (async(
   req: Request,
   res: Response,
   next: NextFunction
 )=> {
    try {
      const { name, email, password} = req.body;
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

          // res.status(201).json({
          //   success: true,
          //   user,
          //   });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400))
    }
 });

 interface IActivationToken {
  token: string;
  activationCode: string;
 }

const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { activationCode, user },
    process.env.ACTIVATION_TOKEN_SECRET as Secret,
    {
      expiresIn: "3h",
      });
      return {token, activationCode}
}



// const createCurrentUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { name, email, password, address, city, country } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       res.status(400);
//       throw new Error("User already exists");
//     }

//     const newUser = new User({
//       name,
//       email,
//       address,
//       city,
//       country
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json({ message: "User saved successfully."});
//   } catch (error) {
//     next(error);
//   }
// };

// const updateUser = async (req: Request, res: Response, next: NextFunction) => {

//   try {
//       // Extract userId from request parameters (assuming route pattern)
//       const userId = req.params.userId;
      
//     const { name, address, city, country } = req.body;
//     const user = await User.findById(userId)
   
    
//     if (!user) {
//       console.log("User not found");
//       return next(errorHandler(404, "User not found"));
//     }

//     user.name = name;
//     user.country = country;
//     user.city = city;
//     user.address = address;
// ``
//     await user.save()
//     res.status(201).send(user)
//   } catch (error) {
//     console.error("Error in updateUser:", error);
//     next(error);
//   }
// };


// const getUserList = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const listing = await Restaurant.find({ userRef: req.params.id });
//         res.status(200).json(listing);
//       } catch (error) {
//         next(error);
//       }
// };


// const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const currentUser = await User.findOne({ _id: req.params.userId })
//     if(!currentUser){
//       return next(errorHandler(404, "User not found"));
//     }
//     res.status(200).json(currentUser)
//   } catch (error) {
//    next(error);
  
//   }
// }


// const getUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return next(errorHandler(404, "No user with that id exists"));
//     }
//     // Remove password from the response
//     const {password: pass, ...rest} = user._doc;
//     res.status(200).json(rest);
//     // console.log(rest, user)
//   } catch (error) {
//     next(error);
//   }
// }


// export {  
//     getCurrentUser,
//     createCurrentUser,
//     updateUser,
//     getUser,
//     getUserList
// };
