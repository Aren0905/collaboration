"use client";

import type { LenisOptions } from "lenis";

export const LENIS_OPTIONS: LenisOptions = {
  duration: 1.1,
  smoothWheel: true,
  // Native touch scrolling is more reliable with ScrollTrigger on phones.
  syncTouch: false,
  touchMultiplier: 1,
  wheelMultiplier: 0.9,
};

/** Lenis fights iOS/Android pin scrubbing — use native scroll under 768px. */
export function shouldUseLenis(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
}

export const SCROLL_DEFAULTS = {
  scrub: 0.65,
  ease: "none",
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
