import { connectDB } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import ServicesClient from "./ServicesClient";

async function getServices() {
  await connectDB();
  const services = await ServiceModel.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(services));
}

export default async function Services() {
  const services = await getServices();
  if (!services || services.length === 0) return null;
  return <ServicesClient services={services} />;
}
