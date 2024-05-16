import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt, { Jwt } from "jsonwebtoken";
import { errorHandler } from '../utils/errorHandler';
import User from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_URI,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG
  });

export const JwtParser = async (req: Request, res: Response, next: NextFunction) => {
   const { authorization } = req.headers;
   if(!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401)
   }

   const token = authorization.split(" ")[1]

   try {
    const decoded = jwt.decode(token) as jwt.JwtPayload
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id })

    if(!user) {
      return next(errorHandler(404, "User not found!!!"))
    }
    req.userId = user._id.toString();
    req.auth0Id = user.auth0Id
   } catch (error) {
    return next(errorHandler(401, "User not authorized..."))
   }
}
