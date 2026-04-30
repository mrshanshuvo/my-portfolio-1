"use client";
import { useState, useRef } from "react";
import { FaCloudUploadAlt, FaTrash, FaImage } from "react-icons/fa";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-slate-500">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative group rounded-3xl overflow-hidden border border-white/10 aspect-video bg-slate-950">
          <Image
            src={value}
            alt="Upload"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <FaCloudUploadAlt size={24} />
            </button>
            <button
              onClick={() => onChange("")}
              className="p-4 rounded-2xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative aspect-video rounded-[2.5rem] border-2 border-dashed transition-all duration-300 cursor-pointer
            flex flex-col items-center justify-center gap-4 p-8
            ${isDragging ? "border-emerald-500 bg-emerald-500/5" : "border-white/10 bg-slate-950/50 hover:bg-slate-950 hover:border-white/20"}
          `}
        >
          <div
            className={`p-6 rounded-3xl bg-slate-900 text-slate-500 transition-transform duration-500 ${isDragging ? "scale-110 rotate-3 text-emerald-400" : ""}`}
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            ) : (
              <FaCloudUploadAlt size={32} />
            )}
          </div>
          <div className="text-center">
            <p className="text-white font-bold">Click or drag to upload</p>
            <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-bold">
              PNG, JPG or WEBP (Max 5MB)
            </p>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
