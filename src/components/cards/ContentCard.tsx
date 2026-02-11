import Link from "next/link";
import TagsList from "../ui/TagsList";

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
}

export default function ContentCard({
  href,
  name,
  shortDescription,
  tags,
  featured = false,
  layout = "logo",
  logo,
  banner = "/og-default.png",
  bannerHeight,
}: ContentCardProps) {
  const isBanner = layout === "banner";

  return (
    <Link href={href}>
      <div
        className={`${
          featured ? "card-featured" : "card"
        } group h-full flex flex-col transition-all duration-300 ${
          isBanner
            ? "hover:border-teal-500 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.6)] bg-bottom bg-no-repeat bg-size-[100%_0%] hover:bg-size-[100%_50%] bg-[linear-gradient(to_top,rgba(2,226,172,0.3),transparent)]"
            : ""
        }`}
      >
        <>
          {isBanner && !!banner && (
            <div
              className={`relative ${bannerHeight || "aspect-video"} -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl`}
            >
              <img
                src={banner}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-900 group-hover:opacity-0 transition-all duration-500" />
            </div>
          )}

          <div className="flex items-center gap-4 mb-4 min-h-16">
            {layout === "logo" && logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                className="w-12 h-12 rounded-lg object-cover bg-gray-800"
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

          <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow">
            {shortDescription}
          </p>
        </>

        {/* Tags */}
        <div className="pt-5 border-t border-gray-500/60 h-[3.7rem]">
          <TagsList tags={tags} />
        </div>
      </div>
    </Link>
  );
}
