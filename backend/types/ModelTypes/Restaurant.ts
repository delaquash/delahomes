import mongoose from "mongoose";

interface MenuItem {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
}

export interface Restaurant {
  // _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId; // Reference to User model
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[]; // Array of strings
  menuItems: MenuItem[]; // Array of MenuItem objects
  imageUrl: string;
  lastUpdated: Date;
}
