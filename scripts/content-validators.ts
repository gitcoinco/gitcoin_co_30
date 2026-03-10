/**
 * Shared validation rules used by both validate-content.ts (markdown files)
 * and validate-issue.ts (GitHub issue bodies).
 *
 * Keep all duplicated logic here — never define it twice.
 */

import { RESEARCH_TYPES, SENSEMAKING_CATEGORIES } from "../src/lib/types";

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
