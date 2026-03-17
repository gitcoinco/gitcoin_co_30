"use client";

import { useMemo, useState } from "react";
import {
  hierarchy,
  tree,
  type HierarchyPointLink,
  type HierarchyPointNode,
} from "d3-hierarchy";
import { linkRadial } from "d3-shape";

type EcosystemCategory = "apps" | "mechanisms" | "research" | "case-studies" | "campaigns";

type PositionedNode = {
  id: string;
  name: string;
  category: EcosystemCategory;
  degree: number;
  href: string;
  x: number;
  y: number;
  radius: number;
};

type EcosystemEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  kinds: ("explicit" | "internal-link" | "tag-overlap")[];
  weight: number;
};

type RadialTreeNode = {
  id: string;
  name: string;
  kind: "root" | "category" | "leaf";
  category?: EcosystemCategory;
  href?: string;
  degree?: number;
  children?: RadialTreeNode[];
};

interface EcosystemRadialTreeMapProps {
  nodes: PositionedNode[];
  edges: EcosystemEdge[];
  width: number;
  height: number;
  categoryColors: Record<EcosystemCategory, string>;
  categoryOrder: EcosystemCategory[];
  categoryLabels: Record<EcosystemCategory, string>;
}

type TreePointNode = HierarchyPointNode<RadialTreeNode>;
type LeafPoint = { x: number; y: number; category: EcosystemCategory };
type RadialRelationshipEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  sourceCategory: EcosystemCategory;
  targetCategory: EcosystemCategory;
  weight: number;
  kinds: EcosystemEdge["kinds"];
  color: string;
  path: string;
};

const RADIAL_COOLORS_PALETTE: Record<EcosystemCategory, string> = {
  apps: "#D1F0B1",
  mechanisms: "#B6CB9E",
  research: "#92B4A7",
  "case-studies": "#8C8A93",
  campaigns: "#81667A",
};

const LEAF_LABEL_FONT_SIZE = 16;
const CONNECTED_LEAF_LABEL_FONT_SIZE = 12;
const ZOOM_MIN = 0.8;
const ZOOM_MAX = 3.5;
const ZOOM_STEP = 1.15;

function polarToCartesian(angle: number, radius: number): { x: number; y: number } {
  const a = angle - Math.PI / 2;
  return {
    x: Math.cos(a) * radius,
    y: Math.sin(a) * radius,
  };
}

function collectAncestorIds(node: TreePointNode | null): Set<string> {
  const ids = new Set<string>();
  let cursor: TreePointNode | null = node;
  while (cursor) {
    ids.add(cursor.data.id);
    cursor = cursor.parent;
  }
  return ids;
}

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

function edgeColor(edge: EcosystemEdge): string {
  if (edge.kinds.includes("explicit")) return "#555";
  if (edge.kinds.includes("internal-link")) return "#8D99A7";
  return "#708195";
}

function relationshipPath(
  source: LeafPoint,
  target: LeafPoint,
  seedKey: string,
  outerRadius: number,
): string {
  const seed = hashString(seedKey);
  const sourceRadius = Math.max(1e-6, Math.hypot(source.x, source.y));
  const targetRadius = Math.max(1e-6, Math.hypot(target.x, target.y));
  const sourceUnitX = source.x / sourceRadius;
  const sourceUnitY = source.y / sourceRadius;
  const targetUnitX = target.x / targetRadius;
  const targetUnitY = target.y / targetRadius;

  // Push control points beyond the outer ring so secondary links stay outside.
  const lift = outerRadius + 36 + seeded01(seed ^ 0x5f3759df) * 62;
  const sourceLift = lift + seeded01(seed ^ 0xa5a5a5a5) * 24;
  const targetLift = lift + seeded01(seed ^ 0x91e10da5) * 24;
  const c1x = sourceUnitX * sourceLift;
  const c1y = sourceUnitY * sourceLift;
  const c2x = targetUnitX * targetLift;
  const c2y = targetUnitY * targetLift;

  return `M ${source.x.toFixed(2)} ${source.y.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${target.x.toFixed(2)} ${target.y.toFixed(2)}`;
}

export default function EcosystemRadialTreeMap({
  nodes,
  edges,
  width,
  height,
  categoryColors,
  categoryOrder,
  categoryLabels,
}: EcosystemRadialTreeMapProps) {
  const radialColors = useMemo(
    () => ({ ...categoryColors, ...RADIAL_COOLORS_PALETTE }),
    [categoryColors],
  );

  const [hoveredLeafId, setHoveredLeafId] = useState<string | null>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<EcosystemCategory | null>(null);
  const [pinnedLeafId, setPinnedLeafId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const activeCategoryId = pinnedLeafId ? null : hoveredCategoryId;
  const activeLeafId = activeCategoryId ? null : pinnedLeafId ?? hoveredLeafId;

  const radial = useMemo(() => {
    const grouped = new Map<EcosystemCategory, PositionedNode[]>();
    for (const category of categoryOrder) grouped.set(category, []);

    for (const node of nodes) {
      const group = grouped.get(node.category) ?? [];
      group.push(node);
      grouped.set(node.category, group);
    }

    const rootData: RadialTreeNode = {
      id: "root",
      name: "Ecosystem",
      kind: "root",
      children: categoryOrder.map((category) => ({
        id: `category:${category}`,
        name: categoryLabels[category],
        kind: "category",
        category,
        children: (grouped.get(category) ?? [])
          .sort((a, b) => b.degree - a.degree || a.name.localeCompare(b.name))
          .map((node) => ({
            id: node.id,
            name: node.name,
            kind: "leaf",
            href: node.href,
            degree: node.degree,
            category: node.category,
          })),
      })),
    };

    const radius = Math.min(width, height) / 2 - 72;

    const root = hierarchy(rootData);
    tree<RadialTreeNode>()
      .size([Math.PI * 2, radius])
      .separation((a, b) => ((a.parent === b.parent ? 1 : 2) / Math.max(1, a.depth)))(root);

    const descendants = root.descendants() as TreePointNode[];
    const links = root.links() as HierarchyPointLink<RadialTreeNode>[];

    const nodeById = new Map<string, TreePointNode>();
    for (const node of descendants) nodeById.set(node.data.id, node);

    return { root, descendants, links, nodeById, radius };
  }, [categoryLabels, categoryOrder, height, nodes, width]);

  const leafPointsById = useMemo(() => {
    const map = new Map<string, LeafPoint>();
    for (const node of radial.descendants) {
      if (node.data.kind !== "leaf" || !node.data.category) continue;
      const point = polarToCartesian(node.x, node.y);
      map.set(node.data.id, {
        x: point.x,
        y: point.y,
        category: node.data.category,
      });
    }
    return map;
  }, [radial.descendants]);

  const relationshipEdges = useMemo(() => {
    const rendered: RadialRelationshipEdge[] = [];
    for (const edge of edges) {
      const source = leafPointsById.get(edge.sourceId);
      const target = leafPointsById.get(edge.targetId);
      if (!source || !target) continue;
      rendered.push({
        id: edge.id,
        sourceId: edge.sourceId,
        targetId: edge.targetId,
        sourceCategory: source.category,
        targetCategory: target.category,
        weight: edge.weight,
        kinds: edge.kinds,
        color: edgeColor(edge),
        path: relationshipPath(source, target, `radial-edge:${edge.id}`, radial.radius),
      });
    }
    return rendered;
  }, [edges, leafPointsById, radial.radius]);

  const edgesByLeafId = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const edge of relationshipEdges) {
      const sourceSet = map.get(edge.sourceId) ?? new Set<string>();
      sourceSet.add(edge.id);
      map.set(edge.sourceId, sourceSet);

      const targetSet = map.get(edge.targetId) ?? new Set<string>();
      targetSet.add(edge.id);
      map.set(edge.targetId, targetSet);
    }
    return map;
  }, [relationshipEdges]);

  const activeRelationshipEdgeIds = useMemo(
    () => {
      if (activeLeafId) return edgesByLeafId.get(activeLeafId) ?? new Set<string>();
      return new Set<string>();
    },
    [activeLeafId, edgesByLeafId],
  );

  const connectedLeafIds = useMemo(() => {
    if (!activeLeafId) return new Set<string>();
    const connected = new Set<string>([activeLeafId]);
    for (const edge of relationshipEdges) {
      if (edge.sourceId === activeLeafId) connected.add(edge.targetId);
      if (edge.targetId === activeLeafId) connected.add(edge.sourceId);
    }
    return connected;
  }, [activeLeafId, relationshipEdges]);

  const relatedLeafCountById = useMemo(() => {
    const relatedByLeaf = new Map<string, Set<string>>();
    for (const edge of relationshipEdges) {
      const sourceSet = relatedByLeaf.get(edge.sourceId) ?? new Set<string>();
      sourceSet.add(edge.targetId);
      relatedByLeaf.set(edge.sourceId, sourceSet);

      const targetSet = relatedByLeaf.get(edge.targetId) ?? new Set<string>();
      targetSet.add(edge.sourceId);
      relatedByLeaf.set(edge.targetId, targetSet);
    }

    const counts = new Map<string, number>();
    for (const [leafId, related] of relatedByLeaf.entries()) {
      counts.set(leafId, related.size);
    }
    return counts;
  }, [relationshipEdges]);

  const activeCategoryLeafIds = useMemo(() => {
    if (!activeCategoryId) return new Set<string>();
    return new Set(
      radial.descendants
        .filter(
          (node) =>
            node.data.kind === "leaf" &&
            node.data.category === activeCategoryId,
        )
        .map((node) => node.data.id),
    );
  }, [activeCategoryId, radial.descendants]);

  const activeLeaf = activeLeafId ? radial.nodeById.get(activeLeafId) ?? null : null;
  const activeAncestorIds = useMemo(() => collectAncestorIds(activeLeaf ?? null), [activeLeaf]);

  const radialLink = useMemo(
    () =>
      linkRadial<HierarchyPointLink<RadialTreeNode>, TreePointNode>()
        .angle((d) => d.x)
        .radius((d) => d.y),
    [],
  );

  function handleLeafClick(node: TreePointNode): void {
    if (node.data.kind !== "leaf" || !node.data.href) return;

    // While a leaf is pinned, clicking any directly related leaf opens it immediately.
    if (
      pinnedLeafId &&
      node.data.id !== pinnedLeafId &&
      connectedLeafIds.has(node.data.id)
    ) {
      window.open(node.data.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (pinnedLeafId === node.data.id) {
      window.open(node.data.href, "_blank", "noopener,noreferrer");
      return;
    }
    setPinnedLeafId(node.data.id);
  }

  function zoomBy(factor: number): void {
    setZoom((prev) => clamp(prev * factor, ZOOM_MIN, ZOOM_MAX));
  }

  function handleWheel(event: React.WheelEvent<SVGSVGElement>): void {
    event.preventDefault();
    zoomBy(event.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP);
  }

  const activeName = activeLeaf?.data.name ?? null;
  const relationshipCount = activeRelationshipEdgeIds.size;
  const activeCategoryLabel = activeCategoryId ? categoryLabels[activeCategoryId] : null;

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
        <p className="text-xs text-gray-400 font-mono">
          {pinnedLeafId
            ? `${relationshipCount} linked items pinned · click pinned node to open, or click any linked node to open`
            : activeLeafId
              ? `${relationshipCount} linked items highlighted`
              : activeCategoryId
                ? `${activeCategoryLabel} branch highlighted`
              : "Hover leaves to preview branch + relationships · click once to pin · click pinned leaf again to open · scroll to zoom"}
        </p>
      </div>

      <div className="relative overflow-x-auto rounded-xl border border-gray-800 bg-gray-900">
        <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-md border border-gray-700 bg-gray-950/85 p-1">
          <button
            type="button"
            onClick={() => zoomBy(1 / ZOOM_STEP)}
            className="rounded px-2 py-1 text-xs text-gray-200 hover:bg-gray-800"
            aria-label="Zoom out"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="rounded px-2 py-1 text-xs text-gray-200 hover:bg-gray-800"
            aria-label="Reset zoom"
          >
            1x
          </button>
          <button
            type="button"
            onClick={() => zoomBy(ZOOM_STEP)}
            className="rounded px-2 py-1 text-xs text-gray-200 hover:bg-gray-800"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>

        <svg
          className="relative z-10"
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height="auto"
          role="img"
          aria-label="Ecosystem radial tree"
          onMouseLeave={() => {
            setHoveredLeafId(null);
            setHoveredCategoryId(null);
          }}
          onClick={() => {
            setPinnedLeafId(null);
            setHoveredCategoryId(null);
          }}
          onWheel={handleWheel}
        >
          <defs>
            <linearGradient id="ecosystem-radial-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#151310" />
              <stop offset="100%" stopColor="#1C1A17" />
            </linearGradient>
          </defs>

          <rect x={0} y={0} width={width} height={height} fill="url(#ecosystem-radial-bg)" fillOpacity={0.25} />

          <g transform={`translate(${width / 2} ${height / 2}) scale(${zoom})`}>
            {radial.links
              .filter((link) => link.source.data.kind !== "root")
              .map((link, index) => {
              const targetCategory = link.target.data.category;
              const linkColor = targetCategory ? radialColors[targetCategory] : "#708195";
              const active = activeLeafId
                ? activeAncestorIds.size > 0 &&
                  activeAncestorIds.has(link.source.data.id) &&
                  activeAncestorIds.has(link.target.data.id)
                : activeCategoryId
                  ? link.target.data.category === activeCategoryId
                  : false;
              return (
                <path
                  key={`radial-link-${index}`}
                  d={radialLink(link) ?? ""}
                  fill="none"
                  stroke={linkColor}
                  strokeOpacity={
                    activeLeafId || activeCategoryId
                      ? active
                        ? 0.92
                        : 0.08
                      : 0.24
                  }
                  strokeWidth={active ? 1.35 : 0.8}
                />
              );
            })}

            {relationshipEdges.map((edge) => {
              const isActive = activeLeafId ? activeRelationshipEdgeIds.has(edge.id) : false;
              return (
                <path
                  key={`relationship-${edge.id}`}
                  d={edge.path}
                  fill="none"
                  stroke={edge.color}
                  strokeOpacity={activeLeafId ? (isActive ? 0.95 : 0.06) : 0.16}
                  strokeWidth={isActive ? Math.min(3.2, 1 + edge.weight * 0.3) : 0.2}
                  strokeDasharray={edge.kinds.includes("explicit") ? undefined : "3 4"}
                />
              );
            })}

            {radial.descendants.map((node) => {
              const { x, y } = polarToCartesian(node.x, node.y);
              const isRoot = node.data.kind === "root";
              const isCategory = node.data.kind === "category";
              const isLeaf = node.data.kind === "leaf";
              const isActiveLeaf = isLeaf && activeLeafId === node.data.id;
              const isIndirectRelatedLeaf =
                isLeaf && !!activeLeafId && connectedLeafIds.has(node.data.id) && !isActiveLeaf;
              const showConnectedLeafLabel = isLeaf && !!activeLeafId && connectedLeafIds.has(node.data.id);
              if (isRoot) return null;
              const categoryColor = node.data.category ? radialColors[node.data.category] : "#9AA6B2";
              const inActiveBranch = activeAncestorIds.has(node.data.id);
              const muted =
                node.data.kind === "leaf" && activeLeafId
                  ? !connectedLeafIds.has(node.data.id)
                  : node.data.kind === "leaf" && activeCategoryId
                    ? !activeCategoryLeafIds.has(node.data.id)
                    : node.data.kind === "category" && activeCategoryId
                      ? node.data.category !== activeCategoryId
                  : activeAncestorIds.size > 0 && !inActiveBranch;
              const relatedCount = isLeaf ? relatedLeafCountById.get(node.data.id) ?? 0 : 0;
              const leafRadius =
                2.4 +
                Math.min(
                  4.8,
                  Math.sqrt(node.data.degree ?? 0) * 0.2 + Math.sqrt(relatedCount) * 0.55,
                );
              const radius = isRoot ? 5.8 : isCategory ? 5 : leafRadius;
              const nodeFill = isIndirectRelatedLeaf ? "#FFFFFF" : categoryColor;
              const nodeFillOpacity = muted ? 0.2 : isActiveLeaf || isIndirectRelatedLeaf ? 1 : 0.78;

              return (
                <g
                  key={`radial-node-${node.data.id}`}
                  transform={`translate(${x}, ${y})`}
                  onMouseEnter={
                    isCategory && node.data.category
                      ? () => {
                          setHoveredLeafId(null);
                          setHoveredCategoryId(node.data.category ?? null);
                        }
                      : undefined
                  }
                  onMouseLeave={isCategory ? () => setHoveredCategoryId(null) : undefined}
                  style={isCategory ? { cursor: "pointer" } : undefined}
                >
                  <circle
                    r={radius}
                    fill={nodeFill}
                    fillOpacity={nodeFillOpacity}
                    stroke="#111"
                    strokeWidth={isActiveLeaf ? 1.3 : 0.8}
                  >
                    <title>
                      {node.data.name}
                      {isLeaf ? `\nDegree: ${node.data.degree ?? 0}` : ""}
                    </title>
                  </circle>

                  {isCategory && (
                    <text
                      x={0}
                      y={-11}
                      textAnchor="middle"
                      fontSize={12}
                      fontWeight={700}
                      fill={categoryColor}
                    >
                      {node.data.name}
                    </text>
                  )}

                  {showConnectedLeafLabel && (
                    <text
                      x={node.x >= Math.PI ? -10 : 10}
                      y={4}
                      textAnchor={node.x >= Math.PI ? "end" : "start"}
                      fontSize={isActiveLeaf ? LEAF_LABEL_FONT_SIZE : CONNECTED_LEAF_LABEL_FONT_SIZE}
                      fontWeight={isActiveLeaf ? 700 : 500}
                      fill={isActiveLeaf ? categoryColor : "#FFFFFF"}
                      fillOpacity={isActiveLeaf ? 1 : 0.94}
                    >
                      {node.data.name.length > 36 ? `${node.data.name.slice(0, 36)}...` : node.data.name}
                    </text>
                  )}
                </g>
              );
            })}

            {radial.descendants
              .filter((node) => node.data.kind === "leaf")
              .map((node) => {
                const { x, y } = polarToCartesian(node.x, node.y);
                const leafId = node.data.id;
                return (
                  <circle
                    key={`radial-hit-${leafId}`}
                    cx={x}
                    cy={y}
                    r={9}
                    fill="transparent"
                    onMouseEnter={() => {
                      setHoveredCategoryId(null);
                      setHoveredLeafId(leafId);
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleLeafClick(node);
                    }}
                    style={{
                      cursor:
                        pinnedLeafId === leafId ||
                        (pinnedLeafId !== null &&
                          leafId !== pinnedLeafId &&
                          connectedLeafIds.has(leafId))
                          ? "alias"
                          : "pointer",
                    }}
                  />
                );
              })}
          </g>
        </svg>
      </div>
    </div>
  );
}
