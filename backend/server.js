"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import bodyParser from "body-parser";
const express_1 = __importDefault(require("express"));
// import mongoose from "mongoose";
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
dotenv_1.default.config();
// route
// import registerRoute from "./routes/userRoutes";
// import orderRoute from "./routes/OrderRoute";
(0, db_js_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Preload");
    next();
});
app.get("/", (req, res) => {
    res.send("API IS RUNNING...");
});
// app.use("/", registerRoute);
// app.use("/", orderRoute);
// error
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    return res.status(status).json({ message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on mode on port ${PORT}`);
});
