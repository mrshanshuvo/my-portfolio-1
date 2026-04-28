"use client";
import { useState, useEffect } from "react";
import type { Experience } from "@/types";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCheck, FaBriefcase, FaGraduationCap, FaAward } from "react-icons/fa";

const EMPTY: Omit<Experience, "_id"> = {
  title: "",
  org: "",
  duration: "",
  details: [],
  color: "emerald",
  type: "work",
  order: 0,
};

const TYPE_ICONS = { work: FaBriefcase, education: FaGraduationCap, certification: FaAward };

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<Omit<Experience, "_id">>(EMPTY);
  const [detailInput, setDetailInput] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    const res = await fetch("/api/admin/experience");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setEditing(null); setForm(EMPTY); setDetailInput(""); setShowForm(true); }
  function openEdit(e: Experience) { setEditing(e); setForm({ ...e }); setDetailInput(""); setShowForm(true); }
  function closeForm() { setShowForm(false); setEditing(null); }

  async function handleSave() {
    const url = editing ? `/api/admin/experience/${editing._id}` : "/api/admin/experience";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { showToast(editing ? "Updated!" : "Created!"); closeForm(); load(); }
    else showToast("Failed to save.", "error");
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
    showToast("Deleted.");
    load();
  }

  function addDetail() {
    if (!detailInput.trim()) return;
    setForm((f) => ({ ...f, details: [...f.details, detailInput.trim()] }));
    setDetailInput("");
  }

  function removeDetail(i: number) {
    setForm((f) => ({ ...f, details: f.details.filter((_, idx) => idx !== i) }));
  }

  const colorMap = { emerald: "text-emerald-400 bg-emerald-900/20 border-emerald-500/20", blue: "text-blue-400 bg-blue-900/20 border-blue-500/20", amber: "text-amber-400 bg-amber-900/20 border-amber-500/20" };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"} text-white`}>
          {toast.type === "success" ? <FaCheck /> : <FaTimes />} {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Experience & Education</h1>
          <p className="text-slate-400 text-sm">{items.length} entries</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
          <FaPlus /> Add Entry
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400 text-center py-20">Loading…</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const Icon = TYPE_ICONS[item.type];
            return (
              <div key={item._id} className="flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className={`p-2.5 rounded-lg border ${colorMap[item.color]} shrink-0`}>
                  <Icon className="text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-emerald-400 text-sm">{item.org}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{item.duration}</p>
                  <ul className="mt-2 space-y-1">
                    {item.details.map((d, i) => <li key={i} className="text-slate-400 text-xs flex gap-1.5"><span className="text-emerald-500">•</span>{d}</li>)}
                  </ul>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><FaEdit className="text-sm" /></button>
                  <button onClick={() => handleDelete(item._id!)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"><FaTrash className="text-sm" /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-semibold">{editing ? "Edit Entry" : "New Entry"}</h2>
              <button onClick={closeForm} className="text-slate-400 hover:text-white"><FaTimes /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="label">Title</label>
                <input className="input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Job Title / Degree" />
              </div>
              <div>
                <label className="label">Organization / Institution</label>
                <input className="input" value={form.org} onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))} placeholder="Company / University" />
              </div>
              <div>
                <label className="label">Duration</label>
                <input className="input" value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} placeholder="2023 - Present" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="label">Type</label>
                  <select className="input" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as Experience["type"] }))}>
                    <option value="work">Work</option>
                    <option value="education">Education</option>
                    <option value="certification">Certification</option>
                  </select>
                </div>
                <div>
                  <label className="label">Color</label>
                  <select className="input" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value as Experience["color"] }))}>
                    <option value="emerald">Emerald</option>
                    <option value="blue">Blue</option>
                    <option value="amber">Amber</option>
                  </select>
                </div>
                <div>
                  <label className="label">Order</label>
                  <input type="number" className="input" value={form.order ?? 0} onChange={(e) => setForm((f) => ({ ...f, order: +e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="label">Details / Bullet Points</label>
                <div className="space-y-2 mb-2">
                  {form.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-800 rounded-lg px-3 py-2">
                      <span className="text-slate-300 text-sm flex-1">{d}</span>
                      <button onClick={() => removeDetail(i)} className="text-slate-500 hover:text-red-400"><FaTimes className="text-xs" /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className="input flex-1" value={detailInput} onChange={(e) => setDetailInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDetail())} placeholder="Add a bullet point…" />
                  <button onClick={addDetail} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"><FaPlus /></button>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 px-6 py-4 flex gap-3 justify-end">
              <button onClick={closeForm} className="px-4 py-2 text-slate-400 hover:text-white text-sm">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium">
                {editing ? "Save Changes" : "Create Entry"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .label { display: block; font-size: 0.75rem; font-weight: 500; color: #94a3b8; margin-bottom: 0.375rem; }
        .input { width: 100%; padding: 0.5rem 0.75rem; background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; color: white; font-size: 0.875rem; outline: none; transition: border-color 0.15s; }
        .input:focus { border-color: #10b981; }
        select.input option { background: #1e293b; }
      `}</style>
    </div>
  );
}
