import fs from 'fs';
import path from 'path';
import { PurchaseOrder, PurchaseOrderData } from '../types';

const JSON_FILE_PATH = path.join(__dirname, '../purchase_order.json');

const readPurchaseOrders = (): PurchaseOrderData => {
  if (!fs.existsSync(JSON_FILE_PATH)) {
    return { purchase_orders: [] };
  }
  const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
  return JSON.parse(data) as PurchaseOrderData;
};

const writePurchaseOrders = (data: PurchaseOrderData): void => {
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 4));
};

const getAllOrders = (): PurchaseOrder[] => {
  return readPurchaseOrders().purchase_orders;
};

const getOrderById = (id: string): PurchaseOrder | undefined => {
  return getAllOrders().find(order => order.order_id === id);
};

const createOrder = (order: PurchaseOrder): PurchaseOrder => {
  const data = readPurchaseOrders();
  data.purchase_orders.push(order);
  writePurchaseOrders(data);
  return order;
};

const updateOrder = (id: string, updatedOrder: PurchaseOrder): PurchaseOrder | undefined => {
  const data = readPurchaseOrders();
  const index = data.purchase_orders.findIndex(order => order.order_id === id);
  if (index !== -1) {
    data.purchase_orders[index] = updatedOrder;
    writePurchaseOrders(data);
    return updatedOrder;
  }
  return undefined;
};

const deleteOrder = (id: string): PurchaseOrder | undefined => {
  const data = readPurchaseOrders();
  const index = data.purchase_orders.findIndex(order => order.order_id === id);
  if (index !== -1) {
    const [deletedOrder] = data.purchase_orders.splice(index, 1);
    writePurchaseOrders(data);
    return deletedOrder;
  }
  return undefined;
};

export {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
