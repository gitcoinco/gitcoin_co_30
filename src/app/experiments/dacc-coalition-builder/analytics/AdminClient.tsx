"use client";

import { useState, useEffect, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { domains, quadrants, type Domain } from "@/lib/coalitions-data";

const Q_RGB: Record<string, string> = {
  "atoms-survive": "251,146,60",
  "atoms-thrive": "74,222,128",
  "bits-survive": "96,165,250",
  "bits-thrive": "192,132,252",
};

const Q_CSS: Record<string, string> = {
  "atoms-survive": "text-orange-400",
  "atoms-thrive": "text-green-400",
  "bits-survive": "text-blue-400",
  "bits-thrive": "text-purple-400",
};

type Tab = "heatmap" | "bubbles" | "treemap" | "timeline" | "radar" | "contour";

interface ApiData {
  interests: Record<string, number>;
  stakes: Record<string, { totalEth: number; stakers: number }>;
  trending: { domainId: string; queryCount: number }[];
  activity: { type: string; domainId: string; address: string; amount?: string; timestamp: number }[];
  activityTotal: number;
  totalQueries: number;
  recentQueryCount: number;
}

// ── Main Component ──────────────────────────────────────────────────────────

export function AdminClient() {
  const [tab, setTab] = useState<Tab>("heatmap");
  const [data, setData] = useState<ApiData | null>(null);

  useEffect(() => {
    fetch("/api/coalitions?limit=1000")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const energy = useMemo(() => {
    if (!data) return {};
    const result: Record<string, number> = {};
    for (const d of domains) {
      const interest = data.interests[d.id] || 0;
      const s = data.stakes[d.id];
      result[d.id] = interest + (s ? s.totalEth * 10 + s.stakers * 2 : 0);
    }
    return result;
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-teal-400" />
      </div>
    );
  }

  const totalInterest = Object.values(data.interests).reduce((s, n) => s + n, 0);
  const totalStakers = Object.values(data.stakes).reduce((s, v) => s + v.stakers, 0);
  const totalEth = Object.values(data.stakes).reduce((s, v) => s + v.totalEth, 0);

  const tabs: { id: Tab; label: string }[] = [
    { id: "heatmap", label: "Heat Map" },
    { id: "bubbles", label: "Bubbles" },
    { id: "treemap", label: "Treemap" },
    { id: "radar", label: "Radar" },
    { id: "timeline", label: "Timeline" },
    { id: "contour", label: "Contour" },
  ];

  return (
    <div className="pb-16">
      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Interest Signals" value={totalInterest} />
        <StatCard label="Unique Stakers" value={totalStakers} />
        <StatCard label="Total Staked" value={`${totalEth.toFixed(3)} ETH`} />
        <StatCard label="Search Queries" value={data.totalQueries} />
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-800 rounded-lg p-1 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-teal-500 text-gray-950 shadow-[0_0_8px_rgba(2,226,172,0.4)]"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className="rounded-xl border border-gray-700 bg-gray-950 p-4 sm:p-6">
        {tab === "heatmap" && <HeatMap data={data} energy={energy} />}
        {tab === "bubbles" && <BubbleChart energy={energy} />}
        {tab === "treemap" && <Treemap energy={energy} />}
        {tab === "radar" && <RadarChart energy={energy} />}
        {tab === "timeline" && <Timeline data={data} />}
        {tab === "contour" && <ContourMap energy={energy} />}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-950 p-4">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-heading font-bold text-gray-25">{value}</p>
    </div>
  );
}

// ── Shared helpers ──────────────────────────────────────────────────────────

function maxOf(energy: Record<string, number>) {
  return Math.max(...Object.values(energy), 1);
}

function domainPos(d: Domain): { x: number; y: number } {
  const qDomains = domains.filter((dd) => dd.quadrant === d.quadrant);
  const idx = qDomains.indexOf(d);
  const cols = Math.ceil(Math.sqrt(qDomains.length));
  const row = Math.floor(idx / cols);
  const col = idx % cols;
  const rows = Math.ceil(qDomains.length / cols);

  const qx = d.quadrant.includes("thrive") ? 0.75 : 0.25;
  const qy = d.quadrant.includes("bits") ? 0.75 : 0.25;
  const spread = 0.15;

  return {
    x: qx + ((cols > 1 ? col / (cols - 1) : 0.5) - 0.5) * spread * 2,
    y: qy + ((rows > 1 ? row / (rows - 1) : 0.5) - 0.5) * spread * 2,
  };
}

// ── 1. HEAT MAP ─────────────────────────────────────────────────────────────

function HeatMap({ data, energy }: { data: ApiData; energy: Record<string, number> }) {
  const max = maxOf(energy);
  const qOrder: Domain["quadrant"][] = ["bits-survive", "bits-thrive", "atoms-survive", "atoms-thrive"];

  return (
    <div>
      <p className="text-xs text-gray-500 mb-4">
        Cell intensity = combined interest + stake energy. Brighter cells are stronger attractors.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {qOrder.map((qId) => {
          const q = quadrants.find((q) => q.id === qId)!;
          const qDomains = domains
            .filter((d) => d.quadrant === qId)
            .sort((a, b) => (energy[b.id] || 0) - (energy[a.id] || 0));
          const rgb = Q_RGB[qId];
          return (
            <div key={qId} className="rounded-xl border border-gray-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-heading font-semibold ${Q_CSS[qId]}`}>{q.label}</h3>
                <span className="text-[10px] text-gray-600">{q.axis.y} x {q.axis.x}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {qDomains.map((d) => {
                  const e = energy[d.id] || 0;
                  const t = e / max;
                  return (
                    <div
                      key={d.id}
                      className="rounded-lg p-2.5 transition-all relative group cursor-default"
                      style={{
                        backgroundColor: `rgba(${rgb}, ${0.03 + t * 0.35})`,
                        boxShadow: t > 0.3
                          ? `inset 0 0 ${t * 30}px rgba(${rgb}, ${t * 0.15}), 0 0 ${t * 12}px rgba(${rgb}, ${t * 0.2})`
                          : undefined,
                      }}
                    >
                      <p className="text-[10px] text-gray-400 truncate leading-tight">{d.name}</p>
                      <p
                        className="text-sm font-heading font-bold mt-0.5"
                        style={{ color: `rgba(${rgb}, ${0.4 + t * 0.6})` }}
                      >
                        {e > 0 ? e.toFixed(0) : "\u2013"}
                      </p>
                      {/* Hover tooltip */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gray-900/90 flex items-center justify-center p-2 transition-opacity z-10">
                        <div className="text-center">
                          <p className="text-xs text-gray-300 font-medium">{d.name}</p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            Interest: {data.interests[d.id] || 0}
                            {data.stakes[d.id] && ` \u00B7 Stake: ${data.stakes[d.id].totalEth.toFixed(3)} ETH`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-3 px-1">
        <span className="text-[10px] text-gray-600 uppercase tracking-wider">&larr; Survive</span>
        <span className="text-[10px] text-gray-600 uppercase tracking-wider">Thrive &rarr;</span>
      </div>
    </div>
  );
}

// ── 2. BUBBLE CHART ─────────────────────────────────────────────────────────

function BubbleChart({ energy }: { energy: Record<string, number> }) {
  const max = maxOf(energy);
  const W = 800, H = 600;

  const qBounds: Record<string, { x: number; y: number; w: number; h: number }> = {
    "bits-survive":  { x: 0,     y: 0,     w: W / 2, h: H / 2 },
    "bits-thrive":   { x: W / 2, y: 0,     w: W / 2, h: H / 2 },
    "atoms-survive": { x: 0,     y: H / 2, w: W / 2, h: H / 2 },
    "atoms-thrive":  { x: W / 2, y: H / 2, w: W / 2, h: H / 2 },
  };

  const bubbles = domains.map((d) => {
    const e = energy[d.id] || 0;
    const r = Math.max(10, Math.sqrt(e / max) * 50);
    const b = qBounds[d.quadrant];
    const qDomains = domains.filter((dd) => dd.quadrant === d.quadrant);
    const idx = qDomains.indexOf(d);
    const cols = Math.ceil(Math.sqrt(qDomains.length));
    const rows = Math.ceil(qDomains.length / cols);
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const padX = 60, padY = 50;
    const cx = b.x + padX + (cols > 1 ? col / (cols - 1) : 0.5) * (b.w - padX * 2);
    const cy = b.y + padY + (rows > 1 ? row / (rows - 1) : 0.5) * (b.h - padY * 2);
    return { d, cx, cy, r, e };
  });

  return (
    <div>
      <p className="text-xs text-gray-500 mb-4">
        Circle area = energy. Position maps to the d/acc quadrant.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 550 }}>
        {/* Quadrant backgrounds */}
        {Object.entries(qBounds).map(([qId, b]) => (
          <rect key={qId} x={b.x} y={b.y} width={b.w} height={b.h}
            fill={`rgba(${Q_RGB[qId]}, 0.03)`} />
        ))}
        {/* Cross lines */}
        <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="rgba(255,255,255,0.06)" />
        <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.06)" />
        {/* Quadrant labels */}
        {[
          { label: "Digital Defense", x: W / 4, y: 16 },
          { label: "Digital Coordination", x: 3 * W / 4, y: 16 },
          { label: "Physical Defense", x: W / 4, y: H / 2 + 16 },
          { label: "Physical Coordination", x: 3 * W / 4, y: H / 2 + 16 },
        ].map((l) => (
          <text key={l.label} x={l.x} y={l.y} textAnchor="middle"
            fill="rgba(255,255,255,0.15)" fontSize="11" fontWeight="600">{l.label}</text>
        ))}
        {/* Axis labels */}
        <text x={4} y={H / 2 - 6} fill="rgba(255,255,255,0.12)" fontSize="10">BITS</text>
        <text x={4} y={H / 2 + 14} fill="rgba(255,255,255,0.12)" fontSize="10">ATOMS</text>
        <text x={W / 2 - 50} y={H - 4} fill="rgba(255,255,255,0.12)" fontSize="10">SURVIVE</text>
        <text x={W / 2 + 10} y={H - 4} fill="rgba(255,255,255,0.12)" fontSize="10">THRIVE</text>
        {/* Bubbles - render smaller ones first so large ones are on top */}
        {bubbles
          .sort((a, b) => a.r - b.r)
          .map(({ d, cx, cy, r, e }) => {
            const rgb = Q_RGB[d.quadrant];
            const t = e / max;
            return (
              <g key={d.id}>
                {/* Glow */}
                {t > 0.2 && (
                  <circle cx={cx} cy={cy} r={r + 8}
                    fill="none" stroke={`rgba(${rgb}, ${t * 0.15})`} strokeWidth={t * 6} />
                )}
                <circle cx={cx} cy={cy} r={r}
                  fill={`rgba(${rgb}, ${0.12 + t * 0.35})`}
                  stroke={`rgba(${rgb}, ${0.3 + t * 0.4})`}
                  strokeWidth={1.5} />
                {r > 18 && (
                  <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="auto"
                    fill={`rgba(255,255,255,${0.5 + t * 0.5})`}
                    fontSize={Math.min(11, r * 0.45)} fontWeight="600">
                    {d.name.length > r / 4 ? d.name.split(" ")[0] : d.name}
                  </text>
                )}
                {r > 22 && (
                  <text x={cx} y={cy + 12} textAnchor="middle"
                    fill={`rgba(${rgb}, 0.7)`} fontSize="9">
                    {e.toFixed(0)}
                  </text>
                )}
                <title>{d.name}: {e.toFixed(0)} energy</title>
              </g>
            );
          })}
      </svg>
    </div>
  );
}

// ── 3. TREEMAP ──────────────────────────────────────────────────────────────

interface TRect { x: number; y: number; w: number; h: number; domain: Domain; value: number }

function layoutTreemap(
  items: { domain: Domain; value: number }[],
  x: number, y: number, w: number, h: number,
): TRect[] {
  if (items.length === 0) return [];
  if (items.length === 1) return [{ x, y, w, h, domain: items[0].domain, value: items[0].value }];

  const total = items.reduce((s, i) => s + i.value, 0);
  if (total === 0) {
    return items.map((item, i) => ({
      x: x + (w / items.length) * i, y, w: w / items.length, h, domain: item.domain, value: 0,
    }));
  }

  const sorted = [...items].sort((a, b) => b.value - a.value);
  let sum = 0, split = 1;
  for (let i = 0; i < sorted.length; i++) {
    sum += sorted[i].value;
    if (sum >= total / 2) { split = i + 1; break; }
  }
  if (split >= sorted.length) split = sorted.length - 1;

  const left = sorted.slice(0, split);
  const right = sorted.slice(split);
  const ratio = left.reduce((s, i) => s + i.value, 0) / total;

  if (w >= h) {
    return [
      ...layoutTreemap(left, x, y, w * ratio, h),
      ...layoutTreemap(right, x + w * ratio, y, w * (1 - ratio), h),
    ];
  }
  return [
    ...layoutTreemap(left, x, y, w, h * ratio),
    ...layoutTreemap(right, x, y + h * ratio, w, h * (1 - ratio)),
  ];
}

function Treemap({ energy }: { energy: Record<string, number> }) {
  const max = maxOf(energy);
  const W = 800, H = 500;
  const items = domains.map((d) => ({ domain: d, value: Math.max(energy[d.id] || 0, 0.5) }));
  const rects = layoutTreemap(items, 0, 0, W, H);

  return (
    <div>
      <p className="text-xs text-gray-500 mb-4">
        Rectangle area = energy. The largest blocks are the strongest attractors.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 500 }}>
        {rects.map(({ x, y, w, h, domain, value }) => {
          const rgb = Q_RGB[domain.quadrant];
          const t = value / max;
          const pad = 1.5;
          const rw = Math.max(w - pad * 2, 0);
          const rh = Math.max(h - pad * 2, 0);
          return (
            <g key={domain.id}>
              <rect x={x + pad} y={y + pad} width={rw} height={rh} rx={4}
                fill={`rgba(${rgb}, ${0.08 + t * 0.35})`}
                stroke={`rgba(${rgb}, ${0.2 + t * 0.3})`} strokeWidth={1} />
              {rw > 70 && rh > 35 && (
                <>
                  <text x={x + w / 2} y={y + h / 2 - 5} textAnchor="middle"
                    fill={`rgba(255,255,255,${0.5 + t * 0.5})`} fontSize="11" fontWeight="600">
                    {domain.name.length > rw / 7.5
                      ? domain.name.slice(0, Math.floor(rw / 7.5)) + "\u2026"
                      : domain.name}
                  </text>
                  <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle"
                    fill={`rgba(${rgb}, 0.7)`} fontSize="10">
                    {value.toFixed(0)}
                  </text>
                </>
              )}
              {rw > 30 && rw <= 70 && rh > 20 && (
                <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle"
                  fill={`rgba(${rgb}, 0.6)`} fontSize="9">
                  {value.toFixed(0)}
                </text>
              )}
              <title>{domain.name}: {value.toFixed(0)} energy</title>
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="flex gap-4 mt-3 justify-center flex-wrap">
        {quadrants.map((q) => (
          <span key={q.id} className="text-[10px] text-gray-500 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: `rgba(${Q_RGB[q.id]}, 0.5)` }} />
            {q.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── 4. RADAR CHART ──────────────────────────────────────────────────────────

function RadarChart({ energy }: { energy: Record<string, number> }) {
  const max = maxOf(energy);
  const cx = 300, cy = 300, R = 220;

  // Sort domains so quadrants are grouped as visual sectors
  const qOrder: Domain["quadrant"][] = ["bits-survive", "bits-thrive", "atoms-thrive", "atoms-survive"];
  const sorted = [...domains].sort((a, b) => {
    const ai = qOrder.indexOf(a.quadrant);
    const bi = qOrder.indexOf(b.quadrant);
    return ai !== bi ? ai - bi : a.name.localeCompare(b.name);
  });

  const n = sorted.length;
  const points = sorted.map((d, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const e = energy[d.id] || 0;
    const r = Math.max((e / max) * R, 4);
    return {
      d,
      angle,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      lx: cx + (R + 30) * Math.cos(angle),
      ly: cy + (R + 30) * Math.sin(angle),
      sx: cx + R * Math.cos(angle),
      sy: cy + R * Math.sin(angle),
      e,
    };
  });

  const polyPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Quadrant sector arcs (background fills)
  const qStarts: number[] = [];
  let prevQ = "";
  sorted.forEach((d, i) => {
    if (d.quadrant !== prevQ) { qStarts.push(i); prevQ = d.quadrant; }
  });

  return (
    <div>
      <p className="text-xs text-gray-500 mb-4">
        Each spoke = a domain. Distance from center = energy. Asymmetric shapes reveal where energy concentrates.
      </p>
      <svg viewBox="0 0 600 600" className="w-full mx-auto" style={{ maxWidth: 600 }}>
        {/* Quadrant sector fills */}
        {qStarts.map((startIdx, si) => {
          const endIdx = si < qStarts.length - 1 ? qStarts[si + 1] : n;
          const qId = sorted[startIdx].quadrant;
          const rgb = Q_RGB[qId];
          const startAngle = (startIdx / n) * Math.PI * 2 - Math.PI / 2;
          const endAngle = (endIdx / n) * Math.PI * 2 - Math.PI / 2;
          const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
          const path = [
            `M ${cx} ${cy}`,
            `L ${cx + R * Math.cos(startAngle)} ${cy + R * Math.sin(startAngle)}`,
            `A ${R} ${R} 0 ${largeArc} 1 ${cx + R * Math.cos(endAngle)} ${cy + R * Math.sin(endAngle)}`,
            "Z",
          ].join(" ");
          return <path key={qId} d={path} fill={`rgba(${rgb}, 0.04)`} />;
        })}

        {/* Concentric rings */}
        {[0.25, 0.5, 0.75, 1].map((pct) => (
          <circle key={pct} cx={cx} cy={cy} r={R * pct} fill="none" stroke="rgba(255,255,255,0.06)" />
        ))}

        {/* Spokes */}
        {points.map((p) => (
          <line key={p.d.id} x1={cx} y1={cy} x2={p.sx} y2={p.sy} stroke="rgba(255,255,255,0.04)" />
        ))}

        {/* Filled polygon */}
        <path d={polyPath} fill="rgba(2,226,172,0.06)" stroke="rgba(2,226,172,0.35)" strokeWidth={1.5} />

        {/* Data points + labels */}
        {points.map((p) => {
          const rgb = Q_RGB[p.d.quadrant];
          const t = p.e / max;
          return (
            <g key={p.d.id}>
              {/* Glow for strong attractors */}
              {t > 0.4 && (
                <circle cx={p.x} cy={p.y} r={8}
                  fill={`rgba(${rgb}, ${t * 0.25})`} />
              )}
              <circle cx={p.x} cy={p.y} r={4 + t * 3}
                fill={`rgba(${rgb}, ${0.5 + t * 0.5})`}
                stroke={`rgba(${rgb}, 0.8)`} strokeWidth={1} />
              <text
                x={p.lx} y={p.ly}
                textAnchor={p.lx > cx + 10 ? "start" : p.lx < cx - 10 ? "end" : "middle"}
                dominantBaseline={p.ly > cy + 10 ? "hanging" : p.ly < cy - 10 ? "auto" : "middle"}
                fill="rgba(255,255,255,0.35)" fontSize="8"
              >
                {p.d.name.split(" ")[0]}
              </text>
              <title>{p.d.name}: {p.e.toFixed(0)}</title>
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="flex gap-4 mt-2 justify-center flex-wrap">
        {quadrants.map((q) => (
          <span key={q.id} className="text-[10px] text-gray-500 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `rgba(${Q_RGB[q.id]}, 0.7)` }} />
            {q.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── 5. TIMELINE ─────────────────────────────────────────────────────────────

function Timeline({ data }: { data: ApiData }) {
  const bins = useMemo(() => {
    if (data.activity.length === 0) return [];
    const sorted = [...data.activity].sort((a, b) => a.timestamp - b.timestamp);
    const dayMs = 86400000;
    const first = Math.floor(sorted[0].timestamp / dayMs) * dayMs;
    const last = Math.floor(sorted[sorted.length - 1].timestamp / dayMs) * dayMs;

    const result: { day: number; interest: number; stake: number; withdraw: number }[] = [];
    for (let day = first; day <= last; day += dayMs) {
      const end = day + dayMs;
      const events = sorted.filter((e) => e.timestamp >= day && e.timestamp < end);
      result.push({
        day,
        interest: events.filter((e) => e.type === "interest").length,
        stake: events.filter((e) => e.type === "stake").length,
        withdraw: events.filter((e) => e.type === "withdraw").length,
      });
    }
    return result;
  }, [data.activity]);

  if (bins.length === 0) {
    return <p className="text-sm text-gray-500 text-center py-12">No activity data yet.</p>;
  }

  const W = 800, H = 300;
  const maxEvents = Math.max(...bins.map((b) => b.interest + b.stake + b.withdraw), 1);
  const barW = Math.max(3, Math.min(20, (W - 50) / bins.length - 1));
  const chartH = H - 40;

  return (
    <div>
      <p className="text-xs text-gray-500 mb-4">
        Daily activity volume. Surges indicate emerging attractors.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }}>
        {/* Y grid */}
        {[0.25, 0.5, 0.75, 1].map((pct) => (
          <g key={pct}>
            <line x1={45} y1={H - 20 - chartH * pct} x2={W} y2={H - 20 - chartH * pct}
              stroke="rgba(255,255,255,0.04)" />
            <text x={40} y={H - 16 - chartH * pct} textAnchor="end"
              fill="rgba(255,255,255,0.15)" fontSize="9">
              {Math.round(maxEvents * pct)}
            </text>
          </g>
        ))}
        {/* Stacked bars */}
        {bins.map((bin, i) => {
          const x = 50 + i * ((W - 50) / bins.length);
          const segments = [
            { count: bin.withdraw, color: "rgba(251,146,60,0.7)" },
            { count: bin.stake, color: "rgba(2,226,172,0.7)" },
            { count: bin.interest, color: "rgba(96,165,250,0.6)" },
          ];
          let y = H - 20;
          return (
            <g key={i}>
              {segments.map((seg, si) => {
                if (seg.count === 0) return null;
                const segH = (seg.count / maxEvents) * chartH;
                y -= segH;
                return (
                  <rect key={si} x={x} y={y} width={barW} height={segH}
                    fill={seg.color} rx={barW > 4 ? 1.5 : 0} />
                );
              })}
              {/* Date tick */}
              {(bins.length <= 14 || i % Math.ceil(bins.length / 12) === 0) && (
                <text x={x + barW / 2} y={H - 4} textAnchor="middle"
                  fill="rgba(255,255,255,0.15)" fontSize="8">
                  {new Date(bin.day).toLocaleDateString("en", { month: "short", day: "numeric" })}
                </text>
              )}
              <title>
                {new Date(bin.day).toLocaleDateString()}: {bin.interest + bin.stake + bin.withdraw} events
              </title>
            </g>
          );
        })}
        <line x1={50} y1={H - 20} x2={W} y2={H - 20} stroke="rgba(255,255,255,0.08)" />
      </svg>
      <div className="flex gap-4 mt-3 justify-center">
        <span className="text-[10px] text-gray-500 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "rgba(96,165,250,0.7)" }} /> Interest
        </span>
        <span className="text-[10px] text-gray-500 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "rgba(2,226,172,0.7)" }} /> Stake
        </span>
        <span className="text-[10px] text-gray-500 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "rgba(251,146,60,0.7)" }} /> Withdraw
        </span>
      </div>
    </div>
  );
}

// ── 6. CONTOUR MAP ──────────────────────────────────────────────────────────

function ContourMap({ energy }: { energy: Record<string, number> }) {
  const max = maxOf(energy);
  const COLS = 40, ROWS = 30;
  const W = 800, H = 600;
  const cellW = W / COLS, cellH = H / ROWS;

  // Each domain positioned in continuous 0..1 space
  const positions = useMemo(
    () => domains.map((d) => ({ ...domainPos(d), energy: energy[d.id] || 0, domain: d })),
    [energy],
  );

  // Compute density field
  const grid = useMemo(() => {
    const sigma = 0.12;
    const cells: { x: number; y: number; density: number }[] = [];
    let maxDensity = 0;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const gx = (c + 0.5) / COLS;
        const gy = 1 - (r + 0.5) / ROWS; // flip Y so bits is top
        let density = 0;
        for (const p of positions) {
          const dx = gx - p.x;
          const dy = gy - p.y;
          density += p.energy * Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
        }
        if (density > maxDensity) maxDensity = density;
        cells.push({ x: c * cellW, y: r * cellH, density });
      }
    }

    // Normalize
    if (maxDensity > 0) {
      for (const cell of cells) cell.density /= maxDensity;
    }
    return cells;
  }, [positions, cellW, cellH]);

  // Color scale: dark -> teal -> white-hot
  function densityColor(t: number): string {
    if (t < 0.3) {
      const s = t / 0.3;
      return `rgba(2,226,172, ${s * 0.15})`;
    }
    if (t < 0.7) {
      const s = (t - 0.3) / 0.4;
      const r = Math.round(2 + s * 50);
      const g = Math.round(226 - s * 80);
      const b = Math.round(172 - s * 40);
      return `rgba(${r},${g},${b}, ${0.15 + s * 0.25})`;
    }
    const s = (t - 0.7) / 0.3;
    const r = Math.round(52 + s * 200);
    const g = Math.round(146 + s * 109);
    const b = Math.round(132 + s * 123);
    return `rgba(${r},${g},${b}, ${0.4 + s * 0.4})`;
  }

  return (
    <div>
      <p className="text-xs text-gray-500 mb-4">
        Topographic density field. Peaks show where energy concentrates across the Atoms/Bits x Survive/Thrive space.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 550 }}>
        {/* Density cells */}
        {grid.map((cell, i) => (
          cell.density > 0.02 && (
            <rect key={i} x={cell.x} y={cell.y} width={cellW + 0.5} height={cellH + 0.5}
              fill={densityColor(cell.density)} />
          )
        ))}

        {/* Quadrant dividers */}
        <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
        <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

        {/* Domain markers */}
        {positions.map((p) => {
          const px = p.x * W;
          const py = (1 - p.y) * H;
          const rgb = Q_RGB[p.domain.quadrant];
          const t = p.energy / max;
          return (
            <g key={p.domain.id}>
              {/* Glow ring */}
              {t > 0.2 && (
                <circle cx={px} cy={py} r={12 + t * 8}
                  fill={`rgba(${rgb}, ${t * 0.12})`} />
              )}
              <circle cx={px} cy={py} r={4 + t * 4}
                fill={`rgba(${rgb}, ${0.5 + t * 0.5})`}
                stroke="rgba(255,255,255,0.3)" strokeWidth={0.5} />
              <text x={px} y={py - 10} textAnchor="middle"
                fill={`rgba(255,255,255,${0.3 + t * 0.5})`} fontSize="8" fontWeight="500">
                {p.domain.name.split(" ")[0]}
              </text>
              <title>{p.domain.name}: {p.energy.toFixed(0)} energy</title>
            </g>
          );
        })}

        {/* Axis labels */}
        <text x={W / 2} y={14} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="10">BITS</text>
        <text x={W / 2} y={H - 6} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="10">ATOMS</text>
        <text x={6} y={H / 2 - 4} fill="rgba(255,255,255,0.12)" fontSize="10">SURVIVE</text>
        <text x={W - 6} y={H / 2 - 4} textAnchor="end" fill="rgba(255,255,255,0.12)" fontSize="10">THRIVE</text>
      </svg>
    </div>
  );
}
