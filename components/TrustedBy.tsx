"use client";

import Reveal from "./ui/Reveal";

const brands = [
  { name: "LoanKart", sector: "Lending" },
  { name: "GlowKart", sector: "D2C" },
  { name: "VidyaPrime", sector: "EdTech" },
  { name: "MediBook", sector: "Clinic" },
  { name: "SwiftShip", sector: "Logistics" },
  { name: "PolicyMitra", sector: "Insurance" },
  { name: "UrbanNest", sector: "Property" },
  { name: "FreshDaily", sector: "Retail" },
];

export default function TrustedBy() {
  return (
    <section className="border-b border-line py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-8 text-center text-sm text-muted">
            Businesses across India already run their calls with Speaksy
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
          {brands.map((b) => (
            <div key={b.name} className="flex flex-col items-center gap-0.5 text-center">
              <span className="text-base font-semibold tracking-tight text-foreground/70">
                {b.name}
              </span>
              <span className="text-[11px] text-muted-2">{b.sector}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
