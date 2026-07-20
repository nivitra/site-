/**
 * Input / output guardrails for solutions matching.
 * Production: keep this server-only.
 */

const BLOCKED_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /system\s*prompt/i,
  /you\s+are\s+now\s+/i,
  /jailbreak/i,
  /do\s+anything\s+now/i,
  /reveal\s+(your\s+)?(api|key|secret|prompt)/i,
  /<\s*script/i,
  /javascript:/i,
];

const OFF_TOPIC =
  /\b(write\s+code|hack|exploit|malware|weapon|porn|nsfw|crypto\s+wallet|seed\s+phrase)\b/i;

export const INPUT_MIN = 8;
export const INPUT_MAX = 600;

export type GuardResult =
  | { ok: true; text: string }
  | { ok: false; code: string; message: string };

/** Normalize + validate user problem text */
export function guardUserInput(raw: unknown): GuardResult {
  if (typeof raw !== "string") {
    return { ok: false, code: "invalid_type", message: "Expected a text problem." };
  }
  // strip control chars except newlines/tabs
  let text = raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  text = text.trim().replace(/\s+/g, " ");
  if (text.length < INPUT_MIN) {
    return {
      ok: false,
      code: "too_short",
      message: "Tell us a bit more about the calling problem (a short sentence is fine).",
    };
  }
  if (text.length > INPUT_MAX) {
    return {
      ok: false,
      code: "too_long",
      message: `Keep it under ${INPUT_MAX} characters.`,
    };
  }
  for (const re of BLOCKED_PATTERNS) {
    if (re.test(text)) {
      return {
        ok: false,
        code: "blocked",
        message: "That request can’t be processed. Describe a business calling problem instead.",
      };
    }
  }
  if (OFF_TOPIC.test(text)) {
    return {
      ok: false,
      code: "off_topic",
      message:
        "I only map business phone / voice-AI problems to Speaksy industries and use cases.",
    };
  }
  return { ok: true, text };
}

/** Simple in-memory rate limit (per instance). Swap for Redis in multi-instance prod. */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit = 20,
  windowMs = 60_000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now >= b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    buckets.set(key, b);
  }
  b.count += 1;
  // opportunistic cleanup
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (now >= v.resetAt) buckets.delete(k);
    }
  }
  return {
    allowed: b.count <= limit,
    remaining: Math.max(0, limit - b.count),
    resetAt: b.resetAt,
  };
}

export function clientKey(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  const ip = xf?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anon";
  return `sol-match:${ip}`;
}

/** Extract first JSON object from model text */
export function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();
  // fenced
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fence ? fence[1].trim() : trimmed;
  try {
    return JSON.parse(body);
  } catch {
    const start = body.indexOf("{");
    const end = body.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(body.slice(start, end + 1));
    }
    throw new Error("no_json");
  }
}
