import express from "express";
import { createOrder,getAllOrders } from "../controllers/OrderController";
import { isUserAuthenticated, authorization } from "../middleware/auth";
import bodyParser from "body-parser";
import { updateAccessToken } from "../controllers/userController";

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

const router =express.Router();

router.post('/create-order',
    //  updateAccessToken, 
      isUserAuthenticated,
    createOrder
);
router.get('/get-all-order', isUserAuthenticated, authorization("admin"), getAllOrders);
// 08188504575 Gbenro
// 08179639552 Theo
// 29 James Onifade Street, Akesan Bus Stop, Off Igando, Obadore Expressway, Alimosho Lagos State

export default router;