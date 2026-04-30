import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICertification extends Document {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  image?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema = new Schema<ICertification>(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    link: { type: String },
    image: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Certification: Model<ICertification> =
  mongoose.models.Certification || mongoose.model<ICertification>("Certification", CertificationSchema);

export default Certification;
