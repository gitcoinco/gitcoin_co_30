import Link from "next/link";
import ContentCard from "./ContentCard";
import type { App } from "@/lib/types";
import { Button } from "../ui";

interface AppCardProps {
  app: App;
  featured?: boolean;
  variant?: "default" | "home";
}

export default function AppCard({
  app,
  featured = false,
  variant = "default",
}: AppCardProps) {
  if (variant === "home") {
    const primaryTag = app.tags[0] ?? "";

    return (
      <article
        className="group relative h-[280px] overflow-hidden rounded-[12px] border-[0.5px] border-solid border-gray-700 bg-gray-900 p-8 transition-all duration-300 hover:border-teal-500 hover:bg-[linear-gradient(180deg,rgba(1,124,94,0)_50%,rgba(2,226,172,0.3)_100%)] hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.6)]"
        data-node-id="379:755"
      >
        <div className="flex h-full flex-col">
          <p className="w-fit bg-gray-700 rounded-full px-2 py-[2px] text-xs leading-4 text-gray-100 font-mono">
            {primaryTag}
          </p>

          <div
            className="mt-6 h-14 w-14 rounded-xl bg-teal-500 flex-shrink-0"
            aria-hidden="true"
          />

          <h3 className="mt-3 text-4 font-bold leading-none text-gray-25 font-heading md:text-[24px]">
            {app.name}
          </h3>

          <p className="mt-3 max-w-[267px] text-sm leading-none text-gray-300 font-serif">
            {app.shortDescription}
          </p>

          <div className="mt-auto flex justify-end">
            <Link href={`/apps/${app.slug}`}>
              <Button
                variant="ghost"
                className="inline-flex items-center gap-2"
              >
                <span>View details</span>
                <span aria-hidden="true" className="text-base">
                  →
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <ContentCard
      href={`/apps/${app.slug}`}
      name={app.name}
      shortDescription={app.shortDescription}
      tags={app.tags}
      featured={featured}
      layout="logo"
      logo={app.logo}
    />
  );
}
