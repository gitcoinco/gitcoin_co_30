"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

type DismissCallback = () => void;

interface SearchContextType {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  dismissModal: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  dismissSidebar: () => void;
  initialQuery: string;
  openSidebar: (query?: string) => void;
  setOnDismiss: (cb: DismissCallback | null) => void;
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
  const onDismissRef = useRef<DismissCallback | null>(null);

  const setOnDismiss = useCallback((cb: DismissCallback | null) => {
    onDismissRef.current = cb;
  }, []);

  // Called when user explicitly dismisses the modal (ESC, overlay click)
  const dismissModal = useCallback(() => {
    setModalOpen(false);
    if (!sidebarOpen) onDismissRef.current?.();
  }, [sidebarOpen]);

  // Called when user explicitly closes the sidebar (X button, Cmd+I)
  const dismissSidebar = useCallback(() => {
    setSidebarOpen(false);
    if (!modalOpen) onDismissRef.current?.();
  }, [modalOpen]);

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
      value={{ modalOpen, setModalOpen, dismissModal, sidebarOpen, setSidebarOpen, dismissSidebar, initialQuery, openSidebar, setOnDismiss }}
    >
      {children}
    </SearchContext.Provider>
  );
}
