require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { LayoutModel } from "../models/LayoutModel";
import cloudinary from "cloudinary";

<<<<<<< HEAD

=======
>>>>>>> origin/frontend
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
<<<<<<< HEAD
        
      const isAnyTypeExist = await LayoutModel.findOne({ type });
      
=======
      
      const isAnyTypeExist = await LayoutModel.findOne({ type });
>>>>>>> origin/frontend
      if (isAnyTypeExist) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }

      if (type === "Banner") {
        const { title, image, subTitle } = req.body;
<<<<<<< HEAD
  
=======
>>>>>>> origin/frontend
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
<<<<<<< HEAD
          type: "Banner",
          banner: {
            image: {
=======
          image: {
>>>>>>> origin/frontend
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
<<<<<<< HEAD
          }
=======
>>>>>>> origin/frontend
        };
        await LayoutModel.create(banner);
      }

      if (type === "FAQ") {
        const { faq } = req.body;
<<<<<<< HEAD
        if(!faq) {
          return next(new ErrorHandler("FAQ is required for FAQ type", 400))
          }
=======
>>>>>>> origin/frontend
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

      res.status(200).json({
        status: "success",
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
            if (type === "Banner") {
                const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
                const { image, title, subTitle } = req.body;
<<<<<<< HEAD

                const data = image.startsWith("https") ? bannerData : await cloudinary.v2.uploader.upload(image, {
                  folder: "layouts",
                })
=======
                if (bannerData) {
                        await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
                        const myCloud = await cloudinary.v2.uploader.upload(image, {
                            folder: "layout",
                        });
>>>>>>> origin/frontend

                            const banner = {
                                type: "Banner",
                                image: {
<<<<<<< HEAD
                                public_id: image.startsWith("https") ? bannerData.banner.image.public_id: data?.public_id,
                                url: image.startsWith("https") ? bannerData.banner.image.url : data?.secure_url
=======
                                public_id: myCloud.public_id,
                                url: myCloud.secure_url,
>>>>>>> origin/frontend
                                },
                                title,
                                subTitle,
                            };
                            await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
                }
<<<<<<< HEAD
      
=======
            }
>>>>>>> origin/frontend
        if (type === "FAQ") {
          const { faq } = req.body;
          const FaqItem = await LayoutModel.findOne({ type: "FAQ" });
          const faqItems = await Promise.all(
            faq.map(async (item: any) => {
              return {
                question: item.question,
                answer: item.answer,
              };
            })
          );
         await LayoutModel.findByIdAndUpdate(FaqItem?._id, {
            faq: faqItems,
            type: "FAQ",
          });
        }
<<<<<<< HEAD
        
        if(type === "Categories") {
          const { categories } = req.body;
          const categoriesItem = await LayoutModel.findOne({ type: "Categories" });
          const categoriesItems = await Promise.all(
            categories.map(async (item: any) => {
              return {
                title: item.title
              }
            })
          )
          await LayoutModel.findByIdAndUpdate(categoriesItem?._id, {
            categories: categoriesItems,
            type: "Categories"
          })
        }
=======
              
>>>>>>> origin/frontend
    
        res.status(200).json({
        status: "success",
        message: "Update layout created successfully",
        // data: updatedFAQ
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


export const getLayout = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=> {
    try {
<<<<<<< HEAD
        const { type } = req.params;

        if (!type) {
          return next(new ErrorHandler("Type is required", 400));
        }

        const layout = await LayoutModel.findOne({type})
        if (!layout) {
          return next(new ErrorHandler(`Layout of type ${type} not found`, 404));
        }
    
        res.status(200).json({
=======
        const { type } = req.body;
        const layout = await LayoutModel.findOne({type})
    
        res.status(201).json({
>>>>>>> origin/frontend
            status: "success",
             layout
        })
    } catch  (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
})

export const deleteLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      // Find the layout document by type
      const layout = await LayoutModel.findOne({ type });
    //   if (!layout) {
    //     return next(new ErrorHandler(`No layout found with type ${type}`, 404));
    //   }
      if (type === "FAQ" || type === "Categories") {
        await LayoutModel.deleteOne({ type });
      }

      // Delete the layout document
      await LayoutModel.deleteOne({ type });

      res.status(200).json({
        status: "success",
        message: `${type} layout deleted successfully`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);