import { Router } from 'express';
import { getOrders, getOrder, addOrder, modifyOrder, removeOrder } from '../controllers/Products';

const router = Router();

router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders', addOrder);
router.put('/orders/:id', modifyOrder);
router.delete('/orders/:id', removeOrder);

export default router;