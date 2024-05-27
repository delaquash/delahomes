import { NextFunction, Request, Response } from "express";
import Listing from "../models/listModel";
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import { SortOrder } from "mongoose";

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
    const limit: number = parseInt(req.query.limit as string) || 9;
    const startIndex: number = parseInt(req.query.startIndex as string) || 0;
    let offer: boolean | { $in: [boolean, boolean] } = req.query.offer === 'true';

    if (req.query.offer === undefined || req.query.offer === 'false') {
      offer = { $in: [false, true] };
    }


    let furnished: boolean | { $in: [boolean, boolean] } = req.query.furnished === "true";

    if (furnished === undefined || req.query.furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking: boolean | { $in: [boolean, boolean] } = req.query.parking === "true";

    if (parking === undefined || req.query.parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type: string | { $in: ['sale', 'rent'] } = req.query.type as string || { $in: ['sale', 'rent'] };

    if (type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm: string = req.query.searchTerm as string || '';
    const sort: string = req.query.sort as string || 'createdAt';
    const order: number = 1; // Assuming 'order' is not provided in the query, set the default order to ascending (1).
    console.log(searchTerm, sort, order)
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
  })
  
      .sort({ [sort as string]: order } as { [key: string]: SortOrder })
      .limit(limit)
      .skip(startIndex);
<<<<<<< HEAD
=======
      
>>>>>>> backend
      return res.status(200).json(listings);
  } catch (error) {
    next(error);
    console.error(error)
  }
}


export { createListing, deleteListing, updateListing, getListing, getList };
