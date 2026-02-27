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
  const {
    title,
    shortDescription,
    slug,
    type,
    banner,
    logo,
    publishDate,
    lastUpdated,
    authors,
  } = config;

  const url = `https://gitcoin.co/${type}/${slug}`;

  // Determine the best image to use
  let imageUrl = "https://gitcoin.co/content-images/placeholder.png";

  if (banner && !banner.endsWith(".svg")) {
    imageUrl = `https://gitcoin.co${banner}`;
  } else if (logo && !logo.endsWith(".svg")) {
    imageUrl = `https://gitcoin.co${logo}`;
  }

  // Determine image type based on extension
  const getImageType = (url: string): string => {
    if (url.endsWith(".jpg") || url.endsWith(".jpeg")) return "image/jpeg";
    if (url.endsWith(".png")) return "image/png";
    if (url.endsWith(".webp")) return "image/webp";
    return "image/png"; // default
  };

  // Base metadata
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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: getImageType(imageUrl),
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: shortDescription,
      images: [imageUrl],
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
