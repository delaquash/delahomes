import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

// route
// import authRoute from "./route/authRoute";
import userRoute from "./route/userRoute";
import restaurantRoute from "./route/MyRestaurantRoute";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


connectDB();
const app = express();
app.use(express.json());
app.use(cors());
/* `app.use(cookieParser());` is a middleware function that parses cookies attached to the incoming
request object. It adds a `cookies` property to the `req` object, which contains the parsed cookies.
This allows you to access and manipulate cookies in your application. */
app.use(cookieParser());

app.use(bodyParser.json());

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


// app.use("/api/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);

// error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({ message, status, success: false });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on mode on port ${PORT}`);
});
