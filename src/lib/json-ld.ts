const BASE_URL = "https://gitcoin.co";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gitcoin",
  url: BASE_URL,
  logo: `${BASE_URL}/gitcoin-logo.png`,
  sameAs: [
    "https://x.com/gitcoin",
    "https://github.com/gitcoinco",
  ],
};

export function breadcrumbJsonLd(
  categoryLabel: string,
  categoryPath: string,
  itemName: string,
  itemPath: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: `${BASE_URL}${categoryPath}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: itemName,
        item: `${BASE_URL}${itemPath}`,
      },
    ],
  };
}
