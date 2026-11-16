"use client";

import type { LenisOptions } from "lenis";

export const LENIS_OPTIONS: LenisOptions = {
  duration: 1.1,
  smoothWheel: true,
  touchMultiplier: 1.1,
  wheelMultiplier: 0.9,
};

export const SCROLL_DEFAULTS = {
  scrub: 0.65,
  ease: "none",
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
