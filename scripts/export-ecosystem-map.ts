/**
 * Exports the ecosystem graph to JSON and CSV files.
 *
 * Usage:
 *   npx tsx scripts/export-ecosystem-map.ts
 */

import fs from "node:fs";
import path from "node:path";
import { getEcosystemGraph } from "../src/lib/ecosystem-map";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "public", "data");

function escapeCsv(value: string | number): string {
  const text = String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function rowsToCsv(rows: Array<Array<string | number>>): string {
  return `${rows.map((row) => row.map(escapeCsv).join(",")).join("\n")}\n`;
}

function ensureDir(directory: string): void {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function main(): void {
  const graph = getEcosystemGraph();
  const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));

  ensureDir(OUTPUT_DIR);

  const graphPath = path.join(OUTPUT_DIR, "ecosystem-map.json");
  fs.writeFileSync(graphPath, JSON.stringify(graph, null, 2), "utf8");

  const nodeRows: Array<Array<string | number>> = [
    ["id", "slug", "name", "category", "href", "degree", "tags"],
    ...graph.nodes.map((node) => [
      node.id,
      node.slug,
      node.name,
      node.category,
      node.href,
      node.degree,
      node.tags.join("|"),
    ]),
  ];
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "ecosystem-map-nodes.csv"),
    rowsToCsv(nodeRows),
    "utf8",
  );

  const edgeRows: Array<Array<string | number>> = [
    [
      "id",
      "source_id",
      "source_name",
      "source_category",
      "source_href",
      "target_id",
      "target_name",
      "target_category",
      "target_href",
      "kinds",
      "weight",
      "internal_reference_count",
      "explicit_relations",
      "shared_tags",
    ],
    ...graph.edges.map((edge) => [
      edge.id,
      edge.sourceId,
      edge.sourceName,
      edge.sourceCategory,
      nodeById.get(edge.sourceId)?.href ?? "",
      edge.targetId,
      edge.targetName,
      edge.targetCategory,
      nodeById.get(edge.targetId)?.href ?? "",
      edge.kinds.join("|"),
      edge.weight,
      edge.internalReferenceCount,
      edge.explicitRelations.join("|"),
      edge.sharedTags.join("|"),
    ]),
  ];
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "ecosystem-map-edges.csv"),
    rowsToCsv(edgeRows),
    "utf8",
  );

  console.log(`Exported ecosystem map to ${path.relative(ROOT, OUTPUT_DIR)}`);
  console.log(`Nodes: ${graph.summary.totalNodes}`);
  console.log(`Edges: ${graph.summary.totalEdges}`);
}

main();

