import mongoose from "mongoose";
import { UserSchemaProps } from "../types/ModelTypes/UserModel";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,

      unique: true,
    },
    email: {
      type: String,
    
      unique: true,
    },
    password: {
      type: String,

    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    auth0Id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },
    addressLine1: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserSchemaProps>("User", userSchema);

export default User;
