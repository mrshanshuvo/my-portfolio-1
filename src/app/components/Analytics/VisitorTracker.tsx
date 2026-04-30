"use client";
import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    // Increment visitor count on mount
    fetch("/api/analytics", { method: "POST" }).catch(() => {});
  }, []);

  return null;
}
