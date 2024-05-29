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

export const jwtCheck = auth({
    audience: process.env.VITE_AUTH0_URI,
    issuerBaseURL: process.env.VITE_AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: process.env.VITE_AUTH0_TOKEN_SIGNING_ALG
  });

// export const JwtParser = async (req: Request, res: Response, next: NextFunction) => {
//    const { authorization } = req.headers;
//    if(!authorization || !authorization.startsWith("Bearer ")) {
//     return res.sendStatus(401)
//    }

//    const token = authorization.split(" ")[1]

//    try {
//     const decoded = jwt.decode(token) as jwt.JwtPayload
//     const auth0Id = decoded.sub;

//     const user = await User.findOne({ auth0Id })

//     if(!user) {
//       return next(errorHandler(404, "User not found!!!"))
//     }
//     req.userId = user._id.toString();
//     req.auth0Id = auth0Id as string;
//     next()
//    } catch (error) {
//     return next(errorHandler(401, "User not authorized..."))
//    }
// }


export const JwtParser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
     return res.sendStatus(401); // Unauthorized if no or incorrect authorization header
  }

  const token = authorization.split(" ")[1];
  if (!process.env.JWT_SECRET) {
    throw new Error("Secret key is not defined");
  }
  try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
     if (!decoded || !decoded.sub) {
        return res.sendStatus(401); // Unauthorized if token is invalid or no sub field
     }

     const auth0Id = decoded.sub;

     const user = await User.findOne({ auth0Id });

     if (!user) {
        return res.status(404).json({ message: "User not found!!!" });
     }
     req.userId = user._id.toString();
     req.auth0Id = auth0Id as string;
     next();
  } catch (error) {
     console.error('JWT Parsing Error:', error);
     return next(errorHandler(401, "User not authorized..."));
  }
};
