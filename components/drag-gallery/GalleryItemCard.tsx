"use client";

import type { GalleryItem } from "./data";

type Props = {
  item: GalleryItem;
};

export function GalleryItemCard({ item }: Props) {
  return (
    <figure
      className="absolute select-none"
      style={{
        left: item.x,
        top: item.y,
        width: item.w,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.title}
        draggable={false}
        className="pointer-events-none w-full rounded-md object-cover shadow-[0_16px_48px_-14px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
      />
      <figcaption className="mt-2.5 max-w-[95%] text-[10px] leading-snug tracking-wide text-neutral-500">
        <span className="block text-[12px] font-semibold tracking-tight text-neutral-200">
          {item.title}
        </span>
        {item.meta.split("\n").map((line) => (
          <span key={line} className="mt-0.5 block text-neutral-500">
            {line}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
