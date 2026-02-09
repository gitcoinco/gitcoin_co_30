import Link from "next/link";
import ContentCard from "./ContentCard";
import type { Campaign } from "@/lib/types";
import { Calendar, DollarSign, Users, type LucideIcon } from "lucide-react";

interface CampaignMetric {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface CampaignCardProps {
  campaign: Campaign;
  featured?: boolean;
  variant?: "default" | "home";
  statusLabel?: string;
  ctaLabel?: string;
}

const metrics: CampaignMetric[] = [
  { icon: DollarSign, label: "Matching Pool", value: "$500K" },
  { icon: Users, label: "Projects", value: "234" },
  { icon: Calendar, label: "Timeline", value: "12 days" },
];

function CampaignMetric({ icon: Icon, label, value }: CampaignMetric) {
  return (
    <div>
      <dt className="flex items-center gap-1 text-sm text-gray-400 font-mono">
        <Icon className="size-4" />
        {label}
      </dt>
      <dd className="mt-1 text-base font-semibold text-gray-25">{value}</dd>
    </div>
  );
}
export default function CampaignCard({
  campaign,
  featured = false,
  variant = "default",
  statusLabel = "Active now",
  ctaLabel = "Visit campaign",
}: CampaignCardProps) {
  if (variant === "home") {
    return (
      <article className="flex min-h-[366px] flex-col rounded-2xl border border-gray-600 bg-gray-900 p-6">
        <p className="w-fit rounded-xl bg-teal-50 px-[9px] py-1 text-[13px] leading-4 text-gray-950">
          {statusLabel}
        </p>
        <h3 className="mt-6 text-[30px] text-gray-25 font-heading">
          {campaign.name}
        </h3>
        <p className="mt-4 text-[20px] text-gray-300 font-serif">
          {campaign.shortDescription}
        </p>

        <dl className="mt-8 grid grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <CampaignMetric key={metric.label} {...metric} />
          ))}
        </dl>

        <Link
          href={`/campaigns/${campaign.slug}`}
          className="mt-auto inline-flex items-center justify-center rounded-[10px] border border-teal-500 px-4 py-2 text-center text-base text-teal-500 font-mono"
        >
          {ctaLabel}
        </Link>
      </article>
    );
  }

  return (
    <ContentCard
      href={`/campaigns/${campaign.slug}`}
      name={campaign.name}
      shortDescription={campaign.shortDescription}
      tags={campaign.tags}
      featured={featured}
      layout="banner"
      banner={campaign.banner}
      bannerHeight="h-48"
    />
  );
}
