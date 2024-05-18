import { body, validationResult} from "express-validator";
import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction)=> {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(401).json({ error: error.array() })
    }
    next()
}

export const ExpressValidator = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine must be a string"),
    body("country").isString().notEmpty().withMessage("Country is a string"),
    body("city").isString().notEmpty().withMessage("City is a string"),
    handleValidationErrors
]