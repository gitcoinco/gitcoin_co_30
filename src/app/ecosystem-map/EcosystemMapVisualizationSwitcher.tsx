"use client";

import { useState } from "react";
import EcosystemVoronoiMap from "./EcosystemVoronoiMap";
import EcosystemSphereMap from "./EcosystemSphereMap";
import EcosystemHierarchicalEdgeBundlingMap from "./EcosystemHierarchicalEdgeBundlingMap";
import EcosystemForceDirectedTreeMap from "./EcosystemForceDirectedTreeMap";

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

interface EcosystemMapVisualizationSwitcherProps {
  nodes: PositionedNode[];
  edges: EcosystemEdge[];
  width: number;
  height: number;
  categoryColors: Record<EcosystemCategory, string>;
  categoryAnchors: Record<EcosystemCategory, { x: number; y: number }>;
  categoryOrder: EcosystemCategory[];
  categoryLabels: Record<EcosystemCategory, string>;
}

type VisualizationMode =
  | "voronoi"
  | "sphere"
  | "bundling"
  | "force-tree";

export default function EcosystemMapVisualizationSwitcher({
  nodes,
  edges,
  width,
  height,
  categoryColors,
  categoryAnchors,
  categoryOrder,
  categoryLabels,
}: EcosystemMapVisualizationSwitcherProps) {
  const [mode, setMode] = useState<VisualizationMode>("sphere");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setMode("voronoi")}
          className={`rounded-md px-3 py-1.5 text-xs font-mono transition-colors ${
            mode === "voronoi"
              ? "bg-teal-400 text-gray-950"
              : "bg-gray-950 text-gray-300 hover:bg-gray-850"
          }`}
        >
          Voronoi Network
        </button>
        <button
          type="button"
          onClick={() => setMode("sphere")}
          className={`rounded-md px-3 py-1.5 text-xs font-mono transition-colors ${
            mode === "sphere"
              ? "bg-teal-400 text-gray-950"
              : "bg-gray-950 text-gray-300 hover:bg-gray-850"
          }`}
        >
          3D Sphere
        </button>
        <button
          type="button"
          onClick={() => setMode("bundling")}
          className={`rounded-md px-3 py-1.5 text-xs font-mono transition-colors ${
            mode === "bundling"
              ? "bg-teal-400 text-gray-950"
              : "bg-gray-950 text-gray-300 hover:bg-gray-850"
          }`}
        >
          Edge Bundling 2D
        </button>
        <button
          type="button"
          onClick={() => setMode("force-tree")}
          className={`rounded-md px-3 py-1.5 text-xs font-mono transition-colors ${
            mode === "force-tree"
              ? "bg-teal-400 text-gray-950"
              : "bg-gray-950 text-gray-300 hover:bg-gray-850"
          }`}
        >
          Force Tree
        </button>
      </div>

      {mode === "voronoi" ? (
        <EcosystemVoronoiMap
          nodes={nodes}
          edges={edges}
          width={width}
          height={height}
          categoryColors={categoryColors}
          categoryAnchors={categoryAnchors}
        />
      ) : mode === "bundling" ? (
        <EcosystemHierarchicalEdgeBundlingMap
          nodes={nodes}
          edges={edges}
          width={width}
          height={height}
          categoryColors={categoryColors}
          categoryOrder={categoryOrder}
          categoryLabels={categoryLabels}
        />
      ) : mode === "force-tree" ? (
        <EcosystemForceDirectedTreeMap
          nodes={nodes}
          edges={edges}
          width={width}
          height={height}
          categoryColors={categoryColors}
          categoryOrder={categoryOrder}
          categoryLabels={categoryLabels}
        />
      ) : (
        <EcosystemSphereMap
          nodes={nodes}
          edges={edges}
          width={width}
          height={height}
          categoryColors={categoryColors}
        />
      )}
    </div>
  );
}
