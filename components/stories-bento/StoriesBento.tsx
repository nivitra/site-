"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

/**
 * Exact bento customer-stories grid from the screenshot.
 * Only theme adapted: Speaksy dark surfaces + green accents + Speaksy naming in quotes.
 */

const card =
  "rounded-[1.25rem] border border-line bg-white shadow-[0_8px_30px_-18px_rgba(0,0,0,0.12)]";

function PlayBadge() {
  return (
    <span className="absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg ring-1 ring-black/5">
      <Play className="h-4 w-4 fill-current" strokeWidth={0} />
    </span>
  );
}

function QuoteMark() {
  return (
    <span
      className="select-none text-3xl font-serif leading-none text-brand-500/80"
      aria-hidden
    >
      ”
    </span>
  );
}

export default function StoriesBento() {
  return (
    <section
      className="w-full border-y border-line px-4 py-14 sm:px-6 sm:py-20"
      style={{
        background:
          "radial-gradient(ellipse 90% 50% at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 55%), #fafafa",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-2">
          Customer stories
        </p>
        <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Results operators talk about
        </h2>

        {/* ── TOP ROW: 4 cards ── */}
        <div className="mt-10 grid gap-3 sm:gap-4 lg:grid-cols-4">
          {/* 1 · WheelsEye style — video + metrics */}
          <article className={`${card} flex flex-col p-4 sm:p-5`}>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 via-emerald-400 to-sky-400 text-[10px] font-bold text-white">
                W
              </span>
              <span className="text-sm font-semibold text-foreground">
                WheelsEye
              </span>
            </div>
            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src="/lab/stories/truck.jpg"
                alt="Fleet on highway"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <PlayBadge />
            </div>
            <div className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-4">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  50%
                </p>
                <p className="mt-0.5 text-[12px] text-muted">Lower Cost</p>
              </div>
              <div className="border-l border-line pl-3">
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  87%
                </p>
                <p className="mt-0.5 text-[12px] text-muted">
                  Higher Rate Card Collection
                </p>
              </div>
            </div>
          </article>

          {/* 2 · Eureka Forbes style — pure quote */}
          <article className={`${card} relative flex flex-col p-5 sm:p-6`}>
            <div className="mb-5 flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-[0.12em] text-sky-400 uppercase">
                  Eureka
                </span>
                <span className="text-[11px] font-bold tracking-[0.12em] text-sky-300/90 uppercase">
                  Forbes
                </span>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
                aria-label="Open story"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
            <QuoteMark />
            <p className="mt-2 text-[15px] font-medium leading-snug tracking-tight text-foreground sm:text-base">
              Within two months, the Speaksy team achieved the desired
              conversion rates.
            </p>
            <div className="mt-auto pt-6">
              <p className="text-sm font-semibold text-foreground">
                Naveen Kumar
              </p>
              <p className="mt-0.5 text-[12px] leading-snug text-muted">
                VP – Ecomm., D2C &amp; Digital Transformation, Eureka Forbes
              </p>
            </div>
          </article>

          {/* 3 · Dual portrait video */}
          <article className={`${card} relative overflow-hidden p-0`}>
            <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:h-full sm:min-h-[260px]">
              <div className="absolute inset-0 grid grid-cols-2">
                <div className="relative">
                  <Image
                    src="/lab/stories/person1.jpg"
                    alt="Apurv"
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
                <div className="relative">
                  <Image
                    src="/lab/stories/person2.jpg"
                    alt="Customer leader"
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-brand-700/50 to-transparent" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <PlayBadge />
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-2 p-3">
                <div>
                  <p className="text-sm font-semibold text-white">Apurv</p>
                  <p className="text-[11px] leading-snug text-white/75">
                    CEO &amp; Co-Founder, Speaksy
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Amarinder</p>
                  <p className="text-[11px] leading-snug text-white/75">
                    Chief Product Officer, IndiaMART
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* 4 · IndiaMART quote */}
          <article className={`${card} flex flex-col p-5 sm:p-6`}>
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#c8102e] text-[11px] font-bold text-white">
                M
              </span>
              <span className="text-sm font-bold tracking-tight text-foreground">
                indiamart
              </span>
            </div>
            <QuoteMark />
            <p className="mt-2 text-[15px] font-medium leading-snug tracking-tight text-foreground sm:text-base">
              There&apos;s a difference between an AI that informs a decision and
              one that makes it. We&apos;re building the latter with Speaksy.
            </p>
            <div className="mt-auto pt-6">
              <p className="text-sm font-semibold text-foreground">
                Amarinder S Dhaliwal
              </p>
              <p className="mt-0.5 text-[12px] text-muted">CPO, IndiaMART</p>
            </div>
          </article>
        </div>

        {/* ── BOTTOM ROW: 3 cards (MoneyView wider) ── */}
        <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-12">
          {/* MoneyView — spans 5 */}
          <article
            className={`${card} flex flex-col overflow-hidden p-0 sm:flex-row lg:col-span-5`}
          >
            <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:w-[42%]">
              <Image
                src="/lab/stories/laptop.jpg"
                alt="Product on laptop"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 20vw"
              />
              <PlayBadge />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white">
                  M
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  moneyview
                </span>
              </div>
              <QuoteMark />
              <p className="mt-2 text-[14px] font-medium leading-snug text-foreground sm:text-[15px]">
                In the past two years, we have had tremendous growth, almost 10x
                in the number of loan disbursals we do.
              </p>
              <div className="mt-auto pt-5">
                <p className="text-sm font-semibold text-foreground">
                  Manoj Kumar Dronadula
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-muted">
                  Product, Growth, and Partnerships at MoneyView
                </p>
              </div>
            </div>
          </article>

          {/* Amity — spans 3.5 ≈ 4 */}
          <article className={`${card} flex flex-col p-5 sm:p-6 lg:col-span-3`}>
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-[10px] font-bold text-amber-400">
                AU
              </span>
              <span className="text-[12px] font-bold tracking-wide text-sky-300 uppercase">
                Amity University
              </span>
            </div>
            <QuoteMark />
            <p className="mt-2 text-[14px] font-medium leading-snug text-foreground sm:text-[15px]">
              We saw connectivity double from 30–40% within 2 weeks.
            </p>
            <div className="mt-auto pt-6">
              <p className="text-sm font-semibold text-foreground">
                Pabitra Chakraborty
              </p>
              <p className="mt-0.5 text-[12px] text-muted">
                Associate Director, Amity University
              </p>
            </div>
          </article>

          {/* Delhivery — spans 4 */}
          <article className={`${card} flex flex-col p-4 sm:p-5 lg:col-span-4`}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-extrabold tracking-tight text-foreground">
                DELHIVERY
              </span>
            </div>
            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src="/lab/stories/delivery.jpg"
                alt="Delivery handoff"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 30vw"
              />
            </div>
            <div className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-4">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  1.3x
                </p>
                <p className="mt-0.5 text-[12px] text-muted">Lower AHT</p>
              </div>
              <div className="border-l border-line pl-3">
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  1.2x
                </p>
                <p className="mt-0.5 text-[12px] text-muted">Higher Connectivity</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
