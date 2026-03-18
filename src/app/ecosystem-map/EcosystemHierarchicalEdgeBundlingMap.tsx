"use client";

import { useMemo, useRef, useState } from "react";
import {
  cluster,
  hierarchy,
  type HierarchyPointLink,
  type HierarchyPointNode,
} from "d3-hierarchy";
import { curveBundle, line, lineRadial, linkRadial } from "d3-shape";

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

type BundleTreeNode = {
  id: string;
  name: string;
  kind: "root" | "category" | "leaf";
  category?: EcosystemCategory;
  href?: string;
  degree?: number;
  children?: BundleTreeNode[];
};

interface EcosystemHierarchicalEdgeBundlingMapProps {
  nodes: PositionedNode[];
  edges: EcosystemEdge[];
  width: number;
  height: number;
  categoryColors: Record<EcosystemCategory, string>;
  categoryOrder: EcosystemCategory[];
  categoryLabels: Record<EcosystemCategory, string>;
}

type TreePointNode = HierarchyPointNode<BundleTreeNode>;
type BundledEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  sourceCategory: EcosystemCategory;
  targetCategory: EcosystemCategory;
  path: string;
  weight: number;
};

type BundlingLayoutMode = "radial" | "rectangular";

type BundlingLayout = {
  root: TreePointNode;
  descendants: TreePointNode[];
  links: HierarchyPointLink<BundleTreeNode>[];
  nodeById: Map<string, TreePointNode>;
  innerWidth: number;
  innerHeight: number;
};

const LEAF_LABEL_FONT_SIZE = 14;
const LEAF_LABEL_CONNECTED_FONT_SIZE = 14;
const ZOOM_MIN = 0.8;
const ZOOM_MAX = 3.5;
const ZOOM_STEP = 1.15;
const LEAF_ANGLE_JITTER = 0.01;
const LEAF_RADIUS_JITTER = 0.01;
const TREE_LINK_DIM_OPACITY = 0.03;
const BUNDLE_LINK_DIM_OPACITY = 0.03;
const NODE_DIM_OPACITY = 0.03;
const PAN_DRAG_THRESHOLD = 4;
const PIN_RESET_RADIUS = 12;
const RECTANGULAR_ASPECT_RATIO = 2;
const RECTANGULAR_PADDING_X = 100;
const RECTANGULAR_PADDING_Y = 50;

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

export default function EcosystemHierarchicalEdgeBundlingMap({
  nodes,
  edges,
  width,
  height,
  categoryColors,
  categoryOrder,
  categoryLabels,
}: EcosystemHierarchicalEdgeBundlingMapProps) {
  const [layoutMode, setLayoutMode] = useState<BundlingLayoutMode>("radial");
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
  const mapHeight =
    layoutMode === "rectangular"
      ? Math.max(420, Math.min(height, Math.round(width / RECTANGULAR_ASPECT_RATIO)))
      : height;

  const layout = useMemo((): BundlingLayout => {
    const grouped = new Map<EcosystemCategory, PositionedNode[]>();
    for (const category of categoryOrder) grouped.set(category, []);

    for (const node of nodes) {
      const group = grouped.get(node.category) ?? [];
      group.push(node);
      grouped.set(node.category, group);
    }

    const rootData: BundleTreeNode = {
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

    const root = hierarchy(rootData);

    if (layoutMode === "radial") {
      const radius = Math.min(width, mapHeight) / 2 - 50;
      cluster<BundleTreeNode>()
        .size([Math.PI * 2, radius - 34])
        .separation((a, b) => (a.parent === b.parent ? 1 : 1.7))(root);

      const descendants = root.descendants() as TreePointNode[];
      for (const node of descendants) {
        if (node.data.kind !== "leaf") continue;
        const seed = hashString(node.data.id);
        const angleJitter = (seeded01(seed ^ 0x91e10da5) - 0.5) * LEAF_ANGLE_JITTER;
        const radiusJitter = (seeded01(seed ^ 0x85ebca6b) - 0.5) * LEAF_RADIUS_JITTER * 2;
        node.x += angleJitter;
        node.y = clamp(node.y + radiusJitter, 12, radius - 8);
      }

      const links = root.links() as HierarchyPointLink<BundleTreeNode>[];
      const nodeById = new Map<string, TreePointNode>();
      for (const node of descendants) nodeById.set(node.data.id, node);

      return {
        root: root as TreePointNode,
        descendants,
        links,
        nodeById,
        innerWidth: radius * 2,
        innerHeight: radius * 2,
      };
    }

    const innerWidth = Math.max(260, width - RECTANGULAR_PADDING_X * 2);
    const innerHeight = Math.max(220, mapHeight - RECTANGULAR_PADDING_Y * 2);
    const halfWidth = innerWidth / 2;
    const halfHeight = innerHeight / 2;

    cluster<BundleTreeNode>()
      .size([Math.PI * 2, 1])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.6))(root);

    const descendants = root.descendants() as TreePointNode[];
    for (const node of descendants) {
      if (node.data.kind === "root") {
        node.x = halfWidth;
        node.y = halfHeight;
        continue;
      }

      const seed = hashString(node.data.id);
      const angleJitter =
        node.data.kind === "leaf"
          ? (seeded01(seed ^ 0x91e10da5) - 0.5) * LEAF_ANGLE_JITTER * 0.7
          : 0;
      const radialJitter =
        node.data.kind === "leaf"
          ? (seeded01(seed ^ 0x85ebca6b) - 0.5) * LEAF_RADIUS_JITTER * 1.2
          : 0;

      const angle = node.x + angleJitter;
      const radius = clamp(node.y + radialJitter, 0.14, 1);
      const a = angle - Math.PI / 2;
      const ux = Math.cos(a);
      const uy = Math.sin(a);
      const sideScale = 1 / Math.max(Math.abs(ux), Math.abs(uy), 1e-6);
      const boundaryX = ux * sideScale * (halfWidth - 6);
      const boundaryY = uy * sideScale * (halfHeight - 6);

      node.x = halfWidth + boundaryX * radius;
      node.y = halfHeight + boundaryY * radius;
    }

    const links = root.links() as HierarchyPointLink<BundleTreeNode>[];
    const nodeById = new Map<string, TreePointNode>();
    for (const node of descendants) nodeById.set(node.data.id, node);

    return {
      root: root as TreePointNode,
      descendants,
      links,
      nodeById,
      innerWidth,
      innerHeight,
    };
  }, [categoryLabels, categoryOrder, layoutMode, mapHeight, nodes, width]);

  const bundledLineRadial = useMemo(
    () =>
      lineRadial<TreePointNode>()
        .curve(curveBundle.beta(0.9))
        .radius((d) => d.y)
        .angle((d) => d.x),
    [],
  );

  const bundledLineRectangular = useMemo(
    () =>
      line<TreePointNode>()
        .curve(curveBundle.beta(0.9))
        .x((d) => d.x)
        .y((d) => d.y),
    [],
  );

  const treeLinkRadial = useMemo(
    () =>
      linkRadial<HierarchyPointLink<BundleTreeNode>, TreePointNode>()
        .angle((d) => d.x)
        .radius((d) => d.y),
    [],
  );

  const bundledEdges = useMemo(() => {
    const rendered: BundledEdge[] = [];
    for (const edge of edges) {
      const source = layout.nodeById.get(edge.sourceId);
      const target = layout.nodeById.get(edge.targetId);
      if (!source || !target) continue;
      if (!source.data.category || !target.data.category) continue;
      const pathNodes = source.path(target) as TreePointNode[];
      const path =
        layoutMode === "radial"
          ? bundledLineRadial(pathNodes)
          : bundledLineRectangular(pathNodes);
      if (!path) continue;
      rendered.push({
        id: edge.id,
        sourceId: edge.sourceId,
        targetId: edge.targetId,
        sourceCategory: source.data.category,
        targetCategory: target.data.category,
        path,
        weight: edge.weight,
      });
    }
    return rendered;
  }, [bundledLineRadial, bundledLineRectangular, edges, layout.nodeById, layoutMode]);

  const edgesByLeafId = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const edge of bundledEdges) {
      const sourceSet = map.get(edge.sourceId) ?? new Set<string>();
      sourceSet.add(edge.id);
      map.set(edge.sourceId, sourceSet);

      const targetSet = map.get(edge.targetId) ?? new Set<string>();
      targetSet.add(edge.id);
      map.set(edge.targetId, targetSet);
    }
    return map;
  }, [bundledEdges]);

  const activeEdgeIds = useMemo(
    () => (activeLeafId ? edgesByLeafId.get(activeLeafId) ?? new Set<string>() : new Set<string>()),
    [activeLeafId, edgesByLeafId],
  );

  const connectedLeafIds = useMemo(() => {
    if (!activeLeafId) return new Set<string>();
    const connected = new Set<string>([activeLeafId]);
    for (const edge of bundledEdges) {
      if (edge.sourceId === activeLeafId) connected.add(edge.targetId);
      if (edge.targetId === activeLeafId) connected.add(edge.sourceId);
    }
    return connected;
  }, [activeLeafId, bundledEdges]);

  const relatedLeafCountById = useMemo(() => {
    const relatedByLeaf = new Map<string, Set<string>>();
    for (const edge of bundledEdges) {
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
  }, [bundledEdges]);

  const activeLeaf = activeLeafId ? layout.nodeById.get(activeLeafId) ?? null : null;
  const activeAncestorIds = useMemo(() => collectAncestorIds(activeLeaf), [activeLeaf]);
  const activeCategory = activeLeaf?.data.category ?? null;
  const activeName = activeLeaf?.data.name ?? null;

  function handleLeafClick(node: TreePointNode): void {
    if (node.data.kind !== "leaf" || !node.data.href) return;

    if (pinnedLeafId) {
      if (
        node.data.id === pinnedLeafId ||
        connectedLeafIds.has(node.data.id)
      ) {
        window.open(node.data.href, "_blank", "noopener,noreferrer");
      }
      return;
    }
    setPinnedLeafId(node.data.id);
  }

  function zoomBy(factor: number): void {
    setZoom((prev) => clamp(prev * factor, ZOOM_MIN, ZOOM_MAX));
  }

  function setNextLayout(mode: BundlingLayoutMode): void {
    if (mode === layoutMode) return;
    setLayoutMode(mode);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setHoveredLeafId(null);
    setPinnedLeafId(null);
    suppressNextClickRef.current = false;
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

  function finishPan(): void {
    if (!panStateRef.current.active) return;
    suppressNextClickRef.current = panStateRef.current.moved;
    panStateRef.current.active = false;
    setIsPanning(false);
  }

  const groupTransform =
    layoutMode === "radial"
      ? `translate(${width / 2 + pan.x} ${mapHeight / 2 + pan.y}) scale(${zoom})`
      : `translate(${RECTANGULAR_PADDING_X + pan.x} ${RECTANGULAR_PADDING_Y + pan.y}) scale(${zoom})`;

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-md border border-gray-700 bg-gray-950 p-1">
          <button
            type="button"
            onClick={() => setNextLayout("radial")}
            className={`rounded px-2.5 py-1 text-xs font-mono ${
              layoutMode === "radial"
                ? "bg-teal-400 text-gray-950"
                : "text-gray-300 hover:bg-gray-850"
            }`}
          >
            Radial
          </button>
          <button
            type="button"
            onClick={() => setNextLayout("rectangular")}
            className={`rounded px-2.5 py-1 text-xs font-mono ${
              layoutMode === "rectangular"
                ? "bg-teal-400 text-gray-950"
                : "text-gray-300 hover:bg-gray-850"
            }`}
          >
            Rectangular 2:1
          </button>
        </div>

        <p className="text-xs text-gray-400 font-mono">
          {pinnedLeafId
            ? `${activeEdgeIds.size} bundled links pinned · click pinned node to open, or linked nodes to open`
            : activeLeafId
              ? `${activeEdgeIds.size} bundled links highlighted`
              : "Hover leaves to preview bundles · click once to pin · click pinned leaf or linked leaves to open · click X to reset · drag to pan · scroll to zoom"}
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
          viewBox={`0 0 ${width} ${mapHeight}`}
          width="100%"
          height="auto"
          role="img"
          aria-label={`Ecosystem hierarchical edge bundling graph (${layoutMode} layout)`}
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
            <linearGradient id="ecosystem-bundle-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#151310" />
              <stop offset="100%" stopColor="#1C1A17" />
            </linearGradient>
          </defs>

          <rect x={0} y={0} width={width} height={mapHeight} fill="url(#ecosystem-bundle-bg)" fillOpacity={0.25} />

          <g transform={groupTransform}>
            {layout.links
              .filter((link) => link.source.data.kind !== "root")
              .map((link, index) => {
                const targetCategory = link.target.data.category;
                const linkColor = targetCategory ? categoryColors[targetCategory] : "#9CA3AF";
                const active =
                  activeLeafId &&
                  activeAncestorIds.has(link.source.data.id) &&
                  activeAncestorIds.has(link.target.data.id);

                return (
                  <path
                    key={`bundle-tree-link-${index}`}
                    d={
                      layoutMode === "radial"
                        ? treeLinkRadial(link) ?? ""
                        : `M${link.source.x},${link.source.y}L${link.target.x},${link.target.y}`
                    }
                    fill="none"
                    stroke={linkColor}
                    strokeOpacity={activeLeafId ? (active ? 1 : TREE_LINK_DIM_OPACITY) : 0.1}
                    strokeWidth={active ? 2.2 : 0.8}
                  />
                );
              })}

            {bundledEdges.map((edge) => {
              const isActive = activeLeafId
                ? (edgesByLeafId.get(activeLeafId) ?? new Set<string>()).has(edge.id)
                : false;
              const bothInActiveCategory =
                activeCategory &&
                edge.sourceCategory === activeCategory &&
                edge.targetCategory === activeCategory;
              const color = bothInActiveCategory && activeCategory
                ? categoryColors[activeCategory]
                : categoryColors[edge.sourceCategory];

              return (
                <path
                  key={`bundle-relationship-${edge.id}`}
                  d={edge.path}
                  fill="none"
                  stroke={color}
                  strokeOpacity={activeLeafId ? (isActive ? 1 : BUNDLE_LINK_DIM_OPACITY) : 0.5}
                  strokeWidth={isActive ? Math.min(3.2, 1 + edge.weight * 0.1) : 0.85}
                />
              );
            })}

            {layout.descendants.map((node) => {
              if (node.data.kind === "root") return null;
              const { x, y } =
                layoutMode === "radial" ? polarToCartesian(node.x, node.y) : { x: node.x, y: node.y };
              const isLeaf = node.data.kind === "leaf";
              const isCategory = node.data.kind === "category";
              const isActiveLeaf = isLeaf && activeLeafId === node.data.id;
              const isConnectedLeaf =
                isLeaf && !!activeLeafId && connectedLeafIds.has(node.data.id);
              const isIndirectConnectedLeaf = isConnectedLeaf && !isActiveLeaf;
              const muted =
                isLeaf && activeLeafId
                  ? !isConnectedLeaf
                  : isCategory && activeLeafId
                    ? node.data.category !== activeCategory
                    : false;

              const categoryColor = node.data.category
                ? categoryColors[node.data.category]
                : "#9CA3AF";
              const relatedCount = isLeaf ? relatedLeafCountById.get(node.data.id) ?? 0 : 0;
              const leafRadius =
                2.1 + Math.min(4.6, Math.sqrt(node.data.degree ?? 0) * 0.22 + Math.sqrt(relatedCount) * 0.45);
              const radius = isLeaf ? leafRadius : 4.8;
              const fill = isIndirectConnectedLeaf ? "#FFFFFF" : categoryColor;
              const categoryLabel = node.data.name;
              const categoryLabelWidth = Math.max(
                56,
                Math.ceil(categoryLabel.length * 7.2 + 12),
              );
              const categoryLabelHeight = 18;
              const categoryLabelX = -categoryLabelWidth / 2;
              const categoryLabelY = -24;

              return (
                <g key={`bundle-node-${node.data.id}`} transform={`translate(${x}, ${y})`}>
                  <circle
                    r={radius}
                    fill={fill}
                    fillOpacity={muted ? NODE_DIM_OPACITY : isActiveLeaf || isIndirectConnectedLeaf ? 1 : activeLeafId ? 0.55 : 0.8}
                    stroke="#111"
                    strokeWidth={isActiveLeaf ? 1.2 : 0.8}
                  >
                    <title>
                      {node.data.name}
                      {isLeaf ? `\nDegree: ${node.data.degree ?? 0}` : ""}
                    </title>
                  </circle>

                  {isCategory && (
                    <g pointerEvents="none" opacity={muted ? 0.45 : 1}>
                      <rect
                        x={categoryLabelX}
                        y={categoryLabelY}
                        width={categoryLabelWidth}
                        height={categoryLabelHeight}
                        rx={5}
                        fill="#030712"
                        fillOpacity={0.92}
                      />
                      <text
                        x={0}
                        y={categoryLabelY + categoryLabelHeight / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={13}
                        fontWeight={700}
                        fill={categoryColor}
                      >
                        {categoryLabel}
                      </text>
                    </g>
                  )}

                  {isConnectedLeaf && (
                    <text
                      x={layoutMode === "radial" ? (node.x >= Math.PI ? -9 : 9) : node.x >= layout.innerWidth / 2 ? -9 : 9}
                      y={4}
                      textAnchor={layoutMode === "radial" ? (node.x >= Math.PI ? "end" : "start") : node.x >= layout.innerWidth / 2 ? "end" : "start"}
                      fontSize={isActiveLeaf ? LEAF_LABEL_FONT_SIZE : LEAF_LABEL_CONNECTED_FONT_SIZE}
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
                      {node.data.name.length > 34 ? `${node.data.name.slice(0, 34)}...` : node.data.name}
                    </text>
                  )}
                </g>
              );
            })}

            {layout.descendants
              .filter((node) => node.data.kind === "leaf")
              .map((node) => {
                const { x, y } =
                  layoutMode === "radial" ? polarToCartesian(node.x, node.y) : { x: node.x, y: node.y };
                const leafId = node.data.id;
                return (
                  <circle
                    key={`bundle-hit-${leafId}`}
                    cx={x}
                    cy={y}
                    r={9}
                    fill="transparent"
                    onMouseEnter={() => setHoveredLeafId(leafId)}
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
                        pinnedLeafId === leafId ||
                        (pinnedLeafId !== null && leafId !== pinnedLeafId && connectedLeafIds.has(leafId))
                          ? "alias"
                          : "pointer",
                    }}
                  />
                );
              })}

            {pinnedLeafId
              ? (() => {
                  const pinnedLeaf = layout.nodeById.get(pinnedLeafId);
                  if (!pinnedLeaf) return null;
                  const point =
                    layoutMode === "radial"
                      ? polarToCartesian(pinnedLeaf.x, pinnedLeaf.y)
                      : { x: pinnedLeaf.x, y: pinnedLeaf.y };
                  return (
                    <g
                      key="bundle-pinned-reset-control"
                      transform={`translate(${point.x + 24}, ${point.y - 24})`}
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
