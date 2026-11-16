"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SCENES, type SceneId } from "@/lib/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type ExperienceContextValue = {
  activeSceneId: SceneId;
  progress: number;
  sceneProgress: Record<SceneId, number>;
  reducedMotion: boolean;
  lenisEnabled: boolean;
  setActiveSceneId: (id: SceneId) => void;
  setProgress: (value: number) => void;
  setSceneProgress: (id: SceneId, value: number) => void;
  scrollToScene: (id: SceneId) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

const initialSceneProgress = SCENES.reduce(
  (acc, scene) => {
    acc[scene.id] = 0;
    return acc;
  },
  {} as Record<SceneId, number>,
);

type ExperienceProviderProps = {
  children: ReactNode;
};

export function ExperienceProvider({ children }: ExperienceProviderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeSceneId, setActiveSceneId] = useState<SceneId>("threshold");
  const [progress, setProgress] = useState(0);
  const [sceneProgress, setSceneProgressState] =
    useState<Record<SceneId, number>>(initialSceneProgress);

  const setSceneProgress = useCallback((id: SceneId, value: number) => {
    setSceneProgressState((prev) => {
      if (Math.abs(prev[id] - value) < 0.001) return prev;
      return { ...prev, [id]: value };
    });
  }, []);

  const scrollToScene = useCallback(
    (id: SceneId) => {
      const el = document.getElementById(`scene-${id}`);
      if (!el) return;
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [reducedMotion],
  );

  const value = useMemo<ExperienceContextValue>(
    () => ({
      activeSceneId,
      progress,
      sceneProgress,
      reducedMotion,
      lenisEnabled: !reducedMotion,
      setActiveSceneId,
      setProgress,
      setSceneProgress,
      scrollToScene,
    }),
    [
      activeSceneId,
      progress,
      sceneProgress,
      reducedMotion,
      setSceneProgress,
      scrollToScene,
    ],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience(): ExperienceContextValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return ctx;
}
