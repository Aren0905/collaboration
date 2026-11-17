import { type ReactNode, type Ref } from "react";
import { cn } from "@/lib/cn";

type ScenePinProps = {
  children: ReactNode;
  className?: string;
  /** Desktop vertical alignment for the foreground stack. */
  align?: "end" | "center";
  /** Allow content taller than the viewport (e.g. revenue + invite). */
  fluid?: boolean;
  ref?: Ref<HTMLDivElement>;
};

/**
 * Full-bleed cinematic frame — same on mobile and desktop.
 * touch-action: pan-y so pinned frames still scroll with the finger.
 */
export function ScenePin({
  children,
  className,
  align = "end",
  fluid = false,
  ref,
}: ScenePinProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full flex-col overflow-hidden [touch-action:pan-y]",
        fluid ? "min-h-[100dvh] min-h-[100svh]" : "h-[100dvh] min-h-[100svh]",
        align === "center"
          ? "justify-center md:items-center"
          : "justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
}

type SceneStageProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Upper event stage — never captures touch scroll on mobile.
 */
export function SceneStage({ children, className }: SceneStageProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-3 z-[4] [touch-action:pan-y]",
        "top-[4.5rem] max-h-[min(32dvh,240px)]",
        "flex items-start justify-center",
        "md:inset-auto md:top-[12%] md:right-[6%] md:bottom-auto md:left-auto md:max-h-none",
        "md:w-[min(440px,46vw)] md:justify-end",
        className,
      )}
    >
      <div className="h-full w-full max-h-[min(32dvh,240px)] overflow-hidden md:pointer-events-auto md:h-full md:max-h-none">
        {children}
      </div>
    </div>
  );
}

type ScenePanelProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Bottom caption glass — short gradient so most of the plate stays open.
 */
export function ScenePanel({ children, className }: ScenePanelProps) {
  return (
    <div
      className={cn(
        "relative z-[5] mt-auto w-full [touch-action:pan-y]",
        "bg-gradient-to-t from-black/92 via-black/45 to-transparent",
        "px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-8",
        "md:bg-transparent md:px-10 md:pb-14 md:pt-0 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
