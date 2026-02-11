"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface SearchContextType {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  initialQuery: string;
  openSidebar: (query?: string) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}

export default function SearchProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");

  const openSidebar = useCallback((query?: string) => {
    setInitialQuery(query || "");
    setModalOpen(false);
    setSidebarOpen(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setModalOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SearchContext.Provider
      value={{ modalOpen, setModalOpen, sidebarOpen, setSidebarOpen, initialQuery, openSidebar }}
    >
      {children}
    </SearchContext.Provider>
  );
}
