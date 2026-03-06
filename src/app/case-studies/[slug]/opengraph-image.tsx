import { ImageResponse } from "next/og";
import { getCaseStudyBySlug, caseStudies } from "@/content/case-studies";
import { generateOgImage, OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return new ImageResponse(<div>Not found</div>, OG_SIZE);

  return generateOgImage({
    name: caseStudy.name,
    description: caseStudy.description,
    contentType: "case-studies",
    slug,
    banner: caseStudy.banner,
  });
}
