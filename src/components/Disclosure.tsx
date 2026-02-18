"use client";

import { useState } from "react";

export default function Disclosure(props: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!props.defaultOpen);

  return (
    <div className="rounded-[28px] bg-paper/70 border border-black/10 p-5">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="text-sm font-semibold text-ink">{props.title}</div>
        <div className="rounded-full bg-white/70 border border-black/10 px-3 py-1 text-xs font-semibold text-ink/70">
          {open ? "Hide" : "Show"}
        </div>
      </button>
      {open ? <div className="mt-4">{props.children}</div> : null}
    </div>
  );
}
