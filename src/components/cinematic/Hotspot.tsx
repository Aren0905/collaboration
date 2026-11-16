"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type HotspotProps = {
  label: string;
  detail: string;
  className?: string;
  tone?: "tungsten" | "daylight" | "signal";
};

/** Physical-object reveal for workspace responsibilities. */
export function Hotspot({
  label,
  detail,
  className,
  tone = "signal",
}: HotspotProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const accent =
    tone === "tungsten"
      ? "border-[var(--color-tungsten)] text-[var(--color-tungsten)]"
      : tone === "daylight"
        ? "border-[var(--color-daylight)] text-[var(--color-daylight)]"
        : "border-[var(--color-signal)] text-[var(--color-signal)]";

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={cn(
          "group flex items-center gap-2 border bg-black/50 px-2.5 py-1.5 backdrop-blur-sm",
          "font-mono text-[9px] tracking-[0.18em] uppercase",
          accent,
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 animate-pulse rounded-full bg-current",
            open && "animate-none",
          )}
          aria-hidden
        />
        {label}
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute top-full left-0 z-20 mt-2 w-56 border border-white/15 bg-black/85 p-3 text-left text-xs leading-relaxed text-white/75 shadow-xl backdrop-blur-md"
      >
        {detail}
      </div>
    </div>
  );
}
