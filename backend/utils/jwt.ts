require("dotenv").config();
import { Response } from "express";
import { IUser } from "../types/ModelTypes/UserModel"
import {redis} from "./redis";

interface ITokenOptions {
    expiresIn: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none" | undefined;
    secure?: boolean;
}

  // parse env variables to integrates with fallback values
  const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRES || "300", 10)
  const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRES || "1200", 10);

  // options for cookies
  export const accessTokenOptions: ITokenOptions = {
      expiresIn: new Date(Date.now() + refreshTokenExpire * 60 * 60 * 1000),
      maxAge: refreshTokenExpire * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
  }

 export const refreshTokenOptions: ITokenOptions = {
      expiresIn: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
      maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
  }

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // Upload session to redis
    redis.set(user._id, JSON.stringify(user) as any)

  

    // only set secure to true in production
    if (process.env.NODE_ENV === "production") {
        accessTokenOptions.secure = true;
    }

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}