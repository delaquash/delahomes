require("dotenv").config();
import express from "express";
import { createOrder,getAllOrders } from "../controllers/OrderController";
import { isUserAuthenticated, authorization } from "../middleware/auth";

const router = express.Router();

router.post('/create-order', isUserAuthenticated, createOrder);
router.get('/get-all-order', isUserAuthenticated, authorization("admin"), getAllOrders);

export default router;