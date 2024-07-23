require("dotenv").config();
import mongoose, { Schema, Model, Document } from "mongoose";


export interface INotification extends Document {
    title: string;
    message: string;
    status: string;
    userID?: string;
}

const notificationSchema = new Schema<INotification>({
  title: { 
    type: String, 
    required: true 
},
  message: { 
    type: String, 
    required: true 
},
  status: { 
    type: String, 
    required: true, 
    default: "unread" 
},
//   userID: { type: String, required: true },
}, {
    timestamps: true,
});

const NotificationModel = mongoose.model<INotification>("Notification", notificationSchema);

export default NotificationModel;