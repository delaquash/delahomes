require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { LayoutModel } from "../models/LayoutModel";
import cloudinary from "cloudinary";

export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isAnyTypeExist = await LayoutModel.findOne({ type });

      if (isAnyTypeExist) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }

      if (type === "Banner") {
        const { title, image, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.create(banner);
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.create({
          type: "FAQ",
          faq: faqItems,
        });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItems = await Promise.all(
          categories.map(async (category: any) => {
            return {
              title: category.title,
            };
          })
        );
        await LayoutModel.create({
          type: "Categories",
          categories: categoriesItems,
        });
      }

      res.status(201).json({
        status: "success",
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


export const editLayout = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
    try {
        const { type } = req.body;
        if(type === "Banner"){
            const bannerData: any = await LayoutModel.findOne({ type: "Banner"});
            const { image, title, subTitle }= req.body;
            if(bannerData) {
                await cloudinary.v2.uploader.destroy(
                    bannerData.image.public_id
                )
                const myCloud = await cloudinary.v2.uploader.upload(image, {
                    folder: "layout",
                })

                const banner = {
                    type: "Banner",
                    image: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url
                    },
                    title,
                    subTitle
                }
                await LayoutModel.findByIdAndUpdate(bannerData._id, {banner})
            }

            if( type === "FAQ"){
                const { faq } = req.body;
                const FaqItem = await LayoutModel.findOne({ type: "FAQ" });
                const faqItems = await Promise.all(
                    faq.map(async (item: any) => {
                        return {
                            question: item.question,
                            answer: item.answer
                        }
                    })
                )
                await LayoutModel.findByIdAndUpdate(FaqItem?._id, {
                    faq: faqItems,
                    type: "FAQ"
                })
            }
            if(type === "Categories"){
                const { categories } = req.body;
                const categoriesData = await LayoutModel.findOne({
                    type: "Categories"
                })
                const categoriesItems = await Promise.all(
                    categories.map(async (category: any) => {
                        return {
                            title: category.title,
                        }
                    })
                )
            }
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
})
