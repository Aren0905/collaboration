"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { FILM_ASSETS } from "@/lib/assets";
import { DELIVERY_TIMELINE, SCENES } from "@/lib/content";

const content = SCENES.find((s) => s.id === "delivery")!;

/**
 * Scene 5 — Dual workspaces + converging project timeline.
 * Signature: timeline nodes fuse into a revenue filament cue.
 */
export function DeliveryScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useCinematicScene({
    id: "delivery",
    rootRef,
    pinRef,
    endDesktop: "+=240%",
    endMobile: "+=170%",
    scrubDesktop: 0.7,
    scrubMobile: 0.5,
    build: ({ gsap: g, q }, tl) => {
      const plate = q("[data-film='plate']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const nodes = q("[data-film='node']");
      const spine = q("[data-film='spine']");
      const filament = q("[data-film='filament']");

      g.set(plate, { scale: 1.1, opacity: 0.7 });
      g.set([title, body], { opacity: 0, y: 22 });
      g.set(nodes, { opacity: 0, y: 18 });
      g.set(spine, { scaleX: 0, transformOrigin: "left center" });
      g.set(filament, { opacity: 0, scaleX: 0.2, transformOrigin: "center" });

      tl.to(plate, { scale: 1, opacity: 1, duration: 0.8 }, 0);
      tl.to([title, body], { opacity: 1, y: 0, stagger: 0.08, duration: 0.45 }, 0.2);
      tl.to(spine, { scaleX: 1, duration: 0.8 }, 0.45);
      tl.to(nodes, { opacity: 1, y: 0, stagger: 0.12, duration: 0.4 }, 0.7);
      tl.to(
        filament,
        { opacity: 1, scaleX: 1, duration: 0.7 },
        1.5,
      );
    },
  });

  return (
    <section
      ref={rootRef}
      id="scene-delivery"
      data-scene="delivery"
      aria-labelledby="scene-delivery-title"
      className="relative"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-end overflow-hidden bg-[var(--color-ink)] md:items-center"
      >
        <div data-film="plate" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.sharedProject.src}
            alt={FILM_ASSETS.sharedProject.alt}
            overlay="bottom"
          />
        </div>

        <div className="relative z-[5] w-full px-5 pb-14 md:px-10 md:pb-16 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-signal)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-delivery-title"
              data-film="title"
              className="mt-3 max-w-3xl font-display text-[clamp(1.55rem,3.6vw,2.75rem)] leading-[1.1] text-white"
            >
              You handle communication.
              <span className="block">I handle development.</span>
              <span className="block text-[var(--color-signal)]">
                We deliver together.
              </span>
            </h2>
            <p data-film="body" className="mt-4 max-w-lg text-white/70">
              {content.body}
            </p>

            <div className="relative mt-10">
              <div
                data-film="spine"
                className="absolute top-5 right-0 left-0 hidden h-px bg-[var(--color-signal)]/50 md:block"
                aria-hidden
              />
              <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {DELIVERY_TIMELINE.map((step) => (
                  <li
                    key={step.id}
                    data-film="node"
                    className="border border-white/15 bg-black/50 p-4 backdrop-blur-sm"
                  >
                    <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-signal)] uppercase">
                      {step.label}
                    </p>
                    <p className="mt-2 text-sm text-white/70">{step.detail}</p>
                    <p className="mt-2 font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">
                      {step.owner === "dev"
                        ? "Developer"
                        : step.owner === "partner"
                          ? "Partner"
                          : "Both"}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div
              data-film="filament"
              className="mt-8 h-1 w-full origin-center bg-gradient-to-r from-[var(--color-tungsten)] via-[var(--color-signal)] to-[var(--color-daylight)]"
              aria-hidden
            />
            <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
              Project complete → revenue becomes a shared stream
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
