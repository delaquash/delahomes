import mongoose, { Schema, Model, Document } from "mongoose";
import HookNextFunction from "mongoose"
import { IUser } from "../types/ModelTypes/UserModel";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      readonlyd: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    address: {
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

const User = mongoose.model<IUser>("User", userSchema);



