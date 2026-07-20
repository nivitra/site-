/**
 * Map industry use cases → Iso Feature objects.
 * Each use case gets a guaranteed-unique isometric object via sequential index.
 */
import type { ComponentType } from "react";
import type { UseCaseGroup } from "@/lib/industries";
import type { Feature } from "./data";
import type { IconProps } from "./icons";
import { IsoObject } from "./iso-object";

function makeIndexedIcon(index: number, seed: string): ComponentType<IconProps> {
  function IndexedIcon(props: IconProps) {
    return <IsoObject index={index} seed={seed} {...props} />;
  }
  IndexedIcon.displayName = `IsoObject_${index}`;
  return IndexedIcon;
}

export function useCaseToFeature(
  item: { title: string; desc: string },
  groupName: string,
  industrySlug: string,
  /** Unique object index across this industry page */
  objectIndex: number
): Feature {
  const seed = `${industrySlug}::${groupName}::${item.title}::${objectIndex}`;
  const Icon = makeIndexedIcon(objectIndex, seed);
  const id = `${industrySlug}-${objectIndex}-${item.title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);

  return {
    id,
    title: item.title,
    description: item.desc,
    focus: groupName,
    Icon,
    href: "/contact",
  };
}

export function groupsToIsoFeatures(
  groups: UseCaseGroup[],
  industrySlug: string
): {
  name: string;
  features: Feature[];
}[] {
  let objectIndex = 0;
  return groups.map((g) => ({
    name: g.name,
    features: g.items.map((item) => {
      const f = useCaseToFeature(item, g.name, industrySlug, objectIndex);
      objectIndex += 1;
      return f;
    }),
  }));
}
