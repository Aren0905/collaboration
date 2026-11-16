import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EnvPanelProps = {
  tone: "tungsten" | "daylight" | "slate" | "amber";
  label: string;
  className?: string;
  children?: ReactNode;
  "data-cinematic"?: string;
};

/** Photorealistic-feeling environment plate (CSS documentary set, swap for photos later). */
export function EnvPanel({
  tone,
  label,
  className,
  children,
  "data-cinematic": dataCinematic,
}: EnvPanelProps) {
  return (
    <div
      data-cinematic={dataCinematic}
      className={cn(
        "relative overflow-hidden border border-white/10 will-change-transform",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          tone === "tungsten" &&
            "bg-[radial-gradient(ellipse_at_28%_35%,rgba(201,162,126,0.32),transparent_52%),linear-gradient(155deg,#1c1510,#0b0c10_60%,#141820)]",
          tone === "daylight" &&
            "bg-[radial-gradient(ellipse_at_72%_22%,rgba(123,163,184,0.3),transparent_50%),linear-gradient(205deg,#1b242c,#0d1217_58%,#172028)]",
          tone === "slate" &&
            "bg-[radial-gradient(ellipse_at_40%_30%,rgba(125,204,163,0.12),transparent_50%),linear-gradient(180deg,#141a1f,#0c1014)]",
          tone === "amber" &&
            "bg-[radial-gradient(ellipse_at_50%_20%,rgba(232,170,90,0.22),transparent_55%),linear-gradient(180deg,#24180f,#100c09)]",
        )}
        aria-hidden
      />
      {/* Desk / screen silhouettes */}
      <div
        className="absolute inset-x-[10%] bottom-[14%] h-[42%] rounded-[2px] bg-black/35"
        aria-hidden
      />
      <div
        className={cn(
          "absolute left-[14%] top-[22%] h-[28%] w-[48%] rounded-[2px]",
          tone === "daylight" || tone === "amber"
            ? "bg-white/10 shadow-[0_0_50px_rgba(123,163,184,0.12)]"
            : "bg-white/[0.07] shadow-[0_0_40px_rgba(201,162,126,0.12)]",
        )}
        aria-hidden
      />
      {children}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-8">
        <p className="font-mono text-[9px] tracking-[0.22em] text-white/50 uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
