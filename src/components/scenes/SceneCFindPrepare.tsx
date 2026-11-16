"use client";

import { useCallback, useRef } from "react";
import { EnvPanel } from "@/components/cinematic/EnvPanel";
import { SceneAside } from "@/components/cinematic/SceneAside";
import {
  useCinematicScene,
  type CinematicBuildContext,
  type CinematicTimeline,
} from "@/hooks/useCinematicScene";
import { PREPARE_ITEMS, SCENES } from "@/lib/content";

const meta = SCENES.find((s) => s.id === "prepare")!;

/**
 * Scene C — desk/portfolio materials assemble through spatial staging.
 * Transition language: depth push + horizontal card track (not fade-up stack).
 */
export function SceneCFindPrepare() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const onReducedMotion = useCallback((ctx: CinematicBuildContext) => {
    ctx.gsap.set(ctx.q("[data-cinematic]"), { clearProps: "transform,opacity" });
    ctx.gsap.set(ctx.q("[data-cinematic='card']"), { opacity: 1, x: 0, y: 0 });
  }, []);

  const build = useCallback(
    (ctx: CinematicBuildContext, tl: CinematicTimeline) => {
      const { gsap: g, q, isDesktop } = ctx;
      const desk = q("[data-cinematic='desk']");
      const laptop = q("[data-cinematic='laptop']");
      const cards = q("[data-cinematic='card']");
      const title = q("[data-cinematic='title']");

      g.set(desk, { y: 40, scale: 1.08 });
      g.set(laptop, { rotateX: isDesktop ? 28 : 10, y: 20, transformOrigin: "50% 100%" });
      g.set(cards, { x: isDesktop ? 80 : 40, opacity: 0 });
      g.set(title, { x: -24, opacity: 0 });

      tl.to(title, { x: 0, opacity: 1, duration: 0.5 }, 0);
      tl.to(desk, { y: 0, scale: 1, duration: 1.1 }, 0);
      tl.to(laptop, { rotateX: 0, y: 0, duration: 0.9 }, 0.25);

      // Materials slide into the desk frame along an X track
      tl.to(
        cards,
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.18,
        },
        0.85,
      );
      tl.to(
        laptop,
        { scale: isDesktop ? 0.96 : 1, x: isDesktop ? -18 : 0, duration: 0.6 },
        1.2,
      );
    },
    [],
  );

  useCinematicScene({
    id: "prepare",
    rootRef,
    pinRef,
    endDesktop: "+=240%",
    endMobile: "+=180%",
    build,
    onReducedMotion,
  });

  return (
    <section
      ref={rootRef}
      id="scene-prepare"
      data-scene="prepare"
      aria-labelledby="scene-prepare-title"
      className="relative z-10"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-center overflow-hidden bg-[var(--color-slate)]"
      >
        <div
          data-cinematic="desk"
          className="absolute inset-0 will-change-transform"
        >
          <EnvPanel
            tone="slate"
            label="Preparation desk"
            className="h-full border-0"
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-end md:px-12">
          <div data-cinematic="title" className="space-y-4">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-copper)] uppercase">
              {meta.eyebrow}
            </p>
            <h2
              id="scene-prepare-title"
              className="font-display text-3xl leading-tight md:text-5xl"
            >
              {meta.title}
            </h2>
            <p className="max-w-md text-sm text-white/65 md:text-base">{meta.body}</p>
          </div>

          <div className="relative">
            <div
              data-cinematic="laptop"
              className="relative aspect-[16/10] w-full origin-bottom overflow-hidden border border-white/15 bg-black/50 will-change-transform [transform-style:preserve-3d]"
            >
              <div className="absolute inset-3 border border-white/10 bg-[linear-gradient(160deg,rgba(243,239,230,0.06),transparent_40%),#12161b]">
                <div className="space-y-2 p-4">
                  <div className="h-2 w-1/3 bg-white/20" />
                  <div className="h-2 w-2/3 bg-white/10" />
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <span className="aspect-video bg-white/10" />
                    <span className="aspect-video bg-white/15" />
                    <span className="aspect-video bg-white/10" />
                  </div>
                  <p className="pt-3 font-mono text-[9px] tracking-[0.18em] text-white/40 uppercase">
                    Listings · portfolio · drafts
                  </p>
                </div>
              </div>
            </div>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {PREPARE_ITEMS.map((item) => (
                <li
                  key={item.id}
                  data-cinematic="card"
                  className="border border-white/15 bg-black/35 p-4 backdrop-blur-[2px]"
                >
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-copper)] uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-white/70">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <SceneAside eyebrow="Without animation" title={meta.title} body={meta.body}>
        <ul className="grid gap-3 pt-2 sm:grid-cols-2">
          {PREPARE_ITEMS.map((item) => (
            <li key={item.id} className="text-sm text-white/70">
              <span className="font-mono text-[var(--color-copper)]">{item.label}:</span>{" "}
              {item.detail}
            </li>
          ))}
        </ul>
      </SceneAside>
    </section>
  );
}
