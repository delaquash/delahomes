import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt, { GetPublicKeyOrSecret, Jwt, Secret } from "jsonwebtoken";
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


export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({msg: "Not authorized..."});
  }

  // Bearer lshdflshdjkhvjkshdjkvh34h5k3h54jkh
  const token = authorization.split(" ")[1];


  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('AUTH0_SECRET environment variable is not defined');
  }
  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    if (!auth0Id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.status(401).json({msg: "Not authorized"});
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.log(error)
    return res.sendStatus(401);
  }
};