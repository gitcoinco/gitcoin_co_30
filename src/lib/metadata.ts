import { Metadata } from 'next'

interface MetadataConfig {
  title: string
  shortDescription: string
  slug: string
  type: 'research' | 'case-studies' | 'apps' | 'mechanisms' | 'campaigns'
  banner?: string
  logo?: string
  publishDate?: string
  lastUpdated?: string
  authors?: string[]
}

export function generateDetailPageMetadata(config: MetadataConfig): Metadata {
  const { title, shortDescription, slug, type, banner, logo, publishDate, lastUpdated, authors } = config

  const url = `https://explore.gitcoin.co/${type}/${slug}`

  // Determine the best image to use
  let imageUrl = 'https://explore.gitcoin.co/og-default.png'
  if (banner) {
    imageUrl = `https://explore.gitcoin.co${banner}`
  } else if (logo) {
    imageUrl = `https://explore.gitcoin.co${logo}`
  }

  // Base metadata
  const metadata: Metadata = {
    title,
    description: shortDescription,
    openGraph: {
      title,
      description: shortDescription,
      url,
      siteName: 'Gitcoin Explorer',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: type === 'research' || type === 'case-studies' ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: shortDescription,
      images: [imageUrl],
      creator: '@gitcoin',
    },
  }

  // Add article-specific metadata
  if (metadata.openGraph && (type === 'research' || type === 'case-studies')) {
    const ogArticle: Record<string, any> = metadata.openGraph as any
    if (publishDate) {
      ogArticle.publishedTime = publishDate
    }
    if (lastUpdated) {
      ogArticle.modifiedTime = lastUpdated
    }
    if (authors && authors.length > 0) {
      ogArticle.authors = authors
    }
  }

  return metadata
}
