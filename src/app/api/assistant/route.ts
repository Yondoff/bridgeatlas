import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getBridge } from "@/lib/bridges";
import { buildSystemPrompt } from "@/lib/assistantPrompt";

export const runtime = "nodejs";

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

type Body = {
  messages: ClientMessage[];
  pathname?: string;
  bridgeSlug?: string;
};

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY.");
  }
  return new OpenAI({ apiKey });
}

// Best-effort, per-instance rate limit (works on warm lambdas; not a perfect global limit).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const ipBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const hit = ipBuckets.get(ip);
  if (!hit || now > hit.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (hit.count >= RATE_LIMIT_MAX) return { ok: false, retryAfterMs: hit.resetAt - now };
  hit.count += 1;
  return { ok: true };
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  try {
    // Optional kill switch for production.
    if (process.env.ASSISTANT_DISABLED === "1") {
      return jsonError("assistant_disabled", 403);
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return jsonError("invalid_content_type", 415);
    }

    // Best-effort same-origin check (not security on its own, but reduces random abuse).
    const origin = req.headers.get("origin") || "";
    const host = req.headers.get("host") || "";
    if (origin && host && !origin.includes(host)) {
      return jsonError("forbidden_origin", 403);
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rl = rateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "rate_limited" },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rl.retryAfterMs ?? 0) / 1000)),
          },
        }
      );
    }

    const body = (await req.json()) as Body;

    const pathname = typeof body.pathname === "string" ? body.pathname : "/";
    const bridgeSlug = typeof body.bridgeSlug === "string" ? body.bridgeSlug : undefined;
    const bridge = bridgeSlug ? getBridge(bridgeSlug) : undefined;

    const msgs = Array.isArray(body.messages) ? body.messages : [];
    if (msgs.length > 20) return jsonError("too_many_messages", 400);
    for (const m of msgs) {
      if (m.role !== "user" && m.role !== "assistant") return jsonError("invalid_role", 400);
      if (typeof m.content !== "string") return jsonError("invalid_message", 400);
      if (m.content.length > 4000) return jsonError("message_too_long", 400);
    }

    const client = getClient();
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const system = buildSystemPrompt({ pathname, bridge });

    const input = [
      { role: "system" as const, content: system },
      ...msgs.map((m) => ({ role: m.role, content: m.content })),
    ];

    const resp = await client.chat.completions.create({
      model,
      messages: input,
      temperature: 0.6,
    });

    const text = resp.choices?.[0]?.message?.content?.trim() || "";

    return NextResponse.json({ reply: text });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "assistant_error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
