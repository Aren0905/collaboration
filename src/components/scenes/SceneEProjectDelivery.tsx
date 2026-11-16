"use client";

import { useCallback, useRef } from "react";
import { EnvPanel } from "@/components/cinematic/EnvPanel";
import { SceneAside } from "@/components/cinematic/SceneAside";
import {
  useCinematicScene,
  type CinematicBuildContext,
  type CinematicTimeline,
} from "@/hooks/useCinematicScene";
import { DELIVERY_TIMELINE, SCENES } from "@/lib/content";

const meta = SCENES.find((s) => s.id === "delivery")!;

/**
 * Scene E — Dual timelines merge into one project spine.
 * Continues the portal language: code world opens into two rails that fuse.
 */
export function SceneEProjectDelivery() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const onReducedMotion = useCallback((ctx: CinematicBuildContext) => {
    const { gsap: g, q } = ctx;
    g.set(q("[data-cinematic]"), { clearProps: "transform,opacity,clipPath" });
    g.set(q("[data-cinematic='step']"), { opacity: 1, y: 0 });
    g.set(q("[data-cinematic='rail-dev'], [data-cinematic='rail-partner']"), {
      y: 0,
      opacity: 1,
    });
    g.set(q("[data-cinematic='spine']"), { strokeDashoffset: 0, opacity: 1 });
    g.set(q("[data-cinematic='merge-label']"), { opacity: 1 });
  }, []);

  const build = useCallback(
    (ctx: CinematicBuildContext, tl: CinematicTimeline) => {
      const { gsap: g, q, isDesktop } = ctx;
      const screenBleed = q("[data-cinematic='screen-bleed']");
      const dev = q("[data-cinematic='dev']");
      const partner = q("[data-cinematic='partner']");
      const railDev = q("[data-cinematic='rail-dev']");
      const railPartner = q("[data-cinematic='rail-partner']");
      const spine = q("[data-cinematic='spine']");
      const mergeLabel = q("[data-cinematic='merge-label']");
      const steps = q("[data-cinematic='step']");
      const title = q("[data-cinematic='title']");

      g.set(screenBleed, { opacity: 1, scale: 1.05 });
      g.set(dev, {
        clipPath: isDesktop
          ? "inset(0% 100% 0% 0%)"
          : "inset(0% 0% 100% 0%)",
      });
      g.set(partner, {
        clipPath: isDesktop
          ? "inset(0% 0% 0% 100%)"
          : "inset(100% 0% 0% 0%)",
      });
      g.set(railDev, { y: isDesktop ? -28 : -16, opacity: 0.3 });
      g.set(railPartner, { y: isDesktop ? 28 : 16, opacity: 0.3 });
      g.set(spine, { strokeDashoffset: 1, opacity: 0.2 });
      g.set(mergeLabel, { opacity: 0, y: 10 });
      g.set(steps, { opacity: 0, y: 18 });
      g.set(title, { opacity: 0, y: 14 });

      // Exit the laptop portal into dual workspaces
      tl.to(title, { opacity: 1, y: 0, duration: 0.45 }, 0);
      tl.to(screenBleed, { opacity: 0, scale: 1.2, duration: 0.7 }, 0.1);
      tl.to(dev, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85 }, 0.25);
      tl.to(partner, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85 }, 0.35);

      // Two timelines run in parallel, then physically converge
      tl.to(railDev, { opacity: 1, duration: 0.4 }, 0.9);
      tl.to(railPartner, { opacity: 1, duration: 0.4 }, 0.9);
      tl.to(railDev, { y: 0, duration: 1 }, 1.15);
      tl.to(railPartner, { y: 0, duration: 1 }, 1.15);
      tl.to(spine, { strokeDashoffset: 0, opacity: 1, duration: 0.9 }, 1.55);
      tl.to(mergeLabel, { opacity: 1, y: 0, duration: 0.4 }, 1.9);

      // Shared project beats light along the merged spine
      tl.to(
        steps,
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 },
        2.05,
      );
    },
    [],
  );

  useCinematicScene({
    id: "delivery",
    rootRef,
    pinRef,
    endDesktop: "+=300%",
    endMobile: "+=220%",
    build,
    onReducedMotion,
  });

  return (
    <section
      ref={rootRef}
      id="scene-delivery"
      data-scene="delivery"
      aria-labelledby="scene-delivery-title"
      className="relative z-10"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full overflow-hidden bg-[var(--color-ink)]"
      >
        {/* Continuity bleed from the interview laptop portal */}
        <div
          data-cinematic="screen-bleed"
          className="absolute inset-0 z-[1] bg-[#0d1117] will-change-transform"
          aria-hidden
        >
          <div className="absolute inset-0 opacity-40">
            <div className="space-y-2 p-10 font-mono text-xs text-[var(--color-signal)]/70">
              <p>{"// crossing from conversation into delivery"}</p>
              <p>mergeTimelines(partner, developer);</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-[2] grid md:grid-cols-2">
          <div data-cinematic="dev" className="relative min-h-[45vh] md:min-h-0">
            <EnvPanel
              tone="tungsten"
              label="Developer timeline · implement & test"
              className="h-full border-0 md:border-r md:border-white/10"
            />
          </div>
          <div data-cinematic="partner" className="relative min-h-[40vh] md:min-h-0">
            <EnvPanel
              tone="daylight"
              label="Partner timeline · client updates"
              className="h-full border-0"
            />
          </div>
        </div>

        {/* Dual rails → merged spine */}
        <div className="pointer-events-none absolute inset-x-0 top-[38%] z-[5] px-6 md:px-16">
          <div className="relative mx-auto h-28 max-w-4xl">
            <div
              data-cinematic="rail-dev"
              className="absolute inset-x-0 top-[28%] h-px bg-[var(--color-tungsten)]/70 will-change-transform"
            />
            <div
              data-cinematic="rail-partner"
              className="absolute inset-x-0 top-[72%] h-px bg-[var(--color-daylight)]/70 will-change-transform"
            />
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                data-cinematic="spine"
                d="M 4 20 C 28 8, 40 32, 50 20 S 72 8, 96 20"
                fill="none"
                stroke="rgba(125,204,163,0.85)"
                strokeWidth="0.7"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            </svg>
            <p
              data-cinematic="merge-label"
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-mono text-[10px] tracking-[0.28em] text-[var(--color-signal)] uppercase"
            >
              Two timelines · one project
            </p>
          </div>
        </div>

        <div className="relative z-20 mx-auto flex h-full w-full max-w-6xl flex-col justify-end gap-8 px-6 pb-10 pt-28 md:px-12 md:pb-14">
          <div data-cinematic="title" className="max-w-xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-signal)] uppercase">
              {meta.eyebrow}
            </p>
            <h2
              id="scene-delivery-title"
              className="mt-3 font-display text-3xl leading-tight md:text-5xl"
            >
              {meta.title}
            </h2>
            <p className="mt-4 text-sm text-white/65 md:text-base">{meta.body}</p>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERY_TIMELINE.map((step, index) => (
              <li
                key={step.id}
                data-cinematic="step"
                className="border border-white/15 bg-black/40 p-4"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-signal)] uppercase">
                  {String(index + 1).padStart(2, "0")} · {step.label}
                </p>
                <p className="mt-2 text-sm text-white/70">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <SceneAside eyebrow="Without animation" title={meta.title} body={meta.body}>
        <p className="mb-3 text-sm text-white/55">
          Delivery fuses two workstreams—communication updates and technical
          build—into one shared project spine.
        </p>
        <ol className="space-y-3">
          {DELIVERY_TIMELINE.map((step) => (
            <li key={step.id} className="text-sm text-white/70">
              <span className="font-mono text-[var(--color-signal)]">{step.label}:</span>{" "}
              {step.detail}
            </li>
          ))}
        </ol>
      </SceneAside>
    </section>
  );
}
