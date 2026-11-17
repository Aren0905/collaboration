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
  /** Flatten nested gsap.utils.selector() results into a single tweenable list. */
  targets: (...groups: gsap.TweenTarget[]) => gsap.TweenTarget[];
  isDesktop: boolean;
  reduceMotion: boolean;
};

function flattenTargets(...groups: gsap.TweenTarget[]): gsap.TweenTarget[] {
  const out: gsap.TweenTarget[] = [];
  for (const group of groups) {
    if (group == null) continue;
    if (typeof group === "string" || group instanceof Element) {
      out.push(group);
      continue;
    }
    if (typeof group === "object" && "length" in (group as object)) {
      out.push(...Array.from(group as ArrayLike<gsap.TweenTarget>));
      continue;
    }
    out.push(group);
  }
  return out;
}

export type CinematicTimeline = gsap.core.Timeline;

type UseCinematicSceneOptions = {
  id: SceneId;
  rootRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLElement | null>;
  endDesktop?: string;
  endMobile?: string;
  scrubDesktop?: number;
  scrubMobile?: number | boolean;
  build: (
    ctx: CinematicBuildContext,
    tl: CinematicTimeline,
  ) => void | (() => void);
  onReducedMotion?: (ctx: CinematicBuildContext) => void;
};

/**
 * Shared pin + scrub lifecycle for cinematic scenes.
 * Avoids refresh-on-resize (mobile URL bar) which kills later pins mid-scroll.
 */
export function useCinematicScene({
  id,
  rootRef,
  pinRef,
  endDesktop = "+=280%",
  endMobile = "+=170%",
  scrubDesktop = 0.7,
  scrubMobile = true,
  build,
  onReducedMotion,
}: UseCinematicSceneOptions) {
  const { setActiveSceneId, setSceneProgress } = useExperience();
  const buildRef = useRef(build);
  const reducedRef = useRef(onReducedMotion);
  const lastProgressRef = useRef(-1);

  useEffect(() => {
    buildRef.current = build;
    reducedRef.current = onReducedMotion;
  }, [build, onReducedMotion]);

  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | null = null;
    let raf = 0;
    let tries = 0;
    let width = 0;

    const reportProgress = (value: number) => {
      if (Math.abs(value - lastProgressRef.current) < 0.008) return;
      lastProgressRef.current = value;
      setSceneProgress(id, value);
    };

    const arm = () => {
      if (cancelled) return;
      const root = rootRef.current;
      const pin = pinRef.current;
      if (!root || !pin) {
        if (tries++ < 60) raf = requestAnimationFrame(arm);
        return;
      }

      ctx?.revert();
      ctx = null;
      lastProgressRef.current = -1;

      const gsapApi = registerGsapPlugins();
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      width = window.innerWidth;
      const q = gsapApi.utils.selector(root);

      const buildCtx: CinematicBuildContext = {
        gsap: gsapApi,
        root,
        pin,
        q,
        targets: flattenTargets,
        isDesktop,
        reduceMotion,
      };

      if (reduceMotion) {
        reducedRef.current?.(buildCtx);
        setActiveSceneId(id);
        setSceneProgress(id, 1);
        return;
      }

      ctx = gsapApi.context(() => {
        const tl = gsapApi.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: `scene-${id}`,
            trigger: root,
            start: "top top",
            end: isDesktop ? endDesktop : endMobile,
            pin,
            // Transform pins + pan-y touch-action keep native finger scroll on phones.
            scrub: isDesktop ? scrubDesktop : scrubMobile,
            anticipatePin: isDesktop ? 1 : 0,
            invalidateOnRefresh: true,
            fastScrollEnd: isDesktop,
            preventOverlaps: false,
            onUpdate: (self) => reportProgress(self.progress),
            onEnter: () => setActiveSceneId(id),
            onEnterBack: () => setActiveSceneId(id),
            onToggle: (self) => {
              if (self.isActive) setActiveSceneId(id);
            },
          },
        });

        buildRef.current(buildCtx, tl);
      }, root);
    };

    arm();

    // One shared refresh after all scene hooks have armed.
    const refreshRaf = requestAnimationFrame(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    const onLoad = () => ScrollTrigger.refresh();

    // Only re-arm when width actually changes (rotate / desktop crossover).
    // Ignore height-only resizes from the mobile browser chrome.
    const onResize = () => {
      if (cancelled) return;
      const nextWidth = window.innerWidth;
      if (Math.abs(nextWidth - width) < 2) return;
      width = nextWidth;
      tries = 0;
      arm();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onOrientation = () => {
      tries = 0;
      arm();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    window.addEventListener("load", onLoad);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientation);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(refreshRaf);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
      ctx?.revert();
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
