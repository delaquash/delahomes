import express from "express";
import { createOrder } from "../controllers/OrderController";
import { isUserAuthenticated } from "../middleware/auth";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

const router =express.Router();

router.post('/create-order', isUserAuthenticated, createOrder);
// 08188504575 Gbenro
// 08179639552 Theo
// 29 James Onifade Street, Akesan Bus Stop, Off Igando, Obadore Expressway, Alimosho Lagos State

export default router;