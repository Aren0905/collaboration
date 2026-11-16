"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { CodeEditorFrame } from "@/components/sim/CodeEditorFrame";
import {
  CustomerDashboard,
  type DashboardStage,
} from "@/components/sim/CustomerDashboard";
import { FILM_ASSETS } from "@/lib/assets";
import { BUILD_STEPS } from "@/lib/project";
import { SCENES } from "@/lib/content";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "delivery")!;

/**
 * Event 5 — Live software build.
 * IDE + progressive React dashboard: blank → nav → table → charts → tests.
 */
export function DeliveryScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<DashboardStage>(0);
  const [codeLines, setCodeLines] = useState(3);

  useCinematicScene({
    id: "delivery",
    rootRef,
    pinRef,
    endDesktop: "+=340%",
    endMobile: "+=240%",
    scrubDesktop: 0.7,
    scrubMobile: 0.5,
    build: ({ gsap: g, q }, tl) => {
      const plate = q("[data-film='plate']");
      const ide = q("[data-film='ide']");
      const dash = q("[data-film='dash']");
      const title = q("[data-film='title']");
      const steps = q("[data-film='step']");
      const body = q("[data-film='body']");

      g.set(plate, { opacity: 0.45, scale: 1.08 });
      g.set(ide, { opacity: 0, y: 28, rotateX: 8 });
      g.set(dash, { opacity: 0, y: 36, scale: 0.96 });
      g.set(title, { opacity: 0, y: 22 });
      g.set(body, { opacity: 0, y: 16 });
      g.set(steps, { opacity: 0.25 });

      tl.to(plate, { opacity: 0.7, scale: 1, duration: 0.6 }, 0);
      tl.to(title, { opacity: 1, y: 0, duration: 0.4 }, 0.1);
      tl.to(body, { opacity: 1, y: 0, duration: 0.35 }, 0.25);
      tl.to(ide, { opacity: 1, y: 0, rotateX: 0, duration: 0.55 }, 0.35);
      tl.to(dash, { opacity: 1, y: 0, scale: 1, duration: 0.55 }, 0.55);

      // Progressive build beats
      tl.call(() => {
        setStage(1);
        setCodeLines(5);
      }, undefined, 0.85);
      tl.to(steps, { opacity: 1, stagger: 0.4, duration: 0.3 }, 0.85);

      tl.call(() => {
        setStage(2);
        setCodeLines(7);
      }, undefined, 1.25);

      tl.call(() => {
        setStage(3);
        setCodeLines(9);
      }, undefined, 1.7);

      tl.call(() => {
        setStage(4);
        setCodeLines(10);
      }, undefined, 2.15);

      tl.to(dash, { scale: 1.03, duration: 0.5 }, 2.4);
      tl.to(ide, { opacity: 0.55, duration: 0.45 }, 2.45);
    },
  });

  return (
    <section
      ref={rootRef}
      id="scene-delivery"
      data-scene="delivery"
      aria-labelledby="scene-delivery-title"
      className="relative"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-end overflow-hidden bg-[var(--color-ink)] md:items-center"
      >
        <div data-film="plate" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.coding.src}
            alt={FILM_ASSETS.coding.alt}
            overlay="bottom"
          />
        </div>

        <div className="relative z-[5] grid w-full gap-5 px-5 pb-12 md:grid-cols-[0.9fr_1.1fr] md:items-end md:gap-8 md:px-10 md:pb-14 lg:px-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-signal)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-delivery-title"
              data-film="title"
              className="mt-3 max-w-xl font-display text-[clamp(1.55rem,3.6vw,2.6rem)] leading-[1.1] text-white"
            >
              {content.title}
            </h2>
            <p data-film="body" className="mt-3 max-w-md text-sm text-white/70">
              {content.body}
            </p>

            <ol className="mt-6 space-y-2">
              {BUILD_STEPS.map((step, i) => (
                <li
                  key={step.id}
                  data-film="step"
                  className={cn(
                    "flex items-baseline gap-3 border-l pl-3",
                    stage > i
                      ? "border-[var(--color-signal)]"
                      : "border-white/20",
                  )}
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-signal)] uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="text-sm text-white/85">{step.label}</span>
                    <span className="ml-2 text-xs text-white/40">
                      {step.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div data-film="ide" className="mt-6 will-change-transform">
              <CodeEditorFrame visibleLines={codeLines} />
            </div>
          </div>

          <div data-film="dash" className="will-change-transform">
            <CustomerDashboard stage={stage} />
            <p className="mt-3 font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase">
              Live UI simulation · not a screenshot
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
