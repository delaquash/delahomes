import mongoose from "mongoose";
import { UserSchemaProps } from "../types/ModelTypes/UserModel";

const userSchema = new mongoose.Schema(
  {
 
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
