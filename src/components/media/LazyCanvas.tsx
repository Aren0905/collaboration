"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const R3FCanvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  {
    ssr: false,
    loading: () => null,
  },
);

type LazyCanvasProps = {
  children: ReactNode;
  className?: string;
  /** Only mount WebGL when near viewport and motion is allowed. */
  enabled?: boolean;
  fallback?: ReactNode;
};

/**
 * Optional R3F host — lazy, intersection-gated. Skeleton scenes pass enabled={false}.
 */
export function LazyCanvas({
  children,
  className,
  enabled = false,
  fallback = null,
}: LazyCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {enabled && visible ? (
        <R3FCanvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 4], fov: 45 }}
        >
          {children}
        </R3FCanvas>
      ) : (
        fallback
      )}
    </div>
  );
}
