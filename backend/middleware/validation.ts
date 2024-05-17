import { body } from "express-validator";

const handleValidationErrors = async (
    
)

export const ExpressValidator = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine must be a string"),
    body("country").isString().notEmpty().withMessage("Country is a string"),
    body("city").isString().notEmpty().withMessage("City is a string"),
]