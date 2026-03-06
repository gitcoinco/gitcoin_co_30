import { ImageResponse } from "next/og";
import { getResearchBySlug } from "@/content/research";
import { generateOgImage, OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";


export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getResearchBySlug(slug);
  if (!r) return new ImageResponse(<div>Not found</div>, OG_SIZE);

  return generateOgImage({
    name: r.name,
    description: r.description,
    contentType: "research",
    slug,
    banner: r.banner,
  });
}
