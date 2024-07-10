import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import  ErrorHandler  from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/jwt";
import { CatchAsyncError } from "../middleware/CatchAsyncError";


const isUserAuthenticated= CatchAsyncError(async(req:Request, res: Response, next:NextFunction)=> {
  const access_token = req.cookies.access_token;
  if(!access_token){
    return next(new ErrorHandler("Please login to access this resources", 400))
  }
})

interface ISignInData {
  email: string;
  password: string;
}
const signin = CatchAsyncError( async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const { email, password } = req.body as ISignInData;
    if(!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }
    
    const validUser = await User.findOne({ email })./* In the provided code snippet, the `select`
    method is used in a Mongoose query to explicitly
    include or exclude certain fields from the query
    result. */
    select("+password");
    if (!validUser) return next(new ErrorHandler( "User not found...", 404,));

    const isComparePassword = await validUser.comparePassword(password);
    if (!isComparePassword) return next(new ErrorHandler("Password is incorrect...", 404,));
    
    sendToken(validUser, 200, res)
  } catch (error:any) {
    next(new ErrorHandler(error.message, 500));
  }
});


const signout = CatchAsyncError(async( Req: Request, res: Response, next: NextFunction)=> {
  try {
    res.cookie("access_token", "", {maxAge: 1});
    res.cookie("refresh_token", "", {maxAge: 1});
    res.status(200).json({
      success: true,
       message: "Logged out successfully" 
    });
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
    
  }
})

export { signin,
    //  google,
      signout };


// const signup = async (req: Request, res: Response, next: NextFunction) => {
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword, name });
    
//     await newUser.save();
//     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, {expiresIn: "400days"});
//     console.log(token, "registered user token")
//     res.status(201).json({ message: "User created successfully", token });
//   } catch (error: any) {
//     next(new ErrorHandler(`Server Error: ${error.message}`, 500));
//   }
// };


// const signin = async (req: Request, res: Response, next: NextFunction) => {
  
//   try {
//     const { email, password } = req.body as ISignInData;
    
//     const validUser = await User.findOne({ email })./* In the provided code snippet, the `select`
//     method is used in a Mongoose query to explicitly
//     include or exclude certain fields from the query
//     result. */
//     select("+password");
//     if (!validUser) return next(new ErrorHandler( "User not found...", 404,));

//     const validPassword = await bcrypt.compare(password, validUser.password);
//     if (!validPassword) return next(new ErrorHandler( "Wrong credentials", 401,));
//     const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET as string);
//     console.log('Generated token:', token); // Log the generated token
//     // Exclude the password from the response
//     const { password: pass, ...rest } = validUser.toObject(); // Ensure you are converting the document to a plain object
//     // console.log(...rest)
//     res
//       .cookie('access_token', token)
//       .status(200)
//       .json({rest, token});
//   } catch (error) {
//     next(new ErrorHandler("Server Error...", 500));
//   }
// };


// const google = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!process.env.JWT_SECRET) {
//       throw new Error("Secret key is not defined");
//     }
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       // destructured password from the other attribute so we wont be seein password in DB
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         /* `Math.random().toString(36).slice(-8)` is generating a random string of 8 characters. */
//         Math.random() /* The `toString(36)` method is converting a number to a string representation
//         using base 36. In base 36, the digits range from 0 to 9 and then from A to Z.
//         This method is commonly used to generate random alphanumeric strings. */
//           .toString(
//             36
//           ) /* The `slice(-8)` method is used to extract the last 8 characters from a string.
//         In the given code, it is used to generate a random alphanumeric string of
//         length 8. The `Math.random().toString(36)` generates a random number between 0
//         and 1 and converts it to a string representation using base 36. The `slice(-8)`
//         then extracts the last 8 characters from this string, resulting in a random
//         string of length 8. */
//           .slice(-8) + Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUserPassword = new User({
//         /* The code `username: req.body.name.split(" ").join("").toLowerCase() +
//         Math.random().toString(36).slice(-4)` is generating a unique username for the user based on
//         their name. */
//         username:
//           req.body.name.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.imageUrl,
//       });
//       await newUserPassword.save();
//       const token = jwt.sign(
//         { id: newUserPassword._id },
//         process.env.JWT_SECRET
//       );
//       const { password: pass, ...rest } = newUserPassword._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const signout = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.clearCookie("access_token");
//     res.status(200).json("User has been logged out...");
//   } catch (error) {
//     next(error);
//   }
// };

