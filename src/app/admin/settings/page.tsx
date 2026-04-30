import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/Setting";
import SettingsFormClient from "./SettingsFormClient";

async function getSettings() {
  await connectDB();
  let settings = await Setting.findOne().lean();
  if (!settings) {
    settings = await Setting.create({});
  }
  return JSON.parse(JSON.stringify(settings));
}

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 h-12 bg-emerald-500 rounded-full" />
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Portfolio Settings
          </h1>
          <p className="text-slate-400">
            Manage global SEO, communication, and visual DNA.
          </p>
        </div>
      </div>

      <SettingsFormClient initialSettings={settings} />
    </div>
  );
}
