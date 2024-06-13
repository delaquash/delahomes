import mongoose from "mongoose";
// import { UserSchemaProps } from "../types/ModelTypes/UserModel";

const userSchema = new mongoose.Schema({
    auth0Id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
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

const User = mongoose.model("User", userSchema);

export default User;
