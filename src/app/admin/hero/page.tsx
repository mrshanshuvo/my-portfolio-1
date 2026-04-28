"use client";
import { useState, useEffect, useRef } from "react";
import type { Hero, TypeSequenceItem, SocialLink } from "@/types";
import {
  FaPlus,
  FaTimes,
  FaCheck,
  FaSave,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
  FaLink,
  FaUser,
  FaInfoCircle,
  FaImage,
  FaFileAlt,
  FaUpload,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const DEFAULT: Hero = {
  name: "Shahid Hasan",
  lastName: "Shuvo",
  typeSequences: [
    { text: "Full-Stack Web Developer", delay: 2000 },
    { text: "Computer Engineer", delay: 2000 },
  ],
  bio: "Crafting exceptional digital experiences with clean code and modern technologies.",
  profileImage: "/PP1.jpeg",
  resumeUrl: "/Resume_of_Shahid_Hasan_Shuvo.pdf",
  socialLinks: [],
};

const PLATFORM_OPTIONS = [
  "GitHub",
  "LinkedIn",
  "LeetCode",
  "Email",
  "Twitter",
  "Instagram",
];

const platformIconMap: Record<string, any> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  LeetCode: SiLeetcode,
  Email: FaEnvelope,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
};

export default function AdminHeroPage() {
  const [data, setData] = useState<Hero>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    fetch("/api/admin/hero")
      .then((r) => r.json())
      .then((d) => {
        setData(Object.keys(d).length ? { ...DEFAULT, ...d } : DEFAULT);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) showToast("Hero section saved successfully!");
    else showToast("Failed to save changes.", "error");
  }

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profileImage" | "resumeUrl",
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(field);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const d = await res.json();
      if (d.url) {
        setData((prev) => ({ ...prev, [field]: d.url }));
        showToast("File uploaded successfully!");
      } else {
        showToast(d.error || "Upload failed", "error");
      }
    } catch (err) {
      showToast("Upload failed", "error");
    } finally {
      setUploading(null);
    }
  }

  function updateSeq(
    i: number,
    field: keyof TypeSequenceItem,
    val: string | number,
  ) {
    setData((d) => {
      const seqs = [...d.typeSequences];
      seqs[i] = { ...seqs[i], [field]: val };
      return { ...d, typeSequences: seqs };
    });
  }

  function addLink() {
    setData((d) => ({
      ...d,
      socialLinks: [
        ...d.socialLinks,
        { platform: "GitHub", href: "", label: "GitHub" },
      ],
    }));
  }

  function updateLink(i: number, field: keyof SocialLink, val: string) {
    setData((d) => {
      const links = [...d.socialLinks];
      links[i] = { ...links[i], [field]: val };
      if (field === "platform") links[i].label = val;
      return { ...d, socialLinks: links };
    });
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-slate-400 font-medium animate-pulse">
            Loading Hero Data...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                : "bg-red-500/20 border-red-500/50 text-red-400"
            }`}
          >
            <div
              className={`p-2 rounded-full ${toast.type === "success" ? "bg-emerald-500/20" : "bg-red-500/20"}`}
            >
              {toast.type === "success" ? <FaCheck /> : <FaTimes />}
            </div>
            <span className="font-semibold">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <FaArrowLeft size={12} /> Back to Dashboard
          </Link>
        </div>
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              Hero Section
            </h1>
            <p className="text-slate-400">
              Manage your portfolio's first impression and bio.
            </p>
          </div>
          <button
            id="save-hero-btn"
            onClick={handleSave}
            disabled={saving}
            className="relative group overflow-hidden flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-600/20 active:scale-95"
          >
            <FaSave
              className={`transition-transform duration-500 ${saving ? "animate-spin" : "group-hover:rotate-12"}`}
            />
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editor Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Identity Card */}
            <section className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
                  <FaUser size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Identity</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400 ml-1">
                    First Name
                  </label>
                  <input
                    className="modern-input"
                    value={data.name}
                    onChange={(e) =>
                      setData((d) => ({ ...d, name: e.target.value }))
                    }
                    placeholder="e.g. Shahid Hasan"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400 ml-1">
                    Last Name{" "}
                    <span className="text-blue-400">(Highlighted)</span>
                  </label>
                  <input
                    className="modern-input"
                    value={data.lastName}
                    onChange={(e) =>
                      setData((d) => ({ ...d, lastName: e.target.value }))
                    }
                    placeholder="e.g. Shuvo"
                  />
                </div>
              </div>
            </section>

            {/* Typing Sequences Card */}
            <section className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl">
                    <FaInfoCircle size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Typing Sequences
                  </h2>
                </div>
                <button
                  onClick={() =>
                    setData((d) => ({
                      ...d,
                      typeSequences: [
                        ...d.typeSequences,
                        { text: "", delay: 2000 },
                      ],
                    }))
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-bold transition-colors border border-white/5"
                >
                  <FaPlus size={12} /> Add New
                </button>
              </div>
              <div className="space-y-4">
                {data.typeSequences.map((seq, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i}
                    className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 bg-slate-800/40 rounded-2xl border border-white/5 group"
                  >
                    <div className="flex-1 w-full">
                      <input
                        className="modern-input-small"
                        value={seq.text}
                        onChange={(e) => updateSeq(i, "text", e.target.value)}
                        placeholder="e.g. Full-Stack Developer"
                      />
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="relative">
                        <input
                          type="number"
                          className="modern-input-small w-28 pr-10"
                          value={seq.delay}
                          onChange={(e) =>
                            updateSeq(i, "delay", +e.target.value)
                          }
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500 uppercase">
                          ms
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setData((d) => ({
                            ...d,
                            typeSequences: d.typeSequences.filter(
                              (_, idx) => idx !== i,
                            ),
                          }))
                        }
                        className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Bio Card */}
            <section className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <FaFileAlt size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Biography</h2>
              </div>
              <textarea
                className="modern-input min-h-[120px] py-4 resize-none"
                value={data.bio}
                onChange={(e) =>
                  setData((d) => ({ ...d, bio: e.target.value }))
                }
                placeholder="Write a compelling introduction..."
              />
            </section>

            {/* Assets Card */}
            <section className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
                  <FaImage size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Assets</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Image UI */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-400 ml-1">
                    Profile Image
                  </label>
                  <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 aspect-square max-w-[200px] mx-auto flex items-center justify-center">
                    {data.profileImage ? (
                      <>
                        <Image
                          src={data.profileImage}
                          alt="Profile Preview"
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                          <button
                            onClick={() => imageInputRef.current?.click()}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/20 transition-all"
                          >
                            {uploading === "profileImage"
                              ? "Uploading..."
                              : "Change Image"}
                          </button>
                          <span className="text-[10px] text-slate-300 px-2 text-center break-all max-w-[150px]">
                            {data.profileImage.split("/").pop()}
                          </span>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        className="flex flex-col items-center gap-3 text-slate-500 hover:text-blue-400 transition-colors"
                      >
                        <FaImage size={32} />
                        <span className="text-xs font-bold">
                          Click to Upload
                        </span>
                      </button>
                    )}
                    {uploading === "profileImage" && (
                      <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                      </div>
                    )}
                    <input
                      type="file"
                      ref={imageInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleUpload(e, "profileImage")}
                    />
                  </div>
                </div>

                {/* Resume PDF UI */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-400 ml-1">
                    Resume PDF
                  </label>
                  <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 aspect-square max-w-[200px] mx-auto flex flex-col items-center justify-center p-6 text-center">
                    <div
                      className={`p-4 rounded-2xl mb-4 transition-colors ${data.resumeUrl ? "bg-amber-500/20 text-amber-500" : "bg-slate-800 text-slate-600"}`}
                    >
                      <FaFileAlt size={40} />
                    </div>

                    {data.resumeUrl ? (
                      <div className="space-y-3">
                        <p className="text-[11px] font-medium text-slate-400 break-all line-clamp-2">
                          {data.resumeUrl.split("/").pop()}
                        </p>
                        <button
                          onClick={() => resumeInputRef.current?.click()}
                          className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-white transition-all border border-white/5"
                        >
                          {uploading === "resumeUrl"
                            ? "Uploading..."
                            : "Change PDF"}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => resumeInputRef.current?.click()}
                        className="text-xs font-bold text-slate-500 hover:text-amber-400 transition-colors"
                      >
                        Click to Upload PDF
                      </button>
                    )}

                    {uploading === "resumeUrl" && (
                      <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                      </div>
                    )}
                    <input
                      type="file"
                      ref={resumeInputRef}
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => handleUpload(e, "resumeUrl")}
                    />
                  </div>
                  {data.resumeUrl && (
                    <a
                      href={data.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-[10px] font-bold text-slate-500 hover:text-blue-400 transition-colors uppercase tracking-wider"
                    >
                      View Current File
                    </a>
                  )}
                </div>
              </div>
            </section>

            {/* Social Links Card */}
            <section className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-pink-500/20 text-pink-400 rounded-xl">
                    <FaLink size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Social Connections
                  </h2>
                </div>
                <button
                  onClick={addLink}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-bold transition-all border border-white/5 active:scale-95"
                >
                  <FaPlus size={12} /> Add New Link
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                  {data.socialLinks.map((link, i) => {
                    const Icon = platformIconMap[link.platform] || FaLink;
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={i}
                        className="relative group flex flex-col md:flex-row gap-4 p-5 bg-slate-950/40 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all hover:bg-slate-900/60"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`p-3 rounded-xl transition-colors ${link.href ? "bg-blue-500/10 text-blue-400" : "bg-slate-800 text-slate-500"}`}>
                            <Icon size={20} />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="relative inline-block w-full md:w-auto">
                              <select
                                className="bg-transparent text-xs font-bold text-slate-400 uppercase tracking-widest appearance-none pr-6 cursor-pointer focus:outline-none hover:text-white transition-colors"
                                value={link.platform}
                                onChange={(e) => updateLink(i, "platform", e.target.value)}
                              >
                                {PLATFORM_OPTIONS.map((p) => (
                                  <option key={p} className="bg-slate-900 text-white">
                                    {p}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-slate-600">▼</div>
                            </div>
                            <input
                              className="w-full bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none"
                              value={link.href}
                              onChange={(e) => updateLink(i, "href", e.target.value)}
                              placeholder={`Your ${link.platform} profile URL...`}
                            />
                          </div>
                        </div>
                        
                        <button
                          onClick={() =>
                            setData((d) => ({
                              ...d,
                              socialLinks: d.socialLinks.filter((_, idx) => idx !== i),
                            }))
                          }
                          className="absolute md:relative -top-2 -right-2 md:top-auto md:right-auto p-2 text-slate-500 hover:text-red-400 bg-slate-900 md:bg-transparent rounded-full md:rounded-xl border border-white/10 md:border-none shadow-lg md:shadow-none transition-all opacity-0 group-hover:opacity-100"
                        >
                          <FaTimes size={14} />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {data.socialLinks.length === 0 && (
                  <div className="text-center py-12 bg-slate-950/20 rounded-3xl border border-dashed border-white/5">
                    <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                      <FaLink size={20} />
                    </div>
                    <p className="text-slate-500 text-sm font-medium">
                      No social connections linked yet.
                    </p>
                    <button 
                      onClick={addLink}
                      className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4"
                    >
                      Add your first link
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="flex items-center gap-3 mb-6 ml-1">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg animate-pulse">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <h2 className="text-xl font-bold text-white">Live Preview</h2>
              </div>

              <div className="preview-container rounded-[2.5rem] p-8 border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Avatar Preview */}
                  <div className="relative w-32 h-32 mb-8 group">
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-blue-500 rounded-full animate-spin-slow opacity-75 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-1 bg-slate-900 rounded-full" />
                    <div className="absolute inset-2 rounded-full overflow-hidden border border-white/10">
                      <Image
                        src={data.profileImage || "/PP1.jpeg"}
                        alt="Profile"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Name Preview */}
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                    {data.name || "First Name"}{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">
                      {data.lastName || "Last Name"}
                    </span>
                  </h3>

                  {/* Type Seq Preview */}
                  <div className="text-sm font-medium text-blue-400 mb-6 px-4 py-1.5 bg-blue-400/10 rounded-full border border-blue-400/20 min-h-[32px] flex items-center justify-center">
                    {data.typeSequences.length > 0 ? (
                      <TypeAnimation
                        key={JSON.stringify(data.typeSequences)}
                        sequence={data.typeSequences.flatMap((s) => [
                          s.text,
                          s.delay,
                        ])}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                      />
                    ) : (
                      <span className="opacity-50 italic">
                        Add a typing sequence...
                      </span>
                    )}
                  </div>

                  {/* Bio Preview */}
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
                    {data.bio || "Crafting exceptional digital experiences..."}
                  </p>

                  {/* Links Preview */}
                  <div className="flex gap-3 mb-8">
                    {data.socialLinks.map((link, i) => {
                      const Icon = platformIconMap[link.platform] || FaLink;
                      return (
                        <div
                          key={i}
                          className="p-2.5 bg-slate-800/80 text-slate-400 rounded-xl border border-white/5"
                        >
                          <Icon size={16} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              </div>

              <div className="mt-8 p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  * This preview shows a simplified visual representation of
                  your Hero section as it will appear to visitors. Actual
                  animations and spacing may vary slightly based on the device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .modern-input {
          width: 100%;
          padding: 0.875rem 1.25rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          color: white;
          font-size: 0.9375rem;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .modern-input:focus {
          border-color: #10b981;
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
          transform: translateY(-1px);
        }
        .modern-input-small {
          width: 100%;
          padding: 0.625rem 1rem;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .modern-input-small:focus {
          border-color: #3b82f6;
          background: rgba(15, 23, 42, 0.6);
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .glass-card {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        ::selection {
          background: rgba(16, 185, 129, 0.3);
          color: white;
        }
      `}</style>
    </div>
  );
}
