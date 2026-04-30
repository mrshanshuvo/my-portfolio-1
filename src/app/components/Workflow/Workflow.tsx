import { connectDB } from "@/lib/mongodb";
import WorkflowModel from "@/models/Workflow";
import WorkflowClient from "./WorkflowClient";

async function getWorkflow() {
  await connectDB();
  const workflow = await WorkflowModel.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(workflow));
}

export default async function Workflow() {
  const workflow = await getWorkflow();
  if (!workflow || workflow.length === 0) return null;
  return <WorkflowClient workflow={workflow} />;
}
