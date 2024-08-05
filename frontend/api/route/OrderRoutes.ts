import { Router } from 'express';
import { getOrders, getOrder, addOrder, updateOrders, removeOrder } from '../controller/orderController';

const router = Router();

router.get('/orders', getOrders); //get all order
router.get('/orders/:id', getOrder); // get single order by id
router.post('/orders', addOrder); // add order
router.put('/orders/:id', updateOrders); // update single order
router.delete('/orders/:id', removeOrder); //delete

export default router;
