"use client";

import { useEffect, useState } from "react";
import { Command, Search } from "lucide-react";
import { useSearch } from "@/components/search/SearchProvider";

interface SearchBarProps {
  placeholder?: string;
  size?: "sm" | "md";
  className?: string;
}

export default function SearchBar({
  placeholder = "Search...",
  size = "md",
  className = "",
}: SearchBarProps) {
  const { setModalOpen } = useSearch();
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    setIsMac(/mac/i.test(ua));
  }, []);

  const sizeStyles = {
    sm: "gap-2 rounded-lg px-3 py-1.5 text-sm",
    md: "gap-3 rounded-xl px-4 py-3 text-base",
  };

  const iconSize = size === "sm" ? "size-3.5" : "size-5";

  return (
    <button
      type="button"
      onClick={() => setModalOpen(true)}
      className={`group flex w-full cursor-pointer items-center border border-gray-300 bg-gray-900/60 text-left hover:border-teal-500 hover:shadow-[0_0_12px_0px_rgba(2,226,172,0.4)] ${sizeStyles[size]} ${className}`}
      style={{ transition: "all 300ms ease" }}
    >
      <Search
        className={`${iconSize} shrink-0 text-gray-300 group-hover:text-teal-500`}
        style={{ transition: "color 300ms ease" }}
      />
      <span className="flex-1 text-gray-300">{placeholder}</span>
      <kbd className="shrink-0 rounded px-1.5 py-0.5 text-sm text-gray-300 font-mono">
        {isMac ? (
          <span className="flex items-center">
            <Command className="size-3" /> K
          </span>
        ) : (
          "Ctrl+K"
        )}
      </kbd>
    </button>
  );
}
