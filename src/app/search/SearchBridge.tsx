"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/components/search/SearchProvider";

export default function SearchBridge() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const { setModalOpen, setOnDismiss } = useSearch();

  // Register redirect callback for when user dismisses modal/sidebar
  useEffect(() => {
    setOnDismiss(() => {
      window.location.href = from;
    });
    return () => setOnDismiss(null);
  }, [from, setOnDismiss]);

  // Auto-open search modal on mount
  useEffect(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-gray-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black opacity-80" />
    </div>
  );
}
