import { Document } from "mongoose";

interface MongoResult {
  _doc: any;
}
const emailRegexPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export interface IUser extends MongoResult {
  courses: Array<{courseId: string}>;
  name: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  email?: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}
