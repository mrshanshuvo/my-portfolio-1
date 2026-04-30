import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISocialLink extends Document {
  platform: string;
  href: string;
  label: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema = new Schema<ISocialLink>(
  {
    platform: { type: String, required: true },
    href: { type: String, required: true },
    label: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const SocialLink: Model<ISocialLink> =
  mongoose.models.SocialLink || mongoose.model<ISocialLink>("SocialLink", SocialLinkSchema);

export default SocialLink;
