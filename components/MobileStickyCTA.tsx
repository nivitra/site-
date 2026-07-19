"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/** Mobile-only sticky conversion bar — blueprint pattern, Speaksy green. */
export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/92 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/contact"
        className="brand-pill flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-semibold shadow-[0_4px_20px_-6px_rgba(22,163,74,0.4)]"
      >
        Book a Demo
      </Link>
    </div>
  );
}
