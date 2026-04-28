import mongoose, { Schema, Document, Model } from "mongoose";

interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

interface TypeSequenceItem {
  text: string;
  delay: number;
}

export interface IHero extends Document {
  name: string;
  lastName: string;
  typeSequences: TypeSequenceItem[];
  bio: string;
  profileImage: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
  updatedAt: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    name: { type: String, default: "Shahid Hasan" },
    lastName: { type: String, default: "Shuvo" },
    typeSequences: [
      {
        text: { type: String },
        delay: { type: Number, default: 2000 },
      },
    ],
    bio: { type: String, default: "" },
    profileImage: { type: String, default: "/PP1.jpeg" },
    resumeUrl: { type: String, default: "/Resume_of_Shahid_Hasan_Shuvo.pdf" },
    socialLinks: [
      {
        platform: { type: String },
        href: { type: String },
        label: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Hero: Model<IHero> =
  mongoose.models.Hero || mongoose.model<IHero>("Hero", HeroSchema);

export default Hero;
