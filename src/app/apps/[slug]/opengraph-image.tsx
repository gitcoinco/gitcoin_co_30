import { ImageResponse } from "next/og";
import { getAppBySlug, apps } from "@/content/apps";
import { generateOgImage, OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) return new ImageResponse(<div>Not found</div>, OG_SIZE);

  return generateOgImage({
    name: app.name,
    description: app.description,
    contentType: "apps",
    slug,
    banner: app.banner,
  });
}
