"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import {
  ScenePin,
  ScenePanel,
  SceneStage,
} from "@/components/cinematic/ScenePin";
import { ProjectBrief } from "@/components/sim/ProjectBrief";
import { FILM_ASSETS } from "@/lib/assets";
import {
  ILLUSTRATIVE_LISTINGS,
  MARKET_BEATS,
  OUTREACH_STEPS,
  SCENES,
} from "@/lib/content";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "markets")!;

/**
 * Event 3 — Global opportunity search. Map stays visible; listing lifts in stage.
 */
export function MarketsScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useCinematicScene({
    id: "markets",
    rootRef,
    pinRef,
    endDesktop: "+=280%",
    endMobile: "+=160%",
    scrubDesktop: 0.7,
    scrubMobile: true,
    build: ({ gsap: g, q, targets, isDesktop }, tl) => {
      const map = q("[data-film='map']");
      const routes = q("[data-film='route']");
      const beats = q("[data-film='beat']");
      const card = q("[data-film='card']");
      const selected = q("[data-film='selected']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const copy = targets(title, body);

      g.set(map, { scale: 1.22, filter: "brightness(0.45)" });
      g.set(routes, { strokeDashoffset: 1, opacity: 0 });
      g.set(beats, { opacity: 0, y: 12 });
      g.set(card, {
        opacity: 0,
        y: 24,
        rotateX: isDesktop ? 12 : 0,
        transformOrigin: "50% 100%",
      });
      g.set(selected, { opacity: 0, scale: 0.96, y: 18 });
      g.set(copy, { opacity: 0, y: 14 });

      tl.to(map, { scale: 1, filter: "brightness(1)", duration: 1 }, 0);
      tl.to(copy, { opacity: 1, y: 0, stagger: 0.08, duration: 0.35 }, 0.15);
      tl.to(routes, { opacity: 1, strokeDashoffset: 0, duration: 0.85 }, 0.3);
      tl.to(beats, { opacity: 1, y: 0, stagger: 0.1, duration: 0.35 }, 0.5);
      tl.to(card, { opacity: 1, y: 0, rotateX: 0, duration: 0.5 }, 0.95);
      tl.to(selected, { opacity: 1, scale: 1, y: 0, duration: 0.45 }, 1.25);

      tl.to(
        selected,
        {
          scale: isDesktop ? 1.18 : 1.06,
          y: isDesktop ? -28 : -10,
          duration: 0.75,
        },
        1.75,
      );
      tl.to(map, { scale: 1.08, opacity: 0.55, duration: 0.75 }, 1.75);
      tl.to(card, { opacity: 0.35, duration: 0.5 }, 1.85);
    },
  });

  return (
    <section
      ref={rootRef}
      id="scene-markets"
      data-scene="markets"
      aria-labelledby="scene-markets-title"
      className="relative"
    >
      <ScenePin ref={pinRef} className="bg-[var(--color-navy)] [perspective:1200px]" align="end">
        <div data-film="map" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.worldMap.src}
            alt={FILM_ASSETS.worldMap.alt}
            focus={FILM_ASSETS.worldMap.focus}
            focusMobile={FILM_ASSETS.worldMap.focusMobile}
            overlay="soft"
          />
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
            viewBox="0 0 100 56"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              data-film="route"
              d="M28 28 C42 18, 58 18, 72 26"
              fill="none"
              stroke="var(--color-signal)"
              strokeWidth="0.35"
              pathLength={1}
              strokeDasharray={1}
            />
            <path
              data-film="route"
              d="M28 30 C40 34, 55 40, 68 36"
              fill="none"
              stroke="var(--color-daylight)"
              strokeWidth="0.3"
              pathLength={1}
              strokeDasharray={1}
            />
            <circle cx="28" cy="28" r="0.9" fill="var(--color-signal)" />
            <circle cx="72" cy="26" r="0.9" fill="var(--color-daylight)" />
          </svg>
        </div>

        <SceneStage className="md:hidden">
          <div
            data-film="selected"
            className="will-change-transform opacity-0"
          >
            <ProjectBrief compact />
          </div>
        </SceneStage>

        <ScenePanel>
          <div className="grid w-full gap-4 md:grid-cols-[1.05fr_0.95fr] md:items-end md:gap-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-signal)] uppercase">
                {content.eyebrow}
              </p>
              <h2
                id="scene-markets-title"
                data-film="title"
                className="mt-2 font-display text-[clamp(1.35rem,5vw,3rem)] leading-[1.08] text-white"
              >
                {content.title}
              </h2>
              <p
                data-film="body"
                className="mt-2 max-w-md text-sm text-white/75 md:mt-4 md:text-lg"
              >
                {content.body}
              </p>
              <p className="mt-2 hidden max-w-md text-xs text-white/45 md:block">
                {content.disclaimer}
              </p>

              <ol className="mt-4 hidden space-y-3 md:mt-8 md:block">
                {MARKET_BEATS.map((beat) => (
                  <li
                    key={beat.id}
                    data-film="beat"
                    className="border-l border-[var(--color-signal)]/50 pl-4"
                  >
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-signal)] uppercase">
                      {beat.index} · {beat.title}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{beat.detail}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-4 border border-white/15 bg-black/45 p-3 backdrop-blur-sm md:mt-8 md:p-4">
                <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-daylight)] uppercase">
                  How we apply together
                </p>
                <ol className="mt-2 space-y-1.5 md:mt-3 md:space-y-2">
                  {OUTREACH_STEPS.map((step) => (
                    <li key={step.id} data-film="beat">
                      <p className="text-xs font-medium text-[var(--color-tungsten)]">
                        {step.label}
                      </p>
                      <p className="hidden text-xs text-white/60 md:block">
                        {step.detail}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="hidden space-y-4 md:block">
              <div
                data-film="card"
                className="will-change-transform border border-white/20 bg-black/60 p-5 backdrop-blur-md"
              >
                <p className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase">
                  Opportunities on the map
                </p>
                {ILLUSTRATIVE_LISTINGS.map((listing) => (
                  <div
                    key={listing.id}
                    className={cn(
                      "mt-4 border-t border-white/10 pt-4 first:mt-3 first:border-0 first:pt-0",
                      listing.selected && "opacity-40",
                    )}
                  >
                    <p className="font-mono text-[10px] text-white/45 uppercase">
                      {listing.market}
                    </p>
                    <p className="mt-1 font-display text-lg text-white">
                      {listing.title}
                    </p>
                    <p className="mt-1 text-xs text-white/40">{listing.note}</p>
                  </div>
                ))}
              </div>

              <div data-film="selected" className="will-change-transform">
                <ProjectBrief />
              </div>
            </div>
          </div>
        </ScenePanel>
      </ScenePin>
    </section>
  );
}
