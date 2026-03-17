"use client";

import { useMemo, useRef, useState } from "react";
import { Delaunay } from "d3-delaunay";

// Core category domain used across node/edge typing and color mapping.
type EcosystemCategory =
  | "apps"
  | "mechanisms"
  | "research"
  | "case-studies"
  | "campaigns";

// Node data used to render labels, dots, and click-through links.
type EcosystemNode = {
  id: string;
  name: string;
  category: EcosystemCategory;
  degree: number;
  href: string;
};

// Relationship data driving highlighted connections.
type EcosystemEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  kinds: ("explicit" | "internal-link" | "tag-overlap")[];
  weight: number;
};

type PositionedNode = EcosystemNode & { x: number; y: number; radius: number };

// Stable display order used for category anchors and legend-like labels.
const CATEGORY_ORDER: EcosystemCategory[] = [
  "apps",
  "mechanisms",
  "research",
  "case-studies",
  "campaigns",
];

const CATEGORY_LABELS: Record<EcosystemCategory, string> = {
  apps: "Apps",
  mechanisms: "Mechanisms",
  research: "Research",
  "case-studies": "Case Studies",
  campaigns: "Campaigns",
};

const VORONOI_COOLORS_PALETTE: Record<EcosystemCategory, string> = {
  apps: "#4AE5FC",
  mechanisms: "#7EB77F",
  research: "#FFA033",
  "case-studies": "#F7AEF8",
  campaigns: "#DF5368",
};

// Visual tuning knobs for node size and stroke weights.
const NODE_DOT_SIZE_MULTIPLIER = 0.3;
const NODE_DOT_MIN_RADIUS = 0.5;
const CELL_EDGE_STROKE_BASE = 0.5;
const CELL_EDGE_STROKE_ACTIVE = 1.0;
const RELATION_EDGE_STROKE_BASE = 0.5;
const RELATION_EDGE_STROKE_ACTIVE_BASE = 1.25;
const RELATION_EDGE_STROKE_ACTIVE_SCALE = 0.5;
const RELATION_EDGE_STROKE_ACTIVE_MAX = 1.0;
const NODE_STROKE_BASE = 0.5;
const NODE_STROKE_ACTIVE = 1.0;
const NODE_RADIUS_PER_CONNECTION = 0.05;
const NODE_RADIUS_MAX_BOOST = 1.8;
const VORONOI_LAYOUT_ITERATIONS = 90;
const VORONOI_LAYOUT_MAX_STEP = 8;
const CATEGORY_EDGE_STROKE_BASE = 0.65;
const ZOOM_MIN = 0.8;
const ZOOM_MAX = 3.5;
const ZOOM_STEP = 1.15;
const PIN_RESET_RADIUS = 12;
const PAN_DRAG_THRESHOLD = 4;
const CATEGORY_ANCHOR_MARGIN = 10;

interface EcosystemVoronoiMapProps {
  nodes: PositionedNode[];
  edges: EcosystemEdge[];
  width: number;
  height: number;
  categoryColors: Record<EcosystemCategory, string>;
  categoryAnchors: Record<EcosystemCategory, { x: number; y: number }>;
}

// Tiny deterministic hash helper used to seed repeatable randomness.
function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

// Converts a seed into a repeatable [0, 1) value.
function seeded01(seed: number): number {
  const x =
    Math.sin(seed * 0.00011920928955078125 + 0.1376312587) * 43758.5453123;
  return x - Math.floor(x);
}

// Small clamp utility used in multiple geometry calculations.
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// Computes polygon centroid so each dot can sit in the center of its Voronoi cell.
function polygonCentroid(
  polygon: Array<[number, number]>,
): { x: number; y: number } | null {
  if (!polygon || polygon.length < 3) return null;

  let signedArea = 0;
  let centroidX = 0;
  let centroidY = 0;

  for (let i = 0; i < polygon.length - 1; i += 1) {
    const [x0, y0] = polygon[i];
    const [x1, y1] = polygon[i + 1];
    const cross = x0 * y1 - x1 * y0;
    signedArea += cross;
    centroidX += (x0 + x1) * cross;
    centroidY += (y0 + y1) * cross;
  }

  const area = signedArea * 0.5;
  if (Math.abs(area) < 1e-8) return null;
  return {
    x: centroidX / (6 * area),
    y: centroidY / (6 * area),
  };
}

// Builds a soft curved cubic path between two points with deterministic bend/jitter.
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
  const bend =
    bendDirection * magnitude * bendFactor * clamp(length / 260, 0.55, 1.65);
  const along1 = (seeded01(seed ^ 0x91e10da5) - 0.5) * 0.24;
  const along2 = (seeded01(seed ^ 0x85ebca6b) - 0.5) * 0.24;

  const c1x = x1 + dx * (0.28 + along1) + nx * bend * 0.95;
  const c1y = y1 + dy * (0.28 + along1) + ny * bend * 0.95;
  const c2x = x1 + dx * (0.72 + along2) + nx * bend * 1.08;
  const c2y = y1 + dy * (0.72 + along2) + ny * bend * 1.08;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function wrapWordsByCount(label: string, wordsPerLine: number): string[] {
  const words = label.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  }
  return lines;
}

function estimateTextLineWidth(line: string, fontSize: number): number {
  let units = 0;
  for (const char of line) {
    if (char === " ") units += 0.33;
    else if ("ilI1|".includes(char)) units += 0.32;
    else if ("mwMW@#%&".includes(char)) units += 0.92;
    else if ("ABCDEFGHJKLMNOPQRSTUVWXYZ".includes(char)) units += 0.72;
    else units += 0.58;
  }
  return units * fontSize;
}

function buildIrregularCategoryAnchors(
  anchors: Record<EcosystemCategory, { x: number; y: number }>,
  width: number,
  height: number,
): Record<EcosystemCategory, { x: number; y: number }> {
  return CATEGORY_ORDER.reduce(
    (acc, category) => {
      const anchor = anchors[category];
      acc[category] = {
        x: clamp(
          anchor.x,
          CATEGORY_ANCHOR_MARGIN,
          width - CATEGORY_ANCHOR_MARGIN,
        ),
        y: clamp(
          anchor.y,
          CATEGORY_ANCHOR_MARGIN,
          height - CATEGORY_ANCHOR_MARGIN,
        ),
      };
      return acc;
    },
    {} as Record<EcosystemCategory, { x: number; y: number }>,
  );
}

export default function EcosystemVoronoiMap({
  nodes,
  edges,
  width,
  height,
  categoryColors,
  categoryAnchors,
}: EcosystemVoronoiMapProps) {
  const voronoiColors = useMemo(
    () => ({ ...categoryColors, ...VORONOI_COOLORS_PALETTE }),
    [categoryColors],
  );

  // Interaction state: hover previews, pin keeps selection active.
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [pinnedNodeId, setPinnedNodeId] = useState<string | null>(null);
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
  // Pin takes precedence so selection remains persistent until explicit reset.
  const activeNodeId = pinnedNodeId ?? hoveredNodeId;

  const irregularCategoryAnchors = useMemo(
    () => buildIrregularCategoryAnchors(categoryAnchors, width, height),
    [categoryAnchors, height, width],
  );

  const connectionCountByNodeId = useMemo(() => {
    const map = new Map<string, number>();
    for (const edge of edges) {
      map.set(edge.sourceId, (map.get(edge.sourceId) ?? 0) + 1);
      map.set(edge.targetId, (map.get(edge.targetId) ?? 0) + 1);
    }
    return map;
  }, [edges]);

  // Degree-aware site relaxation: larger-connection nodes claim more Voronoi space naturally.
  const voronoiSites = useMemo(() => {
    const counts = nodes.map(
      (node) => connectionCountByNodeId.get(node.id) ?? 0,
    );
    const maxCount = Math.max(1, ...counts);

    const x = nodes.map((node) => node.x);
    const y = nodes.map((node) => node.y);
    const targetSpacing = nodes.map((node, index) => {
      const count = counts[index];
      const intensity = Math.sqrt(count / maxCount);
      return 16 + intensity * 56;
    });
    const intensityByIndex = counts.map((count) => Math.sqrt(count / maxCount));

    for (let step = 0; step < VORONOI_LAYOUT_ITERATIONS; step += 1) {
      const dx = new Array<number>(nodes.length).fill(0);
      const dy = new Array<number>(nodes.length).fill(0);

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const deltaX = x[j] - x[i];
          const deltaY = y[j] - y[i];
          const dist = Math.max(0.0001, Math.hypot(deltaX, deltaY));
          const minDist = targetSpacing[i] + targetSpacing[j];
          if (dist >= minDist) continue;

          const overlap = minDist - dist;
          const push = (overlap * 0.5) / dist;
          const pushX = deltaX * push;
          const pushY = deltaY * push;

          dx[i] -= pushX;
          dy[i] -= pushY;
          dx[j] += pushX;
          dy[j] += pushY;
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const anchor = irregularCategoryAnchors[node.category];
        const intensity = intensityByIndex[i];

        // Keep category coherence while allowing high-degree nodes to "claim" space.
        dx[i] += (anchor.x - x[i]) * (0.006 + (1 - intensity) * 0.005);
        dy[i] += (anchor.y - y[i]) * (0.006 + (1 - intensity) * 0.005);
        dx[i] += (node.x - x[i]) * 0.02;
        dy[i] += (node.y - y[i]) * 0.02;

        const stepX = clamp(
          dx[i],
          -VORONOI_LAYOUT_MAX_STEP,
          VORONOI_LAYOUT_MAX_STEP,
        );
        const stepY = clamp(
          dy[i],
          -VORONOI_LAYOUT_MAX_STEP,
          VORONOI_LAYOUT_MAX_STEP,
        );
        const margin = targetSpacing[i] * 0.45 + 8;
        x[i] = clamp(x[i] + stepX, margin, width - margin);
        y[i] = clamp(y[i] + stepY, margin, height - margin);
      }
    }

    return nodes.map((node, index) => ({
      ...node,
      x: x[index],
      y: y[index],
    }));
  }, [connectionCountByNodeId, height, irregularCategoryAnchors, nodes, width]);

  // Base node-only Delaunay used for centroid relaxation.
  const nodeDelaunay = useMemo(() => {
    const points = voronoiSites.map(
      (node) => [node.x, node.y] as [number, number],
    );
    return Delaunay.from(points);
  }, [voronoiSites]);

  const nodeVoronoi = useMemo(
    () => nodeDelaunay.voronoi([0, 0, width, height]),
    [nodeDelaunay, width, height],
  );

  // Recenter each dot to its Voronoi cell centroid for cleaner cell ownership visuals.
  const centeredNodes = useMemo(() => {
    return voronoiSites.map((node, index) => {
      const polygon = nodeVoronoi.cellPolygon(index) as Array<
        [number, number]
      > | null;
      if (!polygon) return node;
      const centroid = polygonCentroid(polygon);
      if (!centroid) return node;
      return {
        ...node,
        x: clamp(centroid.x, 0, width),
        y: clamp(centroid.y, 0, height),
      };
    });
  }, [height, nodeVoronoi, voronoiSites, width]);

  // Category sites are added to the same Voronoi partition so category cells are part of the pattern.
  const categorySites = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        id: `category-site:${category}`,
        category,
        x: irregularCategoryAnchors[category].x,
        y: irregularCategoryAnchors[category].y,
      })),
    [irregularCategoryAnchors],
  );

  const patternSites = useMemo(
    () => [
      ...centeredNodes.map((node) => ({
        id: node.id,
        category: node.category,
        x: node.x,
        y: node.y,
        type: "node" as const,
      })),
      ...categorySites.map((site) => ({
        id: site.id,
        category: site.category,
        x: site.x,
        y: site.y,
        type: "category" as const,
      })),
    ],
    [categorySites, centeredNodes],
  );

  const siteIndexById = useMemo(
    () => new Map(patternSites.map((site, index) => [site.id, index])),
    [patternSites],
  );

  const patternVoronoi = useMemo(() => {
    const points = patternSites.map(
      (site) => [site.x, site.y] as [number, number],
    );
    return Delaunay.from(points).voronoi([0, 0, width, height]);
  }, [height, patternSites, width]);

  // Fast id -> node lookup used by all edge and label render passes.
  const nodeById = useMemo(
    () => new Map(centeredNodes.map((node) => [node.id, node])),
    [centeredNodes],
  );

  // Reverse index so hover/pin can instantly fetch related edge ids.
  const edgesByNodeId = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const edge of edges) {
      const sourceSet = map.get(edge.sourceId) ?? new Set<string>();
      sourceSet.add(edge.id);
      map.set(edge.sourceId, sourceSet);

      const targetSet = map.get(edge.targetId) ?? new Set<string>();
      targetSet.add(edge.id);
      map.set(edge.targetId, targetSet);
    }
    return map;
  }, [edges]);

  // Active relationship edges for the hovered/pinned node.
  const hoveredEdgeIds = useMemo(
    () =>
      activeNodeId
        ? (edgesByNodeId.get(activeNodeId) ?? new Set<string>())
        : new Set<string>(),
    [activeNodeId, edgesByNodeId],
  );

  // Active neighborhood set (hovered/pinned node + directly connected nodes).
  const connectedNodeIds = useMemo(() => {
    if (!activeNodeId) return new Set<string>();
    const connected = new Set<string>([activeNodeId]);
    for (const edge of edges) {
      if (edge.sourceId === activeNodeId) connected.add(edge.targetId);
      if (edge.targetId === activeNodeId) connected.add(edge.sourceId);
    }
    return connected;
  }, [activeNodeId, edges]);

  const openableNodeIds = useMemo(
    () => (pinnedNodeId ? connectedNodeIds : new Set<string>()),
    [connectedNodeIds, pinnedNodeId],
  );

  // Category context for "primary vs secondary" link styling.
  const activeCategory = useMemo(
    () =>
      activeNodeId ? (nodeById.get(activeNodeId)?.category ?? null) : null,
    [activeNodeId, nodeById],
  );

  // Top-right helper text count.
  const relationshipCount = activeNodeId ? hoveredEdgeIds.size : 0;

  // Label candidates shown during interaction, sorted by importance.
  const labeledNodes = useMemo(() => {
    if (!activeNodeId) return [] as PositionedNode[];
    const activeNode = nodeById.get(activeNodeId);
    const connected = [...connectedNodeIds]
      .map((id) => nodeById.get(id))
      .filter((node): node is PositionedNode => Boolean(node))
      .sort((a, b) => b.degree - a.degree || a.name.localeCompare(b.name));
    const limited = connected.slice(0, 24);
    if (activeNode && !limited.some((node) => node.id === activeNode.id)) {
      limited.unshift(activeNode);
    }
    return limited;
  }, [activeNodeId, connectedNodeIds, nodeById]);

  // First click pins a node; while pinned, clicking any node in that active set opens its content.
  function handleNodeClick(nodeId: string): void {
    const node = nodeById.get(nodeId);
    if (!node) return;
    if (pinnedNodeId) {
      if (openableNodeIds.has(nodeId)) {
        window.open(node.href, "_blank", "noopener,noreferrer");
      }
      return;
    }
    setPinnedNodeId(nodeId);
  }

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

  return (
    <div className="p-4 sm:p-6">
      {/* Interaction hint/status text */}
      <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
        <p className="text-xs text-gray-400 font-mono">
          {pinnedNodeId
            ? `${relationshipCount} linked items pinned · click highlighted nodes to open · click X to reset`
            : activeNodeId
              ? `${relationshipCount} linked items highlighted`
              : "Hover nodes to highlight · click once to pin · click highlighted nodes to open · drag to pan · scroll to zoom"}
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
          aria-label="Ecosystem relationship graph with Voronoi hover zones"
          onMouseLeave={() => setHoveredNodeId(null)}
          onWheel={handleWheel}
          onWheelCapture={handleWheel}
          onClick={() => {
            if (suppressNextClickRef.current) {
              suppressNextClickRef.current = false;
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPan}
          onPointerCancel={finishPan}
          style={{ cursor: isPanning ? "grabbing" : "grab", touchAction: "none" }}
        >
          {/* Shared SVG defs/background */}
          <defs>
            <linearGradient
              id="ecosystem-bg"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#151310" />
              <stop offset="100%" stopColor="#1C1A17" />
            </linearGradient>
          </defs>

          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#ecosystem-bg)"
            fillOpacity={0.25}
          />

          <g
            transform={`translate(${width / 2 + pan.x} ${height / 2 + pan.y}) scale(${zoom}) translate(${-width / 2} ${-height / 2})`}
          >
            {/* Voronoi cell faces/edges: this is the visible "cell" layer. */}
            {centeredNodes.map((node) => {
              const siteIndex = siteIndexById.get(node.id);
              const cellPath =
                siteIndex !== undefined
                  ? patternVoronoi.renderCell(siteIndex)
                  : null;
              if (!cellPath) return null;
              const isActiveCell = activeNodeId === node.id;
              const isConnectedCell = connectedNodeIds.has(node.id);
              const muted = Boolean(activeNodeId) && !isConnectedCell;
              const stroke = voronoiColors[node.category];
              const fillOpacity = isActiveCell
                ? 0.09
                : isConnectedCell
                  ? 0.05
                  : 0.018;
              const strokeOpacity = muted ? 0.1 : isActiveCell ? 1 : 0.36;

              return (
                <path
                  key={`cell-edge-${node.id}`}
                  d={cellPath}
                  fill={voronoiColors[node.category]}
                  fillOpacity={activeNodeId ? fillOpacity : 0.02}
                  stroke={stroke}
                  strokeWidth={
                    isActiveCell
                      ? CELL_EDGE_STROKE_ACTIVE
                      : CELL_EDGE_STROKE_BASE
                  }
                  strokeOpacity={activeNodeId ? strokeOpacity : 0.3}
                  pointerEvents="none"
                />
              );
            })}

            {/* Category anchor markers and labels */}
            {CATEGORY_ORDER.map((category) => {
              const categorySiteId = `category-site:${category}`;
              const siteIndex = siteIndexById.get(categorySiteId);
              if (siteIndex === undefined) return null;
              const cellPath = patternVoronoi.renderCell(siteIndex);
              if (!cellPath) return null;
              const polygon = patternVoronoi.cellPolygon(siteIndex) as Array<
                [number, number]
              > | null;
              const centroid = polygon ? polygonCentroid(polygon) : null;
              const textX = centroid?.x ?? irregularCategoryAnchors[category].x;
              const textY = centroid?.y ?? irregularCategoryAnchors[category].y;
              return (
                <g key={category}>
                  <path
                    d={cellPath}
                    fill={voronoiColors[category]}
                    fillOpacity={0.22}
                    stroke={voronoiColors[category]}
                    strokeOpacity={0.1}
                    strokeWidth={1}
                  />
                  <text
                    x={textX}
                    y={textY + 4}
                    fill="#F8FAFC"
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                  >
                    {CATEGORY_LABELS[category]}
                  </text>
                </g>
              );
            })}

            {/* Primary structure: category anchor -> category item links (visible by default). */}
            {centeredNodes.map((node) => {
              const anchor = irregularCategoryAnchors[node.category];
              const isConnected = connectedNodeIds.has(node.id);
              const muted = Boolean(activeNodeId) && !isConnected;
              const isPrimaryForCategory = activeCategory
                ? node.category === activeCategory
                : false;
              return (
                <path
                  key={`category-link-${node.id}`}
                  d={curvedPath(
                    anchor.x,
                    anchor.y,
                    node.x,
                    node.y,
                    `cat:${node.category}:${node.id}`,
                    10,
                  )}
                  stroke={voronoiColors[node.category]}
                  strokeWidth={CATEGORY_EDGE_STROKE_BASE}
                  strokeOpacity={
                    activeNodeId
                      ? muted
                        ? 0.01
                        : isPrimaryForCategory
                          ? 0.56
                          : 0.24
                      : 0.01
                  }
                  fill="none"
                  pointerEvents="none"
                />
              );
            })}

            {/* Secondary relationships: hidden by default, shown only on hover/pin. */}
            {edges.map((edge) => {
              const source = nodeById.get(edge.sourceId);
              const target = nodeById.get(edge.targetId);
              if (!source || !target) return null;
              const isActive = activeNodeId
                ? hoveredEdgeIds.has(edge.id)
                : false;
              const isPrimaryForCategory = Boolean(
                activeCategory &&
                source.category === activeCategory &&
                target.category === activeCategory,
              );
              const relationStroke = voronoiColors[target.category];

              return (
                <path
                  key={edge.id}
                  d={curvedPath(
                    source.x,
                    source.y,
                    target.x,
                    target.y,
                    `edge:${edge.id}`,
                    22 + Math.min(30, edge.weight * 5),
                  )}
                  stroke={
                    isPrimaryForCategory && activeCategory
                      ? voronoiColors[activeCategory]
                      : relationStroke
                  }
                  strokeWidth={
                    isActive
                      ? Math.min(
                          RELATION_EDGE_STROKE_ACTIVE_MAX,
                          RELATION_EDGE_STROKE_ACTIVE_BASE +
                            edge.weight * RELATION_EDGE_STROKE_ACTIVE_SCALE,
                        )
                      : RELATION_EDGE_STROKE_BASE
                  }
                  strokeOpacity={
                    activeNodeId
                      ? isActive
                        ? isPrimaryForCategory
                          ? 0.98
                          : 0.84
                        : 0
                      : 0
                  }
                  strokeDasharray={
                    edge.kinds.includes("explicit") ? undefined : "3 4"
                  }
                  fill="none"
                />
              );
            })}

            {/* Node dots at centered Voronoi positions */}
            {centeredNodes.map((node) => {
              const isHovered = activeNodeId === node.id;
              const isConnected = connectedNodeIds.has(node.id);
              const muted = activeNodeId ? !isConnected : false;
              const scale = isHovered ? 1.26 : isConnected ? 1.08 : 1;
              const connectionCount = connectionCountByNodeId.get(node.id) ?? 0;
              const connectionRadiusBoost = Math.min(
                NODE_RADIUS_MAX_BOOST,
                Math.sqrt(connectionCount) * NODE_RADIUS_PER_CONNECTION,
              );
              const renderedRadius = Math.max(
                NODE_DOT_MIN_RADIUS,
                node.radius *
                  scale *
                  NODE_DOT_SIZE_MULTIPLIER *
                  (1 + connectionRadiusBoost),
              );
              return (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={renderedRadius}
                    fill={voronoiColors[node.category]}
                    fillOpacity={muted ? 0.4 : activeNodeId ? 0.44 : 0.08}
                    stroke="#111"
                    strokeWidth={
                      isHovered ? NODE_STROKE_ACTIVE : NODE_STROKE_BASE
                    }
                  />
                  <title>
                    {node.name}
                    {"\n"}
                    {CATEGORY_LABELS[node.category]}
                    {"\n"}
                    Degree: {node.degree}
                  </title>
                </g>
              );
            })}

            {/* Hover/pin labels for active neighborhood nodes */}
            {labeledNodes.map((node) => {
              const label = node.name;
              const isActiveNode = node.id === activeNodeId;
              const isOpenable =
                Boolean(pinnedNodeId) && openableNodeIds.has(node.id);
              const wrappedLines = wrapWordsByCount(label, 4);
              const labelFontSize = 12;
              const horizontalPadding = 6;
              const maxLineWidth = wrappedLines.reduce(
                (max, line) =>
                  Math.max(max, estimateTextLineWidth(line, labelFontSize)),
                0,
              );
              const textWidth = Math.ceil(
                Math.max(20, maxLineWidth + horizontalPadding * 2),
              );
              const lineHeight = 14;
              const labelHeight = 10 + wrappedLines.length * lineHeight;
              const placeLeft = node.x > width * 0.58;
              const labelX = placeLeft ? node.x - textWidth - 14 : node.x + 14;
              const labelY = Math.max(
                16,
                Math.min(height - labelHeight - 8, node.y - 10),
              );
              const textStartX = labelX + horizontalPadding;
              const totalTextHeight = wrappedLines.length * lineHeight;
              const firstLineY =
                labelY + (labelHeight - totalTextHeight) / 2 + 10.5;
              return (
                <g
                  key={`label-${node.id}`}
                  pointerEvents={isOpenable ? "auto" : "none"}
                  onClick={
                    isOpenable
                      ? (event) => {
                          event.stopPropagation();
                          handleNodeClick(node.id);
                        }
                      : undefined
                  }
                  style={{ cursor: isOpenable ? "alias" : "default" }}
                >
                  <rect
                    x={labelX}
                    y={labelY}
                    width={textWidth}
                    height={labelHeight}
                    rx={5}
                    fill={isActiveNode ? "#1C1A17" : "#1C1A17"}
                    fillOpacity={isActiveNode ? 0.9 : 0.9}
                  />
                  <text
                    x={textStartX}
                    y={firstLineY}
                    fill={isActiveNode ? "#fff" : "#aaa"}
                    fontSize={labelFontSize}
                    fontWeight={isActiveNode ? 700 : 500}
                    textAnchor="start"
                  >
                    {wrappedLines.map((line, lineIndex) => (
                      <tspan
                        key={`${node.id}-line-${lineIndex}`}
                        x={textStartX}
                        dy={lineIndex === 0 ? 0 : lineHeight}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}

            {/* Invisible interaction hit zones: each Voronoi cell is clickable/hoverable */}
            {centeredNodes.map((node) => {
              const siteIndex = siteIndexById.get(node.id);
              const path =
                siteIndex !== undefined
                  ? patternVoronoi.renderCell(siteIndex)
                  : null;
              if (!path) return null;
              return (
                <path
                  key={`cell-${node.id}`}
                  d={path}
                  fill="transparent"
                  stroke="none"
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (suppressNextClickRef.current) {
                      suppressNextClickRef.current = false;
                      return;
                    }
                    handleNodeClick(node.id);
                  }}
                  style={{
                    cursor:
                      pinnedNodeId && openableNodeIds.has(node.id)
                        ? "alias"
                        : "pointer",
                  }}
                />
              );
            })}

            {/* Pinned reset control: rendered above hit zones so clicks do not leak through */}
            {pinnedNodeId
              ? (() => {
                  const pinnedNode = nodeById.get(pinnedNodeId);
                  if (!pinnedNode) return null;
                  const x = clamp(
                    pinnedNode.x + 24,
                    PIN_RESET_RADIUS + 4,
                    width - PIN_RESET_RADIUS - 4,
                  );
                  const y = clamp(
                    pinnedNode.y - 24,
                    PIN_RESET_RADIUS + 4,
                    height - PIN_RESET_RADIUS - 4,
                  );
                  return (
                    <g
                      key="pinned-reset-control"
                      transform={`translate(${x}, ${y})`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setPinnedNodeId(null);
                        setHoveredNodeId(null);
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
      </div>
    </div>
  );
}
