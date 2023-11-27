import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler";
import jwt from "jsonwebtoken";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    next(errorHandler(500, "Server Error.."));
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found..."));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    if (!process.env.JWT_SECRET) {
      throw new Error("Secret key is not defined");
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_toke", token, { httpOnly: true })
      .status(200)
      .json(validUser);
  } catch (error) {
    next(errorHandler(500, "Server Error.."));
  }
};
export { signup, signin };
