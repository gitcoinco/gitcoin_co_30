import Link from "next/link";
import ContentCard from "./ContentCard";
import type { Research } from "@/lib/types";
import { Badge, Button } from "../ui";

interface ResearchCardProps {
  research: Research;
  variant?: "default" | "home" | "sensemaking";
}

export default function ResearchCard({
  research,
  variant = "default",
}: ResearchCardProps) {
  if (variant === "sensemaking") {
    return (
      <Link href={`/research/${research.slug}`}>
        <article className="group relative flex max-w-142.5 flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900 transition-all duration-300 hover:border-teal-500 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.6)] bg-bottom bg-no-repeat bg-size-[100%_0%] hover:bg-size-[100%_50%] bg-[linear-gradient(to_top,rgba(2,226,172,0.3),transparent)]">
          <div
            className="aspect-3/1 w-full shrink-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${research.banner || "/images/banner-placeholder.png"})`,
            }}
            aria-hidden="true"
          />
          <div className="flex flex-1 flex-col p-6">
            <Badge variant="info" size="sm" className="w-fit">
              Report
            </Badge>

            <h3 className="mt-4 text-xl font-bold text-gray-25 md:text-2xl font-heading">
              {research.name}
            </h3>
            <p className="mt-2 text-sm text-gray-400 font-serif">
              {research.shortDescription}
            </p>
            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                className="inline-flex items-center gap-2"
              >
                <span>Read more</span>
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "home") {
    return (
      <article className="relative flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900">
        <div
          className="h-20 w-full shrink-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${research.banner || "/og-default.png"})`,
          }}
          aria-hidden="true"
        />
        <div className="flex flex-1 flex-col px-4 pb-4">
          <Badge
            variant="info"
            size="sm"
            className="absolute top-3 left-1/2 -translate-x-1/2"
          >
            Report
          </Badge>

          <h3 className="-translate-y-1/2 text-md sm:text-xl md:text-2xl text-center font-bold">
            {research.name}
          </h3>
          <div className="mt-auto">
            <p className="text-xs text-gray-400 font-serif">
              {research.shortDescription}
            </p>
            <Link href={`/research/${research.slug}`}>
              <Button
                variant="ghost"
                className="mt-4 w-full flex items-center justify-evenly"
              >
                <span>Read more</span>
                <span>→</span>
              </Button>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <ContentCard
      href={`/research/${research.slug}`}
      name={research.name}
      shortDescription={research.shortDescription}
      tags={research.tags}
      layout="banner"
      banner={research.banner}
    />
  );
}
