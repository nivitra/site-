"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { ARTICLES } from "./data";

const spring = { type: "spring" as const, stiffness: 380, damping: 30, mass: 0.8 };

/**
 * Bottom-right stacked article cards.
 * Collapsed: deck with grey layers behind top card.
 * Hover: expands into vertical list; active card turns orange-red.
 */
export default function StackArticleCards() {
  const [open, setOpen] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Bottom card is the "front" of the collapsed stack (matches recording)
  const front = ARTICLES[ARTICLES.length - 1];
  const stackBehind = ARTICLES.slice(0, -1);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Top chrome */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center justify-between border-b border-white/[0.06] bg-[#141414]/95 px-4 backdrop-blur-md sm:px-5">
        <Link
          href="/lab"
          className="flex h-8 w-8 items-center justify-center rounded-md text-white/85 transition-colors hover:bg-white/10"
          aria-label="Back to Lab"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4 6c0-1.1.9-2 2-2h3l2 3H6v11h12V10h-3l2-3h3c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6z" />
          </svg>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://www.framer.com/marketplace/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            Original
          </a>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText("StackArticleCards");
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              } catch {
                /* ignore */
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy component"}</span>
          </button>
          <Link
            href="/lab"
            className="rounded-full bg-[#2f6bff] px-3.5 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Remix
          </Link>
        </div>
      </header>

      {/* Dock bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-30 w-[min(100vw-2rem,340px)] sm:bottom-8 sm:right-8"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          setOpen(false);
          setHoverId(null);
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.ul
              key="expanded"
              className="flex flex-col gap-2"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.045, delayChildren: 0.02 } },
              }}
            >
              {ARTICLES.map((a) => {
                const hot = hoverId === a.id;
                return (
                  <motion.li
                    key={a.id}
                    variants={{
                      hidden: { opacity: 0, y: 28, scale: 0.96 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: spring,
                      },
                    }}
                    layout
                  >
                    <a
                      href={a.href}
                      onMouseEnter={() => setHoverId(a.id)}
                      onMouseLeave={() => setHoverId(null)}
                      className={`flex items-center gap-3 rounded-2xl px-2.5 py-2.5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)] ring-1 transition-colors ${
                        hot
                          ? "bg-white ring-orange-200"
                          : "bg-white ring-black/5"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.thumb}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                        draggable={false}
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-[11px] font-bold leading-snug tracking-tight uppercase ${
                            hot ? "text-[#ff3b00]" : "text-neutral-900"
                          }`}
                        >
                          {a.title}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span
                            className={`text-[9px] font-semibold tracking-[0.14em] uppercase ${
                              hot ? "text-[#ff3b00]/80" : "text-neutral-400"
                            }`}
                          >
                            Article
                          </span>
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              hot ? "bg-[#ff3b00] text-white" : "text-neutral-400"
                            }`}
                          >
                            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                          </span>
                        </div>
                      </div>
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          ) : (
            <motion.div
              key="collapsed"
              className="relative h-[92px] w-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={spring}
            >
              {/* Grey stacked layers behind */}
              {[2, 1].map((layer) => (
                <div
                  key={layer}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[78px] rounded-2xl bg-neutral-300"
                  style={{
                    transform: `translateY(${-layer * 6}px) scaleX(${1 - layer * 0.03})`,
                    opacity: 0.85 - layer * 0.12,
                  }}
                />
              ))}
              {/* Front card */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-2xl bg-white px-2.5 py-2.5 text-left shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={front.thumb}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  draggable={false}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold leading-snug tracking-tight text-neutral-900 uppercase">
                    {front.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                      Article
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400" strokeWidth={2.25} />
                  </div>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
