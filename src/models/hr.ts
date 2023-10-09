import mongoose, { Document, Schema } from "mongoose";

export interface HR extends Document {
  name: string;
  staffId: string;
  email: string;
  password: string;
  avatar?: string;
}

const hrSchema: Schema<HR> = new Schema({
  name: { type: String, required: true, unique: true },
  staffId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
});

export const HRModel = mongoose.model<HR>("HR", hrSchema);
