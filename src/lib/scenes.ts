import { SCENES, type SceneId } from "@/lib/content";

export type SceneDefinition = (typeof SCENES)[number];

export type SceneTheme = {
  id: SceneId;
  background: string;
  foreground: string;
  accent: string;
  atmosphere: "void" | "tungsten" | "daylight" | "navy" | "slate" | "amber";
};

export const SCENE_THEMES: Record<SceneId, SceneTheme> = {
  threshold: {
    id: "threshold",
    background: "var(--color-void)",
    foreground: "var(--color-paper)",
    accent: "var(--color-tungsten)",
    atmosphere: "void",
  },
  partner: {
    id: "partner",
    background: "var(--color-ink)",
    foreground: "var(--color-paper)",
    accent: "var(--color-daylight)",
    atmosphere: "daylight",
  },
  markets: {
    id: "markets",
    background: "var(--color-navy)",
    foreground: "var(--color-paper)",
    accent: "var(--color-signal)",
    atmosphere: "navy",
  },
  interview: {
    id: "interview",
    background: "var(--color-amber-room)",
    foreground: "var(--color-paper)",
    accent: "var(--color-daylight)",
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
  invite: {
    id: "invite",
    background: "var(--color-void)",
    foreground: "var(--color-paper)",
    accent: "var(--color-tungsten)",
    atmosphere: "void",
  },
};

export function getSceneIndex(id: SceneId): number {
  return SCENES.findIndex((scene) => scene.id === id);
}

export function isSceneId(value: string): value is SceneId {
  return SCENES.some((scene) => scene.id === value);
}
