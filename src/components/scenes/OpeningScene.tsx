"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { useExperience } from "@/components/experience/ExperienceContext";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { ScrollCue } from "@/components/opening/ScrollCue";
import { FILM_ASSETS } from "@/lib/assets";
import { SCENES } from "@/lib/content";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "threshold")!;

/**
 * Scene 1 — Night desk → opportunity → clear partnership proposition in <10s.
 * Signature: monitor power-on + dolly into listing.
 */
export function OpeningScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollToScene } = useExperience();

  useCinematicScene({
    id: "threshold",
    rootRef,
    pinRef,
    endDesktop: "+=220%",
    endMobile: "+=140%",
    scrubDesktop: 0.65,
    scrubMobile: 0.45,
    build: ({ gsap: g, q, isDesktop }, tl) => {
      const plate = q("[data-film='plate']");
      const veil = q("[data-film='veil']");
      const listing = q("[data-film='listing']");
      const lines = q("[data-film='line']");
      const support = q("[data-film='support']");
      const meta = q("[data-film='meta']");
      const cta = q("[data-film='cta']");

      g.set(veil, { opacity: 1 });
      g.set(plate, { scale: 1.18, y: 30 });
      g.set(listing, { opacity: 0, y: 24, scale: 0.96 });
      g.set(lines, { opacity: 0, y: 28 });
      g.set([support, meta, cta], { opacity: 0, y: 16 });

      tl.to(veil, { opacity: 0.15, duration: 0.9 }, 0);
      tl.to(
        plate,
        { scale: isDesktop ? 1.02 : 1.06, y: 0, duration: 1.4 },
        0,
      );
      tl.to(listing, { opacity: 1, y: 0, scale: 1, duration: 0.55 }, 0.45);
      tl.to(lines, { opacity: 1, y: 0, stagger: 0.12, duration: 0.55 }, 0.85);
      tl.to(support, { opacity: 1, y: 0, duration: 0.45 }, 1.25);
      tl.to(meta, { opacity: 1, y: 0, duration: 0.4 }, 1.4);
      tl.to(cta, { opacity: 1, y: 0, duration: 0.4 }, 1.55);
      tl.to(
        plate,
        { scale: isDesktop ? 1.08 : 1.12, duration: 0.8 },
        1.7,
      );
    },
  });

  return (
    <section
      ref={rootRef}
      id="scene-threshold"
      data-scene="threshold"
      aria-labelledby="scene-threshold-title"
      className="relative"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-end overflow-hidden bg-[var(--color-void)] md:items-center"
      >
        <div data-film="plate" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.developerNight.src}
            alt={FILM_ASSETS.developerNight.alt}
            priority
            overlay="heavy"
          />
        </div>

        <div
          data-film="veil"
          className="pointer-events-none absolute inset-0 z-[2] bg-[var(--color-void)]"
          aria-hidden
        />

        {/* Opportunity toast rising from the “monitor” */}
        <div
          data-film="listing"
          className="absolute top-[12%] right-4 left-4 z-[4] border border-white/15 bg-black/55 p-3 backdrop-blur-md sm:left-auto sm:w-[min(320px,42vw)] sm:p-4 md:top-[18%] md:right-[6%] lg:right-[12%]"
        >
          <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-signal)] uppercase">
            New opportunity · US remote
          </p>
          <p className="mt-2 font-display text-base text-white sm:text-lg">
            Full-stack product engineer
          </p>
          <p className="mt-1 text-xs text-white/55">
            English required · Illustrative listing
          </p>
        </div>

        <div className="relative z-[5] w-full px-5 pb-16 md:px-10 md:pb-0 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <h1 id="scene-threshold-title" className="sr-only">
              {content.title}
            </h1>
            <div className="space-y-2 md:space-y-3">
              <p
                data-film="line"
                className="font-display text-[clamp(1.65rem,5.2vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-paper)]"
              >
                {content.line1}
              </p>
              <p
                data-film="line"
                className="font-display text-[clamp(1.65rem,5.2vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-paper)]"
              >
                {content.line2}
              </p>
              <p
                data-film="line"
                className="font-display text-[clamp(1.65rem,5.2vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-daylight)]"
              >
                {content.line3}
              </p>
            </div>

            <p
              data-film="support"
              className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:mt-8 md:text-lg"
            >
              {content.body}
            </p>

            <div
              data-film="meta"
              className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase md:text-[11px]"
            >
              <span className="border border-white/20 px-2 py-1">
                Developer · me
              </span>
              <span className="border border-white/20 px-2 py-1">
                Communication · you
              </span>
              <span className="border border-[var(--color-signal)]/40 px-2 py-1 text-[var(--color-signal)]">
                {content.splitHint}
              </span>
            </div>

            <div data-film="cta" className="mt-8">
              <button
                type="button"
                onClick={() => scrollToScene("partner")}
                className={cn(
                  "pointer-events-auto border border-[var(--color-paper)] bg-[var(--color-paper)] px-5 py-3",
                  "font-mono text-[11px] tracking-[0.2em] text-[var(--color-void)] uppercase",
                  "hover:bg-transparent hover:text-[var(--color-paper)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]",
                )}
              >
                {content.cta}
              </button>
            </div>
          </div>
        </div>

        <ScrollCue label={content.cue} />
      </div>
    </section>
  );
}
