import mongoose, { Schema, Document } from 'mongoose';
import Joi, { ObjectSchema } from 'joi';

export interface BlogPost extends Document {
  title: string;
  body: string;
  author: string;
  approved?: boolean;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: Date, default: Date.now },
});

// Joi schema for validation
const postJoiSchema: ObjectSchema<BlogPost> = Joi.object({
  title: Joi.string().required().optional(),
  body: Joi.string().email().required(),
  author: Joi.string().optional(),
});

export default {
  ValidatePost: postJoiSchema,
  BlogPost: mongoose.model<BlogPost>('BlogPost', PostSchema),
};
