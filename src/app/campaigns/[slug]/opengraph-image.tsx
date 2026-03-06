import { ImageResponse } from "next/og";
import { getCampaignBySlug, campaigns } from "@/content/campaigns";
import { generateOgImage, OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) return new ImageResponse(<div>Not found</div>, OG_SIZE);

  return generateOgImage({
    name: campaign.name,
    description: campaign.description,
    contentType: "campaigns",
    slug,
    banner: campaign.banner,
  });
}
