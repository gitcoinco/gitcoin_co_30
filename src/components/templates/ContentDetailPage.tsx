import { ReactNode } from "react";
import {
  DetailPageLayout,
  Breadcrumb,
  HeroImage,
  PageHeader,
  TwoColumnLayout,
  TagsSection,
  MetadataSection,
  SuggestEditButton,
} from "@/components/layouts";
import { Markdown } from "@/components/Markdown";
import type { BaseContent } from "@/lib/types";
import { Button } from "../ui";

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
  externalUrl?: string;
  externalUrlLabel?: string;
}

function calcReadTime(text: string): number {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default function ContentDetailPage({
  item,
  breadcrumbHref,
  breadcrumbLabel,
  relatedSections = [],
  externalUrl,
  externalUrlLabel = "Visit",
}: ContentDetailPageProps) {
  const banner = item.banner || "/content-images/placeholder.png";
  const readTime = calcReadTime(item.description);
  return (
    <DetailPageLayout>
      <Breadcrumb href={breadcrumbHref} label={breadcrumbLabel} />

      {banner && <HeroImage src={banner} alt={item.name} readTime={readTime} />}

      <PageHeader>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center">
          {/* Logo (for apps) */}
          {item.logo && !item.banner && (
            <div className="flex-shrink-0">
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                className="w-20 h-20 rounded-2xl object-cover bg-gray-900"
              />
            </div>
          )}

          {/* Title and Description */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-25 mb-2 md:mb-4">
              {item.name}
            </h1>
            <div className="w-full flex flex-wrap gap-6 items-center justify-between">
              <p className="text-lg text-gray-500 max-w-2xl">
                {item.shortDescription}
              </p>
              {externalUrl && externalUrlLabel && (
                <Button href={externalUrl} variant="secondary">
                  <span className="flex items-center gap-2">
                    {externalUrlLabel}
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
          <SuggestEditButton
            contentPath={`${breadcrumbHref.slice(1)}/${item.slug}.md`}
          />
          <MetadataSection lastUpdated={item.lastUpdated} />
        </div>
      </section>
    </DetailPageLayout>
  );
}
