"use client";

import { industries } from "@/lib/industries";
import { INDUSTRY_EXPAND_PHOTOS } from "@/components/gradient-bars/data";
import {
  RevealHoverCard,
  type RevealHoverCardData,
} from "./RevealHoverCard";

function industryCards(): RevealHoverCardData[] {
  return industries.map((ind) => ({
    id: ind.slug,
    title: ind.name,
    description: ind.tag,
    href: `/solutions/${ind.slug}`,
    badge: ind.icon,
    image:
      INDUSTRY_EXPAND_PHOTOS[ind.slug] ??
      "/industries/expand/ecommerce.jpg",
    imageAlt: `${ind.name} playbook`,
    cta: "Open Industry Intelligence",
  }));
}

/**
 * Industry playbooks — landscape reveal cards, bar expand photos.
 */
export default function IndustryPlaybookReveal() {
  const cards = industryCards();

  return (
    <section className="border-t border-line bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-brand-400 uppercase">
            Industry Intelligence
          </p>
          <h2 className="mt-3 text-[1.65rem] font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            Know the play before you dial
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Speaksy Industry Intelligence — production use cases by vertical.
            Same platform. Different outcomes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <RevealHoverCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
