"use client";

import { useCallback, useRef } from "react";
import { SceneAside } from "@/components/cinematic/SceneAside";
import {
  useCinematicScene,
  type CinematicBuildContext,
  type CinematicTimeline,
} from "@/hooks/useCinematicScene";
import { INTERVIEW_BEATS, SCENES } from "@/lib/content";

const meta = SCENES.find((s) => s.id === "interview")!;

/**
 * Scene D — Interview → Code Screen Portal
 * The laptop screen is the narrative aperture: call → prep → dive through glass into code.
 */
export function SceneDInterviewSupport() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const onReducedMotion = useCallback((ctx: CinematicBuildContext) => {
    const { gsap: g, q } = ctx;
    g.set(q("[data-cinematic]"), { clearProps: "clipPath,transform,opacity" });
    g.set(q("[data-cinematic='beat']"), { opacity: 1, x: 0, y: 0 });
    g.set(q("[data-cinematic='code']"), { opacity: 1 });
    g.set(q("[data-cinematic='call-ui']"), { opacity: 0.35 });
    g.set(q("[data-cinematic='laptop']"), { scale: 1, y: 0 });
    g.set(q("[data-cinematic='stamp']"), { opacity: 1, scale: 1, rotate: 0 });
  }, []);

  const build = useCallback(
    (ctx: CinematicBuildContext, tl: CinematicTimeline) => {
      const { gsap: g, q, isDesktop } = ctx;
      const room = q("[data-cinematic='room']");
      const laptop = q("[data-cinematic='laptop']");
      const callUi = q("[data-cinematic='call-ui']");
      const prepStrip = q("[data-cinematic='prep-strip']");
      const code = q("[data-cinematic='code']");
      const glass = q("[data-cinematic='glass']");
      const beats = q("[data-cinematic='beat']");
      const title = q("[data-cinematic='title']");
      const stamp = q("[data-cinematic='stamp']");

      g.set(room, { scale: 1.04 });
      g.set(laptop, {
        scale: isDesktop ? 0.72 : 0.9,
        y: isDesktop ? 40 : 24,
        transformOrigin: "50% 60%",
      });
      g.set(callUi, { opacity: 1 });
      g.set(prepStrip, { y: 24, opacity: 0 });
      g.set(code, { opacity: 0, scale: 1.08 });
      g.set(glass, { opacity: 0.15 });
      g.set(beats, { opacity: 0, y: 14 });
      g.set(title, { opacity: 0, y: 16 });
      g.set(stamp, { opacity: 0, scale: 0.9, rotate: -4 });

      // 1. Establish the interview room, then push into the laptop
      tl.to(title, { opacity: 1, y: 0, duration: 0.45 }, 0);
      tl.to(room, { scale: 1, duration: 0.7 }, 0);
      tl.to(
        laptop,
        { scale: isDesktop ? 0.92 : 0.98, y: isDesktop ? 8 : 4, duration: 0.9 },
        0.2,
      );
      tl.to(beats[0], { opacity: 1, y: 0, duration: 0.4 }, 0.5);

      // 2. Prep appears as overlays on the glass — still inside the call
      tl.to(prepStrip, { y: 0, opacity: 1, duration: 0.55 }, 0.85);
      tl.to(beats[1], { opacity: 1, y: 0, duration: 0.35 }, 1.0);
      tl.to(beats[2], { opacity: 1, y: 0, duration: 0.35 }, 1.2);

      // 3. Portal: dive through the screen — call dissolves, code materializes
      tl.to(
        laptop,
        {
          scale: isDesktop ? 1.35 : 1.15,
          y: isDesktop ? -30 : -10,
          duration: 1.15,
        },
        1.45,
      );
      tl.to(glass, { opacity: 0, duration: 0.5 }, 1.55);
      tl.to(callUi, { opacity: 0, duration: 0.55 }, 1.6);
      tl.to(prepStrip, { opacity: 0, y: -12, duration: 0.45 }, 1.65);
      tl.to(code, { opacity: 1, scale: 1, duration: 0.75 }, 1.75);
      tl.to(room, { opacity: 0.25, duration: 0.7 }, 1.7);

      // 4. Honesty lands once we're "inside" the technical world
      tl.to(beats[3], { opacity: 1, y: 0, duration: 0.4 }, 2.15);
      tl.to(stamp, { opacity: 1, scale: 1, rotate: 0, duration: 0.45 }, 2.3);
    },
    [],
  );

  useCinematicScene({
    id: "interview",
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
      id="scene-interview"
      data-scene="interview"
      aria-labelledby="scene-interview-title"
      className="relative z-10"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full overflow-hidden bg-[var(--color-amber-room)]"
      >
        {/* Room atmosphere behind the laptop */}
        <div
          data-cinematic="room"
          className="absolute inset-0 will-change-transform"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(232,170,90,0.28),transparent_52%),linear-gradient(180deg,#2a1c12,#0c0a08)]" />
          <div className="absolute inset-x-[8%] bottom-0 h-[28%] bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Laptop — the portal aperture */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-12">
          <div
            data-cinematic="laptop"
            className="relative w-full max-w-4xl will-change-transform [transform-style:preserve-3d]"
          >
            <div className="overflow-hidden border border-white/20 bg-[#0a0c10] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
              {/* Chrome */}
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 md:px-4">
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase md:text-[10px]">
                  Live session · then technical depth
                </span>
                <span className="size-1.5 rounded-full bg-[var(--color-signal)]/80" />
              </div>

              <div className="relative aspect-[16/10] overflow-hidden">
                {/* Call UI (pre-portal) */}
                <div
                  data-cinematic="call-ui"
                  className="absolute inset-0 grid grid-cols-2 gap-2 p-3 md:p-5"
                >
                  <div className="bg-[linear-gradient(160deg,rgba(201,162,126,0.22),rgba(0,0,0,0.45))]" />
                  <div className="bg-[linear-gradient(200deg,rgba(123,163,184,0.2),rgba(0,0,0,0.5))]" />
                  <p className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.16em] text-white/45 uppercase md:bottom-4 md:left-5">
                    Partner leads the room
                  </p>
                </div>

                {/* Code world (through the glass) */}
                <div
                  data-cinematic="code"
                  className="absolute inset-0 bg-[#0d1117] p-4 md:p-6"
                  aria-hidden
                >
                  <div className="space-y-2 font-mono text-[10px] leading-relaxed text-[var(--color-signal)]/80 md:text-xs">
                    <p className="text-white/35">{`// technical preparation → delivery`}</p>
                    <p>
                      <span className="text-[var(--color-daylight)]">function</span>{" "}
                      supportInterview() {"{"}
                    </p>
                    <p className="pl-4 text-white/70">
                      prepareArchitecture();
                    </p>
                    <p className="pl-4 text-white/70">
                      rehearseHardQuestions();
                    </p>
                    <p className="pl-4 text-white/55">
                      return honesty ? shipReady : stop;
                    </p>
                    <p>{"}"}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Glass sheen */}
                <div
                  data-cinematic="glass"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),transparent_40%,transparent_60%,rgba(255,255,255,0.03))]"
                  aria-hidden
                />
              </div>
            </div>

            {/* Prep chips on/near the screen */}
            <div
              data-cinematic="prep-strip"
              className="mt-3 flex flex-wrap gap-2 md:mt-4"
            >
              {["Mock questions", "Technical explanations", "Communication coaching"].map(
                (item) => (
                  <span
                    key={item}
                    className="border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[9px] tracking-[0.14em] text-white/70 uppercase backdrop-blur-[2px] md:text-[10px]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Copy + beats */}
        <div className="relative z-20 mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-6 py-24 md:px-12 md:py-20">
          <div data-cinematic="title" className="max-w-xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-tungsten)] uppercase">
              {meta.eyebrow}
            </p>
            <h2
              id="scene-interview-title"
              className="mt-3 font-display text-3xl leading-tight md:text-5xl"
            >
              {meta.title}
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/65 md:text-base">
              {meta.body}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INTERVIEW_BEATS.map((beat) => (
              <div
                key={beat.id}
                data-cinematic="beat"
                className="border-t border-white/20 pt-3"
              >
                <p className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase">
                  {beat.label}
                </p>
                <p className="mt-2 text-sm text-white/70">{beat.detail}</p>
              </div>
            ))}
          </div>

          <p
            data-cinematic="stamp"
            className="pointer-events-none absolute right-6 bottom-28 border border-[var(--color-copper)] px-3 py-2 font-mono text-[10px] tracking-[0.26em] text-[var(--color-copper)] uppercase md:right-12 md:bottom-24"
          >
            Transparent by design
          </p>
        </div>
      </div>

      <SceneAside eyebrow="Without animation" title={meta.title} body={meta.body}>
        <ul className="space-y-3 pt-2">
          {INTERVIEW_BEATS.map((beat) => (
            <li key={beat.id} className="text-sm text-white/70">
              <span className="font-mono text-[var(--color-tungsten)]">{beat.label}:</span>{" "}
              {beat.detail}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-white/50">
          Scroll storytelling moves from the live call through the laptop screen
          into technical preparation—roles stay honest either way.
        </p>
      </SceneAside>
    </section>
  );
}
