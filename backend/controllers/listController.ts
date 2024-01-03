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
) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Lisitng not found."));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing."));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("List has been deleted.");
  } catch (error) {
    next(error);
  }
};

const updateListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Lisitng not found."));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing."));
  }
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};
const getListing = async (req: Request, res: Response, next: NextFunction) => {
  const list = await Listing.findById(req.params.id);
  try {
    if (!list) {
      return next(errorHandler(404, "Lisitng not found."));
    }
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const getList = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    
  } catch (error) {
    
  }
}

export { createListing, deleteListing, updateListing, getListing, getList };
