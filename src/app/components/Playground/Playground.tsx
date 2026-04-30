import { connectDB } from "@/lib/mongodb";
import DemoModel from "@/models/Demo";
import PlaygroundClient from "./PlaygroundClient";

async function getDemos() {
  await connectDB();
  const demos = await DemoModel.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(demos));
}

export default async function Playground() {
  const demos = await getDemos();
  if (!demos || demos.length === 0) return null;
  return <PlaygroundClient demos={demos} />;
}
