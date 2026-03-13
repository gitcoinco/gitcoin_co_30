import Link from "next/link";
import Image from "next/image";
import TagsList from "../ui/TagsList";
import ReadTimeBadge from "../ui/ReadTimeBadge";
import { formatRelativeDate } from "@/lib/utils";

interface ContentCardProps {
  href: string;
  name: string;
  shortDescription: string;
  tags: string[];
  featured?: boolean;
  layout?: "logo" | "banner";
  logo?: string;
  banner?: string;
  bannerHeight?: string;
  readTime?: number;
  date?: string;
}

export default function ContentCard({
  href,
  name,
  shortDescription,
  tags,
  featured = false,
  layout = "logo",
  logo,
  banner = "/content-images/placeholder.png",
  bannerHeight,
  readTime,
  date,
}: ContentCardProps) {
  const isBanner = layout === "banner";

  return (
    <Link href={href}>
      <div
        className={`${
          featured ? "card-featured" : "card"
        } bg-gray-950 group h-full flex flex-col transition-all duration-300 ${
          isBanner
            ? "hover:border-teal-500 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.6)] bg-bottom bg-no-repeat bg-size-[100%_6%] hover:bg-size-[100%_50%] bg-[linear-gradient(to_top,rgba(2,226,172,0.5),transparent)]"
            : ""
        }`}
      >
        <>
          {isBanner && !!banner && (
            <div
              className={`relative ${bannerHeight || "aspect-video"} -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl`}
            >
              <Image
                src={banner}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-950 group-hover:opacity-0 transition-all duration-500" />
              {readTime !== undefined && <ReadTimeBadge minutes={readTime} />}
            </div>
          )}

          <div className="flex items-center gap-4 mb-4 min-h-16">
            {layout === "logo" && logo ? (
              <Image
                src={logo}
                alt={`${name} logo`}
                width={48}
                height={48}
                className="rounded-lg object-cover bg-gray-800"
              />
            ) : layout === "logo" ? (
              <div className="w-12 h-12 rounded-lg border border-gray-25 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-heading text-gray-25">
                  {name.charAt(0)}
                </span>
              </div>
            ) : (
              ""
            )}
            <h3 className="text-xl md:text-2xl font-semibold text-gray-25 group-hover:text-gray-25 transition-colors line-clamp-2">
              {name}
            </h3>
          </div>

          <p className="text-gray-300 font-serif text-sm line-clamp-3 flex-grow">
            {shortDescription}
          </p>
          {date && <p className="text-xs text-gray-500 text-right mt-2">{formatRelativeDate(date)}</p>}
        </>

        {/* Tags */}
        <div className="pt-4 border-t border-gray-500/60 h-[3.7rem] mt-3">
          <TagsList tags={tags} />
        </div>
      </div>
    </Link>
  );
}
