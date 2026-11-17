"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { ScenePin, ScenePanel } from "@/components/cinematic/ScenePin";
import { RevenueExampleSlider } from "@/components/cinematic/RevenueExampleSlider";
import { RoleExplorer } from "@/components/sim/RoleExplorer";
import { ProjectBrief } from "@/components/sim/ProjectBrief";
import { FILM_ASSETS } from "@/lib/assets";
import {
  EXAMPLE_REVENUE_DEFAULT,
  formatUSD,
  splitRevenue,
} from "@/lib/revenue";
import { SITE, SCENES } from "@/lib/content";
import { STORY_PROJECT } from "@/lib/project";

const content = SCENES.find((s) => s.id === "split")!;

/**
 * Event 7 — Delivery complete → revenue 60/40 → empty chair invitation.
 */
export function SplitScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [example, setExample] = useState<number>(
    STORY_PROJECT.budgetExample || EXAMPLE_REVENUE_DEFAULT,
  );
  const { developer, partner } = splitRevenue(example);

  useCinematicScene({
    id: "split",
    rootRef,
    pinRef,
    endDesktop: "+=260%",
    endMobile: "+=150%",
    scrubDesktop: 0.65,
    scrubMobile: true,
    build: ({ gsap: g, q, targets }, tl) => {
      const complete = q("[data-split='complete']");
      const trunk = q("[data-split='trunk']");
      const pathDev = q("[data-split='path-dev']");
      const pathPartner = q("[data-split='path-partner']");
      const labels = q("[data-split='label']");
      const title = q("[data-split='title']");
      const body = q("[data-split='body']");
      const calc = q("[data-split='calc']");
      const bridge = q("[data-split='bridge']");
      const chair = q("[data-split='chair']");
      const invite = q("[data-split='invite']");
      const explorer = q("[data-split='explorer']");
      const paths = targets(trunk, pathDev, pathPartner);
      const copy = targets(title, body);

      g.set(complete, { opacity: 0, scale: 0.95, y: 12 });
      g.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
      g.set(labels, { opacity: 0, y: 10 });
      g.set(copy, { opacity: 0, y: 14 });
      g.set(calc, { opacity: 0, y: 14 });
      g.set(bridge, { scaleX: 0, opacity: 0, transformOrigin: "center" });
      g.set(chair, { opacity: 0, scale: 1.05 });
      g.set(invite, { opacity: 0, y: 12 });
      g.set(explorer, { opacity: 0, y: 14 });

      tl.to(complete, { opacity: 1, scale: 1, y: 0, duration: 0.4 }, 0);
      tl.to(copy, { opacity: 1, y: 0, stagger: 0.08, duration: 0.35 }, 0.2);
      tl.to(trunk, { strokeDashoffset: 0, duration: 0.5 }, 0.35);
      tl.to(pathDev, { strokeDashoffset: 0, duration: 0.55 }, 0.6);
      tl.to(pathPartner, { strokeDashoffset: 0, duration: 0.55 }, 0.6);
      tl.to(labels, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 }, 1);
      tl.to(calc, { opacity: 1, y: 0, duration: 0.35 }, 1.15);
      tl.to(bridge, { scaleX: 1, opacity: 1, duration: 0.4 }, 1.4);
      tl.to(complete, { opacity: 0.3, duration: 0.3 }, 1.65);
      tl.to(chair, { opacity: 1, scale: 1, duration: 0.55 }, 1.7);
      tl.to(invite, { opacity: 1, y: 0, duration: 0.4 }, 2);
      tl.to(explorer, { opacity: 1, y: 0, duration: 0.4 }, 2.15);
    },
  });

  return (
    <section
      ref={rootRef}
      id="scene-split"
      data-scene="split"
      aria-labelledby="scene-split-title"
      className="relative"
    >
      <ScenePin
        ref={pinRef}
        className="bg-[var(--color-ink)]"
        align="center"
        fluid
      >
        <div
          data-split="chair"
          className="pointer-events-none absolute inset-0 opacity-0"
        >
          <FilmPlate
            src={FILM_ASSETS.emptyChair.src}
            alt=""
            focus={FILM_ASSETS.emptyChair.focus}
            focusMobile={FILM_ASSETS.emptyChair.focusMobile}
            overlay="heavy"
          />
        </div>

        <ScenePanel className="max-h-none bg-gradient-to-t from-black via-black/85 to-black/40 py-10 md:from-transparent md:via-transparent md:to-transparent md:py-12">
          <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-10">
            <div>
              <div
                data-split="complete"
                className="mb-5 inline-flex items-center gap-2 border border-[var(--color-signal)]/45 bg-black/55 px-3 py-2"
              >
                <span className="h-2 w-2 bg-[var(--color-signal)]" />
                <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--color-signal)] uppercase md:text-[10px]">
                  Project delivered · {STORY_PROJECT.title}
                </span>
              </div>

              <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-copper)] uppercase">
                {content.eyebrow}
              </p>
              <h2
                id="scene-split-title"
                data-split="title"
                className="mt-2 font-display text-[clamp(2.2rem,12vw,5rem)] leading-none text-white"
              >
                {content.title}
              </h2>
              <p
                data-split="body"
                className="mt-4 max-w-md text-sm text-white/70 md:text-base"
              >
                {content.body}
              </p>
              <p className="mt-2 text-sm text-[var(--color-tungsten)]">
                {content.closing}
              </p>

              <div className="mt-4 max-w-sm">
                <ProjectBrief compact />
              </div>

              <svg
                viewBox="0 0 420 220"
                className="mt-6 w-full max-w-md"
                aria-hidden
              >
                <path
                  data-split="trunk"
                  d="M40 110 H180"
                  fill="none"
                  stroke="var(--color-signal)"
                  strokeWidth="3"
                  pathLength={1}
                />
                <path
                  data-split="path-dev"
                  d="M180 110 C240 110 250 50 380 50"
                  fill="none"
                  stroke="var(--color-tungsten)"
                  strokeWidth="3"
                  pathLength={1}
                />
                <path
                  data-split="path-partner"
                  d="M180 110 C240 110 250 170 380 170"
                  fill="none"
                  stroke="var(--color-daylight)"
                  strokeWidth="3"
                  pathLength={1}
                />
                <text
                  data-split="label"
                  x="300"
                  y="46"
                  fill="var(--color-tungsten)"
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                >
                  60% Developer
                </text>
                <text
                  data-split="label"
                  x="300"
                  y="166"
                  fill="var(--color-daylight)"
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                >
                  40% Partner
                </text>
              </svg>

              <div
                data-split="bridge"
                className="mt-5 h-px w-full bg-gradient-to-r from-[var(--color-tungsten)] via-white/40 to-[var(--color-daylight)]"
                aria-hidden
              />

              <div data-split="invite" className="mt-6 max-w-md">
                <p className="font-display text-xl text-white md:text-3xl">
                  The empty chair is yours.
                </p>
                <p className="mt-2 text-sm text-white/65">
                  If you lead English communication and want to pursue
                  international software projects with me — start here.
                </p>
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent("Partnership — The Connection")}`}
                  className="mt-4 inline-block border border-[var(--color-paper)] bg-[var(--color-paper)] px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-[var(--color-void)] uppercase hover:bg-transparent hover:text-[var(--color-paper)] md:px-5 md:py-3 md:text-[11px]"
                >
                  Email Aaron
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <div
                data-split="calc"
                className="border border-white/15 bg-black/40 p-4 backdrop-blur-sm md:p-6"
              >
                <p className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
                  Illustrative example · {STORY_PROJECT.client}
                </p>
                <p className="mt-2 text-sm text-white/60">
                  Current example: {formatUSD(example)} →{" "}
                  {formatUSD(developer)} + {formatUSD(partner)}
                </p>
                <div className="mt-5">
                  <RevenueExampleSlider value={example} onChange={setExample} />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-white/45">
                  {content.disclaimer}
                </p>
              </div>

              <div data-split="explorer">
                <RoleExplorer />
              </div>
            </div>
          </div>
        </ScenePanel>
      </ScenePin>
    </section>
  );
}
