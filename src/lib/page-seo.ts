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

function meta(title: string, description: string, path: string): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

// Used for the homepage only — bypasses the "%s | Gitcoin" title template
function metaHome(title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: BASE_URL },
    openGraph: { title, description, url: BASE_URL },
    twitter: { title, description },
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
    "Learn how to contribute to the Gitcoin Funding Directory and earn bounties.",
    "/contribute",
  ),
  submit: meta(
    "Submit Content",
    "Submit apps, mechanisms, case studies, research, or campaigns to the Gitcoin Funding Directory. Quality contributions earn bounties.",
    "/submit",
  ),
};
