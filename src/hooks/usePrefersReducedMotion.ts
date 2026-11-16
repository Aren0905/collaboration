"use client";

import { useEffect, useState } from "react";

/**
 * Defaults to false; resolves from matchMedia after mount.
 * Avoids blocking the whole experience on a null gate.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
