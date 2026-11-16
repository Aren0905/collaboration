"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { VideoCallFrame } from "@/components/sim/VideoCallFrame";
import { CodeEditorFrame } from "@/components/sim/CodeEditorFrame";
import { ProjectBrief } from "@/components/sim/ProjectBrief";
import { INTERVIEW_CAPTIONS } from "@/lib/project";
import { PREP_STEPS, SCENES } from "@/lib/content";

const content = SCENES.find((s) => s.id === "interview")!;

/**
 * Event 4 — Interview simulation.
 * Prep → incoming call → captions → agreement → window morphs toward IDE.
 */
export function InterviewScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "ringing" | "connected" | "agree">(
    "idle",
  );
  const [captionIndex, setCaptionIndex] = useState(-1);

  useCinematicScene({
    id: "interview",
    rootRef,
    pinRef,
    endDesktop: "+=320%",
    endMobile: "+=220%",
    scrubDesktop: 0.72,
    scrubMobile: 0.5,
    build: ({ gsap: g, q, targets, isDesktop }, tl) => {
      const call = q("[data-film='call']");
      const ide = q("[data-film='ide']");
      const prep = q("[data-film='prep']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const stamp = q("[data-film='stamp']");
      const brief = q("[data-film='brief']");
      const copy = targets(title, body);

      g.set(call, { scale: 0.92, opacity: 0.7, y: 24 });
      g.set(ide, {
        opacity: 0,
        clipPath: "inset(42% 38% 42% 38%)",
        scale: 1.18,
      });
      g.set(prep, { opacity: 0, y: 16 });
      g.set(copy, { opacity: 0, y: 20 });
      g.set(stamp, { opacity: 0, scale: 0.92 });
      g.set(brief, { opacity: 0, y: 12 });

      tl.to(copy, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, 0);
      tl.to(prep, { opacity: 1, y: 0, duration: 0.4 }, 0.2);
      tl.to(brief, { opacity: 1, y: 0, duration: 0.35 }, 0.35);
      tl.to(call, { opacity: 1, scale: 1, y: 0, duration: 0.55 }, 0.45);

      // Drive call phase via timeline callbacks (scrub-safe-ish via onUpdate proxy)
      tl.call(() => setPhase("ringing"), undefined, 0.7);
      tl.call(() => {
        setPhase("connected");
        setCaptionIndex(1);
      }, undefined, 1.05);
      tl.call(() => setCaptionIndex(2), undefined, 1.35);
      tl.call(() => setCaptionIndex(3), undefined, 1.65);
      tl.call(() => {
        setCaptionIndex(4);
        setPhase("agree");
      }, undefined, 1.95);
      tl.to(stamp, { opacity: 1, scale: 1, duration: 0.35 }, 2.05);

      // Signature: call window morphs into code editor
      tl.to(
        call,
        {
          scale: isDesktop ? 1.35 : 1.18,
          opacity: 0.25,
          duration: 0.95,
        },
        2.35,
      );
      tl.to(
        ide,
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.05,
        },
        2.45,
      );
      tl.to(
        targets(prep, brief, stamp, title, body),
        { opacity: 0.25, duration: 0.5 },
        2.55,
      );
    },
  });

  const caption =
    captionIndex >= 0 ? INTERVIEW_CAPTIONS[captionIndex] ?? null : null;

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(142,182,201,0.12),transparent_50%)]" />

        <div
          data-film="call"
          className="absolute top-[8%] right-[4%] left-[4%] z-[3] will-change-transform md:left-[38%] md:right-[6%] md:top-[10%]"
        >
          <VideoCallFrame
            phase={phase}
            caption={
              caption
                ? { speaker: caption.speaker, text: caption.text }
                : null
            }
          />
        </div>

        <div
          data-film="ide"
          className="absolute top-[10%] right-[5%] left-[5%] z-[4] will-change-transform md:left-[40%] md:right-[7%]"
          style={{ clipPath: "inset(42% 38% 42% 38%)" }}
        >
          <CodeEditorFrame visibleLines={6} />
        </div>

        <div className="relative z-[5] flex w-full flex-col justify-end gap-5 px-5 py-12 md:max-w-[42%] md:justify-center md:px-10 md:py-16 lg:px-16">
          <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-daylight)] uppercase">
            {content.eyebrow}
          </p>
          <h2
            id="scene-interview-title"
            data-film="title"
            className="font-display text-[clamp(1.55rem,3.6vw,2.6rem)] leading-[1.1] text-white"
          >
            You take the conversation.
            <span className="mt-1 block text-[var(--color-daylight)]">
              I support the technical preparation.
            </span>
          </h2>
          <p data-film="body" className="text-sm text-white/70 md:text-base">
            {content.body}
          </p>

          <div data-film="brief" className="max-w-sm">
            <ProjectBrief compact />
          </div>

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

          <div
            data-film="stamp"
            className="inline-block border border-[var(--color-signal)]/50 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-[var(--color-signal)] uppercase"
          >
            You lead the interview · Accounts stay in your name
          </div>
        </div>
      </div>
    </section>
  );
}
