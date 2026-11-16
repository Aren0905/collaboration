import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SceneFrameProps = {
  eyebrow?: string;
  title: string;
  titleId: string;
  body?: string;
  children?: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
};

/**
 * Shared typographic shot frame for documentary scenes.
 */
export function SceneFrame({
  eyebrow,
  title,
  titleId,
  body,
  children,
  className,
  align = "start",
}: SceneFrameProps) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8",
        align === "center" && "items-center text-center",
        align === "end" && "items-end text-right",
        align === "start" && "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--scene-accent)] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={titleId}
        className="max-w-4xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-balance md:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
      {body ? (
        <p className="max-w-2xl text-base leading-relaxed text-[color:color-mix(in_oklab,var(--scene-fg)_78%,transparent)] md:text-lg">
          {body}
        </p>
      ) : null}
      {children}
    </div>
  );
}
