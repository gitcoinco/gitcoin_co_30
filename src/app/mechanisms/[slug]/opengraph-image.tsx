import { ImageResponse } from "next/og";
import { getMechanismBySlug, mechanisms } from "@/content/mechanisms";
import { generateOgImage, OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return mechanisms.map((m) => ({ slug: m.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mechanism = getMechanismBySlug(slug);
  if (!mechanism) return new ImageResponse(<div>Not found</div>, OG_SIZE);

  return generateOgImage({
    name: mechanism.name,
    description: mechanism.description,
    contentType: "mechanisms",
    slug,
    banner: mechanism.banner,
  });
}
