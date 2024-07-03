import { Request, Response } from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../models/Products";
import { PurchaseOrder } from '../type';

const getOrders = (req: Request, res: Response): void => {
  res.json(getAllOrders());
};

const getOrder = (req: Request, res: Response): void => {
  const { id } = req.params;
  const order = getOrderById(id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
};

const addOrder = (req: Request, res: Response): void => {
  const newOrder: PurchaseOrder = req.body;
  const order = createOrder(newOrder);
  res.status(201).json(order);
};

const modifyOrder = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updatedOrder: PurchaseOrder = req.body;
  const order = updateOrder(id, updatedOrder);
  if (order) {
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
};

const removeOrder = (req: Request, res: Response): void => {
  const { id } = req.params;
  const order = deleteOrder(id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
};

export {
  getOrders,
  getOrder,
  addOrder,
  modifyOrder,
  removeOrder
};
