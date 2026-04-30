import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
  aboutBio: string;
  highlights: string[];
  techList: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    aboutBio: { type: String },
    highlights: [{ type: String }],
    techList: [{ type: String }],
  },
  { timestamps: true },
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);

export default About;
