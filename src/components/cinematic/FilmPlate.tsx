"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

type FilmPlateProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  overlay?: "none" | "soft" | "heavy" | "left" | "right" | "bottom";
};

const OVERLAYS: Record<NonNullable<FilmPlateProps["overlay"]>, string> = {
  none: "",
  soft: "bg-gradient-to-t from-black/70 via-black/25 to-black/35",
  heavy: "bg-gradient-to-t from-black/85 via-black/45 to-black/50",
  left: "bg-gradient-to-r from-black/80 via-black/35 to-transparent",
  right: "bg-gradient-to-l from-black/80 via-black/35 to-transparent",
  bottom: "bg-gradient-to-t from-black/90 via-black/40 to-transparent",
};

/** Full-bleed photoreal plate with cinematic grade overlays. */
export function FilmPlate({
  src,
  alt,
  priority = false,
  className,
  imageClassName,
  sizes = "100vw",
  overlay = "soft",
}: FilmPlateProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover will-change-transform", imageClassName)}
      />
      {overlay !== "none" ? (
        <div
          className={cn("pointer-events-none absolute inset-0", OVERLAYS[overlay])}
          aria-hidden
        />
      ) : null}
      <div
        className="film-grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        aria-hidden
      />
    </div>
  );
}
