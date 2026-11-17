"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import {
  ScenePin,
  ScenePanel,
  SceneStage,
} from "@/components/cinematic/ScenePin";
import {
  CustomerDashboard,
  type DashboardStage,
} from "@/components/sim/CustomerDashboard";
import { FILM_ASSETS } from "@/lib/assets";
import { STORY_PROJECT } from "@/lib/project";
import { SCENES } from "@/lib/content";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "change")!;

type Beat =
  | "idle"
  | "message"
  | "clarify"
  | "travel"
  | "build"
  | "reply"
  | "approved";

/**
 * Event 6 — Unexpected client change. Dashboard stays in the clear stage zone.
 */
export function ChangeScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState<Beat>("idle");
  const [dashStage, setDashStage] = useState<DashboardStage>(4);
  const [filterDays, setFilterDays] = useState<7 | 30 | 90 | null>(null);

  useCinematicScene({
    id: "change",
    rootRef,
    pinRef,
    endDesktop: "+=320%",
    endMobile: "+=180%",
    scrubDesktop: 0.72,
    scrubMobile: true,
    build: ({ gsap: g, q, targets, isDesktop }, tl) => {
      const plate = q("[data-film='plate']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const msg = q("[data-film='msg']");
      const clarify = q("[data-film='clarify']");
      const task = q("[data-film='task']");
      const dash = q("[data-film='dash']");
      const reply = q("[data-film='reply']");
      const approve = q("[data-film='approve']");

      g.set(plate, { opacity: 0.55, scale: 1.06 });
      g.set(targets(title, body), { opacity: 0, y: 14 });
      g.set(msg, { opacity: 0, y: 16, scale: 0.97 });
      g.set(clarify, { opacity: 0, y: 10 });
      g.set(task, {
        opacity: 0,
        x: isDesktop ? -60 : 0,
        y: isDesktop ? 0 : 12,
        scale: 0.97,
      });
      g.set(dash, { opacity: 0.4, y: 16 });
      g.set(reply, { opacity: 0, y: 12 });
      g.set(approve, { opacity: 0, scale: 0.94 });

      const applyProgress = (progress: number) => {
        if (progress < 0.18) setBeat("idle");
        else if (progress < 0.32) setBeat("message");
        else if (progress < 0.45) setBeat("clarify");
        else if (progress < 0.58) setBeat("travel");
        else if (progress < 0.72) {
          setBeat("build");
          setDashStage(5);
          setFilterDays(30);
        } else if (progress < 0.85) setBeat("reply");
        else setBeat("approved");
      };

      tl.eventCallback("onUpdate", () => {
        const st = tl.scrollTrigger;
        if (st) applyProgress(st.progress);
      });

      tl.to(plate, { opacity: 0.75, scale: 1, duration: 0.5 }, 0);
      tl.to(
        targets(title, body),
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.35 },
        0.1,
      );
      tl.to(msg, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 0.4);
      tl.to(clarify, { opacity: 1, y: 0, duration: 0.35 }, 0.8);
      tl.to(task, { opacity: 1, duration: 0.2 }, 1.15);
      tl.to(
        task,
        {
          x: isDesktop ? 80 : 0,
          y: isDesktop ? 0 : -6,
          scale: 1,
          duration: 0.7,
        },
        1.25,
      );
      tl.to(dash, { opacity: 1, y: 0, duration: 0.45 }, 1.45);
      tl.to(reply, { opacity: 1, y: 0, duration: 0.35 }, 2.15);
      tl.to(approve, { opacity: 1, scale: 1, duration: 0.35 }, 2.5);
      tl.to(msg, { opacity: 0.45, duration: 0.3 }, 2.55);

      return () => {
        tl.eventCallback("onUpdate", null);
      };
    },
  });

  return (
    <section
      ref={rootRef}
      id="scene-change"
      data-scene="change"
      aria-labelledby="scene-change-title"
      className="relative"
    >
      <ScenePin ref={pinRef} className="bg-[var(--color-ink-soft)]" align="end">
        <div data-film="plate" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.sharedProject.src}
            alt={FILM_ASSETS.sharedProject.alt}
            focus={FILM_ASSETS.sharedProject.focus}
            focusMobile={FILM_ASSETS.sharedProject.focusMobile}
            overlay="bottom"
          />
        </div>

        <SceneStage className="h-[min(34dvh,260px)] md:inset-auto md:top-auto md:right-10 md:bottom-[16%] md:left-auto md:h-auto md:w-[min(520px,48vw)]">
          <div
            data-film="dash"
            className="h-full will-change-transform opacity-0"
          >
            <CustomerDashboard
              stage={dashStage}
              filterDays={filterDays}
              className="h-full"
            />
          </div>
        </SceneStage>

        <ScenePanel>
          <div className="max-w-xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-daylight)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-change-title"
              data-film="title"
              className="mt-2 font-display text-[clamp(1.3rem,4.8vw,2.55rem)] leading-[1.1] text-white"
            >
              {content.title}
            </h2>
            <p data-film="body" className="mt-2 text-sm text-white/70">
              {content.body}
            </p>

            <div
              data-film="msg"
              className="mt-3 border border-[var(--color-daylight)]/35 bg-black/55 p-3 backdrop-blur-sm md:mt-5 md:p-4"
            >
              <p className="font-mono text-[9px] tracking-[0.18em] text-[var(--color-daylight)] uppercase">
                Client message · {STORY_PROJECT.changeRequest.from}
              </p>
              <p className="mt-2 text-sm text-white/90">
                &ldquo;{STORY_PROJECT.changeRequest.message}&rdquo;
              </p>
            </div>

            <div
              data-film="clarify"
              className="mt-2 hidden border border-white/15 bg-black/50 p-3 md:mt-3 md:block md:p-4"
            >
              <p className="font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">
                Partner clarifies
              </p>
              <p className="mt-1 text-sm text-white/75">
                {STORY_PROJECT.changeRequest.clarified}
              </p>
            </div>

            <div
              data-film="task"
              className={cn(
                "mt-3 w-full max-w-sm border border-white/25 bg-[var(--color-ink)] p-3 will-change-transform md:p-4",
                beat === "build" || beat === "reply" || beat === "approved"
                  ? "border-[var(--color-signal)]"
                  : "",
              )}
            >
              <p className="font-mono text-[9px] tracking-[0.16em] text-[var(--color-tungsten)] uppercase">
                Task card · travels to developer
              </p>
              <p className="mt-2 text-sm text-white/85">
                Add customer activity filter (7 / 30 / 90 days)
              </p>
              <p className="mt-2 font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase">
                Status ·{" "}
                {beat === "approved"
                  ? "Done"
                  : beat === "build" || beat === "reply"
                    ? "In progress"
                    : "Queued"}
              </p>
            </div>

            <div
              data-film="reply"
              className="mt-2 hidden border border-white/15 bg-black/50 p-3 md:mt-3 md:block md:p-4"
            >
              <p className="font-mono text-[9px] tracking-[0.16em] text-[var(--color-signal)] uppercase">
                Partner update to client
              </p>
              <p className="mt-1 text-sm text-white/75">
                {STORY_PROJECT.changeRequest.implemented}
              </p>
            </div>

            <div
              data-film="approve"
              className="mt-3 inline-block border border-[var(--color-signal)]/55 bg-black/60 px-3 py-2 font-mono text-[9px] tracking-[0.16em] text-[var(--color-signal)] uppercase"
            >
              Client · {STORY_PROJECT.changeRequest.approved}
            </div>
          </div>
        </ScenePanel>
      </ScenePin>
    </section>
  );
}
