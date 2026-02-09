import Link from "next/link";
import ContentCard from "./ContentCard";
import type { Research } from "@/lib/types";
import { Button } from "../ui";

interface ResearchCardProps {
  research: Research;
  variant?: "default" | "home";
}

// TODO: Replace with actual image URL when available
const homeBackgroundImage = "";

export default function ResearchCard({
  research,
  variant = "default",
}: ResearchCardProps) {
  if (variant === "home") {
    return (
      <article className="relative flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900">
        <div
          className="h-20 w-full shrink-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${homeBackgroundImage || research.banner || "/og-default.png"})`,
          }}
          aria-hidden="true"
        />
        <div className="flex flex-1 flex-col px-4 pb-4">
          <p className="absolute top-3 left-1/2 -translate-x-1/2 w-fit rounded-full bg-teal-500 px-2 py-0.5 text-xs text-teal-900 border border-teal-900">
            Report
          </p>
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
