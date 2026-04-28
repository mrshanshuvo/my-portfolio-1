"use client";
import { useState, useEffect } from "react";
import type { Hero, TypeSequenceItem } from "@/types";
import { FaPlus, FaTimes, FaCheck, FaSave, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const DEFAULT: Hero = {
  name: "Shahid Hasan",
  lastName: "Shuvo",
  typeSequences: [
    { text: "Full-Stack Web Developer", delay: 2000 },
    { text: "Computer Engineer", delay: 2000 },
    { text: "ML Enthusiast", delay: 2000 },
    { text: "Problem Solver", delay: 2000 },
  ],
  bio: "Crafting exceptional digital experiences with clean code and modern technologies.",
  profileImage: "/PP1.jpeg",
  resumeUrl: "/Resume_of_Shahid_Hasan_Shuvo.pdf",
  socialLinks: [],
};

const PLATFORM_OPTIONS = ["GitHub", "LinkedIn", "LeetCode", "Email", "Twitter", "Instagram"];

export default function AdminHeroPage() {
  const [data, setData] = useState<Hero>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    fetch("/api/admin/hero")
      .then((r) => r.json())
      .then((d) => { setData(Object.keys(d).length ? { ...DEFAULT, ...d } : DEFAULT); setLoading(false); });
  }, []);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) showToast("Hero section saved!");
    else showToast("Failed to save.", "error");
  }

  function updateSeq(i: number, field: keyof TypeSequenceItem, val: string | number) {
    setData((d) => {
      const seqs = [...d.typeSequences];
      seqs[i] = { ...seqs[i], [field]: val };
      return { ...d, typeSequences: seqs };
    });
  }

  function addLink() {
    setData((d) => ({ ...d, socialLinks: [...d.socialLinks, { platform: "GitHub", href: "", label: "GitHub" }] }));
  }

  function updateLink(i: number, field: string, val: string) {
    setData((d) => {
      const links = [...d.socialLinks];
      links[i] = { ...links[i], [field]: val };
      return { ...d, socialLinks: links };
    });
  }

  if (loading) return <div className="p-8 text-slate-400">Loading…</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"} text-white`}>
          {toast.type === "success" ? <FaCheck /> : <FaTimes />} {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Hero Section</h1>
        <button
          id="save-hero-btn"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium"
        >
          <FaSave /> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <section className="card">
          <h2 className="section-title">Name</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">First Name</label>
              <input className="input" value={data.name} onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))} />
            </div>
            <div>
              <label className="label">Last Name (highlighted)</label>
              <input className="input" value={data.lastName} onChange={(e) => setData((d) => ({ ...d, lastName: e.target.value }))} />
            </div>
          </div>
        </section>

        {/* Typing sequences */}
        <section className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Typing Animation Sequences</h2>
            <button
              onClick={() => setData((d) => ({ ...d, typeSequences: [...d.typeSequences, { text: "", delay: 2000 }] }))}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs"
            >
              <FaPlus /> Add
            </button>
          </div>
          <div className="space-y-2">
            {data.typeSequences.map((seq, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input className="input flex-1" value={seq.text} onChange={(e) => updateSeq(i, "text", e.target.value)} placeholder="Full-Stack Developer" />
                <div className="flex items-center gap-1 shrink-0">
                  <input type="number" className="input w-24" value={seq.delay} onChange={(e) => updateSeq(i, "delay", +e.target.value)} />
                  <span className="text-slate-500 text-xs">ms</span>
                </div>
                <button
                  onClick={() => setData((d) => ({ ...d, typeSequences: d.typeSequences.filter((_, idx) => idx !== i) }))}
                  className="text-slate-500 hover:text-red-400 shrink-0"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Bio */}
        <section className="card">
          <h2 className="section-title">Bio Blurb</h2>
          <textarea
            className="input min-h-[80px] resize-y"
            value={data.bio}
            onChange={(e) => setData((d) => ({ ...d, bio: e.target.value }))}
            placeholder="Crafting exceptional digital experiences…"
          />
        </section>

        {/* Profile & Resume */}
        <section className="card">
          <h2 className="section-title">Assets</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Profile Image Path</label>
              <input className="input" value={data.profileImage} onChange={(e) => setData((d) => ({ ...d, profileImage: e.target.value }))} placeholder="/PP1.jpeg" />
            </div>
            <div>
              <label className="label">Resume URL / Path</label>
              <input className="input" value={data.resumeUrl} onChange={(e) => setData((d) => ({ ...d, resumeUrl: e.target.value }))} placeholder="/Resume.pdf" />
            </div>
          </div>
        </section>

        {/* Social links */}
        <section className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Social Links</h2>
            <button onClick={addLink} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs">
              <FaPlus /> Add Link
            </button>
          </div>
          <div className="space-y-2">
            {data.socialLinks.map((link, i) => (
              <div key={i} className="flex gap-2 items-center">
                <select className="input w-36 shrink-0" value={link.platform} onChange={(e) => updateLink(i, "platform", e.target.value)}>
                  {PLATFORM_OPTIONS.map((p) => <option key={p}>{p}</option>)}
                </select>
                <input className="input flex-1" value={link.href} onChange={(e) => updateLink(i, "href", e.target.value)} placeholder="https://github.com/..." />
                <button onClick={() => setData((d) => ({ ...d, socialLinks: d.socialLinks.filter((_, idx) => idx !== i) }))} className="text-slate-500 hover:text-red-400 shrink-0">
                  <FaTimes className="text-xs" />
                </button>
              </div>
            ))}
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
