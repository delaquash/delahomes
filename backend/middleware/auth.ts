import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt from "jsonwebtoken";
import { errorHandler } from '../utils/errorHandler';

export const jwtCheck = auth({
    audience: process.env.AUTH0_URI,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG
  });

export const JwtParser = (req: Request, res: Response, next: NextFunction) => {
   const { authorization } = req.headers;
   if(!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401)
   }

   const token = authorization.split(" ")[1]

   try {
    
   } catch (error) {
    return next(errorHandler(401, "User not authorized..."))
   }
}
