"use client";

import { useMemo, useRef, useState } from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";

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

interface EcosystemForceDirectedTreeMapProps {
  nodes: PositionedNode[];
  edges: EcosystemEdge[];
  width: number;
  height: number;
  categoryColors: Record<EcosystemCategory, string>;
  categoryOrder: EcosystemCategory[];
  categoryLabels: Record<EcosystemCategory, string>;
}

type ForceGraphNode = SimulationNodeDatum & {
  id: string;
  name: string;
  kind: "root" | "category" | "leaf";
  category?: EcosystemCategory;
  href?: string;
  degree?: number;
};

type ForceGraphLink = SimulationLinkDatum<ForceGraphNode> & {
  id: string;
  source: string | ForceGraphNode;
  target: string | ForceGraphNode;
  kind: "tree" | "relation";
  weight?: number;
  edgeKinds?: EcosystemEdge["kinds"];
};

type RenderLink = {
  id: string;
  sourceId: string;
  targetId: string;
  kind: "tree" | "relation";
  weight: number;
  edgeKinds: EcosystemEdge["kinds"];
};

const ZOOM_MIN = 0.8;
const ZOOM_MAX = 3.5;
const ZOOM_STEP = 1.15;
const PAN_DRAG_THRESHOLD = 4;
const PIN_RESET_RADIUS = 12;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
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

function curvedPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  seedKey: string,
  magnitude: number,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.max(1, Math.hypot(dx, dy));
  const nx = -dy / length;
  const ny = dx / length;

  const seed = hashString(seedKey);
  const bendDirection = seeded01(seed ^ 0xa5a5a5a5) > 0.5 ? 1 : -1;
  const bendFactor = 0.45 + seeded01(seed ^ 0x5f3759df) * 0.9;
  const bend = bendDirection * magnitude * bendFactor * clamp(length / 240, 0.45, 1.7);
  const along1 = (seeded01(seed ^ 0x91e10da5) - 0.5) * 0.22;
  const along2 = (seeded01(seed ^ 0x85ebca6b) - 0.5) * 0.22;

  const c1x = x1 + dx * (0.26 + along1) + nx * bend * 0.95;
  const c1y = y1 + dy * (0.26 + along1) + ny * bend * 0.95;
  const c2x = x1 + dx * (0.74 + along2) + nx * bend * 1.08;
  const c2y = y1 + dy * (0.74 + along2) + ny * bend * 1.08;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function edgeColor(kinds: EcosystemEdge["kinds"]): string {
  if (kinds.includes("explicit")) return "#98F5E1";
  if (kinds.includes("internal-link")) return "#F1C0E8";
  return "#FFCFD2";
}

export default function EcosystemForceDirectedTreeMap({
  nodes,
  edges,
  width,
  height,
  categoryColors,
  categoryOrder,
  categoryLabels,
}: EcosystemForceDirectedTreeMapProps) {
  const [hoveredLeafId, setHoveredLeafId] = useState<string | null>(null);
  const [pinnedLeafId, setPinnedLeafId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStateRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    moved: false,
  });
  const suppressNextClickRef = useRef(false);
  const activeLeafId = pinnedLeafId ?? hoveredLeafId;

  const graph = useMemo(() => {
    const grouped = new Map<EcosystemCategory, PositionedNode[]>();
    for (const category of categoryOrder) grouped.set(category, []);
    for (const node of nodes) {
      const list = grouped.get(node.category) ?? [];
      list.push(node);
      grouped.set(node.category, list);
    }

    const forceNodes: ForceGraphNode[] = [];
    const treeLinks: ForceGraphLink[] = [];
    const relationLinks: ForceGraphLink[] = [];
    const parentById = new Map<string, string | null>();

    const categoryRingRadius = Math.min(width, height) * 0.24;
    for (let i = 0; i < categoryOrder.length; i += 1) {
      const category = categoryOrder[i];
      const angle = (i / categoryOrder.length) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * categoryRingRadius;
      const y = Math.sin(angle) * categoryRingRadius;
      const categoryId = `category:${category}`;

      forceNodes.push({
        id: categoryId,
        name: categoryLabels[category],
        kind: "category",
        category,
        x,
        y,
      });
      parentById.set(categoryId, null);

      const categoryNodes = (grouped.get(category) ?? [])
        .slice()
        .sort((a, b) => b.degree - a.degree || a.name.localeCompare(b.name));
      for (const leaf of categoryNodes) {
        forceNodes.push({
          id: leaf.id,
          name: leaf.name,
          kind: "leaf",
          category,
          href: leaf.href,
          degree: leaf.degree,
          x: x + (seeded01(hashString(`${leaf.id}:x`)) - 0.5) * 160,
          y: y + (seeded01(hashString(`${leaf.id}:y`)) - 0.5) * 160,
        });
        parentById.set(leaf.id, categoryId);
        treeLinks.push({
          id: `tree:${categoryId}:${leaf.id}`,
          source: categoryId,
          target: leaf.id,
          kind: "tree",
          weight: 1,
          edgeKinds: ["explicit"],
        });
      }
    }

    const leafIds = new Set(forceNodes.filter((n) => n.kind === "leaf").map((n) => n.id));
    for (const edge of edges) {
      if (!leafIds.has(edge.sourceId) || !leafIds.has(edge.targetId)) continue;
      relationLinks.push({
        id: edge.id,
        source: edge.sourceId,
        target: edge.targetId,
        kind: "relation",
        weight: edge.weight,
        edgeKinds: edge.kinds,
      });
    }

    const simulationNodes = forceNodes.map((node) => ({ ...node }));
    const simulationLinks = [...treeLinks, ...relationLinks].map((link) => ({ ...link }));
    const nodeById = new Map<string, ForceGraphNode>(simulationNodes.map((node) => [node.id, node]));

    const categoryTargets = new Map<EcosystemCategory, { x: number; y: number }>();
    for (let i = 0; i < categoryOrder.length; i += 1) {
      const category = categoryOrder[i];
      const angle = (i / categoryOrder.length) * Math.PI * 2 - Math.PI / 2;
      categoryTargets.set(category, {
        x: Math.cos(angle) * categoryRingRadius,
        y: Math.sin(angle) * categoryRingRadius,
      });
    }

    const simulation = forceSimulation(simulationNodes)
      .force(
        "link",
        forceLink<ForceGraphNode, ForceGraphLink>(simulationLinks)
          .id((d) => d.id)
          .distance((link) => {
            if (link.kind === "tree") {
              const sourceId = typeof link.source === "string" ? link.source : link.source.id;
              return sourceId.startsWith("category:") ? 58 : 90;
            }
            return 110;
          })
          .strength((link) => (link.kind === "tree" ? 0.95 : 0.06)),
      )
      .force(
        "charge",
        forceManyBody<ForceGraphNode>().strength((node) => {
          if (node.kind === "category") return -240;
          return -65;
        }),
      )
      .force(
        "collide",
        forceCollide<ForceGraphNode>().radius((node) => {
          if (node.kind === "category") return 14;
          return 7;
        }),
      )
      .force("center", forceCenter<ForceGraphNode>(0, 0))
      .force(
        "x",
        forceX<ForceGraphNode>((node) => {
          if (node.kind === "category") return categoryTargets.get(node.category ?? "apps")?.x ?? 0;
          return categoryTargets.get(node.category ?? "apps")?.x ?? 0;
        }).strength((node) => (node.kind === "leaf" ? 0.06 : 0.22)),
      )
      .force(
        "y",
        forceY<ForceGraphNode>((node) => {
          if (node.kind === "category") return categoryTargets.get(node.category ?? "apps")?.y ?? 0;
          return categoryTargets.get(node.category ?? "apps")?.y ?? 0;
        }).strength((node) => (node.kind === "leaf" ? 0.06 : 0.22)),
      )
      .alphaMin(0.0005)
      .stop();

    for (let i = 0; i < 380; i += 1) simulation.tick();
    simulation.stop();

    const renderedLinks: RenderLink[] = simulationLinks.map((link) => {
      const sourceId = typeof link.source === "string" ? link.source : link.source.id;
      const targetId = typeof link.target === "string" ? link.target : link.target.id;
      return {
        id: link.id,
        sourceId,
        targetId,
        kind: link.kind,
        weight: link.weight ?? 1,
        edgeKinds: link.edgeKinds ?? ["explicit"],
      };
    });

    const treeRenderedLinks = renderedLinks.filter((link) => link.kind === "tree");
    const relationRenderedLinks = renderedLinks.filter((link) => link.kind === "relation");

    return {
      nodes: simulationNodes,
      nodeById,
      treeLinks: treeRenderedLinks,
      relationLinks: relationRenderedLinks,
      parentById,
    };
  }, [categoryLabels, categoryOrder, edges, height, nodes, width]);

  const relationEdgesByLeafId = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const edge of graph.relationLinks) {
      const sourceSet = map.get(edge.sourceId) ?? new Set<string>();
      sourceSet.add(edge.id);
      map.set(edge.sourceId, sourceSet);

      const targetSet = map.get(edge.targetId) ?? new Set<string>();
      targetSet.add(edge.id);
      map.set(edge.targetId, targetSet);
    }
    return map;
  }, [graph.relationLinks]);

  const activeRelationEdgeIds = useMemo(
    () => (activeLeafId ? relationEdgesByLeafId.get(activeLeafId) ?? new Set<string>() : new Set<string>()),
    [activeLeafId, relationEdgesByLeafId],
  );

  const connectedLeafIds = useMemo(() => {
    if (!activeLeafId) return new Set<string>();
    const connected = new Set<string>([activeLeafId]);
    for (const edge of graph.relationLinks) {
      if (edge.sourceId === activeLeafId) connected.add(edge.targetId);
      if (edge.targetId === activeLeafId) connected.add(edge.sourceId);
    }
    return connected;
  }, [activeLeafId, graph.relationLinks]);

  const relatedLeafCountById = useMemo(() => {
    const relatedByLeaf = new Map<string, Set<string>>();
    for (const edge of graph.relationLinks) {
      const sourceSet = relatedByLeaf.get(edge.sourceId) ?? new Set<string>();
      sourceSet.add(edge.targetId);
      relatedByLeaf.set(edge.sourceId, sourceSet);

      const targetSet = relatedByLeaf.get(edge.targetId) ?? new Set<string>();
      targetSet.add(edge.sourceId);
      relatedByLeaf.set(edge.targetId, targetSet);
    }
    const counts = new Map<string, number>();
    for (const [leafId, related] of relatedByLeaf.entries()) counts.set(leafId, related.size);
    return counts;
  }, [graph.relationLinks]);

  const activeLeaf = activeLeafId ? graph.nodeById.get(activeLeafId) ?? null : null;
  const activeName = activeLeaf?.name ?? null;
  const activeCategory = activeLeaf?.category ?? null;

  const activeAncestorIds = useMemo(() => {
    const ids = new Set<string>();
    if (!activeLeafId) return ids;
    let cursor: string | null = activeLeafId;
    while (cursor) {
      ids.add(cursor);
      cursor = graph.parentById.get(cursor) ?? null;
    }
    return ids;
  }, [activeLeafId, graph.parentById]);

  function zoomBy(factor: number): void {
    setZoom((prev) => clamp(prev * factor, ZOOM_MIN, ZOOM_MAX));
  }

  function handleWheel(event: React.WheelEvent<SVGSVGElement>): void {
    event.preventDefault();
    event.stopPropagation();
    zoomBy(event.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP);
  }

  function handlePointerDown(event: React.PointerEvent<SVGSVGElement>): void {
    if (event.button !== 0) return;
    panStateRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
      moved: false,
    };
    setIsPanning(true);
  }

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>): void {
    if (!panStateRef.current.active) return;
    const dx = event.clientX - panStateRef.current.startX;
    const dy = event.clientY - panStateRef.current.startY;
    if (Math.hypot(dx, dy) > PAN_DRAG_THRESHOLD) {
      panStateRef.current.moved = true;
    }
    setPan({
      x: panStateRef.current.startPanX + dx,
      y: panStateRef.current.startPanY + dy,
    });
  }

  function finishPan(event: React.PointerEvent<SVGSVGElement>): void {
    if (!panStateRef.current.active) return;
    suppressNextClickRef.current = panStateRef.current.moved;
    panStateRef.current.active = false;
    setIsPanning(false);
  }

  function handleLeafClick(node: ForceGraphNode): void {
    if (node.kind !== "leaf" || !node.href) return;

    if (pinnedLeafId) {
      if (node.id === pinnedLeafId || connectedLeafIds.has(node.id)) {
        window.open(node.href, "_blank", "noopener,noreferrer");
      }
      return;
    }
    setPinnedLeafId(node.id);
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
        <p className="text-xs text-gray-400 font-mono">
          {pinnedLeafId
            ? `${activeRelationEdgeIds.size} related links pinned · click pinned node again to open`
            : activeLeafId
              ? `${activeRelationEdgeIds.size} related links highlighted`
              : "Force-directed tree · hover nodes to preview relationships · click to pin · click X to reset · drag to pan · scroll to zoom"}
        </p>
      </div>

      <div
        className="relative overflow-x-auto rounded-xl border border-gray-800 bg-gray-900"
        style={{ overscrollBehavior: "contain" }}
      >
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
          aria-label="Ecosystem force-directed tree"
          onMouseLeave={() => setHoveredLeafId(null)}
          onClick={() => {
            if (suppressNextClickRef.current) {
              suppressNextClickRef.current = false;
            }
          }}
          onWheel={handleWheel}
          onWheelCapture={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPan}
          onPointerCancel={finishPan}
          style={{ cursor: isPanning ? "grabbing" : "grab", touchAction: "none" }}
        >
          <defs>
            <linearGradient id="ecosystem-force-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#151310" />
              <stop offset="100%" stopColor="#1C1A17" />
            </linearGradient>
          </defs>

          <rect x={0} y={0} width={width} height={height} fill="url(#ecosystem-force-bg)" fillOpacity={0.25} />

          <g transform={`translate(${width / 2 + pan.x} ${height / 2 + pan.y}) scale(${zoom})`}>
            {graph.treeLinks.map((link) => {
              const source = graph.nodeById.get(link.sourceId);
              const target = graph.nodeById.get(link.targetId);
              if (!source || !target) return null;
              const targetColor = target.category ? categoryColors[target.category] : "#9CA3AF";
              const isActiveBranch =
                activeLeafId &&
                activeAncestorIds.has(link.sourceId) &&
                activeAncestorIds.has(link.targetId);

              return (
                <path
                  key={`force-tree-${link.id}`}
                  d={curvedPath(
                    source.x ?? 0,
                    source.y ?? 0,
                    target.x ?? 0,
                    target.y ?? 0,
                    `force-tree:${link.id}`,
                    8,
                  )}
                  fill="none"
                  stroke={targetColor}
                  strokeOpacity={activeLeafId ? (isActiveBranch ? 1 : 0.14) : 0.38}
                  strokeWidth={isActiveBranch ? 1.35 : 0.9}
                />
              );
            })}

            {graph.relationLinks.map((edge) => {
              const source = graph.nodeById.get(edge.sourceId);
              const target = graph.nodeById.get(edge.targetId);
              if (!source || !target) return null;
              const isActive = activeLeafId ? activeRelationEdgeIds.has(edge.id) : false;
              const sameActiveCategory =
                activeCategory &&
                source.category === activeCategory &&
                target.category === activeCategory;
              const color =
                sameActiveCategory && activeCategory
                  ? categoryColors[activeCategory]
                  : edgeColor(edge.edgeKinds);

              return (
                <path
                  key={`force-relation-${edge.id}`}
                  d={curvedPath(
                    source.x ?? 0,
                    source.y ?? 0,
                    target.x ?? 0,
                    target.y ?? 0,
                    `force-relation:${edge.id}`,
                    22 + Math.min(26, edge.weight * 4),
                  )}
                  fill="none"
                  stroke={color}
                  strokeOpacity={activeLeafId ? (isActive ? 0.98 : 0.04) : 0.12}
                  strokeWidth={isActive ? Math.min(3.2, 1 + edge.weight * 0.24) : 0.75}
                  strokeDasharray={edge.edgeKinds.includes("explicit") ? undefined : "3 4"}
                />
              );
            })}

            {graph.nodes.map((node) => {
              const x = node.x ?? 0;
              const y = node.y ?? 0;
              const isLeaf = node.kind === "leaf";
              const isCategory = node.kind === "category";
              const isActiveLeaf = isLeaf && activeLeafId === node.id;
              const isConnectedLeaf = isLeaf && !!activeLeafId && connectedLeafIds.has(node.id);
              const isIndirectConnectedLeaf = isConnectedLeaf && !isActiveLeaf;
              const muted = isLeaf && activeLeafId ? !isConnectedLeaf : false;
              const categoryColor = node.category ? categoryColors[node.category] : "#D1D5DB";
              const relatedCount = isLeaf ? relatedLeafCountById.get(node.id) ?? 0 : 0;
              const leafRadius =
                2.1 + Math.min(5.2, Math.sqrt(node.degree ?? 0) * 0.22 + Math.sqrt(relatedCount) * 0.45);
              const radius = node.kind === "root" ? 6.5 : isCategory ? 5.4 : leafRadius;
              const fill = isIndirectConnectedLeaf ? "#FFFFFF" : categoryColor;

              return (
                <g key={`force-node-${node.id}`} transform={`translate(${x}, ${y})`}>
                  <circle
                    r={radius}
                    fill={fill}
                    fillOpacity={muted ? 0.22 : isActiveLeaf || isIndirectConnectedLeaf ? 1 : 0.82}
                    stroke="#111"
                    strokeWidth={isActiveLeaf ? 1.3 : 0.85}
                  >
                    <title>
                      {node.name}
                      {isLeaf ? `\nDegree: ${node.degree ?? 0}` : ""}
                    </title>
                  </circle>

                  {isCategory && (
                    <text
                      x={0}
                      y={-10}
                      textAnchor="middle"
                      fontSize={13}
                      fontWeight={700}
                      fill={categoryColor}
                    >
                      {node.name}
                    </text>
                  )}

                  {isConnectedLeaf && (
                    <text
                      x={x > 0 ? 10 : -10}
                      y={4}
                      textAnchor={x > 0 ? "start" : "end"}
                      fontSize={isActiveLeaf ? 12 : 11}
                      fontWeight={isActiveLeaf ? 700 : 500}
                      fill={isActiveLeaf ? categoryColor : "#FFFFFF"}
                      fillOpacity={isActiveLeaf ? 1 : 0.95}
                      style={{
                        cursor: pinnedLeafId ? "alias" : "pointer",
                        pointerEvents: "auto",
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleLeafClick(node);
                      }}
                    >
                      {node.name.length > 36 ? `${node.name.slice(0, 36)}...` : node.name}
                    </text>
                  )}
                </g>
              );
            })}

            {graph.nodes
              .filter((node) => node.kind === "leaf")
              .map((node) => {
                const x = node.x ?? 0;
                const y = node.y ?? 0;
                return (
                  <circle
                    key={`force-hit-${node.id}`}
                    cx={x}
                    cy={y}
                    r={10}
                    fill="transparent"
                    onMouseEnter={() => setHoveredLeafId(node.id)}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (suppressNextClickRef.current) {
                        suppressNextClickRef.current = false;
                        return;
                      }
                      handleLeafClick(node);
                    }}
                    style={{
                      cursor:
                        pinnedLeafId === node.id ||
                        (pinnedLeafId !== null && node.id !== pinnedLeafId && connectedLeafIds.has(node.id))
                          ? "alias"
                          : "pointer",
                    }}
                  />
                );
              })}

            {pinnedLeafId
              ? (() => {
                  const pinnedLeaf = graph.nodeById.get(pinnedLeafId);
                  if (!pinnedLeaf) return null;
                  const x = (pinnedLeaf.x ?? 0) + 24;
                  const y = (pinnedLeaf.y ?? 0) - 24;
                  return (
                    <g
                      key="force-pinned-reset-control"
                      transform={`translate(${x}, ${y})`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setPinnedLeafId(null);
                        setHoveredLeafId(null);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <circle
                        r={PIN_RESET_RADIUS}
                        fill="#0E141C"
                        fillOpacity={0.95}
                        stroke="#FDE4CF"
                        strokeOpacity={0.86}
                        strokeWidth={1}
                      />
                      <text
                        x={0}
                        y={4}
                        textAnchor="middle"
                        fill="#FDE4CF"
                        fontSize={14}
                        fontWeight={700}
                      >
                        X
                      </text>
                    </g>
                  );
                })()
              : null}
          </g>
        </svg>

        {activeName ? (
          <div className="pointer-events-none absolute left-4 top-4 rounded bg-gray-950/80 px-2 py-1 text-[11px] text-gray-200 font-mono">
            {activeName}
          </div>
        ) : null}
      </div>
    </div>
  );
}
