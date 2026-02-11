import Link from "next/link";
import ContentCard from "./ContentCard";
import type { Campaign } from "@/lib/types";
import { Calendar, DollarSign, Users, type LucideIcon } from "lucide-react";
import { Badge, Button } from "../ui";

interface CampaignCardProps {
  campaign: Campaign;
  featured?: boolean;
  variant?: "default" | "home";
  statusLabel?: string;
  ctaLabel?: string;
}

function getTimelineLabel(startDate?: string, endDate?: string): string | null {
  if (!endDate) return null;
  const now = new Date();
  const end = new Date(endDate);
  const start = startDate ? new Date(startDate) : null;

  if (end < now) return "Ended";
  if (start && start > now) {
    const days = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return days === 1 ? "Starts in 1 day" : `Starts in ${days} days`;
  }

  const days = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 1) return "Ends today";
  return days === 1 ? "1 day left" : `${days} days left`;
}

function MetricItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
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
  variant = "home",
  statusLabel = "Active now",
  ctaLabel = "Visit campaign",
}: CampaignCardProps) {
  const campaignUrl = campaign.externalUrl || `/campaigns/${campaign.slug}`;
  const isExternal = !!campaign.externalUrl;
  const timelineLabel = getTimelineLabel(campaign.startDate, campaign.endDate);

  const metrics = [
    campaign.matchingPoolUsd && { icon: DollarSign, label: "Matching Pool", value: campaign.matchingPoolUsd },
    campaign.projectsCount && { icon: Users, label: "Projects", value: campaign.projectsCount },
    timelineLabel && { icon: Calendar, label: "Timeline", value: timelineLabel },
  ].filter(Boolean) as { icon: LucideIcon; label: string; value: string }[];

  if (variant === "home") {
    return (
      <article className="flex min-h-[366px] flex-col rounded-2xl border border-gray-600 bg-gray-900 p-6">
        <Badge variant="info" size="sm">
          {statusLabel}
        </Badge>

        <h3 className="mt-6 text-[30px] text-gray-25 font-heading">
          {campaign.name}
        </h3>
        <p className="mt-4 text-[20px] text-gray-300 font-serif">
          {campaign.shortDescription}
        </p>

        {metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <MetricItem key={metric.label} {...metric} />
            ))}
          </dl>
        )}

        <Button variant="secondary" href={campaignUrl} external={isExternal} className="mt-auto">
          {ctaLabel}
        </Button>
      </article>
    );
  }

  return (
    <ContentCard
      href={campaignUrl}
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
