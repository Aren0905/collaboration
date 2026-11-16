"use client";

import { useCallback, useRef } from "react";
import { EnvPanel } from "@/components/cinematic/EnvPanel";
import { SceneAside } from "@/components/cinematic/SceneAside";
import {
  useCinematicScene,
  type CinematicBuildContext,
  type CinematicTimeline,
} from "@/hooks/useCinematicScene";
import { ROLE_CREDITS, SCENES } from "@/lib/content";

const meta = SCENES.find((s) => s.id === "strengths")!;

/**
 * Scene A — split environments rotate/slide/merge into one shared desk.
 * Transition language: rotational wipe + clip-path merge (not fade-up).
 */
export function SceneATwoStrengths() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const onReducedMotion = useCallback((ctx: CinematicBuildContext) => {
    ctx.gsap.set(ctx.q("[data-cinematic]"), {
      clearProps: "transform,clipPath,opacity",
    });
    ctx.gsap.set(ctx.q("[data-cinematic='copy']"), { opacity: 1, y: 0 });
  }, []);

  const build = useCallback(
    (ctx: CinematicBuildContext, tl: CinematicTimeline) => {
      const { gsap: g, q, isDesktop } = ctx;
      const left = q("[data-cinematic='left']");
      const right = q("[data-cinematic='right']");
      const merge = q("[data-cinematic='merge']");
      const seam = q("[data-cinematic='seam']");
      const copy = q("[data-cinematic='copy']");
      const roles = q("[data-cinematic='role']");

      g.set(left, {
        xPercent: isDesktop ? -8 : 0,
        rotateY: isDesktop ? 18 : 0,
        transformOrigin: "100% 50%",
      });
      g.set(right, {
        xPercent: isDesktop ? 8 : 0,
        rotateY: isDesktop ? -18 : 0,
        transformOrigin: "0% 50%",
      });
      g.set(merge, { clipPath: "inset(50% 50% 50% 50%)" });
      g.set(seam, { scaleY: 0, opacity: 0.9 });
      g.set(copy, { y: 36, opacity: 0 });
      g.set(roles, { x: isDesktop ? 24 : 0, opacity: 0 });

      // Split intensifies, then rotates toward camera
      tl.to(
        left,
        { xPercent: isDesktop ? -18 : -4, rotateY: isDesktop ? 28 : 0, duration: 0.8 },
        0,
      );
      tl.to(
        right,
        { xPercent: isDesktop ? 18 : 4, rotateY: isDesktop ? -28 : 0, duration: 0.8 },
        0,
      );
      tl.to(seam, { scaleY: 1, duration: 0.5 }, 0.2);
      tl.to(copy, { y: 0, opacity: 1, duration: 0.55 }, 0.35);

      // Slide together
      tl.to(left, { xPercent: 0, rotateY: 0, duration: 1 }, 0.9);
      tl.to(right, { xPercent: 0, rotateY: 0, duration: 1 }, 0.9);
      tl.to(seam, { opacity: 0, duration: 0.4 }, 1.4);

      // Mask morph into shared workspace
      tl.to(
        merge,
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
        1.55,
      );
      tl.to(
        [left, right],
        { opacity: 0.15, scale: 0.98, duration: 0.7 },
        1.6,
      );
      tl.to(roles, { x: 0, opacity: 1, duration: 0.55, stagger: 0.12 }, 1.9);
    },
    [],
  );

  useCinematicScene({
    id: "strengths",
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
      id="scene-strengths"
      data-scene="strengths"
      aria-labelledby="scene-strengths-title"
      className="relative z-10"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-center overflow-hidden bg-[var(--color-ink)]"
      >
        <div className="film-grain pointer-events-none absolute inset-0 z-20 opacity-[0.04] mix-blend-overlay" />

        <div className="absolute inset-0 [perspective:1400px]">
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
            <EnvPanel
              tone="tungsten"
              label="Developer · coding room"
              data-cinematic="left"
              className="h-full min-h-[46vh] md:min-h-0"
            />
            <EnvPanel
              tone="daylight"
              label="Partner · video meeting"
              data-cinematic="right"
              className="h-full min-h-[46vh] md:min-h-0"
            >
              {/* Meeting window suggestion */}
              <div
                className="absolute right-[12%] top-[18%] grid h-[34%] w-[36%] grid-cols-2 gap-1 opacity-50"
                aria-hidden
              >
                <span className="bg-white/10" />
                <span className="bg-white/15" />
                <span className="bg-white/8" />
                <span className="bg-white/12" />
              </div>
            </EnvPanel>
          </div>

          <div
            data-cinematic="seam"
            className="pointer-events-none absolute inset-y-[12%] left-1/2 z-10 hidden w-px origin-center bg-[var(--color-paper)]/50 md:block"
            aria-hidden
          />

          <div
            data-cinematic="merge"
            className="absolute inset-[10%] z-[12] overflow-hidden border border-white/15 bg-[var(--color-ink-elevated)] shadow-[0_40px_100px_rgba(0,0,0,0.55)] md:inset-[12%_16%]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(201,162,126,0.18),transparent_40%,rgba(123,163,184,0.16))]" />
            <div className="absolute inset-x-[8%] bottom-[16%] h-[48%] bg-black/40" />
            <div className="absolute left-[10%] top-[20%] h-[30%] w-[55%] bg-white/[0.07]" />
            <p className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.24em] text-white/55 uppercase">
              Shared workspace
            </p>
          </div>
        </div>

        <div
          data-cinematic="copy"
          className="relative z-30 mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 md:px-12"
        >
          <div className="max-w-xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-tungsten)] uppercase">
              {meta.eyebrow}
            </p>
            <h2
              id="scene-strengths-title"
              className="mt-3 font-display text-3xl leading-tight md:text-5xl"
            >
              {meta.title}
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/65 md:text-base">
              {meta.body}
            </p>
          </div>

          <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
            <div data-cinematic="role" className="border-l border-[var(--color-tungsten)]/50 pl-4">
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-tungsten)] uppercase">
                {ROLE_CREDITS.technical.title}
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-white/75">
                {ROLE_CREDITS.technical.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div data-cinematic="role" className="border-l border-[var(--color-daylight)]/50 pl-4">
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-daylight)] uppercase">
                {ROLE_CREDITS.communication.title}
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-white/75">
                {ROLE_CREDITS.communication.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SceneAside eyebrow="Without animation" title={meta.title} body={meta.body}>
        <div className="grid gap-6 pt-2 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] text-[var(--color-tungsten)] uppercase">
              {ROLE_CREDITS.technical.title}
            </p>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              {ROLE_CREDITS.technical.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] text-[var(--color-daylight)] uppercase">
              {ROLE_CREDITS.communication.title}
            </p>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              {ROLE_CREDITS.communication.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </SceneAside>
    </section>
  );
}
