require("dotenv").config();
import express from "express";
import { isUserAuthenticated, authorization } from "../middleware/auth";
import { newPayment } from "../controllers/PaymentController";

const router = express.Router();


router.post("/payment", isUserAuthenticated, authorization("admin"), newPayment);