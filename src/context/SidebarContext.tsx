"use client";

import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";

interface SidebarContextValue {
  collapsed: boolean;
  toggleCollapsed: () => void;
  applyDefault: (defaultCollapsed: boolean) => void;
  sidebarWidth: number;
  setSidebarWidth: (w: number) => void;
  saveSidebarWidth: (w: number) => void;
  isResizing: boolean;
  setIsResizing: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidthState] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const defaultApplied = useRef(false);

  // Read persisted preferences synchronously before paint
  useLayoutEffect(() => {
    const c = localStorage.getItem("sidebarCollapsed");
    if (c !== null) setCollapsed(c === "true");
    const w = localStorage.getItem("sidebarWidth");
    if (w) {
      const n = parseInt(w, 10);
      if (n >= 180 && n <= 840) setSidebarWidthState(n);
    }
  }, []);

  // Only applies once per session, and only when no saved preference exists
  const applyDefault = useCallback((defaultCollapsed: boolean) => {
    if (defaultApplied.current) return;
    defaultApplied.current = true;
    if (localStorage.getItem("sidebarCollapsed") === null) {
      setCollapsed(defaultCollapsed);
    }
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebarCollapsed", String(next));
      return next;
    });
  }, []);

  // Called during drag — no localStorage write (too frequent)
  const setSidebarWidth = useCallback((w: number) => {
    setSidebarWidthState(w);
  }, []);

  // Called on drag end — persists to localStorage
  const saveSidebarWidth = useCallback((w: number) => {
    setSidebarWidthState(w);
    localStorage.setItem("sidebarWidth", String(w));
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggleCollapsed,
        applyDefault,
        sidebarWidth,
        setSidebarWidth,
        saveSidebarWidth,
        isResizing,
        setIsResizing,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
