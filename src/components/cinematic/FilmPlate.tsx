"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { filmFocusStyle, type FilmFocus } from "@/lib/assets";

type FilmPlateProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  overlay?: "none" | "soft" | "heavy" | "left" | "right" | "bottom";
  /** Desktop object-position anchor (face / subject). */
  focus?: FilmFocus;
  /** Mobile object-position anchor — keeps faces in the upper plate. */
  focusMobile?: FilmFocus;
};

const OVERLAYS: Record<NonNullable<FilmPlateProps["overlay"]>, string> = {
  none: "",
  soft: "bg-gradient-to-t from-black/70 via-black/25 to-black/35",
  heavy: "bg-gradient-to-t from-black/85 via-black/45 to-black/50",
  left: "bg-gradient-to-r from-black/80 via-black/35 to-transparent",
  right: "bg-gradient-to-l from-black/80 via-black/35 to-transparent",
  bottom: "bg-gradient-to-t from-black/90 via-black/40 to-transparent",
};

const DEFAULT_FOCUS: FilmFocus = { x: 50, y: 36 };
const DEFAULT_FOCUS_MOBILE: FilmFocus = { x: 50, y: 28 };

/** Full-bleed photoreal plate with cinematic grade overlays. */
export function FilmPlate({
  src,
  alt,
  priority = false,
  className,
  imageClassName,
  sizes = "100vw",
  overlay = "soft",
  focus = DEFAULT_FOCUS,
  focusMobile = DEFAULT_FOCUS_MOBILE,
}: FilmPlateProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={filmFocusStyle({ focus, focusMobile })}
        className={cn(
          "film-focus will-change-transform",
          imageClassName,
        )}
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
