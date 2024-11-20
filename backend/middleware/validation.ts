import { body, validationResult} from "express-validator";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction)=> {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(401).json({ error: error.array() })
        console.log(error)
    }
    next()
}

export const ExpressValidator = [
  body("name").isString().notEmpty().withMessage("Please enter your name."),
  body("email").notEmpty().isEmail().withMessage("Please enter a valid email."),
  body("password").notEmpty().withMessage("Please enter your password.").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
  body("role").optional().isIn(["user"]),
  body("isVerified").optional().isBoolean().withMessage("isVerified must be true or false"),
  body("courses").optional().isArray().withMessage("Courses must be an array"),
  body("courses.*.courseId")
    .optional()
    .isString()
    .withMessage("courseId must be a string"),
  body("avatar")
    .optional()
    .isObject()
    .withMessage("Avatar must be an object"),
  body("avatar.public_id")
    .optional()
    .isString()
    .withMessage("public_id must be a string"),
  body("avatar.url").optional().isString().withMessage("url must be a string"),
  handleValidationErrors,
];

export const validateMyCourseRequest = [
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