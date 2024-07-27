import express from "express";

import { createOrder } from "../controllers/OrderController";
import { isUserAuthenticated } from "../middleware/auth";


const router =express.Router();

router.post('/create-order', isUserAuthenticated, createOrder);


export default router;