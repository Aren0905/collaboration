"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import {
  ScenePin,
  ScenePanel,
  SceneStage,
} from "@/components/cinematic/ScenePin";
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
 * Event 5 — Live software build. Dashboard animates in the stage over the plate.
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
    endMobile: "+=180%",
    scrubDesktop: 0.7,
    scrubMobile: true,
    build: ({ gsap: g, q, isDesktop }, tl) => {
      const plate = q("[data-film='plate']");
      const ide = q("[data-film='ide']");
      const dash = q("[data-film='dash']");
      const title = q("[data-film='title']");
      const steps = q("[data-film='step']");
      const body = q("[data-film='body']");

      g.set(plate, { opacity: 0.5, scale: 1.08 });
      g.set(ide, { opacity: 0, y: 18 });
      g.set(dash, { opacity: 0, y: 20, scale: 0.96 });
      g.set(title, { opacity: 0, y: 14 });
      g.set(body, { opacity: 0, y: 10 });
      g.set(steps, { opacity: 0.25 });

      const applyProgress = (progress: number) => {
        if (progress < 0.25) {
          setStage(0);
          setCodeLines(3);
        } else if (progress < 0.4) {
          setStage(1);
          setCodeLines(5);
        } else if (progress < 0.55) {
          setStage(2);
          setCodeLines(7);
        } else if (progress < 0.7) {
          setStage(3);
          setCodeLines(9);
        } else {
          setStage(4);
          setCodeLines(10);
        }
      };

      tl.eventCallback("onUpdate", () => {
        const st = tl.scrollTrigger;
        if (st) applyProgress(st.progress);
      });

      tl.to(plate, { opacity: 0.75, scale: 1, duration: 0.55 }, 0);
      tl.to(title, { opacity: 1, y: 0, duration: 0.35 }, 0.1);
      tl.to(body, { opacity: 1, y: 0, duration: 0.3 }, 0.2);
      tl.to(ide, { opacity: 1, y: 0, duration: 0.45 }, 0.3);
      tl.to(dash, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0.4);
      tl.to(steps, { opacity: 1, stagger: 0.28, duration: 0.25 }, 0.75);
      tl.to(dash, { scale: isDesktop ? 1.03 : 1.02, duration: 0.4 }, 2.15);
      tl.to(ide, { opacity: 0.55, duration: 0.35 }, 2.2);

      return () => {
        tl.eventCallback("onUpdate", null);
      };
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
      <ScenePin ref={pinRef} className="bg-[var(--color-ink)]" align="end">
        <div data-film="plate" className="absolute inset-0 will-change-transform">
          <FilmPlate
            src={FILM_ASSETS.coding.src}
            alt={FILM_ASSETS.coding.alt}
            focus={FILM_ASSETS.coding.focus}
            focusMobile={FILM_ASSETS.coding.focusMobile}
            overlay="bottom"
          />
        </div>

        <SceneStage className="h-[min(34dvh,260px)] md:inset-auto md:top-auto md:right-10 md:bottom-[18%] md:left-auto md:h-auto md:w-[min(520px,48vw)]">
          <div
            data-film="dash"
            className="h-full will-change-transform opacity-0"
          >
            <CustomerDashboard stage={stage} className="h-full" />
          </div>
        </SceneStage>

        <ScenePanel>
          <div className="grid w-full gap-4 md:grid-cols-[0.95fr_1.05fr] md:items-end md:gap-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-signal)] uppercase">
                {content.eyebrow}
              </p>
              <h2
                id="scene-delivery-title"
                data-film="title"
                className="mt-2 max-w-xl font-display text-[clamp(1.3rem,4.8vw,2.6rem)] leading-[1.1] text-white"
              >
                {content.title}
              </h2>
              <p data-film="body" className="mt-2 max-w-md text-sm text-white/70">
                {content.body}
              </p>

              <ol className="mt-4 space-y-1.5 md:mt-6 md:space-y-2">
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
                      <span className="ml-2 hidden text-xs text-white/40 sm:inline">
                        {step.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div
                data-film="ide"
                className="mt-4 hidden will-change-transform md:mt-6 md:block"
              >
                <CodeEditorFrame visibleLines={codeLines} />
              </div>
            </div>

            <p className="hidden font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase md:block">
              Live UI simulation · not a screenshot
            </p>
          </div>
        </ScenePanel>
      </ScenePin>
    </section>
  );
}
