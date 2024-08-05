import { Request } from "express";
import { IUser } from "../types/ModelTypes/UserModel";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}