/**
 * Speaksy solution capabilities → Iso Feature objects.
 * Single source for /solutions grid and AI match-flow rendering.
 */
import {
  SOLUTION_CAPABILITIES,
  SOLUTION_CATEGORIES,
  type SolutionCapability,
  type SolutionCategoryId,
} from "@/lib/solutions";
import type { Feature } from "./data";
import { ISO_ICON_MAP, type IsoIconKey } from "./icons";

/** Map each capability id → isometric object metaphor */
export const CAPABILITY_ISO_ICON: Record<string, IsoIconKey> = {
  "gender-detection": "runtime",
  "age-detection": "enclaves",
  "speaker-id": "vault",
  "customer-recognition": "atlas",
  sentiment: "mesh",
  emergency: "gateway",
  "low-latency": "relay",
  multilingual: "atlas",
  "smart-routing": "mesh",
  whatsapp: "pipeline",
  crm: "pipeline",
  api: "gateway",
  workflows: "pipeline",
  rbac: "vault",
  analytics: "atlas",
  history: "relay",
  "live-monitor": "runtime",
};

export function capabilityToFeature(
  cap: SolutionCapability,
  opts?: { description?: string; href?: string }
): Feature {
  const iconKey = CAPABILITY_ISO_ICON[cap.id] ?? "relay";
  const Icon = ISO_ICON_MAP[iconKey];
  return {
    id: cap.id,
    title: cap.title,
    description: opts?.description ?? cap.description,
    focus: cap.focus,
    badges: cap.badges,
    href: opts?.href ?? `/solutions#${cap.id}`,
    Icon,
    iconKey,
  };
}

export function allSolutionFeatures(): Feature[] {
  return SOLUTION_CAPABILITIES.map((c) => capabilityToFeature(c));
}

export function solutionFeaturesByCategory(): {
  categoryId: SolutionCategoryId;
  name: string;
  tagline: string;
  features: Feature[];
}[] {
  return SOLUTION_CATEGORIES.map((cat) => ({
    categoryId: cat.id,
    name: cat.name,
    tagline: cat.tagline,
    features: SOLUTION_CAPABILITIES.filter((c) => c.category === cat.id).map(
      (c) => capabilityToFeature(c)
    ),
  })).filter((g) => g.features.length > 0);
}

/** Build iso features from AI match result capability rows */
export function matchCapsToFeatures(
  caps: {
    id: string;
    title: string;
    focus: string;
    reason: string;
    href: string;
  }[]
): Feature[] {
  return caps.map((c) => {
    const full = SOLUTION_CAPABILITIES.find((x) => x.id === c.id);
    if (full) {
      return capabilityToFeature(full, {
        description: c.reason || full.description,
        href: c.href,
      });
    }
    // Fallback if catalog miss (shouldn't happen after sanitize)
    return {
      id: c.id,
      title: c.title,
      description: c.reason,
      focus: c.focus,
      href: c.href,
      Icon: ISO_ICON_MAP.relay,
      iconKey: "relay",
    };
  });
}
