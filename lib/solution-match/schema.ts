import {
  VALID_CAPABILITY_IDS,
  VALID_INDUSTRY_SLUGS,
  resolveUseCase,
} from "./catalog";
import { SOLUTION_CAPABILITIES } from "@/lib/solutions";
import { getIndustry } from "@/lib/industries";

export type MatchFlowNode = {
  id: string;
  kind: "problem" | "capability" | "industry" | "usecase";
  title: string;
  subtitle?: string;
  href?: string;
};

export type MatchFlowEdge = {
  from: string;
  to: string;
  label?: string;
};

export type SolutionMatchResult = {
  summary: string;
  confidence: number;
  industries: {
    slug: string;
    name: string;
    reason: string;
    href: string;
    usecases: { title: string; desc: string; href: string }[];
  }[];
  capabilities: {
    id: string;
    title: string;
    focus: string;
    reason: string;
    href: string;
  }[];
  flow: {
    nodes: MatchFlowNode[];
    edges: MatchFlowEdge[];
  };
  cta: { label: string; href: string };
  refused?: boolean;
  refuseReason?: string;
};

type RawModelJson = {
  summary?: string;
  confidence?: number;
  refused?: boolean;
  refuse_reason?: string;
  industries?: {
    slug?: string;
    reason?: string;
    usecases?: string[];
  }[];
  capabilities?: { id?: string; reason?: string }[];
};

const MAX_INDUSTRIES = 3;
const MAX_CAPS = 5;
const MAX_USECASES = 4;

export function sanitizeAndEnrich(
  raw: RawModelJson,
  problem: string
): SolutionMatchResult {
  if (raw.refused) {
    return {
      summary:
        raw.refuse_reason ||
        "I can only help map business calling problems to Speaksy solutions.",
      confidence: 0,
      industries: [],
      capabilities: [],
      flow: { nodes: [], edges: [] },
      cta: { label: "Browse all solutions", href: "/solutions" },
      refused: true,
      refuseReason: raw.refuse_reason,
    };
  }

  const industriesOut: SolutionMatchResult["industries"] = [];
  for (const row of raw.industries ?? []) {
    if (!row?.slug || !VALID_INDUSTRY_SLUGS.has(row.slug)) continue;
    const ind = getIndustry(row.slug);
    if (!ind) continue;
    const usecases: SolutionMatchResult["industries"][0]["usecases"] = [];
    for (const t of row.usecases ?? []) {
      if (typeof t !== "string" || !t.trim()) continue;
      const hit = resolveUseCase(row.slug, t);
      if (hit) {
        usecases.push({
          title: hit.title,
          desc: hit.desc,
          href: `/solutions/${row.slug}`,
        });
      }
      if (usecases.length >= MAX_USECASES) break;
    }
    // fallback: top use cases from industry
    if (usecases.length === 0) {
      for (const g of ind.groups) {
        for (const u of g.items.slice(0, 2)) {
          usecases.push({
            title: u.title,
            desc: u.desc,
            href: `/solutions/${ind.slug}`,
          });
          if (usecases.length >= 3) break;
        }
        if (usecases.length >= 3) break;
      }
    }
    industriesOut.push({
      slug: ind.slug,
      name: ind.name,
      reason: String(row.reason || ind.tag).slice(0, 280),
      href: `/solutions/${ind.slug}`,
      usecases,
    });
    if (industriesOut.length >= MAX_INDUSTRIES) break;
  }

  const capsOut: SolutionMatchResult["capabilities"] = [];
  for (const row of raw.capabilities ?? []) {
    if (!row?.id || !VALID_CAPABILITY_IDS.has(row.id)) continue;
    const cap = SOLUTION_CAPABILITIES.find((c) => c.id === row.id);
    if (!cap) continue;
    capsOut.push({
      id: cap.id,
      title: cap.title,
      focus: cap.focus,
      reason: String(row.reason || cap.description).slice(0, 280),
      href: `/solutions#${cap.id}`,
    });
    if (capsOut.length >= MAX_CAPS) break;
  }

  const confidence = Math.max(
    0,
    Math.min(1, Number(raw.confidence ?? 0.7) || 0.7)
  );
  const summary = String(
    raw.summary ||
      "Here’s how Speaksy maps to your problem — capabilities, Industry Intelligence, and concrete use cases."
  ).slice(0, 500);

  // Build flow graph: problem → capabilities → industries → usecases
  const nodes: MatchFlowNode[] = [
    {
      id: "problem",
      kind: "problem",
      title: "Your problem",
      subtitle: problem.slice(0, 120),
    },
  ];
  const edges: MatchFlowEdge[] = [];

  for (const c of capsOut) {
    nodes.push({
      id: `cap-${c.id}`,
      kind: "capability",
      title: c.title,
      subtitle: c.focus,
      href: c.href,
    });
    edges.push({ from: "problem", to: `cap-${c.id}`, label: "enables" });
  }

  for (const ind of industriesOut) {
    nodes.push({
      id: `ind-${ind.slug}`,
      kind: "industry",
      title: ind.name,
      subtitle: ind.reason.slice(0, 80),
      href: ind.href,
    });
    // connect from problem and top caps
    edges.push({ from: "problem", to: `ind-${ind.slug}`, label: "fits" });
    if (capsOut[0]) {
      edges.push({
        from: `cap-${capsOut[0].id}`,
        to: `ind-${ind.slug}`,
        label: "applies in",
      });
    }
    ind.usecases.forEach((u, ui) => {
      const uid = `uc-${ind.slug}-${ui}`;
      nodes.push({
        id: uid,
        kind: "usecase",
        title: u.title,
        subtitle: u.desc.slice(0, 90),
        href: u.href,
      });
      edges.push({
        from: `ind-${ind.slug}`,
        to: uid,
        label: "use case",
      });
    });
  }

  const primaryHref =
    industriesOut[0]?.href || capsOut[0]?.href || "/solutions";

  return {
    summary,
    confidence,
    industries: industriesOut,
    capabilities: capsOut,
    flow: { nodes, edges },
    cta: {
      label: industriesOut[0]
        ? `Open ${industriesOut[0].name} Industry Intelligence`
        : "Browse Industry Intelligence",
      href: primaryHref,
    },
  };
}
