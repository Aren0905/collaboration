"use client";

import { useExperience } from "@/components/experience/ExperienceContext";
import { SITE, type SceneId } from "@/lib/content";
import { cn } from "@/lib/cn";

const NAV_ITEMS: Array<{ id: SceneId; label: string; group?: SceneId[] }> = [
  {
    id: "partner",
    label: "Story",
    group: ["threshold", "partner", "markets", "interview", "delivery"],
  },
  { id: "split", label: "60/40" },
];

export function CinematicNav() {
  const { activeSceneId, scrollToScene } = useExperience();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 px-4 md:top-6 md:px-8">
      <div className="mx-auto flex max-w-6xl items-start justify-between gap-4">
        <button
          type="button"
          onClick={() => scrollToScene("threshold")}
          className="pointer-events-auto text-left"
          aria-label="Return to start"
        >
          <span className="font-display text-sm tracking-[0.18em] text-[var(--color-paper)] uppercase md:text-base">
            {SITE.title}
          </span>
        </button>

        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden items-center gap-6 sm:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active =
              activeSceneId === item.id ||
              Boolean(item.group?.includes(activeSceneId));
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToScene(item.id)}
                className={cn(
                  "font-mono text-[11px] tracking-[0.22em] uppercase transition-colors",
                  active
                    ? "text-[var(--color-signal)]"
                    : "text-white/55 hover:text-white/90",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
