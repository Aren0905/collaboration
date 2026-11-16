"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { FILM_ASSETS } from "@/lib/assets";
import { ILLUSTRATIVE_LISTINGS, MARKET_BEATS, SCENES } from "@/lib/content";

const content = SCENES.find((s) => s.id === "markets")!;

/**
 * Scene 3 — Laptop portal → geographic opportunities.
 * Signature: listing lifts off map toward camera (prep for interview cut).
 */
export function MarketsScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useCinematicScene({
    id: "markets",
    rootRef,
    pinRef,
    endDesktop: "+=260%",
    endMobile: "+=180%",
    scrubDesktop: 0.7,
    scrubMobile: 0.5,
    build: ({ gsap: g, q, targets, isDesktop }, tl) => {
      const map = q("[data-film='map']");
      const beats = q("[data-film='beat']");
      const card = q("[data-film='card']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const copy = targets(title, body);

      g.set(map, { scale: 1.25, filter: "brightness(0.45)" });
      g.set(beats, { opacity: 0, x: isDesktop ? -20 : 0, y: isDesktop ? 0 : 16 });
      g.set(card, { opacity: 0, y: 40, rotateX: 18, transformOrigin: "50% 100%" });
      g.set(copy, { opacity: 0, y: 20 });

      tl.to(map, { scale: 1, filter: "brightness(1)", duration: 1.1 }, 0);
      tl.to(copy, { opacity: 1, y: 0, stagger: 0.08, duration: 0.45 }, 0.25);
      tl.to(
        beats,
        { opacity: 1, x: 0, y: 0, stagger: 0.14, duration: 0.45 },
        0.55,
      );
      tl.to(
        card,
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7 },
        1.15,
      );
      // Lift listing toward camera — becomes interview doorway
      tl.to(
        card,
        {
          scale: isDesktop ? 1.35 : 1.15,
          y: isDesktop ? -40 : -20,
          z: 80,
          duration: 0.85,
        },
        1.7,
      );
      tl.to(map, { scale: 1.08, opacity: 0.55, duration: 0.85 }, 1.7);
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
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-end overflow-hidden bg-[var(--color-navy)] [perspective:1200px] md:items-center"
      >
        <div data-film="map" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.worldMap.src}
            alt={FILM_ASSETS.worldMap.alt}
            overlay="soft"
          />
        </div>

        <div className="relative z-[5] grid w-full gap-8 px-5 pb-14 md:grid-cols-[1.1fr_0.9fr] md:items-end md:px-10 md:pb-16 lg:px-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-signal)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-markets-title"
              data-film="title"
              className="mt-3 font-display text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.08] text-white"
            >
              {content.title}
            </h2>
            <p data-film="body" className="mt-4 max-w-md text-base text-white/75 md:text-lg">
              {content.body}
            </p>
            <p className="mt-3 max-w-md text-xs text-white/45">
              {content.disclaimer}
            </p>

            <ol className="mt-8 space-y-3">
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
          </div>

          <div
            data-film="card"
            className="will-change-transform border border-white/20 bg-black/60 p-5 backdrop-blur-md"
          >
            <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-daylight)] uppercase">
              Signal · listing lifts off the map
            </p>
            {ILLUSTRATIVE_LISTINGS.map((listing) => (
              <div
                key={listing.id}
                className="mt-4 border-t border-white/10 pt-4 first:mt-3 first:border-0 first:pt-0"
              >
                <p className="font-mono text-[10px] text-white/45 uppercase">
                  {listing.market}
                </p>
                <p className="mt-1 font-display text-xl text-white">
                  {listing.title}
                </p>
                <p className="mt-1 text-xs text-white/40">{listing.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
