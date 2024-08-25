export interface Item {
   order_id: number;
   item_name: string;
   price: number;
   quantity: number;
   status: string;
  }
  
  export interface Customer {
    name: string;
    email: string;
  }
  
  export interface PurchaseOrder {
    order_id: string;
    customer: Customer;
    items: Item[];
    order_date: string;
    total_amount: number;
  }
  
  export interface PurchaseOrderData {
    purchase_orders: PurchaseOrder[];
  }
  