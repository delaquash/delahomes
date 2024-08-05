import { Request, Response, NextFunction} from "express";

export const CatchAsyncError= (isFunc: any)=> (req: Request, res:Response, next:NextFunction) => {
    Promise.resolve(isFunc(req, res, next)).catch(next);
}