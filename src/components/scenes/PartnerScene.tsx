"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { Hotspot } from "@/components/cinematic/Hotspot";
import { ScenePin, ScenePanel } from "@/components/cinematic/ScenePin";
import { ProjectBrief } from "@/components/sim/ProjectBrief";
import { FILM_ASSETS } from "@/lib/assets";
import { SCENES } from "@/lib/content";

const content = SCENES.find((s) => s.id === "partner")!;

/**
 * Event 2 — The missing partner. Same room-reveal film on all viewports.
 */
export function PartnerScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useCinematicScene({
    id: "partner",
    rootRef,
    pinRef,
    endDesktop: "+=300%",
    endMobile: "+=160%",
    scrubDesktop: 0.72,
    scrubMobile: true,
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

      g.set(empty, { opacity: 1, scale: 1.1 });
      g.set(partner, {
        opacity: 0,
        clipPath: isDesktop ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)",
      });
      g.set(stage, { rotateY: 0, scale: 1.04 });
      g.set(copy, { opacity: 0, y: 18 });
      g.set(hotspots, { opacity: 0, y: 12 });
      g.set(bridge, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
      g.set(capDev, { opacity: 0, x: -12 });
      g.set(capPartner, { opacity: 0, x: 12 });
      g.set(brief, { opacity: 0, y: 12 });

      tl.to(empty, { scale: 1, duration: 0.6 }, 0);
      tl.to(stage, { scale: 1, duration: 0.6 }, 0);
      tl.to(copy, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, 0.2);
      tl.to(brief, { opacity: 1, y: 0, duration: 0.35 }, 0.4);

      tl.to(
        partner,
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1 },
        0.6,
      );
      tl.to(empty, { opacity: 0.35, duration: 0.8 }, 0.75);
      tl.to(capDev, { opacity: 1, x: 0, duration: 0.35 }, 1.2);
      tl.to(capPartner, { opacity: 1, x: 0, duration: 0.35 }, 1.35);
      tl.to(hotspots, { opacity: 1, y: 0, duration: 0.4 }, 1.45);

      if (isDesktop) {
        tl.to(stage, { rotateY: -7, duration: 0.7 }, 1.8);
        tl.to(empty, { xPercent: -5, duration: 0.7 }, 1.8);
        tl.to(partner, { xPercent: 4, duration: 0.7 }, 1.8);
      }
      tl.to(bridge, { scaleX: 1, opacity: 1, duration: 0.5 }, 2);
      tl.to(partner, { scale: isDesktop ? 1.08 : 1.04, duration: 0.45 }, 2.25);
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
      <ScenePin
        ref={pinRef}
        className="bg-[var(--color-ink)] [perspective:1600px]"
        align="end"
      >
        <div
          data-film="stage"
          className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
        >
          <div data-film="empty" className="absolute inset-0">
            <FilmPlate
              src={FILM_ASSETS.emptyChair.src}
              alt={FILM_ASSETS.emptyChair.alt}
              focus={FILM_ASSETS.emptyChair.focus}
              focusMobile={FILM_ASSETS.emptyChair.focusMobile}
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
              focus={FILM_ASSETS.partnerDay.focus}
              focusMobile={FILM_ASSETS.partnerDay.focusMobile}
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

        <ScenePanel>
          <div className="max-w-xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-daylight)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-partner-title"
              data-film="title"
              className="mt-2 font-display text-[clamp(1.35rem,5vw,3.1rem)] leading-[1.08] text-white opacity-0"
            >
              {content.title}
              <span
                data-film="body"
                className="mt-2 block text-[var(--color-daylight)] opacity-0"
              >
                {content.body}
              </span>
            </h2>

            <div data-film="brief" className="mt-3 max-w-sm md:mt-5">
              <ProjectBrief compact />
            </div>

            <div
              data-film="hotspots"
              className="mt-4 flex flex-wrap gap-2 md:mt-8 md:gap-3"
            >
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
        </ScenePanel>
      </ScenePin>
    </section>
  );
}
