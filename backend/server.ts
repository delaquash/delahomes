require("dotenv").config();
import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";

import { v2 as cloudinary } from "cloudinary";
import { RouteError } from  "./middleware/error";


const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
}));

// route
import authRoute from "./route/authRoute";
import userRoute from "./route/userRoute";
import restaurantRoute from "./route/MyRestaurantRoute";
import productRoute from "./route/Products"
import ErrorHandler from "./utils/errorHandler";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})




/* `app.use(cookieParser());` is a middleware function that parses cookies attached to the incoming
request object. It adds a `cookies` property to the `req` object, which contains the parsed cookies.
This allows you to access and manipulate cookies in your application. */




app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Preload"
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("API IS RUNNING...");
});



app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute)
// app.use("/api/v1/restaurant", restaurantRoute);
// app.use("/api/v1/product", productRoute);

// error
app.use(RouteError)
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({ message, status, success: false });
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on mode on port ${PORT}`);
});
