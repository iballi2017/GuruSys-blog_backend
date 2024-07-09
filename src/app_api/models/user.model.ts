import mongoose, { Schema, Document } from 'mongoose';
import Joi, { ObjectSchema } from 'joi';
import { ROLE_LIST } from '../../config/role-list';

export interface User extends Document {
  name: string;
  email: string;
  password?: string;
  roles?: object;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    User: {
      type: Number,
      default: ROLE_LIST.User,
    },
    Editor: Number,
    Admin: Number,
    Guest: Number,
  },
  refreshToken: String,
  passwordResetToken: String,
  createdAt: { type: Date, default: Date.now },
});

// Joi schema for validation
const userJoiSchema: ObjectSchema<User> = Joi.object({
  name: Joi.string().required().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
});

// export default mongoose.model<User>('User', UserSchema);
export default {
  ValidateUser: userJoiSchema,
  User: mongoose.model<User>('User', UserSchema),
};
