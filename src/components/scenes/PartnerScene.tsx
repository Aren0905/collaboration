"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { Hotspot } from "@/components/cinematic/Hotspot";
import { FILM_ASSETS } from "@/lib/assets";
import { ROLE_CREDITS, SCENES } from "@/lib/content";

const content = SCENES.find((s) => s.id === "partner")!;

/**
 * Scene 2 — Empty chair → partner daylight → rooms align into one office.
 */
export function PartnerScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useCinematicScene({
    id: "partner",
    rootRef,
    pinRef,
    endDesktop: "+=280%",
    endMobile: "+=180%",
    scrubDesktop: 0.72,
    scrubMobile: 0.5,
    build: ({ gsap: g, q, isDesktop }, tl) => {
      const empty = q("[data-film='empty']");
      const partner = q("[data-film='partner']");
      const stage = q("[data-film='stage']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const hotspots = q("[data-film='hotspots']");
      const bridge = q("[data-film='bridge']");

      g.set(empty, { opacity: 1, scale: 1.06 });
      g.set(partner, {
        opacity: 0,
        clipPath: isDesktop ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)",
      });
      g.set(stage, { rotateY: 0 });
      g.set([title, body], { opacity: 0, y: 28 });
      g.set(hotspots, { opacity: 0, y: 16 });
      g.set(bridge, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

      tl.to(empty, { scale: 1, duration: 0.55 }, 0);
      tl.to([title, body], { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, 0.2);
      tl.to(
        partner,
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.15 },
        0.55,
      );
      tl.to(empty, { opacity: 0.2, duration: 0.8 }, 0.7);
      tl.to(hotspots, { opacity: 1, y: 0, duration: 0.45 }, 1.25);
      // Surprise: rooms rotate/align as one shared office
      if (isDesktop) {
        tl.to(stage, { rotateY: -8, duration: 0.7 }, 1.55);
        tl.to(empty, { xPercent: -6, duration: 0.7 }, 1.55);
        tl.to(partner, { xPercent: 4, duration: 0.7 }, 1.55);
      }
      tl.to(bridge, { scaleX: 1, opacity: 1, duration: 0.55 }, 1.85);
      tl.to(partner, { scale: isDesktop ? 1.1 : 1.06, duration: 0.6 }, 2.1);
    },
  });

  return (
    <section
      ref={rootRef}
      id="scene-partner"
      data-scene="partner"
      aria-labelledby="scene-partner-title"
      className="relative"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-end overflow-hidden bg-[var(--color-ink)] [perspective:1600px] md:items-center"
      >
        <div
          data-film="stage"
          className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
        >
          <div data-film="empty" className="absolute inset-0">
            <FilmPlate
              src={FILM_ASSETS.emptyChair.src}
              alt={FILM_ASSETS.emptyChair.alt}
              overlay="heavy"
            />
          </div>
          <div
            data-film="partner"
            className="absolute inset-0"
            style={{ clipPath: "inset(0 0 0 100%)" }}
          >
            <FilmPlate
              src={FILM_ASSETS.partnerDay.src}
              alt={FILM_ASSETS.partnerDay.alt}
              overlay="left"
            />
          </div>
        </div>

        <div
          data-film="bridge"
          className="pointer-events-none absolute top-1/2 right-[8%] left-[8%] z-[4] hidden h-px origin-left bg-gradient-to-r from-[var(--color-tungsten)] via-[var(--color-signal)] to-[var(--color-daylight)] md:block"
          aria-hidden
        />

        <div className="relative z-[5] w-full px-5 pb-14 md:px-10 lg:px-16">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-daylight)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-partner-title"
              data-film="title"
              className="mt-3 font-display text-[clamp(1.8rem,4.5vw,3.1rem)] leading-[1.08] text-white"
            >
              {content.title}
              <span className="mt-2 block text-[var(--color-daylight)]">
                {content.body}
              </span>
            </h2>

            <div
              data-film="hotspots"
              className="mt-8 flex flex-wrap gap-3"
            >
              <Hotspot
                tone="tungsten"
                label="Code"
                detail={ROLE_CREDITS.technical.lines.join(" · ")}
              />
              <Hotspot
                tone="tungsten"
                label="Architecture"
                detail="I design systems, solve hard technical problems, and keep delivery honest."
              />
              <Hotspot
                tone="daylight"
                label="English"
                detail={ROLE_CREDITS.communication.lines.join(" · ")}
              />
              <Hotspot
                tone="daylight"
                label="Interviews"
                detail="You lead professional conversations. I support technical preparation."
              />
            </div>

            <p className="mt-8 font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
              Two rooms align · the Signal becomes a connection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
