"use client";
import { useState, useEffect } from "react";
import type { About, Skill, Stat } from "@/types";
import { FaPlus, FaTimes, FaCheck, FaSave } from "react-icons/fa";

const ICON_OPTIONS = ["SiReact", "SiNodedotjs", "FaDatabase", "FaCloud", "SiTensorflow", "FaRobot"];

const DEFAULT: About = {
  bio1: "",
  bio2: "",
  highlights: [],
  stats: [],
  skills: [],
  techList: [],
  education: [],
};

export default function AdminAboutPage() {
  const [data, setData] = useState<About>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Temp input states
  const [highlightInput, setHighlightInput] = useState("");
  const [techInput, setTechInput] = useState("");

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then((d) => { setData({ ...DEFAULT, ...d }); setLoading(false); });
  }, []);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) showToast("About section saved!");
    else showToast("Failed to save.", "error");
  }

  function addHighlight() {
    if (!highlightInput.trim()) return;
    setData((d) => ({ ...d, highlights: [...d.highlights, highlightInput.trim()] }));
    setHighlightInput("");
  }

  function addTech() {
    if (!techInput.trim()) return;
    setData((d) => ({ ...d, techList: [...d.techList, techInput.trim()] }));
    setTechInput("");
  }

  function addStat() {
    setData((d) => ({ ...d, stats: [...d.stats, { number: "0", label: "New Stat" }] }));
  }

  function updateStat(i: number, field: keyof Stat, val: string) {
    setData((d) => {
      const stats = [...d.stats];
      stats[i] = { ...stats[i], [field]: val };
      return { ...d, stats };
    });
  }

  function addSkill() {
    setData((d) => ({
      ...d,
      skills: [...d.skills, { name: "New Skill", tech: "", level: 80, iconName: "FaDatabase" }],
    }));
  }

  function updateSkill(i: number, field: keyof Skill, val: string | number) {
    setData((d) => {
      const skills = [...d.skills];
      skills[i] = { ...skills[i], [field]: val };
      return { ...d, skills };
    });
  }

  if (loading) return <div className="p-8 text-slate-400">Loading…</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"} text-white`}>
          {toast.type === "success" ? <FaCheck /> : <FaTimes />} {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">About Section</h1>
        <button
          id="save-about-btn"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <FaSave /> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Bio */}
        <section className="card">
          <h2 className="section-title">Bio</h2>
          <div className="space-y-3">
            <div>
              <label className="label">Bio Paragraph 1</label>
              <textarea className="input min-h-[80px] resize-y" value={data.bio1} onChange={(e) => setData((d) => ({ ...d, bio1: e.target.value }))} placeholder="I'm a passionate..." />
            </div>
            <div>
              <label className="label">Bio Paragraph 2</label>
              <textarea className="input min-h-[80px] resize-y" value={data.bio2} onChange={(e) => setData((d) => ({ ...d, bio2: e.target.value }))} placeholder="With over 2 years..." />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Stats</h2>
            <button onClick={addStat} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs"><FaPlus /> Add</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {data.stats.map((stat, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input className="input w-20 shrink-0" value={stat.number} onChange={(e) => updateStat(i, "number", e.target.value)} placeholder="20+" />
                <input className="input flex-1" value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Projects Done" />
                <button onClick={() => setData((d) => ({ ...d, stats: d.stats.filter((_, idx) => idx !== i) }))} className="text-slate-500 hover:text-red-400 shrink-0"><FaTimes className="text-xs" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="card">
          <h2 className="section-title">Highlights ("What I Bring")</h2>
          <div className="space-y-2 mb-3">
            {data.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
                <span className="text-slate-300 text-sm flex-1">{h}</span>
                <button onClick={() => setData((d) => ({ ...d, highlights: d.highlights.filter((_, idx) => idx !== i) }))} className="text-slate-500 hover:text-red-400"><FaTimes className="text-xs" /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="input flex-1" value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())} placeholder="Add a highlight…" />
            <button onClick={addHighlight} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"><FaPlus /></button>
          </div>
        </section>

        {/* Skills */}
        <section className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Skills</h2>
            <button onClick={addSkill} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs"><FaPlus /> Add</button>
          </div>
          <div className="space-y-3">
            {data.skills.map((skill, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center bg-slate-800 rounded-lg p-3">
                <input className="input col-span-3" value={skill.name} onChange={(e) => updateSkill(i, "name", e.target.value)} placeholder="Frontend" />
                <input className="input col-span-4" value={skill.tech} onChange={(e) => updateSkill(i, "tech", e.target.value)} placeholder="React, Next.js" />
                <div className="col-span-3 flex items-center gap-2">
                  <input type="range" min={0} max={100} value={skill.level} onChange={(e) => updateSkill(i, "level", +e.target.value)} className="flex-1 accent-emerald-500" />
                  <span className="text-emerald-400 text-xs font-bold w-8 shrink-0">{skill.level}%</span>
                </div>
                <select className="input col-span-1 text-xs" value={skill.iconName} onChange={(e) => updateSkill(i, "iconName", e.target.value)}>
                  {ICON_OPTIONS.map((ic) => <option key={ic}>{ic}</option>)}
                </select>
                <button onClick={() => setData((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }))} className="text-slate-500 hover:text-red-400 col-span-1 flex justify-center"><FaTimes className="text-xs" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Tech List */}
        <section className="card">
          <h2 className="section-title">Tech Scrolling Banner</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {data.techList.map((t, i) => (
              <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-xs">
                {t}
                <button onClick={() => setData((d) => ({ ...d, techList: d.techList.filter((_, idx) => idx !== i) }))} className="text-slate-500 hover:text-red-400"><FaTimes className="text-xs" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="input flex-1" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} placeholder="Add technology…" />
            <button onClick={addTech} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"><FaPlus /></button>
          </div>
        </section>
      </div>

      <style>{`
        .card { background: #0f172a; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.5rem; }
        .section-title { font-size: 1rem; font-weight: 600; color: #f1f5f9; margin-bottom: 1rem; }
        .label { display: block; font-size: 0.75rem; font-weight: 500; color: #94a3b8; margin-bottom: 0.375rem; }
        .input { width: 100%; padding: 0.5rem 0.75rem; background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; color: white; font-size: 0.875rem; outline: none; transition: border-color 0.15s; }
        .input:focus { border-color: #10b981; }
        select.input option { background: #1e293b; }
      `}</style>
    </div>
  );
}
