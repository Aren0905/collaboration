"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type ResponsiveImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  aspectClassName?: string;
  placeholderLabel?: string;
};

/**
 * Responsive image with CLS-safe aspect box and graceful missing-asset fallback.
 * Swap placeholderLabel plates for real assets under /public/images when ready.
 */
export function ResponsiveImage({
  alt,
  aspectClassName = "aspect-[3/2]",
  placeholderLabel,
  className,
  src,
  ...rest
}: ResponsiveImageProps) {
  const [failed, setFailed] = useState(false);
  const missing = failed || !src || src === "";

  if (missing) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[var(--color-ink-elevated)]",
          aspectClassName,
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,162,126,0.12),transparent_45%,rgba(123,163,184,0.1))]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
            Plate
          </span>
          <span className="max-w-xs font-display text-lg text-white/70 md:text-xl">
            {placeholderLabel ?? alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full overflow-hidden", aspectClassName, className)}>
      <Image
        alt={alt}
        src={src}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 80vw"
        onError={() => setFailed(true)}
        {...rest}
      />
    </div>
  );
}
