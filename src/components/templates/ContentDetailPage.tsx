import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  DetailPageLayout,
  Breadcrumb,
  HeroImage,
  TagsSection,
  SuggestEditButton,
} from "@/components/layouts";
import { Markdown } from "@/components/Markdown";
import type { BaseContent } from "@/lib/types";
import { calcReadTime } from "@/lib/utils";
import { Button } from "../ui";
import authorsData from "@/data/authors.json";

interface RelatedSection {
  title: string;
  items: ReactNode[];
}

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface ContentDetailPageProps {
  item: BaseContent & {
    description: string;
  };
  breadcrumbItems: BreadcrumbItem[];
  relatedSections?: RelatedSection[];
  ctaUrl?: string;
  ctaLabel?: string;
  showSuggestEdit?: boolean;
  showDate?: boolean;
  contentBefore?: ReactNode;
}

export default function ContentDetailPage({
  item,
  breadcrumbItems,
  relatedSections = [],
  ctaUrl,
  ctaLabel = "Visit",
  showSuggestEdit = true,
  showDate = true,
  contentBefore,
}: ContentDetailPageProps) {
  const banner = item.banner || "/content-images/placeholder.png";
  const readTime = calcReadTime(item.description);
  const authors = item.authors ?? [];
  const authorSocials = Object.fromEntries(
    authorsData.map((a) => [
      a.name,
      (a as { name: string; social?: string }).social,
    ]),
  );
  const categoryHref =
    breadcrumbItems.find((b) => b.href && b.href !== "/")?.href ?? "";
  return (
    <DetailPageLayout>
      <section className="mb-16">
        {/* Header */}
        <div>
          <div className="border-y border-gray-700 py-2">
            <div className="detail-page-container">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>

          <div className="pb-6 pt-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center detail-page-container">
              {/* Logo */}
              {item.logo && (
                <div className="shrink-0">
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={80}
                    height={80}
                    className="rounded-2xl object-cover bg-gray-800"
                  />
                </div>
              )}

              <div className="flex-1">
                {showDate && item.lastUpdated && (
                  <p className="text-sm text-gray-500 mb-3 font-mono">
                    {new Date(item.lastUpdated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-25 mb-2 md:mb-4 max-w-3xl">
                  {item.name}
                </h1>
                <div className="w-full flex flex-wrap gap-8 items-center justify-between">
                  <div className="w-full">
                    <p className="text-gray-300 max-w-2xl font-serif">
                      {item.shortDescription}
                    </p>

                    <div className="mt-3 text-sm text-gray-300 font-mono flex items-center gap-2 justify-between w-full">
                      {authors.length > 0 && (
                        <p>
                          by{" "}
                          {authors.map((name, i) => {
                            const social = authorSocials[name];
                            return (
                              <span key={name}>
                                {i > 0 && ", "}
                                {social ? (
                                  <Link
                                    href={social}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-teal-400 transition-colors underline underline-offset-3"
                                  >
                                    {name}
                                  </Link>
                                ) : (
                                  name
                                )}
                              </span>
                            );
                          })}
                        </p>
                      )}
                      <p>{readTime} min read</p>
                    </div>
                  </div>
                  {ctaUrl && ctaLabel && (
                    <Button
                      href={ctaUrl}
                      size="sm"
                      variant="secondary"
                      external={ctaUrl.startsWith("http")}
                      className="ml-auto"
                    >
                      <span className="flex items-center gap-2">
                        {ctaLabel}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-page-container">{banner && <HeroImage src={banner} alt={item.name}  />}</div>
        {/* Content */}
        <div className="space-y-8 detail-page-container pt-10 md:pt-16">
          {contentBefore}
          <article>
            <Markdown content={item.description} />
          </article>

          {!!item.tags.length ? <TagsSection tags={item.tags} /> : ""}

          {/* Related Sections */}
          {relatedSections.map(
            (section, index) =>
              section.items.length > 0 && (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-gray-25 mb-4">
                    {section.title}
                  </h2>
                  <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                    {section.items}
                  </div>
                </div>
              ),
          )}

          <div className="space-y-6 my-10">
            {showSuggestEdit && (
              <SuggestEditButton
                contentPath={`${categoryHref.slice(1)}/${item.slug}.md`}
              />
            )}
          </div>
        </div>
      </section>
    </DetailPageLayout>
  );
}
