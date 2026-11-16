"use client";

import { useExperience } from "@/components/experience/ExperienceContext";
import { SIGNAL_FORMS, type SceneId } from "@/lib/content";
import { cn } from "@/lib/cn";

const ORDER: SceneId[] = [
  "threshold",
  "partner",
  "markets",
  "interview",
  "delivery",
  "split",
];

/**
 * Persistent Signal motif — form label changes with the active scene.
 * Carries story state, not decorative particles.
 */
export function SignalRail() {
  const { activeSceneId, reducedMotion, scrollToScene } = useExperience();
  if (reducedMotion) return null;

  const activeIndex = Math.max(0, ORDER.indexOf(activeSceneId));
  const form = SIGNAL_FORMS[activeSceneId]?.form ?? "Signal";

  return (
    <aside
      aria-label="Story signal"
      className="pointer-events-none fixed top-1/2 right-3 z-[36] hidden -translate-y-1/2 md:block lg:right-5"
    >
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        <p className="font-mono text-[9px] tracking-[0.28em] text-[var(--color-signal)] uppercase">
          Signal · {form}
        </p>
        <div className="relative flex flex-col items-center gap-2">
          <div
            className="absolute top-1 bottom-1 w-px bg-white/15"
            aria-hidden
          />
          <div
            className="absolute top-1 w-px bg-[var(--color-signal)] transition-[height] duration-500"
            style={{
              height: `calc(${(activeIndex / Math.max(1, ORDER.length - 1)) * 100}% - 4px)`,
            }}
            aria-hidden
          />
          {ORDER.map((id, index) => {
            const active = id === activeSceneId;
            const passed = index <= activeIndex;
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollToScene(id)}
                title={SIGNAL_FORMS[id].form}
                className={cn(
                  "relative z-[1] h-2.5 w-2.5 border transition-colors",
                  active
                    ? "border-[var(--color-signal)] bg-[var(--color-signal)]"
                    : passed
                      ? "border-[var(--color-signal)]/70 bg-transparent"
                      : "border-white/25 bg-transparent",
                )}
                aria-label={`${SIGNAL_FORMS[id].label} ${SIGNAL_FORMS[id].form}`}
                aria-current={active ? "true" : undefined}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
}
