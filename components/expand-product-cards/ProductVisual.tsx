"use client";

import type { ProductCardData } from "./data";

type Props = {
  card: ProductCardData;
  /** Force active stroke (collapsed hover product always “on”) */
  active?: boolean;
  className?: string;
};

/**
 * Product slot — PNG cutout (lab) or Speaksy isometric object.
 */
export function ProductVisual({ card, active = true, className = "" }: Props) {
  if (card.Icon) {
    const Icon = card.Icon;
    return (
      <div
        className={`flex aspect-square w-full items-center justify-center p-[12%] ${className}`}
      >
        <Icon
          active={active}
          className="h-full w-full"
          hotColor={card.iconHot}
          idleColor={card.iconIdle}
        />
      </div>
    );
  }

  if (card.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={card.image}
        alt=""
        draggable={false}
        className={`h-auto w-full select-none object-contain ${className}`}
      />
    );
  }

  return null;
}
