import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";

const createListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { createListing };
