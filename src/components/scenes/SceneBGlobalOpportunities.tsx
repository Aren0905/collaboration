"use client";

import { useCallback, useRef } from "react";
import { SceneAside } from "@/components/cinematic/SceneAside";
import {
  useCinematicScene,
  type CinematicBuildContext,
  type CinematicTimeline,
} from "@/hooks/useCinematicScene";
import { MARKET_BEATS, SCENES } from "@/lib/content";

const meta = SCENES.find((s) => s.id === "markets")!;

/**
 * Scene B — geographic camera moves across opportunity regions.
 * Transition language: orbit/pan + sequential marker ignition.
 */
export function SceneBGlobalOpportunities() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const onReducedMotion = useCallback((ctx: CinematicBuildContext) => {
    ctx.gsap.set(ctx.q("[data-cinematic]"), {
      clearProps: "transform,opacity",
    });
    ctx.gsap.set(ctx.q("[data-cinematic='beat']"), { opacity: 1, y: 0 });
    ctx.gsap.set(ctx.q("[data-cinematic='marker']"), { scale: 1, opacity: 1 });
  }, []);

  const build = useCallback(
    (ctx: CinematicBuildContext, tl: CinematicTimeline) => {
      const { gsap: g, q, isDesktop } = ctx;
      const globe = q("[data-cinematic='globe']");
      const arcs = q("[data-cinematic='arc']");
      const markers = q("[data-cinematic='marker']");
      const beats = q("[data-cinematic='beat']");
      const title = q("[data-cinematic='title']");

      g.set(globe, {
        rotateY: isDesktop ? -35 : -12,
        rotateX: 12,
        scale: 0.92,
      });
      g.set(arcs, { strokeDashoffset: 1 });
      g.set(markers, { scale: 0, opacity: 0 });
      g.set(beats, { y: 28, opacity: 0 });
      g.set(title, { y: 20, opacity: 0 });

      tl.to(title, { y: 0, opacity: 1, duration: 0.5 }, 0);
      tl.to(
        globe,
        {
          rotateY: isDesktop ? 8 : 0,
          rotateX: 8,
          scale: 1,
          duration: 1.1,
        },
        0,
      );

      // 01 Home
      tl.to(markers[0], { scale: 1, opacity: 1, duration: 0.35 }, 0.7);
      tl.to(beats[0], { y: 0, opacity: 1, duration: 0.45 }, 0.75);
      tl.to(arcs[0], { strokeDashoffset: 0, duration: 0.6 }, 0.8);

      // Camera swing to Atlantic
      tl.to(
        globe,
        {
          rotateY: isDesktop ? 42 : 18,
          rotateX: 6,
          duration: 1,
        },
        1.3,
      );
      tl.to(markers[1], { scale: 1, opacity: 1, duration: 0.35 }, 1.55);
      tl.to(beats[1], { y: 0, opacity: 1, duration: 0.45 }, 1.6);
      tl.to(arcs[1], { strokeDashoffset: 0, duration: 0.6 }, 1.65);

      // Pull back to world view
      tl.to(
        globe,
        {
          rotateY: isDesktop ? 12 : 6,
          rotateX: 10,
          scale: isDesktop ? 1.06 : 1.02,
          duration: 1,
        },
        2.2,
      );
      tl.to(markers[2], { scale: 1, opacity: 1, duration: 0.4 }, 2.4);
      tl.to(beats[2], { y: 0, opacity: 1, duration: 0.45 }, 2.45);
      tl.to(arcs[2], { strokeDashoffset: 0, duration: 0.7 }, 2.5);
    },
    [],
  );

  useCinematicScene({
    id: "markets",
    rootRef,
    pinRef,
    endDesktop: "+=320%",
    endMobile: "+=240%",
    build,
    onReducedMotion,
  });

  return (
    <section
      ref={rootRef}
      id="scene-markets"
      data-scene="markets"
      aria-labelledby="scene-markets-title"
      className="relative z-10"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-center overflow-hidden bg-[var(--color-ink-soft)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(123,163,184,0.12),transparent_55%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-6 md:grid-cols-[1.05fr_0.95fr] md:px-12">
          <div data-cinematic="title" className="space-y-4">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-daylight)] uppercase">
              {meta.eyebrow}
            </p>
            <h2
              id="scene-markets-title"
              className="font-display text-3xl leading-tight md:text-5xl"
            >
              {meta.title}
            </h2>
            <p className="max-w-md text-sm text-white/65 md:text-base">{meta.body}</p>

            <ol className="mt-6 space-y-5">
              {MARKET_BEATS.map((beat) => (
                <li
                  key={beat.id}
                  data-cinematic="beat"
                  className="border-l border-white/20 pl-4"
                >
                  <p className="font-mono text-[10px] tracking-[0.22em] text-[var(--color-daylight)] uppercase">
                    {beat.index}
                  </p>
                  <p className="mt-1 font-display text-xl md:text-2xl">{beat.title}</p>
                  <p className="mt-1 text-sm text-white/60">{beat.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Geographic stage */}
          <div className="relative mx-auto aspect-square w-full max-w-[420px] [perspective:900px]">
            <div
              data-cinematic="globe"
              className="relative h-full w-full rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,#2a3540,#0e1318_70%)] shadow-[inset_-30px_-20px_60px_rgba(0,0,0,0.55),0_40px_80px_rgba(0,0,0,0.4)] [transform-style:preserve-3d] will-change-transform"
            >
              <svg
                className="absolute inset-[6%] h-[88%] w-[88%] opacity-70"
                viewBox="0 0 100 100"
                aria-hidden
              >
                {/* Lat / long suggestion */}
                <ellipse
                  cx="50"
                  cy="50"
                  rx="46"
                  ry="46"
                  fill="none"
                  stroke="rgba(243,239,230,0.12)"
                  strokeWidth="0.3"
                />
                {[18, 32, 50, 68, 82].map((y) => (
                  <ellipse
                    key={y}
                    cx="50"
                    cy={y}
                    rx={Math.max(8, 44 - Math.abs(50 - y) * 0.55)}
                    ry="3.5"
                    fill="none"
                    stroke="rgba(123,163,184,0.18)"
                    strokeWidth="0.25"
                  />
                ))}
                {[28, 40, 50, 60, 72].map((x) => (
                  <path
                    key={x}
                    d={`M ${x} 8 Q ${x + (x - 50) * 0.15} 50 ${x} 92`}
                    fill="none"
                    stroke="rgba(243,239,230,0.1)"
                    strokeWidth="0.25"
                  />
                ))}

                <path
                  data-cinematic="arc"
                  d="M 68 42 Q 55 28 38 48"
                  fill="none"
                  stroke="rgba(201,162,126,0.65)"
                  strokeWidth="0.5"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
                <path
                  data-cinematic="arc"
                  d="M 38 48 Q 30 40 24 44"
                  fill="none"
                  stroke="rgba(123,163,184,0.7)"
                  strokeWidth="0.5"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
                <path
                  data-cinematic="arc"
                  d="M 24 44 Q 50 60 72 55"
                  fill="none"
                  stroke="rgba(125,204,163,0.55)"
                  strokeWidth="0.45"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
              </svg>

              <span
                data-cinematic="marker"
                className="absolute top-[40%] right-[28%] size-2.5 rounded-full bg-[var(--color-tungsten)] shadow-[0_0_16px_rgba(201,162,126,0.7)]"
                title="Home market"
              />
              <span
                data-cinematic="marker"
                className="absolute top-[38%] left-[22%] size-2.5 rounded-full bg-[var(--color-daylight)] shadow-[0_0_16px_rgba(123,163,184,0.7)]"
                title="US / UK"
              />
              <span
                data-cinematic="marker"
                className="absolute bottom-[28%] left-1/2 size-3 -translate-x-1/2 rounded-full bg-[var(--color-signal)] shadow-[0_0_18px_rgba(125,204,163,0.65)]"
                title="Worldwide"
              />
            </div>
            <p className="mt-4 text-center font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
              Geographic focus · not a placement guarantee
            </p>
          </div>
        </div>
      </div>

      <SceneAside eyebrow="Without animation" title={meta.title} body={meta.body}>
        <ol className="space-y-4 pt-2">
          {MARKET_BEATS.map((beat) => (
            <li key={beat.id}>
              <p className="font-mono text-[10px] text-[var(--color-daylight)] uppercase">
                {beat.index} · {beat.title}
              </p>
              <p className="text-sm text-white/65">{beat.detail}</p>
            </li>
          ))}
        </ol>
      </SceneAside>
    </section>
  );
}
