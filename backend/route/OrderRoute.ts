<<<<<<< HEAD
require("dotenv").config();
import express from "express";
import { createOrder,getAllOrders } from "../controllers/OrderController";
import { isUserAuthenticated, authorization } from "../middleware/auth";

const router = express.Router();

router.post('/create-order', isUserAuthenticated, createOrder);
router.get('/get-all-order', isUserAuthenticated, authorization("admin"), getAllOrders);
=======
import express from "express";
import { createOrder,getAllOrders } from "../controllers/OrderController";
import { isUserAuthenticated, authorization } from "../middleware/auth";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

const router =express.Router();

router.post('/create-order', isUserAuthenticated, createOrder);
router.get('/get-all-order', isUserAuthenticated, authorization("admin"), getAllOrders);
// 08188504575 Gbenro
// 08179639552 Theo
// 29 James Onifade Street, Akesan Bus Stop, Off Igando, Obadore Expressway, Alimosho Lagos State
>>>>>>> origin/frontend

export default router;