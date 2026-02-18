"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Msg = { role: "user" | "assistant"; content: string };

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

import { useBridgeSlug } from "@/components/BridgeContext";

export default function AssistantWidget() {
  const pathname = usePathname();
  const bridgeSlug = useBridgeSlug();
  const [open, setOpen] = useState(true);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey — I’m BridgeAtlas. Tell me what you want: browse, compare, or get a simple explanation.",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, open]);

  const quickActions = useMemo(
    () => [
      { label: "Browse", text: "Take me to the bridges gallery." },
      { label: "Recommend", text: "Recommend 5 iconic bridges to start with." },
      {
        label: "Explain this",
        text: "Explain this bridge simply, then like an engineer.",
        hidden: !bridgeSlug,
      },
    ],
    [bridgeSlug]
  );

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const next = [...messages, { role: "user", content: trimmed } as Msg];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next,
          pathname,
          bridgeSlug,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "" } as Msg,
      ]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I can’t reach the AI right now. If you’re running locally, double-check OPENAI_API_KEY in .env.local.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={classNames(
          "w-[330px] sm:w-[380px]",
          "rounded-[28px] border border-black/10 shadow-paper",
          "bg-paper/95 backdrop-blur",
          open ? "" : "pointer-events-none opacity-0 translate-y-2",
          "transition-all duration-300"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-accent shadow-sm grid place-items-center text-white font-semibold">
              BG
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-ink">BridgeAtlas</div>
              <div className="text-xs text-ink/60">Always here. Keep it simple.</div>
            </div>
          </div>
          <button
            className="rounded-full px-3 py-1 text-xs font-semibold text-ink/70 hover:text-ink hover:bg-black/5 transition"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {quickActions
              .filter((a: any) => !a.hidden)
              .map((a) => (
                <button
                  key={a.label}
                  className="rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-semibold hover:bg-accent/15 transition"
                  onClick={() => send(a.text)}
                  disabled={busy}
                >
                  {a.label}
                </button>
              ))}
          </div>
        </div>

        <div
          ref={scrollRef}
          className="px-4 pb-3 max-h-[280px] overflow-auto"
        >
          <div className="space-y-3">
            {messages.slice(-10).map((m, i) => (
              <div
                key={i}
                className={classNames(
                  "max-w-[92%] rounded-[18px] px-3 py-2 text-sm leading-relaxed",
                  m.role === "assistant"
                    ? "bg-white/70 border border-black/5 text-ink"
                    : "bg-accent text-white ml-auto"
                )}
              >
                {m.content}
              </div>
            ))}
            {busy ? (
              <div className="text-xs text-ink/60">Thinking…</div>
            ) : null}
          </div>
        </div>

        <form
          className="px-4 pb-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about bridges…"
            className="flex-1 rounded-full bg-white/80 border border-black/10 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
            disabled={busy}
          />
          <button
            type="submit"
            className="rounded-full px-4 py-2 text-sm font-semibold bg-accent text-white hover:bg-accentDeep transition disabled:opacity-60"
            disabled={busy}
          >
            Send
          </button>
        </form>
      </div>

      {!open ? (
        <button
          className="rounded-full px-4 py-3 bg-accent text-white shadow-paper hover:bg-accentDeep transition"
          onClick={() => setOpen(true)}
        >
          BridgeAtlas
        </button>
      ) : null}
    </div>
  );
}
