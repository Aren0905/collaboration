import { forwardRef } from "react";

type ScrollCueProps = {
  label: string;
};

export const ScrollCue = forwardRef<HTMLDivElement, ScrollCueProps>(
  function ScrollCue({ label }, ref) {
    return (
      <div
        ref={ref}
        data-opening="scroll-cue"
        className="pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-20 flex flex-col items-center gap-2 opacity-0 md:bottom-10 md:gap-3"
        aria-hidden
      >
        <p className="font-mono text-[10px] tracking-[0.32em] text-white/55 uppercase md:text-[11px]">
          {label}
        </p>
        <span className="opening-scroll-line block h-10 w-px origin-top bg-gradient-to-b from-[var(--color-tungsten)] to-transparent" />
      </div>
    );
  },
);
