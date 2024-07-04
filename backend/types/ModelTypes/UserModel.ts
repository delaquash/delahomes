import { Document } from "mongoose";

interface MongoResult {
  _doc: any;
}

export interface IUser extends Document {
  courses: Array<{courseId: string}>;
  name: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}


