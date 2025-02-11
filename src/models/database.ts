import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

// Interfaces
export interface IUser {
  name: string;
  lastname: string;
  age: Date;
  username: string;
  email: string;
  role: string;
}

export interface ICompanion {
  name: string;
  description: string;
  image: string;
  name_model_folder: string;
}

// Database Schemas
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Date, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
}, { timestamps: true });


const companionSchema = new Schema<ICompanion>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  name_model_folder: { type: String, required: true },
});

// Plugins
userSchema.plugin(passportLocalMongoose);

// Database Models
export const model_user = mongoose.model('user', userSchema);
export const model_companion = mongoose.model('companion', companionSchema);
