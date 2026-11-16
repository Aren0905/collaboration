"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { useExperience } from "@/components/experience/ExperienceContext";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { ProjectBrief } from "@/components/sim/ProjectBrief";
import { ScrollCue } from "@/components/opening/ScrollCue";
import { FILM_ASSETS } from "@/lib/assets";
import { STORY_PROJECT } from "@/lib/project";
import { SCENES } from "@/lib/content";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "threshold")!;

/**
 * Event 1 — Opportunity arrives.
 * Workspace → monitor zoom → notification expands into project brief.
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
    endMobile: "+=200%",
    scrubDesktop: 0.7,
    scrubMobile: 0.5,
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
      const copyBlock = targets(support, meta, cta);

      // Start barely visible — presence sensed, not fully seen
      g.set(veil, { opacity: 0.58 });
      g.set(plate, { scale: 1.14, filter: "brightness(0.55)" });
      g.set(toast, { opacity: 0, scale: 0.88, y: 28 });
      g.set(brief, { opacity: 0, scale: 0.92, y: 40, transformOrigin: "50% 0%" });
      g.set(lines, { opacity: 0, y: 36, rotateX: 12 });
      g.set(copyBlock, { opacity: 0, y: 18 });
      g.set(aperture, { scale: 0, opacity: 0 });

      // Reveal into a readable workspace
      tl.to(veil, { opacity: 0.08, duration: 0.85 }, 0);
      tl.to(
        plate,
        {
          scale: isDesktop ? 1.06 : 1.1,
          filter: "brightness(1)",
          duration: 1.15,
        },
        0,
      );

      // Notification appears on the “monitor”
      tl.to(toast, { opacity: 1, scale: 1, y: 0, duration: 0.5 }, 0.55);
      tl.to(
        lines,
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.1, duration: 0.45 },
        0.85,
      );
      tl.to(support, { opacity: 1, y: 0, duration: 0.35 }, 1.2);
      tl.to(meta, { opacity: 1, y: 0, duration: 0.3 }, 1.35);
      tl.to(cta, { opacity: 1, y: 0, duration: 0.3 }, 1.45);

      // Camera into monitor + toast expands into brief
      tl.to(
        plate,
        { scale: isDesktop ? 1.38 : 1.22, duration: 0.9 },
        1.75,
      );
      tl.to(
        toast,
        {
          scale: isDesktop ? 1.35 : 1.15,
          y: isDesktop ? -12 : -6,
          opacity: 0,
          duration: 0.55,
        },
        1.85,
      );
      tl.to(
        brief,
        { opacity: 1, scale: 1, y: 0, duration: 0.7 },
        2.05,
      );
      tl.to(aperture, { scale: 1, opacity: 0.85, duration: 0.65 }, 2.15);
      tl.to(
        targets(support, meta, cta, lines),
        { opacity: 0.28, duration: 0.45 },
        2.2,
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
        className="relative flex h-[100svh] w-full items-end overflow-hidden bg-[var(--color-void)] [perspective:1400px] md:items-center"
      >
        <div data-film="plate" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.developerNight.src}
            alt={FILM_ASSETS.developerNight.alt}
            priority
            overlay="soft"
          />
        </div>

        <div
          data-film="veil"
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_58%_40%,rgba(5,7,12,0.35)_0%,rgba(5,7,12,0.72)_48%,rgba(5,7,12,0.9)_100%)] opacity-[0.58]"
          aria-hidden
        />

        <div
          data-film="aperture"
          className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_58%_38%,transparent_8%,rgba(5,7,12,0.88)_64%)]"
          aria-hidden
        />

        {/* Compact toast notification */}
        <div
          data-film="toast"
          className="absolute top-[12%] right-4 left-4 z-[4] border border-[var(--color-signal)]/45 bg-black/65 p-3 backdrop-blur-md sm:left-auto sm:w-[min(320px,42vw)] sm:p-4 md:top-[15%] md:right-[8%]"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse bg-[var(--color-signal)]" />
            <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-signal)] uppercase">
              Signal · New opportunity
            </p>
          </div>
          <p className="mt-2 font-display text-base text-white sm:text-lg">
            {STORY_PROJECT.title}
          </p>
          <p className="mt-1 text-xs text-white/55">
            {STORY_PROJECT.client}
          </p>
        </div>

        {/* Expanded project brief */}
        <div
          data-film="brief"
          className="absolute top-[10%] right-4 left-4 z-[5] sm:left-auto sm:w-[min(420px,52vw)] md:top-[12%] md:right-[6%]"
        >
          <ProjectBrief />
        </div>

        <div className="relative z-[6] w-full px-5 pb-16 md:px-10 md:pb-0 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 font-mono text-[10px] tracking-[0.28em] text-white/40 uppercase">
              {content.eyebrow}
            </p>
            <h1 id="scene-threshold-title" className="sr-only">
              {content.title}
            </h1>
            <div className="space-y-2 md:space-y-3">
              <p
                data-film="line"
                className="origin-left font-display text-[clamp(1.65rem,5.2vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-paper)]"
              >
                {content.line1}
              </p>
              <p
                data-film="line"
                className="origin-left font-display text-[clamp(1.65rem,5.2vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-paper)]"
              >
                {content.line2}
              </p>
              <p
                data-film="line"
                className="origin-left font-display text-[clamp(1.65rem,5.2vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-daylight)]"
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

            <div data-film="cta" className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToScene("partner")}
                className={cn(
                  "pointer-events-auto border border-[var(--color-paper)] bg-[var(--color-paper)] px-5 py-3",
                  "font-mono text-[11px] tracking-[0.2em] text-[var(--color-void)] uppercase",
                  "hover:bg-transparent hover:text-[var(--color-paper)]",
                )}
              >
                {content.cta}
              </button>
              <button
                type="button"
                onClick={() => scrollToScene("split")}
                className="pointer-events-auto border border-white/25 px-4 py-3 font-mono text-[10px] tracking-[0.18em] text-white/55 uppercase hover:text-white"
              >
                Skip story
              </button>
            </div>
          </div>
        </div>

        <ScrollCue label={content.cue} />
      </div>
    </section>
  );
}
