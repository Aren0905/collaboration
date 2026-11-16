"use client";

import { useEffect, useState } from "react";
import { animate } from "motion";

/**
 * Smoothly interpolates displayed integers toward `target`.
 * When reduced motion is on, returns `target` immediately (no tween).
 */
export function useAnimatedNumber(
  target: number,
  {
    duration = 0.45,
    reducedMotion = false,
  }: { duration?: number; reducedMotion?: boolean } = {},
): number {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (reducedMotion) return;

    const controls = animate(value, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
    // Start from the last painted value whenever `target` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [target, duration, reducedMotion]);

  return reducedMotion ? target : value;
}
