"use client";

import { Fragment } from "react";
import ImpactNumbersField from "@/components/impact/ImpactNumbersField";
import useMediaQuery from "@/components/impact/useMediaQuery";

type HeroMetric = {
  value: string;
  label: string;
};

function MetricValuePanel({ value, label }: HeroMetric) {
  return (
    <div className="w-full rounded-[16px] border border-gray-300/65 bg-gray-900 px-4 py-5 text-center">
      <div className="font-mono text-[34px] leading-none text-gray-25 sm:text-[40px]">
        {value}
      </div>
      <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-gray-25 sm:text-[14px]">
        {label}
      </div>
    </div>
  );
}

function MetricConnector({ className = "h-8" }: { className?: string }) {
  return <div className={`mx-auto w-px bg-gray-300/65 ${className}`} />;
}

function MobileHeroMetricCard({ value, label }: HeroMetric) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full overflow-hidden rounded-[16px] border border-gray-300/65 bg-transparent">
        <div className="absolute inset-0 bg-[#1f1c18]/14" />
      </div>
      <div className="w-full bg-gray-900">
        <MetricConnector />
        <MetricValuePanel value={value} label={label} />
      </div>
    </div>
  );
}

function DesktopHeroMetricCard({ value, label }: HeroMetric) {
  return (
    <div className="flex flex-col items-center">
      <MetricConnector />
      <MetricValuePanel value={value} label={label} />
    </div>
  );
}

export default function ResponsiveImpactHeroMetrics({
  metrics,
}: {
  metrics: HeroMetric[];
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <div className="mt-10 md:hidden">
        <div className="relative">
          {isDesktop === false ? (
            <ImpactNumbersField
              className="pointer-events-none absolute inset-0"
              variant="hero"
            />
          ) : null}

          <div className="relative">
            {metrics.map((metric, index) => (
              <Fragment key={metric.label}>
                <MobileHeroMetricCard {...metric} />
                {index < metrics.length - 1 ? (
                  <div className="h-5 bg-gray-900" />
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 hidden md:block">
        <div className="relative">
          <div className="relative">
            {isDesktop === true ? (
              <ImpactNumbersField className="absolute inset-0" variant="hero" />
            ) : null}

            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-5 bg-gray-900"
              style={{ left: "calc((100% - 40px) / 3)" }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-5 bg-gray-900"
              style={{ left: "calc((((100% - 40px) / 3) * 2) + 20px)" }}
            />

            <div className="relative grid grid-cols-3 gap-5">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="relative aspect-square overflow-hidden rounded-[16px] border border-gray-300/65 bg-transparent"
                >
                  <div className="absolute inset-0 bg-[#1f1c18]/14" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {metrics.map((metric) => (
              <DesktopHeroMetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
