/**
 * SEO titles and descriptions for all static pages.
 *
 * Edit the `title` and `description` fields here to update
 * what appears in Google search results AND social media previews (og/twitter).
 *
 * For individual content pages (mechanisms, apps, research, etc.) edit the
 * `shortDescription` field in the relevant markdown file under src/content/.
 */

import { Metadata } from "next";

const BASE_URL = "https://gitcoin.co";

export const siteTitle = "Gitcoin - Fund What Matters";
export const siteDescription =
  "The trusted directory and reference library for Ethereum public goods funding. Discover funding mechanisms, platforms, and learn what works.";

const ogImage = {
  url: `${BASE_URL}/opengraph-image.jpg`,
  width: 1920,
  height: 1080,
  alt: siteTitle,
};

function meta(title: string, description: string, path: string): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Gitcoin",
      title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
      site: "@gitcoin",
      creator: "@gitcoin",
    },
  };
}

// Used for the homepage only — bypasses the "%s | Gitcoin" title template
function metaHome(title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: BASE_URL },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Gitcoin",
      title,
      description,
      url: BASE_URL,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
      site: "@gitcoin",
      creator: "@gitcoin",
    },
  };
}

export const pageSeo = {
  home: metaHome(siteTitle, siteDescription),
  mechanisms: meta(
    "Funding Mechanisms",
    "Learn about quadratic funding, retroactive funding, conviction voting, and other funding mechanisms.",
    "/mechanisms",
  ),
  apps: meta(
    "Apps Directory",
    "Explore funding platforms, DAOs, grant programs, and primitives in the Ethereum ecosystem.",
    "/apps",
  ),
  research: meta(
    "Research & Trends",
    "Analysis of capital flows, mechanism performance, and ecosystem shifts in Ethereum funding.",
    "/research",
  ),
  campaigns: meta(
    "Campaigns",
    "Discover funding rounds across the Ethereum ecosystem.",
    "/campaigns",
  ),
  caseStudies: meta(
    "Case Studies",
    "Learn from real funding experiments. Explore what worked, what didn't, and the lessons learned.",
    "/case-studies",
  ),
  contribute: meta(
    "Contribution Guide",
    "Learn how to contribute high-quality content to the Gitcoin Funding Directory.",
    "/contribute",
  ),
  submit: meta(
    "Submit Content",
    "Submit apps, mechanisms, case studies, research, or campaigns to the Gitcoin Funding Directory. Only high-quality submissions are accepted.",
    "/submit",
  ),
  about: meta(
    "About",
    "Gitcoin has been building tools since 2017 that enable communities to build, fund and protect what matters to them.",
    "/about"
  ),
};
