"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useExperience } from "@/components/experience/ExperienceContext";
import { registerGsapPlugins, ScrollTrigger, gsap } from "@/lib/gsap";
import type { SceneId } from "@/lib/content";

export type CinematicBuildContext = {
  gsap: typeof gsap;
  root: HTMLElement;
  pin: HTMLElement;
  q: ReturnType<typeof gsap.utils.selector>;
  isDesktop: boolean;
  reduceMotion: boolean;
};

export type CinematicTimeline = gsap.core.Timeline;

type UseCinematicSceneOptions = {
  id: SceneId;
  rootRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLElement | null>;
  endDesktop?: string;
  endMobile?: string;
  scrubDesktop?: number;
  scrubMobile?: number;
  build: (
    ctx: CinematicBuildContext,
    tl: CinematicTimeline,
  ) => void | (() => void);
  onReducedMotion?: (ctx: CinematicBuildContext) => void;
};

/**
 * Shared pin + matchMedia + progress lifecycle for cinematic scenes.
 * Cleans up with mm.revert() on unmount / breakpoint change.
 */
export function useCinematicScene({
  id,
  rootRef,
  pinRef,
  endDesktop = "+=280%",
  endMobile = "+=200%",
  scrubDesktop = 0.7,
  scrubMobile = 0.5,
  build,
  onReducedMotion,
}: UseCinematicSceneOptions) {
  const { setActiveSceneId, setSceneProgress } = useExperience();
  const buildRef = useRef(build);
  const reducedRef = useRef(onReducedMotion);

  useEffect(() => {
    buildRef.current = build;
    reducedRef.current = onReducedMotion;
  }, [build, onReducedMotion]);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return;

    const gsapApi = registerGsapPlugins();
    const mm = gsapApi.matchMedia();
    const q = gsapApi.utils.selector(root);

    const report = (value: number) => {
      setActiveSceneId(id);
      setSceneProgress(id, value);
    };

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const conditions = context.conditions as {
          isDesktop: boolean;
          reduceMotion: boolean;
        };
        const isDesktop = Boolean(conditions.isDesktop);
        const reduceMotion = Boolean(conditions.reduceMotion);

        const buildCtx: CinematicBuildContext = {
          gsap: gsapApi,
          root,
          pin,
          q,
          isDesktop,
          reduceMotion,
        };

        if (reduceMotion) {
          reducedRef.current?.(buildCtx);
          report(1);
          return;
        }

        const tl = gsapApi.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: isDesktop ? endDesktop : endMobile,
            pin,
            scrub: isDesktop ? scrubDesktop : scrubMobile,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => report(self.progress),
            onEnter: () => setActiveSceneId(id),
            onEnterBack: () => setActiveSceneId(id),
          },
        });

        const extraCleanup = buildRef.current(buildCtx, tl);
        return () => {
          extraCleanup?.();
        };
      },
    );

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [
    id,
    rootRef,
    pinRef,
    endDesktop,
    endMobile,
    scrubDesktop,
    scrubMobile,
    setActiveSceneId,
    setSceneProgress,
  ]);
}
