import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    features: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
