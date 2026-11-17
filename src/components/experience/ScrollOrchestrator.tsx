"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useExperience } from "@/components/experience/ExperienceContext";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { LENIS_OPTIONS, shouldUseLenis } from "@/lib/motion";

function reportNativeProgress(setProgress: (value: number) => void) {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const next = max > 0 ? window.scrollY / max : 0;
  document.documentElement.style.setProperty("--story-progress", String(next));
  setProgress(next);
}

/**
 * Desktop: Lenis + ScrollTrigger.
 * Mobile: pure native touch scroll — no normalizeScroll (it can lock pan-y).
 */
export function ScrollOrchestrator() {
  const { reducedMotion, setProgress } = useExperience();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      const onScroll = () => reportNativeProgress(setProgress);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const gsap = registerGsapPlugins();
    const useLenis = shouldUseLenis();

    // Guarantee vertical finger scrolling even if a library mutates touch-action.
    document.documentElement.style.touchAction = "pan-y";
    document.body.style.touchAction = "pan-y";

    if (!useLenis) {
      let lastWidth = window.innerWidth;

      const onScroll = () => {
        ScrollTrigger.update();
        reportNativeProgress(setProgress);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      const onResize = () => {
        const nextWidth = window.innerWidth;
        if (Math.abs(nextWidth - lastWidth) < 2) return;
        lastWidth = nextWidth;
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", () => ScrollTrigger.refresh());

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        document.documentElement.style.touchAction = "";
        document.body.style.touchAction = "";
      };
    }

    const lenis = new Lenis(LENIS_OPTIONS);
    lenisRef.current = lenis;

    const onLenisScroll = () => {
      ScrollTrigger.update();
      const max = lenis.limit || 1;
      const next = max > 0 ? lenis.scroll / max : 0;
      document.documentElement.style.setProperty(
        "--story-progress",
        String(next),
      );
      setProgress(next);
    };
    lenis.on("scroll", onLenisScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.style.touchAction = "";
      document.body.style.touchAction = "";
      ScrollTrigger.refresh();
    };
  }, [reducedMotion, setProgress]);

  return null;
}
