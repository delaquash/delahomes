import { body, validationResult} from "express-validator";
import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction)=> {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(401).json({ error: error.array() })
        console.log(error)
    }
    next()
}

export const ExpressValidator = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("address").isString().notEmpty().withMessage("AddressLine must be a string"),
    body("country").isString().notEmpty().withMessage("Country is a string"),
    body("city").isString().notEmpty().withMessage("City is a string"),
    body("password").isString().notEmpty().withMessage("Password should not be empty"),
    handleValidationErrors
];

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("deliveryPrice")
      .isFloat({ min: 0 })
      .withMessage("Delivery price must be a positive number"),
    body("estimatedDeliveryTime")
      .isInt({ min: 0 })
      .withMessage("Estimated delivery time must be a postivie integar"),
    body("cuisines")
      .isArray()
      .withMessage("Cuisines must be an array")
      .not()
      .isEmpty()
      .withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price")
      .isFloat({ min: 0 })
      .withMessage("Menu item price is required and must be a postive number"),
    handleValidationErrors,
  ];