import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
  name: string;
  tech: string;
  level: number;
  iconName: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    tech: { type: String },
    level: { type: Number, min: 0, max: 100, default: 80 },
    iconName: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;
