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
}

export default function ContentDetailPage({
  item,
  breadcrumbHref,
  breadcrumbLabel,
  relatedSections = [],
}: ContentDetailPageProps) {
  const banner = item.banner || "/og-default.png";
  return (
    <DetailPageLayout>
      <Breadcrumb href={breadcrumbHref} label={breadcrumbLabel} />

      {banner && <HeroImage src={banner} alt={item.name} />}

      <PageHeader>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Logo (for apps) */}
          {item.logo && !item.banner && (
            <div className="flex-shrink-0">
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                className="w-20 h-20 rounded-2xl object-cover bg-gray-800"
              />
            </div>
          )}

          {/* Title and Description */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-25 mb-2 md:mb-4">
              {item.name}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl">
              {item.shortDescription}
            </p>
          </div>
        </div>
      </PageHeader>

      <TwoColumnLayout
        content={
          <div className="space-y-8">
            <article className="card p-8 md:p-10">
              <Markdown content={item.description} />
            </article>

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
        }
        sidebar={
          <div className="space-y-6">
            <TagsSection tags={item.tags} />
            <SuggestEditButton />
            <MetadataSection lastUpdated={item.lastUpdated} />
          </div>
        }
      />
    </DetailPageLayout>
  );
}
