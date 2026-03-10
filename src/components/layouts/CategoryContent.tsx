"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List, ChevronDown, Check } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type {
  BaseContent,
  App,
  Mechanism,
  Research,
  CaseStudy,
  Campaign,
} from "@/lib/types";
import TagsList from "@/components/ui/TagsList";
import InitialAvatar from "@/components/ui/InitialAvatar";
import AppCard from "@/components/cards/AppCard";
import MechanismCard from "@/components/cards/MechanismCard";
import ResearchCard from "@/components/cards/ResearchCard";
import CaseStudyCard from "@/components/cards/CaseStudyCard";
import CampaignCard from "@/components/cards/CampaignCard";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentType =
  | "app"
  | "mechanism"
  | "research"
  | "case-study"
  | "campaign";
type SortOption = "newest" | "oldest" | "alpha";
type ViewOption = "grid" | "list";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string; // field name on the item, e.g. 'researchType'
  options: FilterOption[];
}

interface CategoryContentProps {
  items: BaseContent[];
  type: ContentType;
  columns?: 2 | 3;
  itemLabel?: string;
  filters?: FilterConfig;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  alpha: "Name (A–Z)",
};

const BASE_HREFS: Record<ContentType, string> = {
  app: "/apps",
  mechanism: "/mechanisms",
  research: "/research",
  "case-study": "/case-studies",
  campaign: "/campaigns",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sortItems(items: BaseContent[], sort: SortOption): BaseContent[] {
  const sorted = [...items];
  if (sort === "newest")
    return sorted.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
  if (sort === "oldest")
    return sorted.sort((a, b) => a.lastUpdated.localeCompare(b.lastUpdated));
  return sorted.sort((a, b) => a.name.localeCompare(b.name));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GridCard({ item, type }: { item: BaseContent; type: ContentType }) {
  switch (type) {
    case "app":
      return <AppCard app={item as App} />;
    case "mechanism":
      return <MechanismCard mechanism={item as Mechanism} />;
    case "research":
      return <ResearchCard research={item as Research} />;
    case "case-study":
      return <CaseStudyCard caseStudy={item as CaseStudy} />;
    case "campaign":
      return <CampaignCard campaign={item as Campaign} />;
  }
}

function ListThumbnail({
  item,
  preferLogo,
}: {
  item: BaseContent;
  preferLogo: boolean;
}) {
  const logo = preferLogo ? item.logo : undefined;
  const banner = preferLogo ? undefined : item.banner || item.logo;
  const size = preferLogo ? "w-14 h-14" : "w-20 h-14";

  return (
    <div
      className={`relative ${size} rounded-lg overflow-hidden shrink-0 bg-gray-800`}
    >
      {logo ? (
        <Image
          src={logo}
          alt={`${item.name} logo`}
          fill
          sizes="56px"
          className="object-cover"
        />
      ) : banner ? (
        <Image
          src={banner}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <InitialAvatar
          name={item.name}
          className="w-full h-full"
          textClassName="text-2xl"
        />
      )}
    </div>
  );
}

function ListRow({
  item,
  href,
  preferLogo,
}: {
  item: BaseContent;
  href: string;
  preferLogo: boolean;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-4 px-3 sm:px-5 py-4 rounded-xl border border-gray-600 bg-gray-900 transition-all duration-300 group hover:border-teal-500 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.6)] bg-bottom bg-no-repeat bg-size-[100%_0%] hover:bg-size-[100%_50%] bg-[linear-gradient(to_top,rgba(2,226,172,0.5),transparent)]">
        <div className="">
          <ListThumbnail item={item} preferLogo={preferLogo} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-x-4 gap-y-2 sm:flex-row flex-col">
            <h3 className="font-semibold text-gray-25 line-clamp-3 text-base sm:text-2xl">
              {item.name}
            </h3>
            <span className="text-xs text-gray-500 shrink-0 tabular-nums">
              {formatDate(item.lastUpdated)}
            </span>
          </div>
          <p className="text-sm text-gray-300 font-serif mt-0.5 line-clamp-2 sm:line-clamp-4">
            {item.shortDescription}
          </p>
          {/* {item.tags.length > 0 && (
            <div className="mt-2">
              <TagsList tags={item.tags} maxTags={2} size="sm" />
            </div>
          )} */}
        </div>
      </div>
    </Link>
  );
}

function SortDropdown({
  sort,
  onChange,
}: {
  sort: SortOption;
  onChange: (v: SortOption) => void;
}) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-600 bg-gray-950 text-gray-300 text-sm hover:border-gray-400 hover:text-gray-25 transition-colors cursor-pointer outline-none data-[state=open]:border-teal-500 data-[state=open]:text-gray-25">
        {SORT_LABELS[sort]}
        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          className="z-50 min-w-40 rounded-lg border border-gray-600 bg-gray-950 p-1 shadow-lg shadow-black/40"
        >
          {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(
            ([value, label]) => (
              <DropdownMenu.Item
                key={value}
                onSelect={() => onChange(value)}
                className="flex items-center justify-between gap-4 px-3 py-2 text-sm rounded-md text-gray-300 hover:text-gray-25 hover:bg-gray-800 cursor-pointer outline-none"
              >
                {label}
                {sort === value && (
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                )}
              </DropdownMenu.Item>
            ),
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: ViewOption;
  onChange: (v: ViewOption) => void;
}) {
  const activeClass = "bg-gray-700 text-gray-25";
  const inactiveClass = "bg-gray-950 text-gray-500 hover:text-gray-300";

  return (
    <div className="flex rounded-lg border border-gray-600 overflow-hidden">
      <button
        onClick={() => onChange("grid")}
        className={`p-1.5 transition-colors ${view === "grid" ? activeClass : inactiveClass}`}
        aria-label="Grid view"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange("list")}
        className={`p-1.5 transition-colors ${view === "list" ? activeClass : inactiveClass}`}
        aria-label="List view"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}

function FilterTabs({
  options,
  active,
  onChange,
}: {
  options: FilterOption[];
  active: string;
  onChange: (v: string) => void;
}) {
  const allOptions = [{ value: "all", label: "All" }, ...options];

  return (
    <div className="flex flex-wrap gap-2">
      {allOptions.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            active === value
              ? "bg-gray-25 text-gray-900 font-medium"
              : "bg-gray-800 text-gray-400 hover:text-gray-25"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CategoryContent({
  items,
  type,
  columns = 3,
  itemLabel = "items",
  filters,
}: CategoryContentProps) {
  const [sort, setSort] = useState<SortOption>("newest");
  const [view, setView] = useState<ViewOption>("grid");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      !filters || activeFilter === "all"
        ? items
        : items.filter((item) => (item as any)[filters.key] === activeFilter),
    [items, filters, activeFilter],
  );

  const sorted = useMemo(() => sortItems(filtered, sort), [filtered, sort]);
  const baseHref = BASE_HREFS[type];
  const preferLogo = type === "app";

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        {filters ? (
          <FilterTabs
            options={filters.options}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        ) : (
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-25">{items.length}</span>{" "}
            {itemLabel}
          </p>
        )}
        <div className="flex items-center gap-2">
          <SortDropdown sort={sort} onChange={setSort} />
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>
      {filters && (
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-medium text-gray-25">{sorted.length}</span>{" "}
          {itemLabel}
        </p>
      )}

      {/* Grid view */}
      {view === "grid" && (
        <div
          className={`grid md:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""} gap-6`}
        >
          {sorted.map((item) => (
            <GridCard key={item.slug} item={item} type={type} />
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="flex flex-col gap-3">
          {sorted.map((item) => (
            <ListRow
              key={item.slug}
              item={item}
              href={`${baseHref}/${item.slug}`}
              preferLogo={preferLogo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
