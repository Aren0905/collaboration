"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type ResponsiveVideoProps = {
  src?: string;
  poster?: string;
  className?: string;
  aspectClassName?: string;
  label: string;
  autoPlay?: boolean;
};

/**
 * Lazy video: mounts source only near viewport. Muted by default.
 */
export function ResponsiveVideo({
  src,
  poster,
  className,
  aspectClassName = "aspect-video",
  label,
  autoPlay = true,
}: ResponsiveVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !src) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [src]);

  if (!src) {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden bg-[var(--color-ink-elevated)]",
          aspectClassName,
          className,
        )}
        role="img"
        aria-label={label}
      >
        <span className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
          Video plate · {label}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden bg-black", aspectClassName, className)}
    >
      {active ? (
        <video
          className="h-full w-full object-cover"
          poster={poster}
          muted
          playsInline
          loop
          autoPlay={autoPlay}
          preload="metadata"
          aria-label={label}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={poster ? { backgroundImage: `url(${poster})` } : undefined}
          aria-hidden
        />
      )}
    </div>
  );
}
