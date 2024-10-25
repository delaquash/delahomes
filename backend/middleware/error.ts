import {Request, Response, NextFunction} from "express";

import ErrorHandler  from "../utils/errorHandler";

export const ErrorMiddleware = (err: any, req: Request, res:Response, next:NextFunction)=> {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //  Wrong MongoDB ID error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400);
        }

    // JSONWEBTOKEN error
    if (err.name === "JsonWebTokenError") {
        const message = `jwt is invalid. Please try again`
        err = new ErrorHandler(message, 400);
    }

    // jwt expired token
    if (err.name === "TokenExpiredError") {
        const message = `jwt expired. Please try again`
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
} 