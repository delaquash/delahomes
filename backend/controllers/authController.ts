import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    next(errorHandler(500, "Server Error.."));
  }
};

export { signup };
