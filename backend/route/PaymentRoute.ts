require("dotenv").config();
import express from "express";
import { isUserAuthenticated, authorization } from "../middleware/auth";
import { newPayment, sendStripePublishableKey } from "../controllers/PaymentController";

const router = express.Router();

router.get("/stripe-keys",isUserAuthenticated, authorization("admin"),sendStripePublishableKey )
router.post("/payment", isUserAuthenticated, authorization("admin"), newPayment);

export default router;