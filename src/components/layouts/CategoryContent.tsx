"use client";

import { useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
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
import InitialAvatar from "@/components/ui/InitialAvatar";
import { formatRelativeDate, calcReadTime } from "@/lib/utils";
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
export type SortOption =
  | "newest"
  | "oldest"
  | "alpha"
  | "read-time"
  | "read-time-desc"
  | "author";
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
  initialFilter?: string;
  initialSort?: SortOption;
  initialAuthor?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  alpha: "Title (A–Z)",
  "read-time": "Read time (asc)",
  "read-time-desc": "Read time (desc)",
  author: "Author (A–Z)",
};

// Which sort options apply to each content type
const AVAILABLE_SORTS: Record<ContentType, SortOption[]> = {
  app: ["newest", "oldest", "alpha"],
  campaign: ["newest", "oldest", "alpha"],
  mechanism: ["newest", "oldest", "alpha", "read-time", "read-time-desc"],
  research: [
    "newest",
    "oldest",
    "alpha",
    "read-time",
    "read-time-desc",
    "author",
  ],
  "case-study": [
    "newest",
    "oldest",
    "alpha",
    "read-time",
    "read-time-desc",
    "author",
  ],
};

const BASE_HREFS: Record<ContentType, string> = {
  app: "/apps",
  mechanism: "/mechanisms",
  research: "/research",
  "case-study": "/case-studies",
  campaign: "/campaigns",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sortKey(item: BaseContent): string {
  return (item as Campaign).startDate ?? item.lastUpdated;
}

// Active = campaign that hasn't ended yet (no endDate or endDate in the future)
function isActive(item: BaseContent): boolean {
  const endDate = (item as Campaign).endDate;
  if (endDate === undefined) return false; // not a campaign
  return !endDate || new Date(endDate) > new Date();
}

function itemAuthors(item: BaseContent): string[] {
  return item.authors ?? [];
}

function sortItems(items: BaseContent[], sort: SortOption): BaseContent[] {
  const sorted = [...items];
  if (sort === "newest")
    return sorted.sort((a, b) => {
      const aActive = isActive(a);
      const bActive = isActive(b);
      if (aActive !== bActive) return aActive ? -1 : 1;
      return sortKey(b).localeCompare(sortKey(a));
    });
  if (sort === "oldest")
    return sorted.sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
  if (sort === "read-time" || sort === "read-time-desc") {
    const withTime = sorted.map((item) => ({
      item,
      t: calcReadTime(item.description),
    }));
    withTime.sort((a, b) => (sort === "read-time" ? a.t - b.t : b.t - a.t));
    return withTime.map(({ item }) => item);
  }
  if (sort === "author")
    return sorted.sort((a, b) =>
      itemAuthors(a)[0].localeCompare(itemAuthors(b)[0]),
    );
  return sorted.sort((a, b) => a.name.localeCompare(b.name));
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
  showDate,
  showAuthor,
  showReadTime,
}: {
  item: BaseContent;
  href: string;
  preferLogo: boolean;
  showDate: boolean;
  showAuthor: boolean;
  showReadTime: boolean;
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
            {showDate && (
              <span className="text-xs text-gray-500 shrink-0 tabular-nums">
                {formatRelativeDate(
                  (item as Campaign).startDate ?? item.lastUpdated,
                )}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-300 font-serif mt-0.5 line-clamp-2 sm:line-clamp-4">
            {item.shortDescription}
          </p>
          {(showAuthor || showReadTime) && (
            <p className="text-xs text-gray-500 mt-1.5">
              {showAuthor && `By ${itemAuthors(item).join(", ")}`}
              {showAuthor && showReadTime && " · "}
              {showReadTime && `${calcReadTime(item.description)} min read`}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function SortDropdown({
  sort,
  onChange,
  available,
}: {
  sort: SortOption;
  onChange: (v: SortOption) => void;
  available: SortOption[];
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
          {available.map((value) => (
            <DropdownMenu.Item
              key={value}
              onSelect={() => onChange(value)}
              className="flex items-center justify-between gap-4 px-3 py-2 text-sm rounded-md text-gray-300 hover:text-gray-25 hover:bg-gray-800 cursor-pointer outline-none"
            >
              {SORT_LABELS[value]}
              {sort === value && (
                <Check className="w-3.5 h-3.5 text-teal-400" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function AuthorFilter({
  authors,
  active,
  onChange,
}: {
  authors: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-600 bg-gray-950 text-gray-300 text-sm hover:border-gray-400 hover:text-gray-25 transition-colors cursor-pointer outline-none data-[state=open]:border-teal-500 data-[state=open]:text-gray-25">
        {active === "all" ? "All authors" : active}
        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          className="z-50 min-w-44 rounded-lg overflow-hidden border border-gray-600 bg-gray-950 shadow-lg shadow-black/40"
        >
          <div className="max-h-72 overflow-y-auto p-1">
            {["all", ...authors].map((value) => (
              <DropdownMenu.Item
                key={value}
                onSelect={() => onChange(value)}
                className="flex items-center justify-between gap-4 px-3 py-2 text-sm rounded-md text-gray-300 hover:text-gray-25 hover:bg-gray-800 cursor-pointer outline-none"
              >
                {value === "all" ? "All authors" : value}
                {active === value && (
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                )}
              </DropdownMenu.Item>
            ))}
          </div>
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
        className={`cursor-pointer p-1.5 transition-colors ${view === "grid" ? activeClass : inactiveClass}`}
        aria-label="Grid view"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange("list")}
        className={`cursor-pointer p-1.5 transition-colors ${view === "list" ? activeClass : inactiveClass}`}
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
          className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
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

const AUTHOR_FILTER_TYPES: ContentType[] = ["research", "case-study"];

export function CategoryContent({
  items,
  type,
  columns = 3,
  itemLabel = "items",
  filters,
  initialFilter = "all",
  initialSort = "newest",
  initialAuthor = "all",
}: CategoryContentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [sort, setSort] = useState<SortOption>(initialSort);
  const [view, setView] = useState<ViewOption>("grid");
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
  const [activeAuthor, setActiveAuthor] = useState<string>(initialAuthor);

  function buildUrl(overrides: {
    filter?: string;
    sort?: SortOption;
    author?: string;
  }) {
    const f = overrides.filter ?? activeFilter;
    const s = overrides.sort ?? sort;
    const a = overrides.author ?? activeAuthor;
    const params = new URLSearchParams();
    if (f && f !== "all") params.set("type", f);
    if (s && s !== "newest") params.set("sort", s);
    if (a && a !== "all") params.set("author", a);
    const qs = params.toString();
    return `${pathname}${qs ? `?${qs}` : ""}`;
  }

  function handleFilterChange(value: string) {
    setActiveFilter(value);
    router.replace(buildUrl({ filter: value }), { scroll: false });
  }

  function handleSortChange(value: SortOption) {
    setSort(value);
    router.replace(buildUrl({ sort: value }), { scroll: false });
  }

  function handleAuthorChange(value: string) {
    setActiveAuthor(value);
    router.replace(buildUrl({ author: value }), { scroll: false });
  }

  const showAuthorFilter = AUTHOR_FILTER_TYPES.includes(type);
  const availableSorts = AVAILABLE_SORTS[type];

  // Unique sorted authors across all items (only for types that support it)
  const uniqueAuthors = useMemo(() => {
    if (!showAuthorFilter) return [];
    const seen = new Set<string>();
    for (const item of items) {
      for (const a of itemAuthors(item)) seen.add(a);
    }
    return Array.from(seen).sort();
  }, [items, showAuthorFilter]);

  const authorFiltered = useMemo(() => {
    if (!showAuthorFilter || activeAuthor === "all") return items;
    return items.filter((item) => itemAuthors(item).includes(activeAuthor));
  }, [items, showAuthorFilter, activeAuthor]);

  const filtered = useMemo(
    () =>
      !filters || activeFilter === "all"
        ? authorFiltered
        : authorFiltered.filter(
            (item) => (item as any)[filters.key] === activeFilter,
          ),
    [authorFiltered, filters, activeFilter],
  );

  const sorted = useMemo(() => sortItems(filtered, sort), [filtered, sort]);
  const baseHref = BASE_HREFS[type];
  const preferLogo = type === "app";
  const showDate = type !== "app";
  const showReadTime = (
    ["mechanism", "research", "case-study"] as ContentType[]
  ).includes(type);
  const showAuthor = (["research", "case-study"] as ContentType[]).includes(
    type,
  );

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        {filters ? (
          <FilterTabs
            options={filters.options}
            active={activeFilter}
            onChange={handleFilterChange}
          />
        ) : (
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-25">{items.length}</span>{" "}
            {itemLabel}
          </p>
        )}
        <div className="flex items-center gap-2">
          {showAuthorFilter && uniqueAuthors.length > 1 && (
            <AuthorFilter
              authors={uniqueAuthors}
              active={activeAuthor}
              onChange={handleAuthorChange}
            />
          )}
          <SortDropdown
            sort={sort}
            onChange={handleSortChange}
            available={availableSorts}
          />
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
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 2 ? "380px" : "300px"}, 1fr))`,
          }}
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
              showDate={showDate}
              showAuthor={showAuthor}
              showReadTime={showReadTime}
            />
          ))}
        </div>
      )}
    </div>
  );
}
