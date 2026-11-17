"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins(): typeof gsap {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    // Prevent iOS/Android address-bar resize from killing pin scrub timelines.
    ScrollTrigger.config({
      // Mobile browser chrome show/hide must not recalculate pins mid-film.
      ignoreMobileResize: true,
      autoRefreshEvents: "DOMContentLoaded,load,visibilitychange",
      // Keep stacked pins stable when leaving scene 1.
      limitCallbacks: true,
    });
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };
