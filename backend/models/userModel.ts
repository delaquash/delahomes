require("dotenv").config();
import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/ModelTypes/UserModel";
import jwt from "jsonwebtoken";
const emailRegexPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const UserSchema = new mongoose.Schema({
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
      required: [true, "Please enter your password.."],
      minlength: [6, "Password must be at least 6 characters.."],
      /* The `select: false` option in Mongoose schema is used to specify that a particular field
      should not be returned by default when querying the database. This means that when you query
      for documents of this schema, the field marked with `select: false` will not be included in
      the results unless explicitly requested. */
      select: false
    },
    role: {
      type: String,
      default: "user"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    courses: [
      {
        courseId: String
      }
    ],
    avatar:{
      public_id: String,
      url: String
    }
    
    
  },
  { timestamps: true }
);

// Hash the password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  })
// Access Token
UserSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id}, process.env.ACCESS_TOKEN || "")
}

// Refresh Token
UserSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id}, process.env.REFRESH_TOKEN || "")
  }

// Compare the password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean>{
  return await bcrypt.compare(candidatePassword, this.password);
  }


const User = mongoose.model<IUser>("User", UserSchema);
export default User;



