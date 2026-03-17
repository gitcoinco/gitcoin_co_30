import Link from "next/link";
import Image from "next/image";
import ContentCard from "./ContentCard";
import type { Research } from "@/lib/types";
import { Badge, Button, ReadTimeBadge } from "../ui";
import { calcReadTime, formatRelativeDate } from "@/lib/utils";

interface ResearchCardProps {
  research: Research;
  variant?: "default" | "home" | "sensemaking";
}

export default function ResearchCard({
  research,
  variant = "default",
}: ResearchCardProps) {
  const readTime = calcReadTime(research.description);
  const authors = research.authors ?? [];

  if (variant === "sensemaking") {
    return (
      <Link href={`/research/${research.slug}`}>
        <article className="group relative flex max-w-240 flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900 transition-all duration-300 hover:border-teal-500 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.6)] bg-bottom bg-no-repeat bg-size-[100%_0%] hover:bg-size-[100%_50%] bg-[linear-gradient(to_top,rgba(2,226,172,0.3),transparent)]">
          <div
            className="relative aspect-3/1 w-full shrink-0 overflow-hidden"
            aria-hidden="true"
          >
            <Image
              src={research.banner || "/content-images/placeholder.png"}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-900" />
            <ReadTimeBadge minutes={readTime} />
          </div>
          <div className="flex flex-1 flex-col py-6 px-10">
            <Badge
              variant="info"
              size="sm"
              className="absolute top-7 left-10 w-fit"
            >
              {research.researchType ?? 'Report'}
            </Badge>

            <h3 className="sm:max-w-[60%] mt-4 text-xl font-bold text-gray-25 md:text-2xl font-heading">
              {research.name}
            </h3>
            <p className="sm:max-w-[60%] mt-2 text-sm text-gray-300 font-serif">
              {research.shortDescription}
            </p>
            <p className="mt-2 text-xs text-gray-300 text-right">{formatRelativeDate(research.lastUpdated)}</p>
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

  return (
    <Link href={`/research/${research.slug}`}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900 transition-all duration-300 hover:border-teal-500 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.6)] bg-bottom bg-no-repeat bg-size-[100%_0%] hover:bg-size-[100%_50%] bg-[linear-gradient(to_top,rgba(2,226,172,0.5),transparent)]">
        <div className="relative aspect-video w-full shrink-0 overflow-hidden">
          <Image
            src={research.banner || "/content-images/placeholder.png"}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-900 group-hover:opacity-0 transition-all duration-500" />
          <ReadTimeBadge minutes={readTime} />
        </div>
        <div className="flex flex-1 flex-col px-4 pb-4">
          <Badge
            variant="info"
            size="sm"
            className="absolute top-3 left-1/2 -translate-x-1/2"
          >
            {research.researchType ?? 'Report'}
          </Badge>

          <h3 className="-translate-y-1/2 text-md sm:text-xl md:text-2xl text-center font-bold h-18 flex items-center overflow-visible">
            <span className="line-clamp-3">{research.name}</span>
          </h3>
          <p className="text-sm text-gray-300 font-serif line-clamp-4 mb-2">
            {research.shortDescription}
          </p>
          <div className="flex items-center justify-between mb-2 gap-2">
            <p className="text-xs text-gray-300 truncate">By {authors.join(", ")}</p>
            <p className="text-xs text-gray-300 shrink-0">{formatRelativeDate(research.lastUpdated)}</p>
          </div>
          <Button
            variant="ghost"
            className="mt-auto pt-4 w-full flex items-center justify-center gap-3"
          >
            <span>Read more</span>
            <span>→</span>
          </Button>
        </div>
      </article>
    </Link>
  );
}
