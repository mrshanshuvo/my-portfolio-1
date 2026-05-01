import { connectDB } from "@/lib/mongodb";
import DemoModel from "@/models/Demo";
import PlaygroundClient from "./PlaygroundClient";

async function getDemos(): Promise<any[]> {
  await connectDB();
  const raw = await DemoModel.find().sort({ createdAt: -1 }).limit(4).lean();
  return JSON.parse(JSON.stringify(raw));
}

export default async function Playground() {
  const demos = await getDemos();
  if (!demos || demos.length === 0) return null;
  return <PlaygroundClient demos={demos} />;
}
