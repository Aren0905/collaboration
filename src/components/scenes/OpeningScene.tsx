"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { useExperience } from "@/components/experience/ExperienceContext";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import {
  ScenePin,
  ScenePanel,
  SceneStage,
} from "@/components/cinematic/ScenePin";
import { ProjectBrief } from "@/components/sim/ProjectBrief";
import { ScrollCue } from "@/components/opening/ScrollCue";
import { FILM_ASSETS } from "@/lib/assets";
import { STORY_PROJECT } from "@/lib/project";
import { SCENES } from "@/lib/content";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "threshold")!;

/**
 * Event 1 — Opportunity arrives.
 * Same scroll film on mobile and desktop: plate stays visible, events play in stage.
 */
export function OpeningScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollToScene } = useExperience();

  useCinematicScene({
    id: "threshold",
    rootRef,
    pinRef,
    endDesktop: "+=300%",
    endMobile: "+=160%",
    scrubDesktop: 0.7,
    scrubMobile: true,
    build: ({ gsap: g, q, targets, isDesktop }, tl) => {
      const plate = q("[data-film='plate']");
      const veil = q("[data-film='veil']");
      const toast = q("[data-film='toast']");
      const brief = q("[data-film='brief']");
      const lines = q("[data-film='line']");
      const support = q("[data-film='support']");
      const meta = q("[data-film='meta']");
      const cta = q("[data-film='cta']");
      const aperture = q("[data-film='aperture']");
      const cue = q("[data-opening='scroll-cue']");
      const copyBlock = targets(support, meta, cta);

      g.set(veil, { opacity: isDesktop ? 0.5 : 0.28 });
      g.set(plate, {
        scale: 1.14,
        filter: isDesktop ? "brightness(0.6)" : "brightness(0.78)",
      });
      g.set(toast, { opacity: 0, scale: 0.92, y: 20 });
      g.set(brief, { opacity: 0, scale: 0.96, y: 24, transformOrigin: "50% 0%" });
      g.set(lines, { opacity: 0, y: 22, rotateX: isDesktop ? 10 : 0 });
      g.set(copyBlock, { opacity: 0, y: 14 });
      g.set(aperture, { scale: 0, opacity: 0 });
      g.set(cue, { opacity: 0 });

      tl.to(veil, { opacity: 0.08, duration: 0.75 }, 0);
      tl.to(
        plate,
        {
          scale: isDesktop ? 1.06 : 1.05,
          filter: "brightness(1)",
          duration: 1.05,
        },
        0,
      );
      tl.to(cue, { opacity: 1, duration: 0.35 }, 0.25);

      tl.to(toast, { opacity: 1, scale: 1, y: 0, duration: 0.45 }, 0.45);
      tl.to(
        lines,
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 0.4 },
        0.7,
      );
      tl.to(support, { opacity: 1, y: 0, duration: 0.3 }, 1.05);
      tl.to(meta, { opacity: 1, y: 0, duration: 0.28 }, 1.15);
      tl.to(cta, { opacity: 1, y: 0, duration: 0.28 }, 1.25);

      tl.to(
        plate,
        { scale: isDesktop ? 1.32 : 1.18, duration: 0.85 },
        1.65,
      );
      tl.to(
        toast,
        {
          scale: isDesktop ? 1.18 : 1.06,
          y: -8,
          opacity: 0,
          duration: 0.45,
        },
        1.75,
      );
      tl.to(brief, { opacity: 1, scale: 1, y: 0, duration: 0.55 }, 1.95);
      tl.to(aperture, { scale: 1, opacity: 0.7, duration: 0.5 }, 2.05);
      tl.to(
        targets(support, meta, lines),
        { opacity: 0.4, duration: 0.4 },
        2.1,
      );
      tl.to(cue, { opacity: 0, duration: 0.3 }, 2.1);
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
      <ScenePin
        ref={pinRef}
        className="bg-[var(--color-void)] [perspective:1400px]"
        align="end"
      >
        <div data-film="plate" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.developerNight.src}
            alt={FILM_ASSETS.developerNight.alt}
            focus={FILM_ASSETS.developerNight.focus}
            focusMobile={FILM_ASSETS.developerNight.focusMobile}
            priority
            overlay="soft"
          />
        </div>

        <div
          data-film="veil"
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_58%_36%,rgba(5,7,12,0.2)_0%,rgba(5,7,12,0.55)_55%,rgba(5,7,12,0.82)_100%)]"
          aria-hidden
        />

        <div
          data-film="aperture"
          className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_58%_38%,transparent_8%,rgba(5,7,12,0.88)_64%)]"
          aria-hidden
        />

        <SceneStage>
          <div
            data-film="toast"
            className="w-full border border-[var(--color-signal)]/45 bg-black/70 p-3 opacity-0 backdrop-blur-md md:p-4"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse bg-[var(--color-signal)]" />
              <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-signal)] uppercase">
                Signal · New opportunity
              </p>
            </div>
            <p className="mt-2 font-display text-base text-white md:text-lg">
              {STORY_PROJECT.title}
            </p>
            <p className="mt-1 text-xs text-white/55">{STORY_PROJECT.client}</p>
          </div>

          <div
            data-film="brief"
            className="pointer-events-none absolute inset-0 opacity-0"
          >
            <ProjectBrief compact className="h-full" />
          </div>
        </SceneStage>

        <ScenePanel>
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 font-mono text-[10px] tracking-[0.28em] text-white/40 uppercase">
              {content.eyebrow}
            </p>
            <h1 id="scene-threshold-title" className="sr-only">
              {content.title}
            </h1>
            <div className="space-y-1 md:space-y-3">
              <p
                data-film="line"
                className="origin-left font-display text-[clamp(1.25rem,5.5vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[var(--color-paper)] opacity-0"
              >
                {content.line1}
              </p>
              <p
                data-film="line"
                className="origin-left font-display text-[clamp(1.25rem,5.5vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[var(--color-paper)] opacity-0"
              >
                {content.line2}
              </p>
              <p
                data-film="line"
                className="origin-left font-display text-[clamp(1.25rem,5.5vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[var(--color-daylight)] opacity-0"
              >
                {content.line3}
              </p>
            </div>

            <p
              data-film="support"
              className="mt-3 hidden max-w-xl text-base leading-relaxed text-white/75 opacity-0 md:mt-8 md:block md:text-lg"
            >
              {content.body}
            </p>

            <div
              data-film="meta"
              className="mt-3 hidden flex-wrap items-center gap-2 font-mono text-[9px] tracking-[0.16em] text-white/55 uppercase opacity-0 md:mt-5 md:flex md:gap-3 md:text-[11px]"
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

            <div
              data-film="cta"
              className="mt-4 flex flex-wrap gap-2 opacity-0 md:mt-8 md:gap-3"
            >
              <button
                type="button"
                onClick={() => scrollToScene("partner")}
                className={cn(
                  "pointer-events-auto border border-[var(--color-paper)] bg-[var(--color-paper)] px-4 py-2.5",
                  "font-mono text-[10px] tracking-[0.2em] text-[var(--color-void)] uppercase md:px-5 md:py-3 md:text-[11px]",
                  "hover:bg-transparent hover:text-[var(--color-paper)]",
                )}
              >
                {content.cta}
              </button>
              <button
                type="button"
                onClick={() => scrollToScene("split")}
                className="pointer-events-auto border border-white/25 px-3 py-2.5 font-mono text-[10px] tracking-[0.18em] text-white/55 uppercase hover:text-white md:px-4 md:py-3"
              >
                Skip story
              </button>
            </div>
          </div>
        </ScenePanel>

        <ScrollCue label={content.cue} />
      </ScenePin>
    </section>
  );
}
