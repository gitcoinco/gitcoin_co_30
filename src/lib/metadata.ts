import { Metadata } from "next";

interface MetadataConfig {
  title: string;
  shortDescription: string;
  slug: string;
  type: "research" | "case-studies" | "apps" | "mechanisms" | "campaigns";
  banner?: string;
  logo?: string;
  publishDate?: string;
  lastUpdated?: string;
  authors?: string[];
}

export function generateDetailPageMetadata(config: MetadataConfig): Metadata {
  const { title, shortDescription, slug, type, publishDate, lastUpdated, authors } = config;

  const url = `https://gitcoin.co/${type}/${slug}`;

  // Base metadata — images are handled by opengraph-image.tsx in each route segment
  const metadata: Metadata = {
    title,
    description: shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: shortDescription,
      url,
      siteName: "Gitcoin",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: shortDescription,
      creator: "@gitcoin",
      site: "@gitcoin",
    },
  };

  // Add article-specific metadata
  if (metadata.openGraph) {
    const ogArticle: Record<string, any> = metadata.openGraph as any;
    if (publishDate) {
      ogArticle.publishedTime = publishDate;
    }
    if (lastUpdated) {
      ogArticle.modifiedTime = lastUpdated;
    }
    if (authors && authors.length > 0) {
      ogArticle.authors = authors;
    }
  }

  return metadata;
}
