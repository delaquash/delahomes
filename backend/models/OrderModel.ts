require("dotenv").config();
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IOrder extends Document {
  courseID:string;
  userID: string;
  payment_info: object
}

const orderSchema = new Schema<IOrder> ({
  courseID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
    },
    payment_info: {
      type: Object,
      }
}, {
  timestamps: true
})

const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);
export default OrderModel