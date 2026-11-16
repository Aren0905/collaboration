"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { useExperience } from "@/components/experience/ExperienceContext";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { ScrollCue } from "@/components/opening/ScrollCue";
import { EXAMPLE_PROJECT, FILM_ASSETS } from "@/lib/assets";
import { SCENES } from "@/lib/content";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "threshold")!;

/**
 * Scene 1 — Darkness → workspace → Signal notification → dive through glass.
 */
export function OpeningScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollToScene } = useExperience();

  useCinematicScene({
    id: "threshold",
    rootRef,
    pinRef,
    endDesktop: "+=260%",
    endMobile: "+=160%",
    scrubDesktop: 0.7,
    scrubMobile: 0.5,
    build: ({ gsap: g, q, targets, isDesktop }, tl) => {
      const plate = q("[data-film='plate']");
      const veil = q("[data-film='veil']");
      const signal = q("[data-film='signal']");
      const lines = q("[data-film='line']");
      const support = q("[data-film='support']");
      const meta = q("[data-film='meta']");
      const cta = q("[data-film='cta']");
      const aperture = q("[data-film='aperture']");
      const copyBlock = targets(support, meta, cta);

      g.set(veil, { opacity: 1 });
      g.set(plate, { scale: 1.22, filter: "brightness(0.35)" });
      g.set(signal, { opacity: 0, scale: 0.86, y: 30 });
      g.set(lines, { opacity: 0, y: 36, rotateX: 12 });
      g.set(copyBlock, { opacity: 0, y: 18 });
      g.set(aperture, { scale: 0, opacity: 0 });

      tl.to(veil, { opacity: 0.08, duration: 0.85 }, 0);
      tl.to(
        plate,
        {
          scale: isDesktop ? 1.04 : 1.08,
          filter: "brightness(1)",
          duration: 1.25,
        },
        0,
      );
      tl.to(signal, { opacity: 1, scale: 1, y: 0, duration: 0.55 }, 0.5);
      tl.to(
        lines,
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.1, duration: 0.5 },
        0.95,
      );
      tl.to(support, { opacity: 1, y: 0, duration: 0.4 }, 1.35);
      tl.to(meta, { opacity: 1, y: 0, duration: 0.35 }, 1.5);
      tl.to(cta, { opacity: 1, y: 0, duration: 0.35 }, 1.6);
      // Signature: notification expands; camera dives through glass
      tl.to(
        signal,
        {
          scale: isDesktop ? 1.55 : 1.25,
          y: isDesktop ? -20 : -10,
          duration: 0.75,
        },
        1.85,
      );
      tl.to(
        plate,
        { scale: isDesktop ? 1.35 : 1.2, duration: 0.9 },
        1.85,
      );
      tl.to(aperture, { scale: 1, opacity: 0.9, duration: 0.7 }, 2.05);
      tl.to(targets(support, meta, cta, lines), { opacity: 0.35, duration: 0.5 }, 2.1);
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
            overlay="heavy"
          />
        </div>

        <div
          data-film="veil"
          className="pointer-events-none absolute inset-0 z-[2] bg-[var(--color-void)]"
          aria-hidden
        />

        <div
          data-film="aperture"
          className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_60%_40%,transparent_10%,rgba(5,7,12,0.85)_62%)]"
          aria-hidden
        />

        <div
          data-film="signal"
          className="absolute top-[11%] right-4 left-4 z-[4] border border-[var(--color-signal)]/40 bg-black/60 p-3 backdrop-blur-md sm:left-auto sm:w-[min(340px,44vw)] sm:p-4 md:top-[16%] md:right-[7%]"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse bg-[var(--color-signal)]" />
            <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-signal)] uppercase">
              Signal · New opportunity
            </p>
          </div>
          <p className="mt-2 font-display text-base text-white sm:text-lg">
            {EXAMPLE_PROJECT.title}
          </p>
          <p className="mt-1 text-xs text-white/60">
            {EXAMPLE_PROJECT.client} · {EXAMPLE_PROJECT.scope}
          </p>
          <p className="mt-2 font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">
            {EXAMPLE_PROJECT.label}
          </p>
        </div>

        <div className="relative z-[5] w-full px-5 pb-16 md:px-10 md:pb-0 lg:px-16">
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
                onClick={() => scrollToScene("invite")}
                className="pointer-events-auto border border-white/30 px-5 py-3 font-mono text-[11px] tracking-[0.2em] text-white/70 uppercase hover:border-white/60 hover:text-white"
              >
                Become a partner
              </button>
            </div>
          </div>
        </div>

        <ScrollCue label={content.cue} />
      </div>
    </section>
  );
}
