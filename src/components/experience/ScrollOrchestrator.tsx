"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useExperience } from "@/components/experience/ExperienceContext";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { LENIS_OPTIONS } from "@/lib/motion";

/**
 * Single scroll controller: Lenis (window) + GSAP ScrollTrigger update bridge.
 * Disabled when prefers-reduced-motion is active to avoid competing controllers.
 */
export function ScrollOrchestrator() {
  const { reducedMotion, setProgress } = useExperience();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const next = max > 0 ? window.scrollY / max : 0;
        document.documentElement.style.setProperty("--story-progress", String(next));
        setProgress(next);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const gsap = registerGsapPlugins();
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
      // Scene-level ScrollTriggers clean up via their own gsap.context().revert()
      ScrollTrigger.refresh();
    };
  }, [reducedMotion, setProgress]);

  return null;
}
