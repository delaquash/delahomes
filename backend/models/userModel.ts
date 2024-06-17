import mongoose, { Schema, Document } from "mongoose";
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


interface HookNextFunction {
  (err?: Error): void;
}

userSchema.pre('save', function (next: HookNextFunction) {
  const user = this as unknown as IUser;

  if (user.isNew && !user.password) {
    const error = new Error('Password is required');
    return next(error);
  }
  next();
});

export default User;
