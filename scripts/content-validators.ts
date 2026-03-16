/**
 * Shared validation rules used by both validate-content.ts (markdown files)
 * and validate-issue.ts (GitHub issue bodies).
 *
 * Keep all duplicated logic here — never define it twice.
 */

import fs from "node:fs";
import path from "node:path";
import { RESEARCH_TYPES, SENSEMAKING_CATEGORIES } from "../src/lib/types";
import type { Author } from "../src/lib/types";

const AUTHORS_PATH = path.join(process.cwd(), "src", "data", "authors.json");

function loadAuthors(): Author[] {
  try {
    return JSON.parse(fs.readFileSync(AUTHORS_PATH, "utf8")) as Author[];
  } catch {
    return [];
  }
}

/** Simple edit-distance for close-match suggestions */
function editDistance(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function findCloseMatch(name: string, authors: Author[]): string | null {
  const lower = name.toLowerCase();
  for (const author of authors) {
    if (author.name.toLowerCase() === lower) return author.name; // exact (case-insensitive)
  }
  // Check for close matches (edit distance ≤ 2, or one is a substring of the other)
  for (const author of authors) {
    const dist = editDistance(lower, author.name.toLowerCase());
    if (dist <= 2) return author.name;
  }
  return null;
}

/**
 * Validate the authors array from frontmatter or an issue body.
 *
 * Errors (blocks): name not in authors.json and no close match found, OR empty name before '|'
 * Warnings (non-blocking): name not found but a close match exists (likely a typo)
 *
 * @param authors   Array of author name strings to validate
 * @param rawLines  Optional raw textarea lines for '|' format parsing (used by issue validator)
 * @param errors    Array to push error messages into
 * @param warnings  Array to push warning messages into
 */
export function validateAuthors(
  authors: string[] | undefined,
  rawLines: string[] | undefined,
  errors: string[],
  warnings: string[],
): void {
  if (!authors || authors.length === 0) return;

  // Check for empty names before '|' (only relevant when rawLines are provided)
  if (rawLines) {
    for (const line of rawLines) {
      const pipeIdx = line.indexOf("|");
      if (pipeIdx !== -1 && line.slice(0, pipeIdx).trim() === "") {
        errors.push(
          `authors: line "${line.trim()}" has an empty name before '|' — format must be \`Name\` or \`Name | https://social.url\``,
        );
      }
    }
  }

  const knownAuthors = loadAuthors();

  for (const name of authors) {
    if (!name) continue;
    // Exact match
    if (knownAuthors.some((a) => a.name === name)) continue;
    // Close match → warning
    const close = findCloseMatch(name, knownAuthors);
    if (close) {
      warnings.push(
        `authors: "${name}" not found in src/data/authors.json — did you mean "${close}"? If adding a new author, add them to authors.json first.`,
      );
    } else {
      errors.push(
        `authors: "${name}" is not in src/data/authors.json. Add \`{ "name": "${name}" }\` to that file before referencing this author.`,
      );
    }
  }
}

export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function validateResearchType(value: string | undefined, errors: string[]): void {
  if (!value) return;
  const str = String(value);
  const matched = RESEARCH_TYPES.some((t) => t.toLowerCase() === str.toLowerCase());
  if (!matched) {
    errors.push(
      `researchType "${str}" is not valid — must be one of: ${RESEARCH_TYPES.join(", ")}`,
    );
  }
}

export function validateSensemakingFor(value: string | undefined, errors: string[]): void {
  if (!value) return;
  if (!(SENSEMAKING_CATEGORIES as readonly string[]).includes(value)) {
    errors.push(
      `sensemakingFor "${value}" is not valid — must be one of: ${SENSEMAKING_CATEGORIES.join(", ")}`,
    );
  }
}

export function validateCampaignDates(
  startDate: string | undefined,
  endDate: string | undefined,
  errors: string[],
): void {
  if (startDate && !DATE_REGEX.test(startDate)) {
    errors.push(`startDate "${startDate}" is not in YYYY-MM-DD format`);
  }
  // endDate can be empty string (ongoing campaign)
  if (endDate && endDate !== "" && !DATE_REGEX.test(endDate)) {
    errors.push(`endDate "${endDate}" is not in YYYY-MM-DD format (use empty string '' for ongoing)`);
  }
}
