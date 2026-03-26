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
 * Validate the authors field from a GitHub issue body or a content markdown file.
 *
 * Two contexts behave differently:
 *   - 'issue'   : Only checks format (empty name before '|'). Does NOT check authors.json
 *                 because the publish script adds new authors automatically.
 *   - 'content' : Checks every name exists in authors.json. Used when validating PR files
 *                 where authors.json must already be up to date.
 *
 * Errors (blocks): empty name before '|', OR (content only) name not in authors.json with no close match
 * Warnings (non-blocking): (content only) name not found but a close match exists (likely a typo)
 *
 * @param authors   Array of author name strings to validate
 * @param rawLines  Raw textarea lines in 'Name | https://social.url' format (issue context only)
 * @param errors    Array to push error messages into
 * @param warnings  Array to push warning messages into
 * @param context   'issue' | 'content' — controls which checks run
 */
export function validateAuthors(
  authors: string[] | undefined,
  rawLines: string[] | undefined,
  errors: string[],
  warnings: string[],
  context: "issue" | "content",
): void {
  if (!authors || authors.length === 0) return;

  // Format check: catch empty name before '|' (e.g. " | https://twitter.com/foo")
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

  // Issue context: publish script handles syncing new authors to authors.json — no further checks
  if (context === "issue") return;

  // Content context: every name must already exist in authors.json
  const knownAuthors = loadAuthors();

  for (const name of authors) {
    if (!name) continue;
    if (knownAuthors.some((a) => a.name === name)) continue;
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
