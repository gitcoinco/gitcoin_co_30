"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  href?: string;
  label: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex items-center gap-1 text-sm text-gray-500 min-w-0"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span
            key={i}
            className={`flex items-center gap-1 font-mono ${isLast ? "min-w-0" : "shrink-0"}`}
          >
            {i > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gray-25 transition-colors whitespace-nowrap text-gray-400"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-400 max-w-[40ch] truncate">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
