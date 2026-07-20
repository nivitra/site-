"use client";

/** Four tiny diamonds locked to popover edges + crosshair axes */
export function EdgeMarkers() {
  const markers = [
    "-top-[2.5px] left-1/2 -translate-x-1/2",
    "-bottom-[2.5px] left-1/2 -translate-x-1/2",
    "-left-[2.5px] top-1/2 -translate-y-1/2",
    "-right-[2.5px] top-1/2 -translate-y-1/2",
  ] as const;

  return (
    <>
      {markers.map((pos) => (
        <div
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute z-40 h-1 w-1 rotate-45 bg-neutral-400 ${pos}`}
        />
      ))}
    </>
  );
}
