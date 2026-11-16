import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type WorkspacePlateProps = {
  tone: "tungsten" | "daylight";
  label: string;
  caption: string;
  className?: string;
  children?: ReactNode;
};

export const WorkspacePlate = forwardRef<HTMLElement, WorkspacePlateProps>(
  function WorkspacePlate(
    { tone, label, caption, className, children },
    ref,
  ) {
    return (
      <figure
        ref={ref}
        data-opening={`plate-${tone}`}
        className={cn(
          "relative overflow-hidden border border-white/10 bg-[var(--color-ink-elevated)] shadow-[0_30px_80px_rgba(0,0,0,0.55)]",
          "opacity-0 will-change-transform",
          className,
        )}
      >
        <div
          className={cn(
            "absolute inset-0",
            tone === "tungsten" &&
              "bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,162,126,0.28),transparent_55%),linear-gradient(160deg,#1a1410_0%,#0c0d10_55%,#151820_100%)]",
            tone === "daylight" &&
              "bg-[radial-gradient(ellipse_at_70%_25%,rgba(123,163,184,0.26),transparent_50%),linear-gradient(200deg,#1a2228_0%,#0e1216_60%,#182028_100%)]",
          )}
          aria-hidden
        />
        {/* Desk silhouette suggestion */}
        <div
          className={cn(
            "absolute inset-x-[12%] bottom-[18%] h-[38%] rounded-[2px] opacity-40",
            tone === "tungsten"
              ? "bg-[linear-gradient(to_top,rgba(0,0,0,0.65),rgba(201,162,126,0.15))]"
              : "bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(123,163,184,0.12))]",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "absolute left-[18%] top-[28%] h-[22%] w-[42%] rounded-[1px] opacity-50",
            tone === "tungsten"
              ? "bg-[rgba(243,239,230,0.08)] shadow-[0_0_40px_rgba(201,162,126,0.15)]"
              : "bg-[rgba(243,239,230,0.1)] shadow-[0_0_36px_rgba(123,163,184,0.12)]",
          )}
          aria-hidden
        />
        {children}
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10">
          <p className="font-mono text-[9px] tracking-[0.24em] text-white/45 uppercase md:text-[10px]">
            {label}
          </p>
          <p className="mt-1 font-display text-sm text-white/80 md:text-base">
            {caption}
          </p>
        </figcaption>
      </figure>
    );
  },
);
