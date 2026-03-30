"use client";

import { useMemo } from "react";
import { stratify, treemap, treemapBinary, type HierarchyRectangularNode } from "d3-hierarchy";

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

interface EcosystemZoomableTreemapProps {
  nodes: PositionedNode[];
  width: number;
  height: number;
  categoryColors: Record<EcosystemCategory, string>;
  categoryOrder: EcosystemCategory[];
}

type TreemapRow = {
  id: string;
  parentId: string | null;
  name: string;
  category: EcosystemCategory | null;
  href?: string;
  degree?: number;
  value: number;
};

type TreemapNode = HierarchyRectangularNode<TreemapRow>;

type ProjectedNode = {
  id: string;
  data: TreemapRow;
  x: number;
  y: number;
  width: number;
  height: number;
};

const BACKGROUND = "#020617";
const LEAF_BASE_VALUE = 14;
const LEAF_CONNECTION_WEIGHT = 1.25;
const MAX_LEAF_SIZE_BONUS = 6;
const TREEMAP_VERTICAL_EXPANSION_THRESHOLD = 40;
const MAX_TREEMAP_HEIGHT_MULTIPLIER = 3;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16),
  };
}

function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function splitLabel(label: string, maxCharsPerLine: number, maxLines: number): string[] {
  const trimmed = label.trim();
  if (!trimmed) return [];

  const words = trimmed.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
      current = word;
    } else {
      lines.push(word.slice(0, maxCharsPerLine));
      current = word.slice(maxCharsPerLine);
    }

    if (lines.length >= maxLines) break;
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  }

  const normalized = lines.slice(0, maxLines);
  if (normalized.length === maxLines && trimmed.length > normalized.join(" ").length) {
    const last = normalized[maxLines - 1] ?? "";
    normalized[maxLines - 1] = `${last.slice(0, Math.max(0, maxCharsPerLine - 3))}...`;
  }

  return normalized;
}

function leafAreaValue(degree: number): number {
  return LEAF_BASE_VALUE + Math.min(MAX_LEAF_SIZE_BONUS, Math.log2(degree + 2) * LEAF_CONNECTION_WEIGHT);
}

function getViewportHeight(baseHeight: number, visibleTileCount: number): number {
  if (visibleTileCount <= TREEMAP_VERTICAL_EXPANSION_THRESHOLD) {
    return baseHeight;
  }

  const heightMultiplier = Math.min(
    MAX_TREEMAP_HEIGHT_MULTIPLIER,
    visibleTileCount / TREEMAP_VERTICAL_EXPANSION_THRESHOLD,
  );

  return Math.round(baseHeight * heightMultiplier);
}

function projectNode(node: TreemapNode): ProjectedNode {
  return {
    id: node.data.id,
    data: node.data,
    x: node.x0,
    y: node.y0,
    width: node.x1 - node.x0,
    height: node.y1 - node.y0,
  };
}

function renderTile(
  node: ProjectedNode,
  categoryColors: Record<EcosystemCategory, string>,
) {
  if (!node.data.category || !node.data.href) return null;

  const baseColor = categoryColors[node.data.category];
  const fill = withAlpha(baseColor, 0.26);
  const padding = node.width > 180 && node.height > 110 ? 18 : node.width > 130 ? 14 : 10;
  const canShowLabel = node.width > 72 && node.height > 34;
  const canShowMeta = node.width > 108 && node.height > 62;
  const maxLines = node.width > 220 && node.height > 130 ? 3 : 2;
  const maxChars = clamp(Math.floor(node.width / 12), 8, 28);
  const labelLines = canShowLabel ? splitLabel(node.data.name, maxChars, maxLines) : [];
  const lineHeight = node.width > 170 ? 18 : 16;
  const titleY = padding + 16;
  const metaY = padding + labelLines.length * lineHeight + 18;

  return (
    <a key={node.id} href={node.data.href}>
      <g className="cursor-pointer">
        <rect
          x={node.x}
          y={node.y}
          width={Math.max(0, node.width)}
          height={Math.max(0, node.height)}
          fill={fill}
        />
        {labelLines.length > 0 ? (
          <text
            x={node.x + padding}
            y={node.y + titleY}
            fill="#F8FAFC"
            fontSize={node.width > 170 ? 18 : 14}
            fontWeight={700}
          >
            {labelLines.map((line, index) => (
              <tspan key={`${node.id}-label-${index}`} x={node.x + padding} dy={index === 0 ? 0 : lineHeight}>
                {line}
              </tspan>
            ))}
          </text>
        ) : null}
        {canShowMeta ? (
          <text
            x={node.x + padding}
            y={node.y + metaY}
            fill={withAlpha("#E2E8F0", 0.84)}
            fontSize={12}
            fontFamily="monospace"
          >
            {`${node.data.degree ?? 0} connections`}
          </text>
        ) : null}
      </g>
    </a>
  );
}

export default function EcosystemZoomableTreemap({
  nodes,
  width,
  height,
  categoryColors,
  categoryOrder,
}: EcosystemZoomableTreemapProps) {
  const viewportHeight = useMemo(() => getViewportHeight(height, nodes.length), [height, nodes.length]);

  const projected = useMemo(() => {
    const grouped = new Map<EcosystemCategory, PositionedNode[]>();
    for (const category of categoryOrder) {
      grouped.set(category, []);
    }

    for (const node of nodes) {
      const group = grouped.get(node.category) ?? [];
      group.push(node);
      grouped.set(node.category, group);
    }

    const rows: TreemapRow[] = [
      {
        id: "root",
        parentId: null,
        name: "Ecosystem",
        category: null,
        value: 0,
      },
    ];

    for (const category of categoryOrder) {
      const items = (grouped.get(category) ?? [])
        .slice()
        .sort((a, b) => b.degree - a.degree || a.name.localeCompare(b.name));

      if (items.length === 0) continue;

      rows.push({
        id: `category:${category}`,
        parentId: "root",
        name: category,
        category,
        value: 0,
      });

      for (const node of items) {
        rows.push({
          id: node.id,
          parentId: `category:${category}`,
          name: node.name,
          category: node.category,
          href: node.href,
          degree: node.degree,
          value: leafAreaValue(node.degree),
        });
      }
    }

    const root = stratify<TreemapRow>()
      .id((row) => row.id)
      .parentId((row) => row.parentId)(rows)
      .sum((row) => row.value);

    treemap<TreemapRow>()
      .tile(treemapBinary)
      .size([width, viewportHeight])
      .paddingInner(2)
      .paddingOuter(0)
      .round(true)(root);

    return (root.descendants() as TreemapNode[])
      .filter((node) => node.depth === 2 && Boolean(node.data.href))
      .map(projectNode);
  }, [categoryOrder, nodes, viewportHeight, width]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-gray-400">
          Treemap
        </p>
        <p className="max-w-xl text-right text-sm font-serif text-gray-300">
          Single-view treemap of the full ecosystem. Tile color indicates category and tile size
          reflects relative network connectivity.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-950 shadow-[0_24px_60px_rgba(2,6,23,0.45)]">
        <svg viewBox={`0 0 ${width} ${viewportHeight}`} className="block h-auto w-full" role="img">
          <rect x="0" y="0" width={width} height={viewportHeight} fill={BACKGROUND} />
          <g>{projected.map((node) => renderTile(node, categoryColors))}</g>
        </svg>
      </div>
    </div>
  );
}
