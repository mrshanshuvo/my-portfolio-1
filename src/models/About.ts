import mongoose, { Schema, Document, Model } from "mongoose";

interface Skill {
  name: string;
  tech: string;
  level: number;
  iconName: string;
}

interface Stat {
  number: string;
  label: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface IAbout extends Document {
  bio1: string;
  bio2: string;
  highlights: string[];
  stats: Stat[];
  skills: Skill[];
  techList: string[];
  education: Education[];
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    bio1: { type: String, default: "" },
    bio2: { type: String, default: "" },
    highlights: [{ type: String }],
    stats: [
      {
        number: { type: String },
        label: { type: String },
      },
    ],
    skills: [
      {
        name: { type: String },
        tech: { type: String },
        level: { type: Number, min: 0, max: 100 },
        iconName: { type: String },
      },
    ],
    techList: [{ type: String }],
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        period: { type: String },
        details: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);

export default About;
