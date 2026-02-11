"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, Hash, BookOpen, Sparkles } from "lucide-react";
import { useSearch } from "./SearchProvider";
import type { SearchResultItem } from "@/app/api/search/route";
import { Button } from "../ui";

const typeLabels: Record<string, string> = {
  app: "Apps",
  mechanism: "Mechanisms",
  "case-study": "Case Studies",
  research: "Research",
  campaign: "Campaigns",
};

const typeRoutes: Record<string, string> = {
  app: "/apps",
  mechanism: "/mechanisms",
  "case-study": "/case-studies",
  research: "/research",
  campaign: "/campaigns",
};

export default function SearchModal() {
  const { modalOpen, setModalOpen, openSidebar } = useSearch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const router = useRouter();

  const fetchResults = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length >= 2) {
      setLoading(true);
      debounceRef.current = setTimeout(() => fetchResults(query), 300);
    } else {
      setResults([]);
      setLoading(false);
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchResults]);

  useEffect(() => {
    if (!modalOpen) {
      setQuery("");
      setResults([]);
    }
  }, [modalOpen]);

  function navigateTo(result: SearchResultItem) {
    const base = typeRoutes[result.type] || "";
    router.push(`${base}/${result.slug}`);
    setModalOpen(false);
  }

  function handleAskAI() {
    openSidebar(query);
  }

  return (
    <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-[dropdown-in_150ms_ease-out] data-[state=closed]:animate-[dropdown-out_100ms_ease-in]" />
        <Dialog.Content
          className="fixed left-1/2 top-[15%] z-[101] w-full max-w-2xl -translate-x-1/2 rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl animate-[dropdown-in_150ms_ease-out] data-[state=closed]:animate-[dropdown-out_100ms_ease-in]"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          {/* Search input row */}
          <div className="flex items-center gap-3 border-b border-gray-700 px-4 py-3">
            <Search className="size-5 shrink-0 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anything..."
              className="flex-1 bg-transparent text-base text-gray-25 placeholder:text-gray-500 outline-none border-none shadow-none focus:shadow-none p-0"
            />
            <Button
              size="xs"
              variant="tertiary"
              type="button"
              onClick={handleAskAI}
              className="flex items-center gap-2"
            >
              <Sparkles className="size-3 text-iris-500" />
              Ask AI
            </Button>
            <Button
              size="xs"
              variant="tertiary"
              onClick={() => setModalOpen(false)}
            >
              <kbd>ESC</kbd>
            </Button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Empty state: suggestions */}
            {query.length === 0 && (
              <div className="py-2">
                <p className="px-4 py-2 text-xs text-gray-500">Suggestions</p>
                <ul>
                  {[
                    { label: "Apps", href: "/apps" },
                    { label: "Mechanisms", href: "/mechanisms" },
                    { label: "Case Studies", href: "/case-studies" },
                    { label: "Research", href: "/research" },
                    { label: "Campaigns", href: "/campaigns" },
                  ].map((item) => (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => {
                          router.push(item.href);
                          setModalOpen(false);
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-gray-200 hover:bg-gray-950/60"
                        style={{ transition: "background 150ms ease" }}
                      >
                        <BookOpen className="size-4 shrink-0 text-gray-500" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {query.length > 0 && query.length < 2 && (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                Type at least 2 characters to search
              </div>
            )}

            {loading && query.length >= 2 && (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                Searching...
              </div>
            )}

            {!loading && query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                No results found for &ldquo;{query}&rdquo;
              </div>
            )}

            {results.length > 0 && (
              <ul className="py-2">
                {results.slice(0, 8).map((result) => (
                  <li key={`${result.type}-${result.slug}`}>
                    <button
                      type="button"
                      onClick={() => navigateTo(result)}
                      className="flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left hover:bg-gray-950/60"
                      style={{ transition: "background 150ms ease" }}
                    >
                      <Hash className="mt-1 size-4 shrink-0 text-gray-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-mono">
                          {typeLabels[result.type]}
                        </p>
                        <p className="font-medium text-gray-25 truncate">
                          {result.name}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-400 line-clamp-1">
                          {result.shortDescription}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Ask AI assistant section */}
            {query.length >= 2 && (
              <div className="border-t border-gray-700 px-4 py-3">
                <p className="mb-2 text-xs text-gray-500">Ask AI assistant</p>
                <button
                  type="button"
                  onClick={handleAskAI}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-gray-200 hover:bg-gray-950/60"
                  style={{ transition: "background 150ms ease" }}
                >
                  <Sparkles className="size-4 shrink-0 text-iris-500" />
                  <span>
                    Can you tell me about{" "}
                    <span className="font-medium text-gray-25">{query}</span>?
                  </span>
                </button>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
