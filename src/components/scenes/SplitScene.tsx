"use client";

import { useCallback, useRef, useState } from "react";
import { SceneAside } from "@/components/cinematic/SceneAside";
import { RevenueExampleSlider } from "@/components/cinematic/RevenueExampleSlider";
import {
  useCinematicScene,
  type CinematicBuildContext,
  type CinematicTimeline,
} from "@/hooks/useCinematicScene";
import { SCENES } from "@/lib/content";
import {
  EXAMPLE_REVENUE_DEFAULT,
  formatUSD,
  splitRevenue,
} from "@/lib/revenue";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "split")!;

/**
 * 60/40 revenue-sharing scene — scroll-drawn bifurcation + illustrative calculator.
 * No casino FX; math always sums to the example total.
 */
export function SplitScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [exampleRevenue, setExampleRevenue] = useState(EXAMPLE_REVENUE_DEFAULT);
  const { developer, partner } = splitRevenue(exampleRevenue);

  const onReducedMotion = useCallback((ctx: CinematicBuildContext) => {
    const { gsap: g, q } = ctx;
    g.set(q("[data-cinematic='trunk'], [data-cinematic='path-dev'], [data-cinematic='path-partner']"), {
      strokeDashoffset: 0,
    });
    g.set(
      q(
        "[data-cinematic='label'], [data-cinematic='closing'], [data-cinematic='title'], [data-cinematic='calculator']",
      ),
      { opacity: 1, y: 0 },
    );
    g.set(
      q(
        "[data-cinematic='node-source'], [data-cinematic='node-dev'], [data-cinematic='node-partner']",
      ),
      { scale: 1, opacity: 1 },
    );
    g.set(q("[data-cinematic='stage']"), {
      rotateX: 0,
      rotateY: 0,
      z: 0,
    });
  }, []);

  const build = useCallback(
    (ctx: CinematicBuildContext, tl: CinematicTimeline) => {
      const { gsap: g, q, isDesktop } = ctx;
      const stage = q("[data-cinematic='stage']");
      const trunk = q("[data-cinematic='trunk']");
      const pathDev = q("[data-cinematic='path-dev']");
      const pathPartner = q("[data-cinematic='path-partner']");
      const nodeSource = q("[data-cinematic='node-source']");
      const nodeDev = q("[data-cinematic='node-dev']");
      const nodePartner = q("[data-cinematic='node-partner']");
      const labels = q("[data-cinematic='label']");
      const closing = q("[data-cinematic='closing']");
      const title = q("[data-cinematic='title']");
      const calculator = q("[data-cinematic='calculator']");

      g.set(stage, {
        rotateX: isDesktop ? 18 : 8,
        rotateY: isDesktop ? -10 : 0,
        z: isDesktop ? -40 : 0,
        transformOrigin: "50% 40%",
      });
      g.set([trunk, pathDev, pathPartner], { strokeDashoffset: 1 });
      g.set([nodeSource, nodeDev, nodePartner], { scale: 0, opacity: 0 });
      g.set(labels, { y: 18, opacity: 0 });
      g.set(title, { y: 16, opacity: 0 });
      g.set(closing, { y: 20, opacity: 0 });
      g.set(calculator, { y: 24, opacity: 0 });

      // Source appears; camera eases toward orthographic clarity
      tl.to(title, { y: 0, opacity: 1, duration: 0.45 }, 0);
      tl.to(nodeSource, { scale: 1, opacity: 1, duration: 0.35 }, 0.1);
      tl.to(trunk, { strokeDashoffset: 0, duration: 0.7 }, 0.2);
      tl.to(
        stage,
        {
          rotateX: isDesktop ? 6 : 2,
          rotateY: 0,
          z: 0,
          duration: 1.2,
        },
        0.3,
      );

      // Bifurcation
      tl.to(pathDev, { strokeDashoffset: 0, duration: 0.85 }, 0.85);
      tl.to(pathPartner, { strokeDashoffset: 0, duration: 0.85 }, 0.95);
      tl.to(nodeDev, { scale: 1, opacity: 1, duration: 0.35 }, 1.35);
      tl.to(nodePartner, { scale: 1, opacity: 1, duration: 0.35 }, 1.45);
      tl.to(labels, { y: 0, opacity: 1, duration: 0.45, stagger: 0.1 }, 1.5);

      // Calculator + closing
      tl.to(calculator, { y: 0, opacity: 1, duration: 0.55 }, 1.9);
      tl.to(closing, { y: 0, opacity: 1, duration: 0.5 }, 2.25);
    },
    [],
  );

  useCinematicScene({
    id: "split",
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
      id="scene-split"
      data-scene="split"
      aria-labelledby="scene-split-title"
      className="relative z-10"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-center overflow-hidden bg-[var(--color-ink)]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(201,162,126,0.1),transparent_45%),radial-gradient(ellipse_at_70%_70%,rgba(123,163,184,0.08),transparent_40%)]"
          aria-hidden
        />
        <div className="film-grain pointer-events-none absolute inset-0 z-[1] opacity-[0.035] mix-blend-overlay" />

        <div className="relative z-10 mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_1fr_auto] gap-4 px-6 py-24 md:grid-rows-[auto_minmax(0,1fr)_auto] md:gap-6 md:px-12 md:py-20">
          <div data-cinematic="title" className="max-w-2xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-copper)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-split-title"
              className="mt-2 font-display text-3xl leading-tight md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/65 md:text-base">
              {content.body}
            </p>
          </div>

          {/* 2.5D path stage */}
          <div className="relative min-h-0 [perspective:1100px]">
            <div
              data-cinematic="stage"
              className="relative mx-auto flex h-full max-h-[340px] w-full max-w-3xl items-center justify-center will-change-transform [transform-style:preserve-3d] md:max-h-none"
            >
              <svg
                className="h-full w-full"
                viewBox="0 0 100 72"
                fill="none"
                role="img"
                aria-label="Project revenue dividing into a 60 percent developer path and a 40 percent communication partner path"
              >
                <defs>
                  <linearGradient id="split-trunk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(243,239,230,0.15)" />
                    <stop offset="100%" stopColor="rgba(243,239,230,0.75)" />
                  </linearGradient>
                  <linearGradient id="split-dev" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(243,239,230,0.55)" />
                    <stop offset="100%" stopColor="rgba(201,162,126,0.95)" />
                  </linearGradient>
                  <linearGradient id="split-partner" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(243,239,230,0.55)" />
                    <stop offset="100%" stopColor="rgba(123,163,184,0.95)" />
                  </linearGradient>
                  <filter id="split-soft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.25" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Soft plane */}
                <rect
                  x="4"
                  y="4"
                  width="92"
                  height="64"
                  rx="1"
                  stroke="rgba(243,239,230,0.08)"
                  strokeWidth="0.3"
                />

                <path
                  data-cinematic="trunk"
                  d="M 50 8 V 30"
                  stroke="url(#split-trunk)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  filter="url(#split-soft)"
                />
                <path
                  data-cinematic="path-dev"
                  d="M 50 30 C 50 38, 34 42, 22 52"
                  stroke="url(#split-dev)"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  filter="url(#split-soft)"
                />
                <path
                  data-cinematic="path-partner"
                  d="M 50 30 C 50 38, 66 42, 78 52"
                  stroke="url(#split-partner)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  filter="url(#split-soft)"
                />

                <circle
                  data-cinematic="node-source"
                  cx="50"
                  cy="8"
                  r="2.2"
                  fill="var(--color-paper)"
                />
                <circle
                  data-cinematic="node-dev"
                  cx="22"
                  cy="52"
                  r="2.6"
                  fill="var(--color-tungsten)"
                />
                <circle
                  data-cinematic="node-partner"
                  cx="78"
                  cy="52"
                  r="2.2"
                  fill="var(--color-daylight)"
                />
              </svg>

              <p
                data-cinematic="label"
                className="pointer-events-none absolute top-[6%] left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.22em] text-white/55 uppercase md:text-[10px]"
              >
                Project revenue
              </p>
              <div
                data-cinematic="label"
                className="pointer-events-none absolute bottom-[8%] left-[4%] max-w-[42%] md:left-[6%]"
              >
                <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-tungsten)] uppercase md:text-[10px]">
                  60% · Developer
                </p>
                <p className="mt-1 font-display text-sm text-white/80 md:text-base">
                  Technical development and delivery
                </p>
              </div>
              <div
                data-cinematic="label"
                className="pointer-events-none absolute right-[4%] bottom-[8%] max-w-[42%] text-right md:right-[6%]"
              >
                <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-daylight)] uppercase md:text-[10px]">
                  40% · Communication
                </p>
                <p className="mt-1 font-display text-sm text-white/80 md:text-base">
                  Interviews, client communication, coordination
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div data-cinematic="calculator">
              <RevenueExampleSlider
                value={exampleRevenue}
                onChange={setExampleRevenue}
              />
              <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/45">
                {content.disclaimer} Current example:{" "}
                <span className="tabular-nums text-white/60">
                  {formatUSD(exampleRevenue)}
                </span>
                {" → "}
                <span className="tabular-nums text-[var(--color-tungsten)]">
                  {formatUSD(developer)}
                </span>
                {" + "}
                <span className="tabular-nums text-[var(--color-daylight)]">
                  {formatUSD(partner)}
                </span>
                .
              </p>
            </div>

            <p
              data-cinematic="closing"
              className={cn(
                "font-display text-2xl leading-snug text-[var(--color-paper)] md:text-right md:text-3xl",
              )}
            >
              {content.closing}
            </p>
          </div>
        </div>
      </div>

      <SceneAside
        eyebrow="Without animation"
        title={`${content.title} partnership share`}
        body={content.body}
        className="bg-[var(--color-ink-soft)]"
      >
        <div className="grid gap-4 pt-2 sm:grid-cols-2">
          <div className="border-l-2 border-[var(--color-tungsten)] pl-4">
            <p className="font-mono text-[11px] text-[var(--color-tungsten)] uppercase">
              60% · Developer
            </p>
            <p className="mt-1 text-sm text-white/70">
              Technical development and delivery
            </p>
          </div>
          <div className="border-l-2 border-[var(--color-daylight)] pl-4">
            <p className="font-mono text-[11px] text-[var(--color-daylight)] uppercase">
              40% · Communication partner
            </p>
            <p className="mt-1 text-sm text-white/70">
              Interviews, client communication, and coordination
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/55">{content.disclaimer}</p>
        <p className="mt-4 font-display text-xl text-[var(--color-paper)]">
          {content.closing}
        </p>
        <div className="mt-6 max-w-xl">
          <RevenueExampleSlider
            value={exampleRevenue}
            onChange={setExampleRevenue}
          />
        </div>
      </SceneAside>
    </section>
  );
}
