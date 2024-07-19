require("dotenv").config();
import mongoose, { Schema, Model, Document } from "mongoose";
import { IUser } from "../types/ModelTypes/UserModel";

interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies? : IComment[]; 
}

interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies?: IComment[]
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  // videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayers: string;
  links: ILink[];
  suggestion: string;
  questions:IComment[]
}

interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: {title: string}[];
  prerequisites: {title: string}[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}
const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0
  },
  comment: String,
  commentReplies: [Object]
});

const linkSchema = new Schema<ILink>({
  title: String,
  url: String
});

const commentSchema = new Schema<IComment>({
  user: Object,
  question: String,
  questionReplies: [Object]
});

const courseDataSchema = new Schema<ICourseData>({
  title: String,
  description: String,
  links: [linkSchema],
  videoUrl: String,
  // videoThumbnail: Object,
  videoSection: String,
  videoLength: Number,
  videoPlayers: String,
  suggestion: String,
  questions: [commentSchema]
});

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  estimatedPrice: {
    type: Number
  },
  thumbnail: {
    public_id: {
      type: String,
      // required: true
    },
    url: {
      type: String,
      // required: true
    }
  },
  tags: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  demoUrl: {
    type: String,
    required: true
  },
  benefits: [{ title: String }],
  prerequisites: [{ title: String }],
  reviews: [reviewSchema],
  courseData: [courseDataSchema],
  ratings: {
    type: Number,
    default: 0
  },
  purchased: {
    type: Number,
    default: 0
  }
});

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default CourseModel;