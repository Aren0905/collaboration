"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { FILM_ASSETS } from "@/lib/assets";
import {
  DELIVERY_TIMELINE,
  DEV_PIPELINE,
  PARTNER_PIPELINE,
  SCENES,
} from "@/lib/content";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "delivery")!;

/**
 * Scene 5 — Dual synchronized timelines + perspective switch.
 */
export function DeliveryScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"both" | "dev" | "partner">("both");

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
      const rails = q("[data-film='rail']");
      const nodes = q("[data-film='node']");
      const filament = q("[data-film='filament']");

      g.set(plate, { scale: 1.12, opacity: 0.65 });
      g.set(title, { opacity: 0, y: 24 });
      g.set(rails, { opacity: 0, y: 18 });
      g.set(nodes, { opacity: 0, y: 14 });
      g.set(filament, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

      tl.to(plate, { scale: 1, opacity: 1, duration: 0.8 }, 0);
      tl.to(title, { opacity: 1, y: 0, duration: 0.45 }, 0.2);
      tl.to(rails, { opacity: 1, y: 0, stagger: 0.12, duration: 0.45 }, 0.45);
      tl.to(nodes, { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, 0.85);
      tl.to(filament, { scaleX: 1, opacity: 1, duration: 0.7 }, 1.45);
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
        <div
          data-film="plate"
          className={cn(
            "absolute inset-0 will-change-transform transition-[clip-path] duration-500",
            view === "dev" && "md:[clip-path:inset(0_45%_0_0)]",
            view === "partner" && "md:[clip-path:inset(0_0_0_45%)]",
          )}
        >
          <FilmPlate
            src={
              view === "dev"
                ? FILM_ASSETS.deliveryBuild.src
                : FILM_ASSETS.sharedProject.src
            }
            alt={
              view === "dev"
                ? FILM_ASSETS.deliveryBuild.alt
                : FILM_ASSETS.sharedProject.alt
            }
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
              className="mt-3 max-w-3xl font-display text-[clamp(1.55rem,3.6vw,2.7rem)] leading-[1.1] text-white"
            >
              You handle communication.
              <span className="block">I handle development.</span>
              <span className="block text-[var(--color-signal)]">
                We deliver together.
              </span>
            </h2>

            <div
              className="mt-5 flex flex-wrap gap-2"
              role="group"
              aria-label="Perspective"
            >
              {(
                [
                  ["both", "Both rooms"],
                  ["dev", "Developer view"],
                  ["partner", "Partner view"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  className={cn(
                    "border px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase",
                    view === id
                      ? "border-[var(--color-signal)] text-[var(--color-signal)]"
                      : "border-white/20 text-white/50 hover:text-white",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div
                data-film="rail"
                className="border border-[var(--color-tungsten)]/30 bg-black/45 p-4 backdrop-blur-sm"
              >
                <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-tungsten)] uppercase">
                  Developer timeline
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {DEV_PIPELINE.join(" → ")}
                </p>
              </div>
              <div
                data-film="rail"
                className="border border-[var(--color-daylight)]/30 bg-black/45 p-4 backdrop-blur-sm"
              >
                <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-daylight)] uppercase">
                  Partner timeline
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {PARTNER_PIPELINE.join(" → ")}
                </p>
              </div>
            </div>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {DELIVERY_TIMELINE.map((step) => (
                <li
                  key={step.id}
                  data-film="node"
                  className="border border-white/15 bg-black/50 p-3 backdrop-blur-sm"
                >
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-signal)] uppercase">
                    {step.label}
                  </p>
                  <p className="mt-1 text-xs text-white/65">{step.detail}</p>
                </li>
              ))}
            </ol>

            <div
              data-film="filament"
              className="mt-8 h-1 w-full bg-gradient-to-r from-[var(--color-tungsten)] via-[var(--color-signal)] to-[var(--color-daylight)]"
              aria-hidden
            />
            <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
              Completed project becomes the revenue Signal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
