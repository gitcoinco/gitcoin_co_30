"use client";

import { type Domain, quadrants } from "@/lib/coalitions-data";

interface DomainMapProps {
  domains: Domain[];
  interestCounts: Record<string, number>;
  selectedQuadrant: Domain["quadrant"] | null;
  onSelectQuadrant: (q: Domain["quadrant"] | null) => void;
}

export function DomainMap({
  domains,
  interestCounts,
  selectedQuadrant,
  onSelectQuadrant,
}: DomainMapProps) {
  // Get max interest for relative sizing
  const maxInterest = Math.max(
    ...Object.values(interestCounts),
    1
  );

  return (
    <div className="relative">
      {/* Axis labels */}
      <div className="flex justify-between items-center mb-2 px-2">
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          Survive
        </span>
        <span className="text-xs text-gray-400 font-heading font-semibold">
          Atoms vs. Bits &times; Survive vs. Thrive
        </span>
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          Thrive
        </span>
      </div>

      <div className="flex gap-2">
        {/* Y-axis label */}
        <div className="flex flex-col justify-between py-8 shrink-0">
          <span className="text-xs text-gray-500 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">
            Bits
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">
            Atoms
          </span>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          {/* Top-left: Bits + Survive (Digital Defense) */}
          <QuadrantCell
            quadrant={quadrants.find((q) => q.id === "bits-survive")!}
            domains={domains.filter((d) => d.quadrant === "bits-survive")}
            interestCounts={interestCounts}
            maxInterest={maxInterest}
            isSelected={selectedQuadrant === "bits-survive"}
            onSelect={() =>
              onSelectQuadrant(
                selectedQuadrant === "bits-survive" ? null : "bits-survive"
              )
            }
          />
          {/* Top-right: Bits + Thrive (Digital Coordination) */}
          <QuadrantCell
            quadrant={quadrants.find((q) => q.id === "bits-thrive")!}
            domains={domains.filter((d) => d.quadrant === "bits-thrive")}
            interestCounts={interestCounts}
            maxInterest={maxInterest}
            isSelected={selectedQuadrant === "bits-thrive"}
            onSelect={() =>
              onSelectQuadrant(
                selectedQuadrant === "bits-thrive" ? null : "bits-thrive"
              )
            }
          />
          {/* Bottom-left: Atoms + Survive (Physical Defense) */}
          <QuadrantCell
            quadrant={quadrants.find((q) => q.id === "atoms-survive")!}
            domains={domains.filter((d) => d.quadrant === "atoms-survive")}
            interestCounts={interestCounts}
            maxInterest={maxInterest}
            isSelected={selectedQuadrant === "atoms-survive"}
            onSelect={() =>
              onSelectQuadrant(
                selectedQuadrant === "atoms-survive" ? null : "atoms-survive"
              )
            }
          />
          {/* Bottom-right: Atoms + Thrive (Physical Coordination) */}
          <QuadrantCell
            quadrant={quadrants.find((q) => q.id === "atoms-thrive")!}
            domains={domains.filter((d) => d.quadrant === "atoms-thrive")}
            interestCounts={interestCounts}
            maxInterest={maxInterest}
            isSelected={selectedQuadrant === "atoms-thrive"}
            onSelect={() =>
              onSelectQuadrant(
                selectedQuadrant === "atoms-thrive" ? null : "atoms-thrive"
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

function QuadrantCell({
  quadrant,
  domains,
  interestCounts,
  maxInterest,
  isSelected,
  onSelect,
}: {
  quadrant: (typeof quadrants)[number];
  domains: Domain[];
  interestCounts: Record<string, number>;
  maxInterest: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const totalInterest = domains.reduce(
    (sum, d) => sum + (interestCounts[d.id] || 0),
    0
  );

  return (
    <button
      onClick={onSelect}
      className={`rounded-xl p-4 text-left transition-all min-h-[160px] ${
        isSelected
          ? `${quadrant.bgColor} ${quadrant.borderColor} border-2 ring-1 ring-inset`
          : "bg-gray-950 border border-gray-700 hover:border-gray-500"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-heading font-semibold ${quadrant.color}`}>
          {quadrant.label}
        </h3>
        {totalInterest > 0 && (
          <span className="text-xs text-gray-400">
            {totalInterest} interested
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-3">{quadrant.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {domains.map((d) => {
          const count = interestCounts[d.id] || 0;
          const intensity = maxInterest > 0 ? count / maxInterest : 0;
          return (
            <span
              key={d.id}
              className={`text-xs px-2 py-1 rounded-md transition-colors ${
                count > 0
                  ? `${quadrant.bgColor} ${quadrant.color}`
                  : "bg-gray-800 text-gray-400"
              }`}
              style={{
                opacity: count > 0 ? 0.5 + intensity * 0.5 : 0.7,
              }}
              title={`${d.name}: ${count} interested`}
            >
              {d.name}
              {count > 0 && (
                <span className="ml-1 opacity-70">{count}</span>
              )}
            </span>
          );
        })}
      </div>
    </button>
  );
}
