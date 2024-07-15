require("dotenv").config();
import mongoose, { Schema, Model, Document } from "mongoose";

interface IComment extends Document {
  user: object;
  comment: string;
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
  links: ILink;
  videoUrl: string;
  videoThumbmaik: object;
  videoSection: string;
  videoLength: number;
  videoPlayers: string;
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
});

const linkSchema = new Schema({
  title: String,
  url: String
})

const commentSchema = new Schema ({
  user: Object,
  comment: String,
  commentReplies: [Object]
})

const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  videoThumbmaik: Object,
  videoSection: String,
  videoLength: Number,
  videoPlayers: String,
  suggestion: String,
  questions: [commentSchema],
  title:String,
  links: [linkSchema],
  description: String
})