require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { LayoutModel } from "../models/LayoutModel";
import cloudinary from "cloudinary";


export const createLayout = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { type } = req.body;
        if(type === "Banner"){
            const { title, image, subTitle } = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
            })
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                },
                title,
                subTitle
            }
            await LayoutModel.create(banner)
        }

        if(type === "FAQ"){
            const { faq } = req.body;
            await LayoutModel.create(faq)
        }

        if(type === "Categories"){
            const { categories } = req.body;
            await LayoutModel.create(categories)
        }

        res.status(201).json({
            status: "success",
            message: "Layout created successfully",
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
})
