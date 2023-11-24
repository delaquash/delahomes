import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";

const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const newUser = new User({ email, password, username });
  await newUser.save();
  res.status(201).json({ msg: "User created successfully" });
};

export { signup };
