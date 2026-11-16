import { SCENES, type SceneId } from "@/lib/content";

export type SceneDefinition = (typeof SCENES)[number];

export type SceneTheme = {
  id: SceneId;
  background: string;
  foreground: string;
  accent: string;
  atmosphere: "void" | "tungsten" | "daylight" | "paper" | "slate" | "amber";
};

export const SCENE_THEMES: Record<SceneId, SceneTheme> = {
  threshold: {
    id: "threshold",
    background: "var(--color-void)",
    foreground: "var(--color-paper)",
    accent: "var(--color-tungsten)",
    atmosphere: "void",
  },
  strengths: {
    id: "strengths",
    background: "var(--color-ink)",
    foreground: "var(--color-paper)",
    accent: "var(--color-tungsten)",
    atmosphere: "tungsten",
  },
  markets: {
    id: "markets",
    background: "var(--color-ink-soft)",
    foreground: "var(--color-paper)",
    accent: "var(--color-daylight)",
    atmosphere: "daylight",
  },
  prepare: {
    id: "prepare",
    background: "var(--color-slate)",
    foreground: "var(--color-paper)",
    accent: "var(--color-copper)",
    atmosphere: "slate",
  },
  interview: {
    id: "interview",
    background: "var(--color-amber-room)",
    foreground: "var(--color-paper)",
    accent: "var(--color-tungsten)",
    atmosphere: "amber",
  },
  delivery: {
    id: "delivery",
    background: "var(--color-ink)",
    foreground: "var(--color-paper)",
    accent: "var(--color-signal)",
    atmosphere: "tungsten",
  },
  split: {
    id: "split",
    background: "var(--color-ink)",
    foreground: "var(--color-paper)",
    accent: "var(--color-copper)",
    atmosphere: "tungsten",
  },
  chemistry: {
    id: "chemistry",
    background: "var(--color-amber-room)",
    foreground: "var(--color-paper)",
    accent: "var(--color-tungsten)",
    atmosphere: "amber",
  },
};

export function getSceneIndex(id: SceneId): number {
  return SCENES.findIndex((scene) => scene.id === id);
}

export function isSceneId(value: string): value is SceneId {
  return SCENES.some((scene) => scene.id === value);
}
