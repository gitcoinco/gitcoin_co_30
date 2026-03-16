import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DetailPageLayout,
  Breadcrumb,
  HeroImage,
  PageHeader,
  TwoColumnLayout,
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

interface ContentDetailPageProps {
  item: BaseContent & {
    description: string;
  };
  breadcrumbHref: string;
  breadcrumbLabel: string;
  relatedSections?: RelatedSection[];
  ctaUrl?: string;
  ctaLabel?: string;
  showSuggestEdit?: boolean;
  showDate?: boolean;
  contentBefore?: ReactNode;
}

export default function ContentDetailPage({
  item,
  breadcrumbHref,
  breadcrumbLabel,
  relatedSections = [],
  ctaUrl,
  ctaLabel = "Visit",
  showSuggestEdit = true,
  showDate = true,
  contentBefore,
}: ContentDetailPageProps) {
  const banner = item.banner || "/content-images/placeholder.png";
  const readTime = calcReadTime(item.description);
  const authors = item.authors?.length ? item.authors : ["Gitcoin Research"];
  const authorSocials = Object.fromEntries(
    authorsData.map((a) => [a.name, (a as { name: string; social?: string }).social]),
  );
  return (
    <DetailPageLayout>
      <Breadcrumb href={breadcrumbHref} label={breadcrumbLabel} />

      {banner && <HeroImage src={banner} alt={item.name} />}

      <PageHeader>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center">
          {/* Logo (for apps) */}
          {item.logo && !item.banner && (
            <div className="shrink-0">
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={80}
                height={80}
                className="rounded-2xl object-cover bg-gray-900"
              />
            </div>
          )}

          {/* Title and Description */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-25 mb-2 md:mb-4">
              {item.name}
            </h1>
            <div className="w-full flex flex-wrap gap-6 items-center justify-between">
              <div>
                <p className="text-lg text-gray-300 max-w-2xl">
                  {item.shortDescription}
                </p>
                <p className="mt-3 text-sm text-gray-300">
                  By{" "}
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
                  {" "}· {readTime} min read{showDate && ` · ${new Date(item.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
                </p>
              </div>
              {ctaUrl && ctaLabel && (
                <Button
                  href={ctaUrl}
                  variant="secondary"
                  external={ctaUrl.startsWith("http")}
                >
                  <span className="flex items-center gap-2">
                    {ctaLabel}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </PageHeader>

      <section className="max-w-[850px] mx-auto container-page section">
        <div className="space-y-8">
          {contentBefore}
          <article className="">
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
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.items}
                  </div>
                </div>
              ),
          )}
        </div>

        <div className="space-y-6 my-10">
          {showSuggestEdit && (
            <SuggestEditButton
              contentPath={`${breadcrumbHref.slice(1)}/${item.slug}.md`}
            />
          )}
        </div>
      </section>
    </DetailPageLayout>
  );
}
