"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback, Suspense, memo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronDown, ChevronLeft, Folder, FolderOpen } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

export interface SidebarItem {
  label: string;
  href: string;
}

export interface SidebarGroup {
  label: string;
  href: string;
  type?: string;
  items: SidebarItem[];
}

export interface SidebarSection {
  label: string;
  href: string;
  groups?: SidebarGroup[];
  items?: SidebarItem[];
}

interface AppSidebarClientProps {
  sections: SidebarSection[];
  defaultCollapsed?: boolean;
}

// Needs suspense
function SearchParamsReader({ onType }: { onType: (t: string | null) => void }) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  useEffect(() => { onType(type); }, [type, onType]);
  return null;
}

// Module-level pure function
function renderItems(
  items: SidebarItem[],
  attachRef: boolean,
  onItemClick: (() => void) | undefined,
  pathname: string,
  activeItemRef: React.RefObject<HTMLAnchorElement>,
) {
  return items.map((item) => {
    const isActive = pathname === item.href;
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          title={item.label}
          onClick={onItemClick}
          ref={attachRef && isActive ? activeItemRef : undefined}
          className={`block text-sm py-1 px-1.5 rounded leading-snug truncate transition-colors ${
            isActive ? "text-teal-400 font-medium" : "text-gray-300 hover:text-gray-25"
          }`}
        >
          {item.label}
        </Link>
      </li>
    );
  });
}

interface SectionRowProps {
  section: SidebarSection;
  isExpanded: boolean;
  pathname: string;
  activeType: string | null;
  attachRef: boolean;
  onItemClick?: () => void;
  onToggle: (label: string) => void;
  activeItemRef: React.RefObject<HTMLAnchorElement>;
  activeGroupRef: React.RefObject<HTMLAnchorElement>;
  activeSectionRef: React.RefObject<HTMLAnchorElement>;
}

const SectionRow = memo(function SectionRow({
  section, isExpanded, pathname, activeType, attachRef, onItemClick, onToggle,
  activeItemRef, activeGroupRef, activeSectionRef,
}: SectionRowProps) {
  const isActiveSection = pathname === section.href || pathname.startsWith(section.href + "/");
  const isExactSection = pathname === section.href;

  return (
    <div>
      <div className="sticky top-0 z-10 relative">
        <Link
          href={section.href}
          onClick={onItemClick}
          ref={attachRef && isExactSection ? activeSectionRef : undefined}
          className={`group flex items-center bg-gray-900 justify-between gap-1 py-1.5 w-full cursor-pointer transition-colors ${
            isExactSection
              ? "text-teal-400"
              : isActiveSection
              ? "text-gray-200 hover:text-gray-25"
              : "text-gray-300 hover:text-gray-200"
          }`}
        >
          <span className="flex items-center gap-1.5 text-sm font-mono uppercase tracking-widest whitespace-nowrap">
            {isExpanded ? <FolderOpen className="size-3.5 shrink-0" /> : <Folder className="size-3.5 shrink-0" />}
            {section.label}
          </span>
          <span className="shrink-0 p-0.5 text-gray-600 group-hover:text-gray-400 transition-colors">
            {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          </span>
        </Link>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(section.label); }}
          className="absolute right-0 top-0 bottom-0 w-6 cursor-pointer"
          aria-label={isExpanded ? `Collapse ${section.label}` : `Expand ${section.label}`}
        />
      </div>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="border-l border-gray-800 ml-0.5 pl-2 pt-1 pb-3">
            {section.groups && section.groups.length > 0 && (
              <div className="space-y-2">
                {section.groups.map((group) => {
                  const isActiveGroup =
                    pathname === section.href &&
                    activeType === (group.type ?? null);
                  return (
                    <div
                      key={group.href}
                      className={`border-l-2 transition-colors pl-2 ${isActiveGroup ? "border-teal-500" : "border-transparent"}`}
                    >
                      <Link
                        href={group.href}
                        onClick={onItemClick}
                        ref={attachRef && isActiveGroup ? activeGroupRef : undefined}
                        className={`block text-sm font-mono py-1 px-1 rounded leading-snug transition-colors uppercase tracking-widest ${
                          isActiveGroup ? "text-teal-400" : "text-gray-400 hover:text-gray-200"
                        }`}
                      >
                        {group.label}
                      </Link>
                      <ul className="space-y-0.5 border-l border-gray-800 ml-1 pl-2 mt-0.5">
                        {renderItems(group.items, attachRef, onItemClick, pathname, activeItemRef)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
            {section.items && section.items.length > 0 && (
              <ul className={`space-y-0.5 pl-2 ${section.groups?.length ? "mt-1" : ""}`}>
                {renderItems(section.items, attachRef, onItemClick, pathname, activeItemRef)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

function AppSidebarInner({
  sections,
  activeType,
}: {
  sections: SidebarSection[];
  activeType: string | null;
}) {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed, sidebarWidth, setSidebarWidth, saveSidebarWidth, isResizing, setIsResizing } = useSidebar();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);
  const activeGroupRef = useRef<HTMLAnchorElement>(null);
  const activeSectionRef = useRef<HTMLAnchorElement>(null);
  const isFirstScroll = useRef(true);
  const isDragging = useRef(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const s of sections) {
      if (pathname === s.href || pathname.startsWith(s.href + "/")) {
        initial.add(s.label);
      }
    }
    return initial;
  });

  const widthTransition = isResizing ? "" : "transition-[width] duration-300 ease-in-out";
  const visibleWidth = collapsed ? 0 : sidebarWidth;

  const toggleSection = useCallback((label: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    setIsResizing(true);
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setSidebarWidth(Math.min(520, Math.max(180, e.clientX)));
    };
    const onMouseUp = (e: MouseEvent) => {
      isDragging.current = false;
      setIsResizing(false);
      const w = Math.min(520, Math.max(180, e.clientX));
      saveSidebarWidth(w);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Scroll active item into view on navigation
  useEffect(() => {
    const container = scrollContainerRef.current;
    const target = activeItemRef.current ?? activeGroupRef.current ?? activeSectionRef.current;
    if (!container || !target) return;
    container.scrollTo({
      top: target.offsetTop - container.clientHeight / 2 + target.offsetHeight / 2,
      behavior: isFirstScroll.current ? "instant" : "smooth",
    });
    isFirstScroll.current = false;
  }, [pathname, activeType]);

  const homeClass = `block text-sm font-mono uppercase tracking-widest transition-colors whitespace-nowrap py-1.5 ${
    pathname === "/" ? "text-teal-400" : "text-gray-300 hover:text-gray-200"
  }`;

  const sharedSectionProps = {
    pathname,
    activeType,
    onToggle: toggleSection,
    activeItemRef: activeItemRef as React.RefObject<HTMLAnchorElement>,
    activeGroupRef: activeGroupRef as React.RefObject<HTMLAnchorElement>,
    activeSectionRef: activeSectionRef as React.RefObject<HTMLAnchorElement>,
  };

  return (
    <>
      {/* ── Mobile nav ─────────────────────────────────────────── */}
      <div className="md:hidden sticky top-[70px] z-40 border-b border-gray-800 bg-gray-900">
        <button
          className="flex items-center gap-1.5 px-4 py-3 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
          <span className="font-mono text-xs uppercase tracking-widest">Menu</span>
        </button>

        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="overflow-y-auto h-[calc(100dvh-8rem)] border-t border-gray-800">
              <nav className="px-4 py-4 space-y-4">
                <Link href="/" onClick={closeMobile} className={homeClass}>Home</Link>
                <div className="space-y-4">
                  {sections.map((section) => (
                    <SectionRow
                      key={section.label}
                      section={section}
                      isExpanded={expanded.has(section.label)}
                      attachRef={false}
                      onItemClick={closeMobile}
                      {...sharedSectionProps}
                    />
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-gray-950/80 backdrop-blur-sm"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* ── Desktop sidebar ────────────────────────────────────── */}
      <aside
        className={`hidden md:block md:relative md:shrink-0 md:overflow-visible ${widthTransition}`}
        style={{ width: visibleWidth }}
      >
        {/* Extend bg behind the fixed header (0 → 70px), z-40 to paint above Chladni canvas (z-auto) but below header (z-50) */}
        <div
          className={`absolute left-0 z-40 bg-gray-900 pointer-events-none ${widthTransition}`}
          style={{ top: -70, height: 70, width: visibleWidth }}
          aria-hidden="true"
        />
        <div className="sticky top-[70px] h-[calc(100vh-72px)] z-30 isolate">
          <div
            className={`h-full border-r border-gray-800 overflow-hidden bg-gray-900 ${widthTransition}`}
            style={{ width: visibleWidth }}
          >
            <div ref={scrollContainerRef} className="h-full overflow-y-scroll" style={{ width: sidebarWidth }}>
              <div className="py-6 px-4 space-y-4">
                <Link href="/" className={homeClass}>Home</Link>
                <nav className="space-y-4">
                  {sections.map((section) => (
                    <SectionRow
                      key={section.label}
                      section={section}
                      isExpanded={expanded.has(section.label)}
                      attachRef={true}
                      {...sharedSectionProps}
                    />
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {!collapsed && (
            <div
              onMouseDown={startResize}
              className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-teal-500/40 transition-colors z-10"
              aria-hidden="true"
            />
          )}

          <button
            onClick={toggleCollapsed}
            className="absolute left-full top-8 z-20 flex items-center justify-center w-4 h-8 bg-gray-800 border border-l-0 border-gray-700 rounded-r-md text-gray-300 hover:text-gray-25 hover:bg-gray-700 transition-colors cursor-pointer"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </div>
      </aside>
    </>
  );
}

export function AppSidebarClient({ sections, defaultCollapsed = false }: AppSidebarClientProps) {
  const [activeType, setActiveType] = useState<string | null>(null);
  const { applyDefault } = useSidebar();

  // Apply page-level default only for first-time visitors (no saved preference)
  useLayoutEffect(() => {
    applyDefault(defaultCollapsed);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Only this tiny piece needs Suspense — everything else SSRs normally */}
      <Suspense>
        <SearchParamsReader onType={setActiveType} />
      </Suspense>
      <AppSidebarInner sections={sections} activeType={activeType} />
    </>
  );
}
