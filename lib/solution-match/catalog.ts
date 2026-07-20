import { industries } from "@/lib/industries";
import { SOLUTION_CAPABILITIES } from "@/lib/solutions";

/**
 * Compact catalog string for the model — IDs only the server will accept back.
 * Keep short to reduce tokens + injection surface.
 */
export function buildCatalogForModel(): string {
  const caps = SOLUTION_CAPABILITIES.map(
    (c) => `- ${c.id} | ${c.title} | ${c.focus}`
  ).join("\n");

  const inds = industries
    .map((ind) => {
      const uses = ind.groups
        .flatMap((g) => g.items.map((u) => u.title))
        .slice(0, 8)
        .join("; ");
      return `- ${ind.slug} | ${ind.name} | ${ind.tag}\n  usecases: ${uses}`;
    })
    .join("\n");

  return `CAPABILITIES (id | title | focus):\n${caps}\n\nINDUSTRIES (slug | name | tag + sample usecases):\n${inds}`;
}

export const VALID_CAPABILITY_IDS = new Set(
  SOLUTION_CAPABILITIES.map((c) => c.id)
);
export const VALID_INDUSTRY_SLUGS = new Set(industries.map((i) => i.slug));

export function resolveUseCase(
  industrySlug: string,
  title: string
): { title: string; desc: string } | null {
  const ind = industries.find((i) => i.slug === industrySlug);
  if (!ind) return null;
  const needle = title.trim().toLowerCase();
  for (const g of ind.groups) {
    for (const u of g.items) {
      if (
        u.title.toLowerCase() === needle ||
        u.title.toLowerCase().includes(needle) ||
        needle.includes(u.title.toLowerCase())
      ) {
        return u;
      }
    }
  }
  return null;
}
