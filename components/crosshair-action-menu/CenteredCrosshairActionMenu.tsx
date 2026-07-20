"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CrosshairAxes } from "./CrosshairAxes";
import { CenterTrigger } from "./CenterTrigger";
import { ActionMenuPopover } from "./ActionMenuPopover";

/**
 * Full-screen black canvas with crosshair axes and a centered
 * expanding "Add job" action popover.
 */
export default function CenteredCrosshairActionMenu() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <CrosshairAxes open={open} />

      <AnimatePresence mode="wait">
        {!open && <CenterTrigger key="trigger" onOpen={openMenu} />}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            {/* Click-outside scrim */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="absolute inset-0 z-20 cursor-default bg-transparent"
            />
            <ActionMenuPopover
              key="popover"
              onSelect={(id) => {
                setSelected(id);
              }}
            />
          </>
        )}
      </AnimatePresence>

      {selected && (
        <p className="pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full border border-neutral-800 bg-[#111] px-3 py-1 text-[11px] text-neutral-400">
          Selected: <span className="text-neutral-200">{selected}</span>
        </p>
      )}

      <a
        href="/lab"
        className="absolute bottom-5 left-5 z-40 text-xs text-neutral-600 underline-offset-2 hover:text-neutral-400 hover:underline"
      >
        ← Back to Lab
      </a>
    </div>
  );
}
