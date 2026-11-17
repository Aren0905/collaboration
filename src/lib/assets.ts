import type { CSSProperties } from "react";
import { STORY_PROJECT } from "@/lib/project";

/** Focal point for object-position (percent from top-left). */
export type FilmFocus = {
  x: number;
  y: number;
};

type FilmAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Desktop crop anchor — keep cinematic framing. */
  focus: FilmFocus;
  /** Mobile crop anchor — keep the face in the clear upper plate. */
  focusMobile: FilmFocus;
};

/** Photoreal film plates for THE CONNECTION. */
export const FILM_ASSETS = {
  developerNight: {
    src: "/images/01-developer-night.jpg",
    alt: "Aaron, a 24-year-old software developer, working late in a navy sweatshirt at his desk",
    width: 1920,
    height: 1080,
    focus: { x: 62, y: 36 },
    focusMobile: { x: 72, y: 28 },
  },
  emptyChair: {
    src: "/images/02-empty-chair.jpg",
    alt: "Developer workspace with an empty second chair for a communication partner",
    width: 1920,
    height: 1080,
    focus: { x: 32, y: 34 },
    focusMobile: { x: 26, y: 26 },
  },
  partnerDay: {
    src: "/images/03-partner-daylight.jpg",
    alt: "English-speaking male communication partner in a bright daylight home office",
    width: 1920,
    height: 1080,
    focus: { x: 58, y: 34 },
    focusMobile: { x: 64, y: 26 },
  },
  worldMap: {
    src: "/images/04-world-map.jpg",
    alt: "Cinematic world map with United States and United Kingdom illuminated",
    width: 1920,
    height: 1080,
    focus: { x: 50, y: 42 },
    focusMobile: { x: 50, y: 40 },
  },
  interview: {
    src: "/images/05-interview-laptop.jpg",
    alt: "Laptop video call with an English-speaking communication partner ready for interview",
    width: 1920,
    height: 1080,
    focus: { x: 38, y: 36 },
    focusMobile: { x: 36, y: 30 },
  },
  coding: {
    src: "/images/06-developer-coding.jpg",
    alt: "Aaron coding a web application in a charcoal hoodie at dual monitors",
    width: 1920,
    height: 1080,
    focus: { x: 64, y: 34 },
    focusMobile: { x: 74, y: 26 },
  },
  deliveryBuild: {
    src: "/images/08-delivery-build.jpg",
    alt: "Aaron reviewing a finished web application dashboard at his night desk",
    width: 1920,
    height: 1080,
    focus: { x: 68, y: 34 },
    focusMobile: { x: 78, y: 26 },
  },
  sharedProject: {
    src: "/images/07-shared-dual.jpg",
    alt: "Developer and communication partner workspaces linked by one project Signal",
    width: 1920,
    height: 1080,
    focus: { x: 50, y: 36 },
    focusMobile: { x: 22, y: 28 },
  },
  portraitAaron: {
    src: "/images/ref/aaron.jpg",
    alt: "Portrait of Aaron, software developer",
    width: 800,
    height: 1000,
    focus: { x: 50, y: 28 },
    focusMobile: { x: 50, y: 26 },
  },
} as const satisfies Record<string, FilmAsset>;

export function filmFocusStyle(asset: {
  focus: FilmFocus;
  focusMobile: FilmFocus;
}): CSSProperties {
  return {
    ["--film-focus-x" as string]: `${asset.focus.x}%`,
    ["--film-focus-y" as string]: `${asset.focus.y}%`,
    ["--film-focus-mobile-x" as string]: `${asset.focusMobile.x}%`,
    ["--film-focus-mobile-y" as string]: `${asset.focusMobile.y}%`,
  };
}

/** Thin alias for the persistent story project. Prefer STORY_PROJECT. */
export const EXAMPLE_PROJECT = {
  label: STORY_PROJECT.label,
  client: STORY_PROJECT.client,
  title: STORY_PROJECT.title,
  scope: STORY_PROJECT.stack.join(" · "),
} as const;
