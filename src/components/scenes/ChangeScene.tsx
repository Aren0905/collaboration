"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
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
 * Event 6 — Unexpected client change.
 * Client message → partner clarifies → task travels → feature ships → approval.
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
    endMobile: "+=230%",
    scrubDesktop: 0.72,
    scrubMobile: 0.5,
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
      g.set(targets(title, body), { opacity: 0, y: 20 });
      g.set(msg, { opacity: 0, y: 24, scale: 0.96 });
      g.set(clarify, { opacity: 0, x: isDesktop ? -16 : 0, y: 12 });
      g.set(task, {
        opacity: 0,
        x: isDesktop ? -80 : 0,
        y: isDesktop ? 0 : 20,
        scale: 0.95,
      });
      g.set(dash, { opacity: 0.4, y: 20 });
      g.set(reply, { opacity: 0, y: 16 });
      g.set(approve, { opacity: 0, scale: 0.9 });

      tl.to(plate, { opacity: 0.75, scale: 1, duration: 0.55 }, 0);
      tl.to(targets(title, body), { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, 0.1);

      // Client message arrives at partner
      tl.call(() => setBeat("message"), undefined, 0.45);
      tl.to(msg, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0.45);

      // Partner clarifies
      tl.call(() => setBeat("clarify"), undefined, 0.95);
      tl.to(clarify, { opacity: 1, x: 0, y: 0, duration: 0.45 }, 0.95);

      // Task card travels to developer
      tl.call(() => setBeat("travel"), undefined, 1.35);
      tl.to(task, { opacity: 1, duration: 0.25 }, 1.35);
      tl.to(
        task,
        {
          x: isDesktop ? 120 : 0,
          y: isDesktop ? 0 : -10,
          scale: 1,
          duration: 0.85,
        },
        1.45,
      );
      tl.to(dash, { opacity: 1, y: 0, duration: 0.5 }, 1.7);

      // Developer implements filter
      tl.call(() => {
        setBeat("build");
        setDashStage(5);
        setFilterDays(30);
      }, undefined, 2.15);
      tl.to(task, {
        borderColor: "var(--color-signal)",
        duration: 0.35,
      }, 2.15);

      // Partner replies + client approves
      tl.call(() => setBeat("reply"), undefined, 2.55);
      tl.to(reply, { opacity: 1, y: 0, duration: 0.4 }, 2.55);
      tl.call(() => setBeat("approved"), undefined, 2.95);
      tl.to(approve, { opacity: 1, scale: 1, duration: 0.45 }, 2.95);
      tl.to(msg, { opacity: 0.35, duration: 0.35 }, 3.0);
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
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-end overflow-hidden bg-[var(--color-ink-soft)] md:items-center"
      >
        <div data-film="plate" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.sharedProject.src}
            alt={FILM_ASSETS.sharedProject.alt}
            overlay="bottom"
          />
        </div>

        <div className="relative z-[5] w-full px-5 pb-12 md:px-10 md:pb-14 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-daylight)] uppercase">
                {content.eyebrow}
              </p>
              <h2
                id="scene-change-title"
                data-film="title"
                className="mt-3 font-display text-[clamp(1.55rem,3.5vw,2.55rem)] leading-[1.1] text-white"
              >
                {content.title}
              </h2>
              <p data-film="body" className="mt-3 max-w-lg text-sm text-white/70">
                {content.body}
              </p>

              <div
                data-film="msg"
                className="mt-6 border border-[var(--color-daylight)]/35 bg-black/55 p-4 backdrop-blur-sm"
              >
                <p className="font-mono text-[9px] tracking-[0.18em] text-[var(--color-daylight)] uppercase">
                  Client message · {STORY_PROJECT.changeRequest.from}
                </p>
                <p className="mt-2 text-base text-white/90">
                  &ldquo;{STORY_PROJECT.changeRequest.message}&rdquo;
                </p>
              </div>

              <div
                data-film="clarify"
                className="mt-3 border border-white/15 bg-black/50 p-4"
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
                  "mt-4 w-full max-w-sm border border-white/25 bg-[var(--color-ink)] p-4 will-change-transform",
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
                className="mt-3 border border-white/15 bg-black/50 p-4"
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
                className="mt-3 inline-block border border-[var(--color-signal)]/55 bg-black/60 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-[var(--color-signal)] uppercase"
              >
                Client · {STORY_PROJECT.changeRequest.approved}
              </div>
            </div>

            <div data-film="dash" className="will-change-transform">
              <CustomerDashboard
                stage={dashStage}
                filterDays={filterDays}
              />
              <p className="mt-3 font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase">
                Same dashboard · filter appears after the change request
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
