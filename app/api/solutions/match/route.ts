import { NextResponse } from "next/server";
import { buildCatalogForModel } from "@/lib/solution-match/catalog";
import {
  buildSystemPrompt,
  deepseekChat,
} from "@/lib/solution-match/deepseek";
import {
  clientKey,
  extractJsonObject,
  guardUserInput,
  rateLimit,
} from "@/lib/solution-match/guardrails";
import {
  sanitizeAndEnrich,
  type SolutionMatchResult,
} from "@/lib/solution-match/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIMEOUT_MS = 28_000;

export async function POST(req: Request) {
  // Same-origin only (browser navigation / fetch from this app)
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    try {
      const o = new URL(origin);
      if (o.host !== host) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  const limit = Number(process.env.SOLUTIONS_MATCH_RATE_LIMIT || 20);
  const windowMs = Number(process.env.SOLUTIONS_MATCH_WINDOW_MS || 60_000);
  const rl = rateLimit(clientKey(req), limit, windowMs);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many requests. Try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil((rl.resetAt - Date.now()) / 1000)
          ),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const problemRaw =
    typeof body === "object" && body && "problem" in body
      ? (body as { problem: unknown }).problem
      : undefined;

  const guarded = guardUserInput(problemRaw);
  if (!guarded.ok) {
    return NextResponse.json(
      { error: guarded.code, message: guarded.message },
      { status: 400 }
    );
  }

  const catalog = buildCatalogForModel();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const content = await deepseekChat({
      messages: [
        { role: "system", content: buildSystemPrompt(catalog) },
        {
          role: "user",
          content: `User problem:\n"""${guarded.text}"""\n\nReturn JSON only.`,
        },
      ],
      temperature: 0.15,
      maxTokens: 1100,
      signal: controller.signal,
    });

    let parsed: unknown;
    try {
      parsed = extractJsonObject(content);
    } catch {
      console.error("[solutions/match] bad_json");
      return NextResponse.json(
        {
          error: "model_parse",
          message: "Could not parse a solution map. Please try rephrasing.",
        },
        { status: 502 }
      );
    }

    const result: SolutionMatchResult = sanitizeAndEnrich(
      parsed as Parameters<typeof sanitizeAndEnrich>[0],
      guarded.text
    );

    // Empty map → soft fallback without inventing IDs
    if (
      !result.refused &&
      result.industries.length === 0 &&
      result.capabilities.length === 0
    ) {
      result.summary =
        "We couldn’t confidently map that yet. Try naming the industry or the call type (e.g. EMI reminders, COD, appointments).";
      result.cta = { label: "Browse all solutions", href: "/solutions" };
    }

    return NextResponse.json(
      { ok: true, result },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Remaining": String(rl.remaining),
        },
      }
    );
  } catch (e) {
    const name = e instanceof Error ? e.name : "";
    const msg = e instanceof Error ? e.message : "unknown";
    if (name === "AbortError") {
      return NextResponse.json(
        { error: "timeout", message: "The matcher took too long. Try again." },
        { status: 504 }
      );
    }
    if (msg === "DEEPSEEK_API_KEY_missing") {
      return NextResponse.json(
        { error: "config", message: "Matcher is not configured." },
        { status: 503 }
      );
    }
    console.error("[solutions/match]", msg);
    return NextResponse.json(
      {
        error: "upstream",
        message: "Something went wrong matching your problem. Try again.",
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timer);
  }
}
