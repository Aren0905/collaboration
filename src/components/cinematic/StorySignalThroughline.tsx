"use client";

import { useExperience } from "@/components/experience/ExperienceContext";
import { SCENES, type SceneId } from "@/lib/content";
import { cn } from "@/lib/cn";

const WAYPOINTS: Array<{ id: SceneId; label: string }> = [
  { id: "threshold", label: "Signal" },
  { id: "strengths", label: "Roles" },
  { id: "markets", label: "Reach" },
  { id: "prepare", label: "Prep" },
  { id: "interview", label: "Room" },
  { id: "delivery", label: "Build" },
  { id: "split", label: "Share" },
  { id: "chemistry", label: "Fit" },
];

/**
 * Continuous narrative signal — one luminous path across the entire story.
 * Position driven by CSS var --story-progress (set by ScrollOrchestrator) to avoid
 * React re-renders on every scroll tick. Waypoints highlight via active scene.
 */
export function StorySignalThroughline() {
  const { activeSceneId, reducedMotion } = useExperience();

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-0 z-[35] hidden w-14 md:block lg:w-16"
      aria-hidden
    >
      <div className="relative ml-4 h-full py-[12vh] lg:ml-5">
        {/* Rail */}
        <div className="absolute top-[12vh] bottom-[12vh] left-[7px] w-px bg-white/10" />
        <div
          className="absolute top-[12vh] left-[7px] w-px origin-top bg-gradient-to-b from-[var(--color-tungsten)] via-[var(--color-paper)] to-[var(--color-daylight)]"
          style={{
            height: "calc((100% - 24vh) * var(--story-progress, 0))",
            opacity: 0.85,
            transform: "translateZ(0)",
          }}
        />

        {/* Traveling bead */}
        <div
          className="story-signal-bead absolute left-[3px] size-[9px] rounded-full bg-[var(--color-paper)] shadow-[0_0_18px_rgba(201,162,126,0.55)]"
          style={{
            top: "calc(12vh + (100% - 24vh - 9px) * var(--story-progress, 0))",
            transform: "translateZ(0)",
          }}
        />

        {/* Waypoints */}
        <ul className="relative flex h-full flex-col justify-between">
          {WAYPOINTS.map((point, index) => {
            const active = activeSceneId === point.id;
            const past =
              SCENES.findIndex((s) => s.id === activeSceneId) >=
              SCENES.findIndex((s) => s.id === point.id);
            return (
              <li key={point.id} className="relative flex items-center gap-2">
                <span
                  className={cn(
                    "size-2 rounded-full border transition-colors duration-300",
                    active
                      ? "border-[var(--color-tungsten)] bg-[var(--color-tungsten)]"
                      : past
                        ? "border-white/40 bg-white/25"
                        : "border-white/20 bg-transparent",
                  )}
                />
                <span
                  className={cn(
                    "hidden font-mono text-[9px] tracking-[0.18em] uppercase transition-opacity duration-300 xl:inline",
                    active ? "text-[var(--color-tungsten)] opacity-100" : "text-white/30 opacity-70",
                  )}
                >
                  {String(index + 1).padStart(2, "0")} {point.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
