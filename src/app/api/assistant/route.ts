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
    throw new Error(
      "Missing OPENAI_API_KEY. Create .env.local from .env.example and restart the dev server."
    );
  }
  return new OpenAI({ apiKey });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const pathname = body.pathname ?? "/";
    const bridge = body.bridgeSlug ? getBridge(body.bridgeSlug) : undefined;

    const client = getClient();
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const system = buildSystemPrompt({ pathname, bridge });

    const input = [
      { role: "system" as const, content: system },
      ...(body.messages ?? []).map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const resp = await client.chat.completions.create({
      model,
      messages: input,
      temperature: 0.6,
    });

    const text = resp.choices?.[0]?.message?.content?.trim() || "";

    return NextResponse.json({ reply: text });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "assistant_error" },
      { status: 500 }
    );
  }
}
