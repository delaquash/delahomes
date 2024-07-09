require("dotenv").config();
import { Response } from "express";
import { IUser } from "../types/ModelTypes/UserModel"
import {redis} from "./redis";


interface ITokenOptions {
    expiresIn: string;
    maxAge: number;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none" | undefined;
    secure: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignAccessToken()
}