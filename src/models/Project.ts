import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  image: string;
  techNames: string[];
  github: string;
  live: string;
  featured: boolean;
  category: string;
  improvements: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    techNames: [{ type: String }],
    github: { type: String, default: "" },
    live: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    category: { type: String, default: "Full Stack" },
    improvements: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
