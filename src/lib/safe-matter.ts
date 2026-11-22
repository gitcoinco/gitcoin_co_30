import matter from "gray-matter";

/** Content files only use YAML front matter. Never run gray-matter's JS engine. */
export function parseSafeMatter(raw: string) {
  if (raw.startsWith("---") && !/^---[ \t]*\r?\n/.test(raw)) {
    throw new Error("Only YAML front matter is allowed");
  }

  // gray-matter merges custom engines with its built-ins, so setting only a
  // YAML engine does not disable its JavaScript engine.
  return matter(raw, {
    engines: {
      javascript: () => {
        throw new Error("JavaScript front matter is disabled");
      },
    },
  });
}
