import { NextRequest, NextResponse } from "next/server";
import { apps } from "@/content/apps";
import { mechanisms } from "@/content/mechanisms";
import { getAllCaseStudies } from "@/content/case-studies";
import { research } from "@/content/research";
import { campaigns } from "@/content/campaigns";

export interface SearchResultItem {
  type: "app" | "mechanism" | "case-study" | "research" | "campaign";
  slug: string;
  name: string;
  shortDescription: string;
  tags: string[];
}

function matchesQuery(item: { name: string; shortDescription: string; tags: string[] }, q: string): boolean {
  return (
    item.name.toLowerCase().includes(q) ||
    item.shortDescription.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase().trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const caseStudies = getAllCaseStudies();

  const results: SearchResultItem[] = [];

  for (const item of apps) {
    if (matchesQuery(item, q)) {
      results.push({ type: "app", slug: item.slug, name: item.name, shortDescription: item.shortDescription, tags: item.tags });
    }
  }

  for (const item of mechanisms) {
    if (matchesQuery(item, q)) {
      results.push({ type: "mechanism", slug: item.slug, name: item.name, shortDescription: item.shortDescription, tags: item.tags });
    }
  }

  for (const item of caseStudies) {
    if (matchesQuery(item, q)) {
      results.push({ type: "case-study", slug: item.slug, name: item.name, shortDescription: item.shortDescription, tags: item.tags });
    }
  }

  for (const item of research) {
    if (matchesQuery(item, q)) {
      results.push({ type: "research", slug: item.slug, name: item.name, shortDescription: item.shortDescription, tags: item.tags });
    }
  }

  for (const item of campaigns) {
    if (matchesQuery(item, q)) {
      results.push({ type: "campaign", slug: item.slug, name: item.name, shortDescription: item.shortDescription, tags: item.tags });
    }
  }

  return NextResponse.json(results);
}
