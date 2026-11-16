"use client";

import { motion, useReducedMotion } from "motion/react";
import { useExperience } from "@/components/experience/ExperienceContext";
import { SCENE_THEMES } from "@/lib/scenes";
import { cn } from "@/lib/cn";

/**
 * Scene-aware atmospheric backdrop. Skeleton: color fields + soft vignette only.
 */
export function SceneBackground() {
  const { activeSceneId } = useExperience();
  const reduce = useReducedMotion();
  const theme = SCENE_THEMES[activeSceneId];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        animate={
          reduce
            ? { backgroundColor: theme.background }
            : { backgroundColor: theme.background }
        }
        transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: theme.background }}
      />
      <div
        className={cn(
          "absolute inset-0 opacity-80",
          theme.atmosphere === "tungsten" && "bg-[radial-gradient(ellipse_at_30%_40%,rgba(212,165,116,0.16),transparent_55%)]",
          theme.atmosphere === "daylight" && "bg-[radial-gradient(ellipse_at_70%_30%,rgba(142,182,201,0.16),transparent_55%)]",
          theme.atmosphere === "navy" && "bg-[radial-gradient(ellipse_at_50%_40%,rgba(94,196,160,0.12),transparent_55%)]",
          theme.atmosphere === "slate" && "bg-[radial-gradient(ellipse_at_40%_60%,rgba(94,196,160,0.06),transparent_50%)]",
          theme.atmosphere === "amber" && "bg-[radial-gradient(ellipse_at_50%_20%,rgba(232,170,90,0.18),transparent_55%)]",
          theme.atmosphere === "void" && "bg-[radial-gradient(ellipse_at_50%_40%,rgba(20,28,45,0.55),transparent_60%)]",
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_20%,transparent_80%,rgba(0,0,0,0.45))]" />
      <div className="film-grain absolute inset-0 opacity-[0.04] mix-blend-overlay" />
    </div>
  );
}
