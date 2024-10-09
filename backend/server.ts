require("dotenv").config();
import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import { v2 as cloudinary } from "cloudinary";
import { RouteError } from "./middleware/error";

// imported route
import authRoute from "./route/authRoute";
import userRoute from "./route/userRoute";
import courseRoute from "./route/CourseRoute";
import orderRoute from "./route/OrderRoute";
import notificationRoute from "./route/NotificationRoute";
import analyticsRoute from "./route/analyticsRouter";
import layoutRoute from "./route/layoutRoute";
import cors from "cors";

// middlewares
const app = express();
// cors// 
app.use(bodyParser.json({ limit: "50mb" }));
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));




// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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

// Route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/notifications", notificationRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/analytics", analyticsRoute);
app.use("/api/v1/layout", layoutRoute);

// error
app.use(RouteError);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({ message, status, success: false });
});

// DB Connection
connectDB();

// Port
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on mode on port ${PORT}`);
});
