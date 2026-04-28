"use client";
import { useState, useEffect } from "react";
import type { Project } from "@/types";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaRegStar,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

const TECH_OPTIONS = [
  "React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Express.js",
  "Firebase", "Leaflet", "TensorFlow", "Django", "Docker", "Python",
  "TypeScript", "PostgreSQL", "Redis", "GraphQL", "Prisma",
];

const CATEGORY_OPTIONS = ["Full Stack", "Frontend", "Backend", "ML/AI", "Mobile", "Other"];
const COLOR_OPTIONS = ["emerald", "blue", "amber"] as const;

const EMPTY_PROJECT: Omit<Project, "_id"> = {
  title: "",
  slug: "",
  description: "",
  image: "",
  techNames: [],
  github: "",
  live: "",
  featured: false,
  category: "Full Stack",
  improvements: [],
  order: 0,
};

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "_id">>(EMPTY_PROJECT);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [improvementInput, setImprovementInput] = useState("");

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function loadProjects() {
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => { loadProjects(); }, []);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_PROJECT);
    setImprovementInput("");
    setShowForm(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({ ...p });
    setImprovementInput("");
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditing(null); }

  async function handleSave() {
    const url = editing ? `/api/admin/projects/${editing._id}` : "/api/admin/projects";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      showToast(editing ? "Project updated!" : "Project created!");
      closeForm();
      loadProjects();
    } else {
      showToast("Failed to save project.", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    showToast("Project deleted.");
    loadProjects();
  }

  function toggleTech(tech: string) {
    setForm((f) => ({
      ...f,
      techNames: f.techNames.includes(tech)
        ? f.techNames.filter((t) => t !== tech)
        : [...f.techNames, tech],
    }));
  }

  function addImprovement() {
    if (!improvementInput.trim()) return;
    setForm((f) => ({ ...f, improvements: [...f.improvements, improvementInput.trim()] }));
    setImprovementInput("");
  }

  function removeImprovement(i: number) {
    setForm((f) => ({ ...f, improvements: f.improvements.filter((_, idx) => idx !== i) }));
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 ${
          toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
        }`}>
          {toast.type === "success" ? <FaCheck /> : <FaTimes />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Projects</h1>
          <p className="text-slate-400 text-sm">{projects.length} projects total</p>
        </div>
        <button
          id="add-project-btn"
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {/* Project list */}
      {loading ? (
        <div className="text-slate-400 text-center py-20">Loading…</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 mb-4">No projects yet.</p>
          <button onClick={openAdd} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm">
            Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p._id}
              className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors"
            >
              {/* Image */}
              <img
                src={p.image || "/images/placeholder.png"}
                alt={p.title}
                className="w-14 h-14 rounded-lg object-cover bg-slate-800 shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Crect width='56' height='56' fill='%231e293b'/%3E%3C/svg%3E"; }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-white font-semibold text-sm truncate">{p.title}</h3>
                  {p.featured && <FaStar className="text-amber-400 text-xs shrink-0" />}
                </div>
                <p className="text-slate-500 text-xs truncate">{p.description}</p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {p.techNames.slice(0, 4).map((t) => (
                    <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-xs">{t}</span>
                  ))}
                  {p.techNames.length > 4 && (
                    <span className="text-slate-600 text-xs">+{p.techNames.length - 4}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-xs">{p.category}</span>
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Edit"
                >
                  <FaEdit className="text-sm" />
                </button>
                <button
                  onClick={() => handleDelete(p._id!)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-white font-semibold">{editing ? "Edit Project" : "New Project"}</h2>
              <button onClick={closeForm} className="text-slate-400 hover:text-white"><FaTimes /></button>
            </div>
            <div className="p-6 space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Title</label>
                  <input
                    className="input"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))}
                    placeholder="Project Title"
                  />
                </div>
                <div>
                  <label className="label">Slug</label>
                  <input
                    className="input"
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    placeholder="project-slug"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="label">Description</label>
                <textarea
                  className="input min-h-[80px] resize-y"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Short project description"
                />
              </div>

              {/* Image */}
              <div>
                <label className="label">Image Path</label>
                <input
                  className="input"
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="/images/project.png"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">GitHub URL</label>
                  <input className="input" value={form.github} onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))} placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="label">Live URL</label>
                  <input className="input" value={form.live} onChange={(e) => setForm((f) => ({ ...f, live: e.target.value }))} placeholder="https://..." />
                </div>
              </div>

              {/* Category, Featured, Order */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="label">Category</label>
                  <select className="input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                    {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Order</label>
                  <input type="number" className="input" value={form.order ?? 0} onChange={(e) => setForm((f) => ({ ...f, order: +e.target.value }))} />
                </div>
                <div>
                  <label className="label">Featured</label>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm w-full mt-0 transition-colors ${
                      form.featured
                        ? "bg-amber-500/20 border-amber-500/30 text-amber-400"
                        : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    {form.featured ? <FaStar /> : <FaRegStar />}
                    {form.featured ? "Featured" : "Not Featured"}
                  </button>
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <label className="label">Technologies</label>
                <div className="flex flex-wrap gap-2">
                  {TECH_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTech(t)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        form.techNames.includes(t)
                          ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div>
                <label className="label">Key Improvements / Details</label>
                <div className="space-y-2 mb-2">
                  {form.improvements.map((imp, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-800 rounded-lg px-3 py-2">
                      <span className="text-slate-300 text-sm flex-1">{imp}</span>
                      <button onClick={() => removeImprovement(i)} className="text-slate-500 hover:text-red-400 shrink-0"><FaTimes className="text-xs" /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className="input flex-1"
                    value={improvementInput}
                    onChange={(e) => setImprovementInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImprovement())}
                    placeholder="Add an improvement point…"
                  />
                  <button onClick={addImprovement} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 px-6 py-4 flex gap-3 justify-end">
              <button onClick={closeForm} className="px-4 py-2 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
              <button
                id="save-project-btn"
                onClick={handleSave}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {editing ? "Save Changes" : "Create Project"}
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
