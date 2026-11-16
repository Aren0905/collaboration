"use client";

import { useExperience } from "@/components/experience/ExperienceContext";
import { SCENES } from "@/lib/content";
import { cn } from "@/lib/cn";

export function ProgressIndicator() {
  const { progress, activeSceneId, scrollToScene } = useExperience();
  const percent = Math.min(100, Math.max(0, progress * 100));

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
      role="status"
      aria-live="polite"
      aria-label={`Story progress ${Math.round(percent)} percent. Current scene: ${activeSceneId}`}
    >
      <div className="h-[2px] w-full bg-black/20">
        <div
          className="h-full origin-left bg-[var(--color-tungsten)] transition-[width] duration-150 ease-out"
          style={{ width: `${percent}%`, transform: "translateZ(0)" }}
        />
      </div>
      <nav
        aria-label="Scene progress"
        className="pointer-events-auto mx-auto mt-3 hidden max-w-5xl items-center justify-center gap-1 px-4 md:flex"
      >
        {SCENES.map((scene) => {
          const active = scene.id === activeSceneId;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => scrollToScene(scene.id)}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-[transform,background-color] duration-300",
                active
                  ? "scale-150 bg-[var(--color-tungsten)]"
                  : "bg-white/35 hover:bg-white/70",
              )}
              aria-label={`Go to ${scene.label}`}
              aria-current={active ? "true" : undefined}
            />
          );
        })}
      </nav>
    </div>
  );
}
