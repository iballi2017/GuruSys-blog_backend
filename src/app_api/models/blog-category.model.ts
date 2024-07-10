import mongoose, { Schema, Document } from 'mongoose';
import Joi, { ObjectSchema } from 'joi';

export interface Category extends Document {
  title: string;
  description: string;
  createdAt: Date;
}

const CatgorySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: 'No desc' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Joi schema for validation
const categoryJoiSchema: ObjectSchema<Category> = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
});

export default {
  ValidateCategory: categoryJoiSchema,
  Category: mongoose.model<Category>('Category', CatgorySchema),
};
