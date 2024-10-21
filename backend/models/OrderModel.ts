require("dotenv").config();
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IOrder extends Document {
  courseId: string;
<<<<<<< HEAD
  userId?: string;
  payment_info?: object;
=======
  userId: string;
  payment_info: object;
>>>>>>> origin/frontend
}

const orderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
<<<<<<< HEAD
      // required: true,
=======
      required: true,
>>>>>>> origin/frontend
    },
    payment_info: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);
export default OrderModel;
