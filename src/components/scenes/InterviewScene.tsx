"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { ScenePin, ScenePanel } from "@/components/cinematic/ScenePin";
import { VideoCallFrame } from "@/components/sim/VideoCallFrame";
import { CodeEditorFrame } from "@/components/sim/CodeEditorFrame";
import { ProjectBrief } from "@/components/sim/ProjectBrief";
import { INTERVIEW_CAPTIONS } from "@/lib/project";
import { PREP_STEPS, SCENES } from "@/lib/content";

const content = SCENES.find((s) => s.id === "interview")!;

type CallPhase = "idle" | "ringing" | "connected" | "agree";

/**
 * Event 4 — Interview simulation. Call/IDE live in the stage; plate area stays clear.
 */
export function InterviewScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<CallPhase>("idle");
  const [captionIndex, setCaptionIndex] = useState(-1);

  useCinematicScene({
    id: "interview",
    rootRef,
    pinRef,
    endDesktop: "+=320%",
    endMobile: "+=180%",
    scrubDesktop: 0.72,
    scrubMobile: true,
    build: ({ gsap: g, q, targets, isDesktop }, tl) => {
      const call = q("[data-film='call']");
      const ide = q("[data-film='ide']");
      const prep = q("[data-film='prep']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const stamp = q("[data-film='stamp']");
      const brief = q("[data-film='brief']");
      const copy = targets(title, body);

      g.set(call, { scale: 0.94, opacity: 0.7, y: 18 });
      g.set(ide, {
        opacity: 0,
        clipPath: "inset(38% 34% 38% 34%)",
        scale: 1.12,
      });
      g.set(prep, { opacity: 0, y: 12 });
      g.set(copy, { opacity: 0, y: 14 });
      g.set(stamp, { opacity: 0, scale: 0.95 });
      g.set(brief, { opacity: 0, y: 10 });

      const applyProgress = (progress: number) => {
        if (progress < 0.18) {
          setPhase("idle");
          setCaptionIndex(-1);
        } else if (progress < 0.3) {
          setPhase("ringing");
          setCaptionIndex(0);
        } else if (progress < 0.42) {
          setPhase("connected");
          setCaptionIndex(1);
        } else if (progress < 0.52) {
          setPhase("connected");
          setCaptionIndex(2);
        } else if (progress < 0.62) {
          setPhase("connected");
          setCaptionIndex(3);
        } else {
          setPhase("agree");
          setCaptionIndex(4);
        }
      };

      tl.eventCallback("onUpdate", () => {
        const st = tl.scrollTrigger;
        if (st) applyProgress(st.progress);
      });

      tl.to(copy, { opacity: 1, y: 0, stagger: 0.08, duration: 0.35 }, 0);
      tl.to(brief, { opacity: 1, y: 0, duration: 0.3 }, 0.2);
      tl.to(call, { opacity: 1, scale: 1, y: 0, duration: 0.5 }, 0.25);
      tl.to(prep, { opacity: 1, y: 0, duration: 0.35 }, 0.5);
      tl.to(stamp, { opacity: 1, scale: 1, duration: 0.3 }, 1.45);

      tl.to(
        call,
        {
          scale: isDesktop ? 1.28 : 1.1,
          opacity: 0.2,
          duration: 0.9,
        },
        1.85,
      );
      tl.to(
        ide,
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1,
        },
        1.95,
      );
      tl.to(targets(prep, brief), { opacity: 0.35, duration: 0.4 }, 2.15);

      return () => {
        tl.eventCallback("onUpdate", null);
      };
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
      <ScenePin ref={pinRef} className="bg-[var(--color-amber-room)]" align="end">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_28%,rgba(142,182,201,0.16),transparent_55%)]" />

        {/* Large call canvas — full right column on desktop, compact stage on mobile */}
        <div
          className={[
            "pointer-events-none absolute inset-x-3 z-[4] [touch-action:pan-y]",
            "top-[4.5rem] h-[min(36dvh,280px)]",
            "md:inset-auto md:top-[11%] md:right-[7%] md:bottom-[9%] md:left-auto",
            "md:h-auto md:w-[min(600px,48vw)]",
          ].join(" ")}
        >
          <div className="pointer-events-auto relative h-full w-full overflow-hidden md:h-full">
            <div
              data-film="call"
              className="relative h-full w-full will-change-transform opacity-0"
            >
              <VideoCallFrame
                phase={phase}
                caption={
                  caption
                    ? { speaker: caption.speaker, text: caption.text }
                    : null
                }
                className="h-full min-h-[220px] md:min-h-[min(68vh,620px)]"
              />
            </div>
            <div
              data-film="ide"
              className="absolute inset-0 will-change-transform opacity-0"
              style={{ clipPath: "inset(38% 34% 38% 34%)" }}
            >
              <CodeEditorFrame visibleLines={10} className="h-full" />
            </div>
          </div>
        </div>

        <ScenePanel className="md:max-w-[40%] lg:max-w-[38%]">
          <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-daylight)] uppercase">
            {content.eyebrow}
          </p>
          <h2
            id="scene-interview-title"
            data-film="title"
            className="mt-2 font-display text-[clamp(1.3rem,4.8vw,2.6rem)] leading-[1.1] text-white"
          >
            You take the conversation.
            <span className="mt-1 block text-[var(--color-daylight)]">
              I support the technical preparation.
            </span>
          </h2>
          <p data-film="body" className="mt-2 text-sm text-white/70 md:mt-3 md:text-base">
            {content.body}
          </p>

          <div data-film="brief" className="mt-3 hidden max-w-sm md:mt-4 md:block">
            <ProjectBrief compact />
          </div>

          <div
            data-film="prep"
            className="mt-3 hidden border border-white/15 bg-black/45 p-4 backdrop-blur-sm md:block"
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
            className="mt-3 inline-block border border-[var(--color-signal)]/50 px-3 py-2 font-mono text-[9px] tracking-[0.16em] text-[var(--color-signal)] uppercase md:text-[10px]"
          >
            You lead the interview · Accounts stay in your name
          </div>
        </ScenePanel>
      </ScenePin>
    </section>
  );
}
