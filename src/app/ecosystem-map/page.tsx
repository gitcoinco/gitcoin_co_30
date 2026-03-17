import type { Metadata } from "next";
import Link from "next/link";
import {
  ECOSYSTEM_CATEGORY_LABELS,
  ECOSYSTEM_CATEGORY_ORDER,
  getEcosystemGraph,
  type EcosystemCategory,
  type EcosystemNode,
} from "@/lib/ecosystem-map";
import { pageSeo } from "@/lib/page-seo";
import EcosystemMapVisualizationSwitcher from "./EcosystemMapVisualizationSwitcher";

export const metadata: Metadata = pageSeo.ecosystemMap;

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 780;

const CATEGORY_COLORS: Record<EcosystemCategory, string> = {
  apps: "#4AE5FC",
  mechanisms: "#7EB77F",
  research: "#FFA033",
  "case-studies": "#F7AEF8",
  campaigns: "#DF5368",
};

const CATEGORY_BASE_ANCHORS: Record<EcosystemCategory, { x: number; y: number }> = {
  apps: { x: 220, y: 180 },
  mechanisms: { x: 980, y: 180 },
  research: { x: 990, y: 590 },
  "case-studies": { x: 220, y: 590 },
  campaigns: { x: 600, y: 380 },
};

type PositionedNode = EcosystemNode & { x: number; y: number; radius: number };

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seeded01(seed: number): number {
  const x = Math.sin(seed * 0.00011920928955078125 + 0.1376312587) * 43758.5453123;
  return x - Math.floor(x);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function buildNoisyCategoryAnchors(): Record<EcosystemCategory, { x: number; y: number }> {
  return {
    apps: {
      x: clamp(
        CATEGORY_BASE_ANCHORS.apps.x + (seeded01(hashString("apps-anchor-x")) - 0.5) * 120,
        140,
        SVG_WIDTH - 140,
      ),
      y: clamp(
        CATEGORY_BASE_ANCHORS.apps.y + (seeded01(hashString("apps-anchor-y")) - 0.5) * 100,
        120,
        SVG_HEIGHT - 120,
      ),
    },
    mechanisms: {
      x: clamp(
        CATEGORY_BASE_ANCHORS.mechanisms.x + (seeded01(hashString("mechanisms-anchor-x")) - 0.5) * 120,
        140,
        SVG_WIDTH - 140,
      ),
      y: clamp(
        CATEGORY_BASE_ANCHORS.mechanisms.y + (seeded01(hashString("mechanisms-anchor-y")) - 0.5) * 100,
        120,
        SVG_HEIGHT - 120,
      ),
    },
    research: {
      x: clamp(
        CATEGORY_BASE_ANCHORS.research.x + (seeded01(hashString("research-anchor-x")) - 0.5) * 120,
        140,
        SVG_WIDTH - 140,
      ),
      y: clamp(
        CATEGORY_BASE_ANCHORS.research.y + (seeded01(hashString("research-anchor-y")) - 0.5) * 100,
        120,
        SVG_HEIGHT - 120,
      ),
    },
    "case-studies": {
      x: clamp(
        CATEGORY_BASE_ANCHORS["case-studies"].x + (seeded01(hashString("case-studies-anchor-x")) - 0.5) * 120,
        140,
        SVG_WIDTH - 140,
      ),
      y: clamp(
        CATEGORY_BASE_ANCHORS["case-studies"].y + (seeded01(hashString("case-studies-anchor-y")) - 0.5) * 100,
        120,
        SVG_HEIGHT - 120,
      ),
    },
    campaigns: {
      x: clamp(
        CATEGORY_BASE_ANCHORS.campaigns.x + (seeded01(hashString("campaigns-anchor-x")) - 0.5) * 80,
        160,
        SVG_WIDTH - 160,
      ),
      y: clamp(
        CATEGORY_BASE_ANCHORS.campaigns.y + (seeded01(hashString("campaigns-anchor-y")) - 0.5) * 80,
        140,
        SVG_HEIGHT - 140,
      ),
    },
  };
}

function layoutNodes(
  nodes: EcosystemNode[],
  categoryAnchors: Record<EcosystemCategory, { x: number; y: number }>,
): PositionedNode[] {
  const grouped = new Map<EcosystemCategory, EcosystemNode[]>();
  for (const category of ECOSYSTEM_CATEGORY_ORDER) {
    grouped.set(category, []);
  }
  for (const node of nodes) {
    const list = grouped.get(node.category) ?? [];
    list.push(node);
    grouped.set(node.category, list);
  }

  const positioned: PositionedNode[] = [];
  for (const category of ECOSYSTEM_CATEGORY_ORDER) {
    const categoryNodes = (grouped.get(category) ?? []).sort(
      (a, b) => b.degree - a.degree || a.name.localeCompare(b.name),
    );
    const anchor = categoryAnchors[category];
    const ringSkew = (seeded01(hashString(`${category}:ring-skew`)) - 0.5) * 0.8;
    const angleOffset = seeded01(hashString(`${category}:angle-offset`)) * Math.PI * 2;

    let index = 0;
    let ring = 0;
    while (index < categoryNodes.length) {
      const slots = 9 + (hashString(`${category}:slots:${ring}`) % 7);
      for (let slot = 0; slot < slots && index < categoryNodes.length; slot += 1, index += 1) {
        const node = categoryNodes[index];
        const nodeSeed = hashString(node.id);
        const angleJitter = (seeded01(nodeSeed ^ 0x91e10da5) - 0.5) * 0.5;
        const radialJitter = (seeded01(nodeSeed ^ 0x85ebca6b) - 0.5) * 22;
        const localJitterX = (seeded01(nodeSeed ^ 0xc2b2ae35) - 0.5) * 18;
        const localJitterY = (seeded01(nodeSeed ^ 0x27d4eb2f) - 0.5) * 18;

        const radius = 34 + ring * 30 + radialJitter;
        const theta =
          angleOffset +
          ((slot + ringSkew * ring) / slots) * Math.PI * 2 +
          ring * 0.21 +
          angleJitter;

        const x = clamp(
          anchor.x + Math.cos(theta) * radius + localJitterX,
          25,
          SVG_WIDTH - 25,
        );
        const y = clamp(
          anchor.y + Math.sin(theta) * radius + localJitterY,
          25,
          SVG_HEIGHT - 25,
        );

        positioned.push({
          ...node,
          x,
          y,
          radius: Math.max(
            6.5,
            Math.min(
              19,
              7.5 +
                Math.sqrt(node.degree) * 1.65 +
                (node.category === "research" || node.category === "case-studies" ? 1.8 : 0),
            ),
          ),
        });
      }
      ring += 1;
    }
  }

  return positioned;
}

export default function EcosystemMapPage() {
  const graph = getEcosystemGraph();
  const categoryAnchors = buildNoisyCategoryAnchors();
  const positionedNodes = layoutNodes(graph.nodes, categoryAnchors);

  return (
    <div className="bg-gray-900 text-gray-25">
      <section className="border-b border-gray-700">
        <div className="container-page py-14">
          <p className="inline-flex rounded-md bg-gray-950 px-3 py-1 text-xs font-mono text-teal-400">
            Dataset-Driven Network Map
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold font-heading">
            Ecosystem Map
          </h1>
          <p className="mt-4 max-w-4xl text-gray-200 font-serif">
            A network view of apps, mechanisms, research, case studies, and campaigns.
            Edges combine explicit frontmatter relationships, internal markdown references,
            and high-signal tag overlap.
          </p>
        </div>
      </section>

      <section className="section container-page">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-700 bg-gray-950 p-4">
            <p className="text-xs text-gray-400 font-mono">Total nodes</p>
            <p className="mt-2 text-3xl font-heading">{graph.summary.totalNodes}</p>
          </div>
          <div className="rounded-xl border border-gray-700 bg-gray-950 p-4">
            <p className="text-xs text-gray-400 font-mono">Total edges</p>
            <p className="mt-2 text-3xl font-heading">{graph.summary.totalEdges}</p>
          </div>
          <div className="rounded-xl border border-gray-700 bg-gray-950 p-4">
            <p className="text-xs text-gray-400 font-mono">Explicit edges</p>
            <p className="mt-2 text-3xl font-heading">{graph.summary.edgesByKind.explicit}</p>
          </div>
          <div className="rounded-xl border border-gray-700 bg-gray-950 p-4">
            <p className="text-xs text-gray-400 font-mono">Internal link edges</p>
            <p className="mt-2 text-3xl font-heading">{graph.summary.edgesByKind["internal-link"]}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-gray-700 bg-gray-950 p-4">
          <div className="flex flex-wrap gap-4 text-sm">
            {ECOSYSTEM_CATEGORY_ORDER.map((category) => (
              <div key={category} className="inline-flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[category] }}
                />
                <span className="text-gray-200">
                  {ECOSYSTEM_CATEGORY_LABELS[category]}:{" "}
                  <span className="text-gray-25">{graph.summary.nodesByCategory[category]}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container-page">
        <EcosystemMapVisualizationSwitcher
          nodes={positionedNodes}
          edges={graph.edges}
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          categoryColors={CATEGORY_COLORS}
          categoryAnchors={categoryAnchors}
          categoryOrder={ECOSYSTEM_CATEGORY_ORDER}
          categoryLabels={ECOSYSTEM_CATEGORY_LABELS}
        />
      </section>

      <section className="section container-page pb-20">
        <h2 className="text-2xl font-heading">Strongest Connections</h2>
        <p className="mt-2 text-sm text-gray-300 font-serif">
          Highest-weight links in the full graph. Use this to audit key bridges across
          mechanisms, implementations, and historical outcomes.
        </p>

        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700 text-sm">
            <thead className="bg-gray-950">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-mono text-gray-400">Source</th>
                <th className="px-4 py-3 text-left text-xs font-mono text-gray-400">Target</th>
                <th className="px-4 py-3 text-left text-xs font-mono text-gray-400">Kinds</th>
                <th className="px-4 py-3 text-left text-xs font-mono text-gray-400">Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-gray-900">
              {graph.edges.slice(0, 40).map((edge) => (
                <tr key={edge.id}>
                  <td className="px-4 py-3 text-gray-100">
                    <Link href={`/${edge.sourceCategory}/${edge.sourceSlug}`} className="hover:text-teal-300">
                      {edge.sourceName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-100">
                    <Link href={`/${edge.targetCategory}/${edge.targetSlug}`} className="hover:text-teal-300">
                      {edge.targetName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {edge.kinds.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-gray-50 font-mono">{edge.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
