"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { FILM_ASSETS } from "@/lib/assets";
import {
  INTERVIEW_BEATS,
  INTERVIEW_FLOW,
  PREP_STEPS,
  SCENES,
} from "@/lib/content";

const content = SCENES.find((s) => s.id === "interview")!;

/**
 * Scene 4 — Prep → live interview → dive into IDE.
 * Signature: interview window zooms into development environment.
 */
export function InterviewScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useCinematicScene({
    id: "interview",
    rootRef,
    pinRef,
    endDesktop: "+=280%",
    endMobile: "+=190%",
    scrubDesktop: 0.72,
    scrubMobile: 0.5,
    build: ({ gsap: g, q, isDesktop }, tl) => {
      const call = q("[data-film='call']");
      const code = q("[data-film='code']");
      const prep = q("[data-film='prep']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const beats = q("[data-film='beat']");
      const stamp = q("[data-film='stamp']");

      g.set(call, { scale: 1, opacity: 1 });
      g.set(code, {
        opacity: 0,
        clipPath: "inset(40% 40% 40% 40%)",
        scale: 1.2,
      });
      g.set(prep, { opacity: 0, y: 16 });
      g.set([title, body], { opacity: 0, y: 20 });
      g.set(beats, { opacity: 0, y: 12 });
      g.set(stamp, { opacity: 0, scale: 0.9, rotate: -4 });

      tl.to([title, body], { opacity: 1, y: 0, stagger: 0.08, duration: 0.45 }, 0);
      tl.to(prep, { opacity: 1, y: 0, duration: 0.45 }, 0.25);
      tl.to(beats, { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, 0.55);
      tl.to(stamp, { opacity: 1, scale: 1, rotate: 0, duration: 0.4 }, 0.95);
      // Dive through call glass into IDE
      tl.to(
        call,
        { scale: isDesktop ? 1.45 : 1.25, opacity: 0.35, duration: 0.9 },
        1.25,
      );
      tl.to(
        code,
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1,
        },
        1.35,
      );
    },
  });

  return (
    <section
      ref={rootRef}
      id="scene-interview"
      data-scene="interview"
      aria-labelledby="scene-interview-title"
      className="relative"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full overflow-hidden bg-[var(--color-amber-room)]"
      >
        <div data-film="call" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.interview.src}
            alt={FILM_ASSETS.interview.alt}
            overlay="heavy"
          />
        </div>
        <div
          data-film="code"
          className="absolute inset-0 will-change-transform"
          style={{ clipPath: "inset(40% 40% 40% 40%)" }}
        >
          <FilmPlate
            src={FILM_ASSETS.coding.src}
            alt={FILM_ASSETS.coding.alt}
            overlay="soft"
          />
        </div>

        <div className="relative z-[5] flex w-full flex-col justify-end gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-10 md:py-16 lg:px-16">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-daylight)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-interview-title"
              data-film="title"
              className="mt-3 font-display text-[clamp(1.6rem,3.8vw,2.75rem)] leading-[1.1] text-white"
            >
              You lead the conversation.
              <span className="mt-1 block text-[var(--color-daylight)]">
                I support the technical preparation.
              </span>
            </h2>
            <p data-film="body" className="mt-4 text-sm text-white/70 md:text-base">
              {content.body}
            </p>

            <ol className="mt-5 flex flex-wrap gap-2">
              {INTERVIEW_FLOW.map((step, i) => (
                <li
                  key={step.id}
                  className="border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-white/70 uppercase"
                >
                  {String(i + 1).padStart(2, "0")} {step.label}
                </li>
              ))}
            </ol>

            <div
              data-film="stamp"
              className="mt-5 inline-block border border-[var(--color-signal)]/50 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-[var(--color-signal)] uppercase"
            >
              Roles stated plainly · No impersonation
            </div>
          </div>

          <div className="grid w-full max-w-md gap-4 sm:grid-cols-2">
            <div
              data-film="prep"
              className="border border-white/15 bg-black/45 p-4 backdrop-blur-sm"
            >
              <p className="font-mono text-[9px] tracking-[0.2em] text-white/45 uppercase">
                Before the call
              </p>
              <ul className="mt-3 space-y-2">
                {PREP_STEPS.map((step) => (
                  <li key={step.id}>
                    <p className="text-xs font-medium text-[var(--color-tungsten)]">
                      {step.label}
                    </p>
                    <p className="text-xs text-white/60">{step.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-white/15 bg-black/45 p-4 backdrop-blur-sm">
              <p className="font-mono text-[9px] tracking-[0.2em] text-white/45 uppercase">
                In the room
              </p>
              <ul className="mt-3 space-y-2">
                {INTERVIEW_BEATS.map((beat) => (
                  <li key={beat.id} data-film="beat">
                    <p className="text-xs font-medium text-[var(--color-daylight)]">
                      {beat.label}
                    </p>
                    <p className="text-xs text-white/60">{beat.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
