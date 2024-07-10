import mongoose, { Schema, Document } from 'mongoose';
import Joi, { ObjectSchema } from 'joi';
import { ROLE_LIST } from '../../config/role-list';

export interface User extends Document {
  title: string;
  description: string;
  author: string;
  category?: string[];
  approved?: boolean;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // category: [mongoose.Schema.Types.ObjectId],
  category:{
    type: [mongoose.Schema.Types.ObjectId],
    // default: ['uncategorized']
  },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Joi schema for validation
const postJoiSchema: ObjectSchema<User> = Joi.object({
  title: Joi.string().required().optional(),
  description: Joi.string().email().required(),
  author: Joi.string().optional(),
});

export default {
  ValidatePost: postJoiSchema,
  User: mongoose.model<User>('User', PostSchema),
};
