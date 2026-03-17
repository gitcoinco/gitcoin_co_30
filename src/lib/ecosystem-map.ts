import { getAllApps } from "../content/apps";
import { getAllCampaigns } from "../content/campaigns";
import { getAllCaseStudies } from "../content/case-studies";
import { getAllMechanisms } from "../content/mechanisms";
import { getAllResearch } from "../content/research";
import type { BaseContent } from "./types";

export type EcosystemCategory =
  | "apps"
  | "mechanisms"
  | "research"
  | "case-studies"
  | "campaigns";

export type EcosystemEdgeKind = "explicit" | "internal-link" | "tag-overlap";

type ExplicitRelationField =
  | "relatedApps"
  | "relatedMechanisms"
  | "relatedResearch"
  | "relatedCaseStudies"
  | "relatedCampaigns";

interface ContentNode extends BaseContent {
  id: string;
  category: EcosystemCategory;
  href: string;
  tagsNormalized: string[];
  tagsSet: Set<string>;
}

interface SimilarityCandidate {
  key: string;
  sourceId: string;
  targetId: string;
  sharedTags: string[];
  score: number;
}

interface EdgeAccumulator {
  sourceId: string;
  targetId: string;
  kinds: Set<EcosystemEdgeKind>;
  explicitRelations: Set<ExplicitRelationField>;
  sharedTags: Set<string>;
  internalReferenceCount: number;
  weight: number;
}

export interface EcosystemNode {
  id: string;
  slug: string;
  name: string;
  category: EcosystemCategory;
  href: string;
  tags: string[];
  degree: number;
}

export interface EcosystemEdge {
  id: string;
  sourceId: string;
  targetId: string;
  sourceSlug: string;
  targetSlug: string;
  sourceName: string;
  targetName: string;
  sourceCategory: EcosystemCategory;
  targetCategory: EcosystemCategory;
  kinds: EcosystemEdgeKind[];
  explicitRelations: ExplicitRelationField[];
  sharedTags: string[];
  internalReferenceCount: number;
  weight: number;
}

export interface EcosystemGraphSummary {
  totalNodes: number;
  totalEdges: number;
  nodesByCategory: Record<EcosystemCategory, number>;
  edgesByKind: Record<EcosystemEdgeKind, number>;
}

export interface EcosystemGraph {
  nodes: EcosystemNode[];
  edges: EcosystemEdge[];
  summary: EcosystemGraphSummary;
}

export const ECOSYSTEM_CATEGORY_ORDER: EcosystemCategory[] = [
  "apps",
  "mechanisms",
  "research",
  "case-studies",
  "campaigns",
];

export const ECOSYSTEM_CATEGORY_LABELS: Record<EcosystemCategory, string> = {
  apps: "Apps",
  mechanisms: "Mechanisms",
  research: "Research",
  "case-studies": "Case Studies",
  campaigns: "Campaigns",
};

const CATEGORY_PATHS: Record<EcosystemCategory, string> = {
  apps: "apps",
  mechanisms: "mechanisms",
  research: "research",
  "case-studies": "case-studies",
  campaigns: "campaigns",
};

const RELATION_TO_CATEGORY: Record<ExplicitRelationField, EcosystemCategory> = {
  relatedApps: "apps",
  relatedMechanisms: "mechanisms",
  relatedResearch: "research",
  relatedCaseStudies: "case-studies",
  relatedCampaigns: "campaigns",
};

const RELATION_FIELDS = Object.keys(
  RELATION_TO_CATEGORY,
) as ExplicitRelationField[];

const INTERNAL_LINK_PATH_TO_CATEGORY: Record<string, EcosystemCategory> = {
  apps: "apps",
  mechanisms: "mechanisms",
  research: "research",
  "case-studies": "case-studies",
  campaigns: "campaigns",
};

const INTERNAL_LINK_REGEX = /\[[^\]]+?\]\((\/[^)\s]+)\)/g;
const MAX_TAG_FREQUENCY_FOR_SIMILARITY = 24;
const TOP_TAG_EDGES_PER_NODE = 3;

function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

function toContentNodes(
  items: BaseContent[],
  category: EcosystemCategory,
): ContentNode[] {
  const basePath = CATEGORY_PATHS[category];
  return items.map((item) => {
    const normalizedTags = [...new Set((item.tags || []).map(normalizeTag).filter(Boolean))];
    return {
      ...item,
      id: `${category}:${item.slug}`,
      category,
      href: `/${basePath}/${item.slug}`,
      tagsNormalized: normalizedTags,
      tagsSet: new Set(normalizedTags),
    };
  });
}

function canonicalEdgeIds(aId: string, bId: string): { sourceId: string; targetId: string } {
  return aId < bId ? { sourceId: aId, targetId: bId } : { sourceId: bId, targetId: aId };
}

function createEdgeKey(aId: string, bId: string): string {
  const { sourceId, targetId } = canonicalEdgeIds(aId, bId);
  return `${sourceId}::${targetId}`;
}

function getOrCreateEdge(
  edgeMap: Map<string, EdgeAccumulator>,
  sourceId: string,
  targetId: string,
): EdgeAccumulator {
  const key = createEdgeKey(sourceId, targetId);
  const existing = edgeMap.get(key);
  if (existing) return existing;
  const { sourceId: left, targetId: right } = canonicalEdgeIds(sourceId, targetId);
  const created: EdgeAccumulator = {
    sourceId: left,
    targetId: right,
    kinds: new Set<EcosystemEdgeKind>(),
    explicitRelations: new Set<ExplicitRelationField>(),
    sharedTags: new Set<string>(),
    internalReferenceCount: 0,
    weight: 0,
  };
  edgeMap.set(key, created);
  return created;
}

function recordExplicitEdge(
  edgeMap: Map<string, EdgeAccumulator>,
  sourceId: string,
  targetId: string,
  relation: ExplicitRelationField,
): void {
  if (sourceId === targetId) return;
  const edge = getOrCreateEdge(edgeMap, sourceId, targetId);
  edge.kinds.add("explicit");
  edge.explicitRelations.add(relation);
  edge.weight += 3;
}

function recordInternalLinkEdge(
  edgeMap: Map<string, EdgeAccumulator>,
  sourceId: string,
  targetId: string,
): void {
  if (sourceId === targetId) return;
  const edge = getOrCreateEdge(edgeMap, sourceId, targetId);
  edge.kinds.add("internal-link");
  edge.internalReferenceCount += 1;
  edge.weight += 2;
}

function recordTagOverlapEdge(
  edgeMap: Map<string, EdgeAccumulator>,
  sourceId: string,
  targetId: string,
  sharedTags: string[],
): void {
  if (sourceId === targetId || sharedTags.length === 0) return;
  const edge = getOrCreateEdge(edgeMap, sourceId, targetId);
  edge.kinds.add("tag-overlap");
  for (const tag of sharedTags) edge.sharedTags.add(tag);
  edge.weight += Math.min(3, sharedTags.length);
}

function buildLookupMaps(nodes: ContentNode[]): {
  byId: Map<string, ContentNode>;
  byCategorySlug: Map<string, ContentNode>;
} {
  const byId = new Map<string, ContentNode>();
  const byCategorySlug = new Map<string, ContentNode>();
  for (const node of nodes) {
    byId.set(node.id, node);
    byCategorySlug.set(`${node.category}:${node.slug}`, node);
  }
  return { byId, byCategorySlug };
}

function resolveNodeByCategoryAndSlug(
  byCategorySlug: Map<string, ContentNode>,
  category: EcosystemCategory,
  slug: string,
): ContentNode | undefined {
  return byCategorySlug.get(`${category}:${slug}`);
}

function extractInternalLinks(
  description: string,
): Array<{ category: EcosystemCategory; slug: string }> {
  const matches: Array<{ category: EcosystemCategory; slug: string }> = [];
  for (const match of description.matchAll(INTERNAL_LINK_REGEX)) {
    const rawPath = match[1];
    const pathWithoutQuery = rawPath.split("#")[0].split("?")[0];
    const segments = pathWithoutQuery.split("/").filter(Boolean);
    if (segments.length < 2) continue;
    const category = INTERNAL_LINK_PATH_TO_CATEGORY[segments[0]];
    if (!category) continue;
    const slug = decodeURIComponent(segments[1]);
    if (!slug) continue;
    matches.push({ category, slug });
  }
  return matches;
}

function buildTagSimilarityCandidates(nodes: ContentNode[]): SimilarityCandidate[] {
  const frequency = new Map<string, number>();

  for (const node of nodes) {
    for (const tag of node.tagsSet) {
      frequency.set(tag, (frequency.get(tag) ?? 0) + 1);
    }
  }

  const candidates: SimilarityCandidate[] = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const left = nodes[i];
      const right = nodes[j];
      if (left.category === right.category) continue;

      const sharedTags: string[] = [];
      for (const tag of left.tagsSet) {
        if (!right.tagsSet.has(tag)) continue;
        const tagFrequency = frequency.get(tag) ?? 0;
        if (tagFrequency <= MAX_TAG_FREQUENCY_FOR_SIMILARITY) {
          sharedTags.push(tag);
        }
      }

      if (sharedTags.length === 0) continue;
      const key = createEdgeKey(left.id, right.id);
      candidates.push({
        key,
        sourceId: left.id,
        targetId: right.id,
        sharedTags: sharedTags.sort(),
        score: sharedTags.length,
      });
    }
  }

  return candidates;
}

function selectTopSimilarityCandidates(
  nodes: ContentNode[],
  candidates: SimilarityCandidate[],
): SimilarityCandidate[] {
  const candidatesByNode = new Map<string, SimilarityCandidate[]>();

  for (const candidate of candidates) {
    const from = candidatesByNode.get(candidate.sourceId) ?? [];
    from.push(candidate);
    candidatesByNode.set(candidate.sourceId, from);

    const to = candidatesByNode.get(candidate.targetId) ?? [];
    to.push(candidate);
    candidatesByNode.set(candidate.targetId, to);
  }

  const selectedKeys = new Set<string>();
  for (const node of nodes) {
    const list = candidatesByNode.get(node.id) ?? [];
    list
      .sort((a, b) => b.score - a.score || a.key.localeCompare(b.key))
      .slice(0, TOP_TAG_EDGES_PER_NODE)
      .forEach((candidate) => selectedKeys.add(candidate.key));
  }

  return candidates
    .filter((candidate) => selectedKeys.has(candidate.key))
    .sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));
}

export function getEcosystemGraph(): EcosystemGraph {
  const nodes: ContentNode[] = [
    ...toContentNodes(getAllApps(), "apps"),
    ...toContentNodes(getAllMechanisms(), "mechanisms"),
    ...toContentNodes(getAllResearch(), "research"),
    ...toContentNodes(getAllCaseStudies(), "case-studies"),
    ...toContentNodes(getAllCampaigns(), "campaigns"),
  ];

  const { byId, byCategorySlug } = buildLookupMaps(nodes);
  const edgeMap = new Map<string, EdgeAccumulator>();

  for (const node of nodes) {
    for (const relationField of RELATION_FIELDS) {
      const targetCategory = RELATION_TO_CATEGORY[relationField];
      const relatedSlugs = node[relationField] || [];
      for (const relatedSlug of relatedSlugs) {
        const target = resolveNodeByCategoryAndSlug(byCategorySlug, targetCategory, relatedSlug);
        if (!target) continue;
        recordExplicitEdge(edgeMap, node.id, target.id, relationField);
      }
    }
  }

  for (const node of nodes) {
    const references = extractInternalLinks(node.description);
    for (const reference of references) {
      const target = resolveNodeByCategoryAndSlug(
        byCategorySlug,
        reference.category,
        reference.slug,
      );
      if (!target) continue;
      recordInternalLinkEdge(edgeMap, node.id, target.id);
    }
  }

  const similarityCandidates = buildTagSimilarityCandidates(nodes);
  const selectedSimilarityCandidates = selectTopSimilarityCandidates(nodes, similarityCandidates);
  for (const candidate of selectedSimilarityCandidates) {
    recordTagOverlapEdge(edgeMap, candidate.sourceId, candidate.targetId, candidate.sharedTags);
  }

  const degreeById = new Map<string, number>();
  for (const node of nodes) {
    degreeById.set(node.id, 0);
  }

  const edges: EcosystemEdge[] = [...edgeMap.values()]
    .map((edge) => {
      const source = byId.get(edge.sourceId);
      const target = byId.get(edge.targetId);
      if (!source || !target) {
        return undefined;
      }

      degreeById.set(source.id, (degreeById.get(source.id) ?? 0) + 1);
      degreeById.set(target.id, (degreeById.get(target.id) ?? 0) + 1);

      return {
        id: `${edge.sourceId}::${edge.targetId}`,
        sourceId: source.id,
        targetId: target.id,
        sourceSlug: source.slug,
        targetSlug: target.slug,
        sourceName: source.name,
        targetName: target.name,
        sourceCategory: source.category,
        targetCategory: target.category,
        kinds: [...edge.kinds].sort() as EcosystemEdgeKind[],
        explicitRelations: [...edge.explicitRelations].sort() as ExplicitRelationField[],
        sharedTags: [...edge.sharedTags].sort(),
        internalReferenceCount: edge.internalReferenceCount,
        weight: edge.weight,
      } satisfies EcosystemEdge;
    })
    .filter((edge): edge is EcosystemEdge => Boolean(edge))
    .sort((a, b) => b.weight - a.weight || a.id.localeCompare(b.id));

  const mapNodes: EcosystemNode[] = nodes
    .map((node) => ({
      id: node.id,
      slug: node.slug,
      name: node.name,
      category: node.category,
      href: node.href,
      tags: node.tagsNormalized,
      degree: degreeById.get(node.id) ?? 0,
    }))
    .sort((a, b) => {
      const categoryOrder =
        ECOSYSTEM_CATEGORY_ORDER.indexOf(a.category) -
        ECOSYSTEM_CATEGORY_ORDER.indexOf(b.category);
      if (categoryOrder !== 0) return categoryOrder;
      return a.name.localeCompare(b.name);
    });

  const nodesByCategory = {
    apps: 0,
    mechanisms: 0,
    research: 0,
    "case-studies": 0,
    campaigns: 0,
  } satisfies Record<EcosystemCategory, number>;

  for (const node of mapNodes) {
    nodesByCategory[node.category] += 1;
  }

  const edgesByKind = {
    explicit: 0,
    "internal-link": 0,
    "tag-overlap": 0,
  } satisfies Record<EcosystemEdgeKind, number>;

  for (const edge of edges) {
    for (const kind of edge.kinds) {
      edgesByKind[kind] += 1;
    }
  }

  return {
    nodes: mapNodes,
    edges,
    summary: {
      totalNodes: mapNodes.length,
      totalEdges: edges.length,
      nodesByCategory,
      edgesByKind,
    },
  };
}
