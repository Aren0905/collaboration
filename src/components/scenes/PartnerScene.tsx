"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { Hotspot } from "@/components/cinematic/Hotspot";
import { ProjectBrief } from "@/components/sim/ProjectBrief";
import { FILM_ASSETS } from "@/lib/assets";
import { SCENES } from "@/lib/content";

const content = SCENES.find((s) => s.id === "partner")!;

/**
 * Event 2 — The missing partner.
 * Empty chair → camera pullback → daylight room reveal → desks connect.
 */
export function PartnerScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useCinematicScene({
    id: "partner",
    rootRef,
    pinRef,
    endDesktop: "+=300%",
    endMobile: "+=200%",
    scrubDesktop: 0.72,
    scrubMobile: 0.5,
    build: ({ gsap: g, q, targets, isDesktop }, tl) => {
      const empty = q("[data-film='empty']");
      const partner = q("[data-film='partner']");
      const stage = q("[data-film='stage']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const hotspots = q("[data-film='hotspots']");
      const bridge = q("[data-film='bridge']");
      const capDev = q("[data-film='cap-dev']");
      const capPartner = q("[data-film='cap-partner']");
      const brief = q("[data-film='brief']");
      const copy = targets(title, body);

      g.set(empty, { opacity: 1, scale: 1.12 });
      g.set(partner, {
        opacity: 0,
        clipPath: isDesktop ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)",
      });
      g.set(stage, { rotateY: 0, scale: 1.04 });
      g.set(copy, { opacity: 0, y: 28 });
      g.set(hotspots, { opacity: 0, y: 16 });
      g.set(bridge, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
      g.set(capDev, { opacity: 0, x: -12 });
      g.set(capPartner, { opacity: 0, x: 12 });
      g.set(brief, { opacity: 0, y: 16 });

      // Pull back from empty chair
      tl.to(empty, { scale: 1, duration: 0.7 }, 0);
      tl.to(stage, { scale: 1, duration: 0.7 }, 0);
      tl.to(copy, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, 0.25);
      tl.to(brief, { opacity: 1, y: 0, duration: 0.4 }, 0.45);

      // Second room reveals
      tl.to(
        partner,
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 },
        0.7,
      );
      tl.to(empty, { opacity: 0.35, duration: 0.85 }, 0.85);
      tl.to(capDev, { opacity: 1, x: 0, duration: 0.4 }, 1.35);
      tl.to(capPartner, { opacity: 1, x: 0, duration: 0.4 }, 1.5);
      tl.to(hotspots, { opacity: 1, y: 0, duration: 0.45 }, 1.65);

      // Rooms align; signal bridge connects desks
      if (isDesktop) {
        tl.to(stage, { rotateY: -7, duration: 0.75 }, 1.9);
        tl.to(empty, { xPercent: -5, duration: 0.75 }, 1.9);
        tl.to(partner, { xPercent: 4, duration: 0.75 }, 1.9);
      }
      tl.to(bridge, { scaleX: 1, opacity: 1, duration: 0.6 }, 2.15);
      tl.to(partner, { scale: isDesktop ? 1.08 : 1.04, duration: 0.55 }, 2.4);
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

        <p
          data-film="cap-dev"
          className="absolute top-[18%] left-5 z-[5] hidden border border-[var(--color-tungsten)]/40 bg-black/55 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-[var(--color-tungsten)] uppercase md:block"
        >
          Developer · builds the software
        </p>
        <p
          data-film="cap-partner"
          className="absolute top-[18%] right-5 z-[5] hidden border border-[var(--color-daylight)]/40 bg-black/55 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-[var(--color-daylight)] uppercase md:block"
        >
          Partner · owns accounts · leads interviews
        </p>

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

            <div data-film="brief" className="mt-5 max-w-sm">
              <ProjectBrief compact />
            </div>

            <div data-film="hotspots" className="mt-8 flex flex-wrap gap-3">
              <Hotspot
                tone="tungsten"
                label="Code"
                detail="Frontend & backend engineering, architecture, testing, and delivery."
              />
              <Hotspot
                tone="tungsten"
                label="Remote support"
                detail="With your approval I help manage LinkedIn and outreach accounts remotely, plus targeting and applications."
              />
              <Hotspot
                tone="daylight"
                label="Accounts"
                detail="You own LinkedIn and professional profiles. We manage applications together under your approval."
              />
              <Hotspot
                tone="daylight"
                label="Interviews"
                detail="When a call is booked, you lead it. I prepare technical ground and support remotely."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
