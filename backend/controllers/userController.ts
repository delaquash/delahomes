import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
// import { errorHandler } from "../utils/errorHandler";
// Extend the Express Request interface to include the user property
// declare module "express" {
//   interface Request {
//     user?: any; // Replace 'any' with the actual type of your user object
//   }
// }


// const updateUser = async (req: Request, res: Response, next: NextFunction) => {


//   try {
//     const { name, addressLine1, city, country } = req.body;
//     const user = await User.findById(req.userId)

//     if (!user) {
//       console.log("User not found");
//       return next(errorHandler(404, "User not found"));
//     }

//     user.name = name;
//     user.country = country;
//     user.city = city;
//     user.addressLine1 = addressLine1; 

//     await user.save()
//     res.status(201).send(user)
//   } catch (error) {
//     console.error("Error in updateUser:", error);
//     next(error);
//   }
// };

// const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//   if (req.user.id !== req.params.id) {
//     console.log("Unauthorized update attempt");
//     return next(errorHandler(401, "You can only delete your account..."));
//   }
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("User deleted successfully...");
//   } catch (error) {
//     next(error);
//   }
// };

// const getUserList = async (req: Request, res: Response, next: NextFunction) => {
//   if (req.user.id === req.params.id) {
//     try {
//       const listing = await Listing.find({ userRef: req.params.id });
//       res.status(200).json(listing);
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     return next(errorHandler(401, "You can only view your own listing.."));
//   }
// };

//  const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const currentUser = await User.findOne({ _id: req.userId })
//     console.log(currentUser)
//     if(!currentUser){
//       return next(errorHandler(404, "User not found"));
//     }
//     res.json(currentUser)
//   } catch (error) {
//    next(error);
//    console.log(error)
//   }
// }

// const getCurrentUser = async (req: Request, res: Response) => {
//   try {
//     const currentUser = await User.findOne({ _id: req.userId });
//     if (!currentUser) {
//       return res.status(404).json({ message: "User not found..." });
//     }

//     res.json(currentUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

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

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  console.log('Headers:', req.headers); // Log headers
  try {
    const { auth0Id } = req.body;
    console.log(auth0Id)
    if (!auth0Id) {
      return res.status(400).json({ message: "auth0Id is required", success: false });
    }
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({ user: newUser.toObject(), message: "User created successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", success: false });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// export default {
//   getCurrentUser,
//   createCurrentUser,
//   updateCurrentUser,
// };

export {  getCurrentUser,
  createCurrentUser,
  updateCurrentUser};

