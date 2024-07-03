import mongoose, { Schema, Model, Document } from "mongoose";
import HookNextFunction from "mongoose"
import { IUser } from "../types/ModelTypes/UserModel";

const emailRegexPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter your name.."]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value)
      },
      message: "Please enter a valid email.."
      }
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



