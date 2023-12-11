import { NextFunction, Request, Response } from "express";
import Listing from "../models/listModel";
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";

const createListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { createListing, deleteListing };
