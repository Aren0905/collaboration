"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
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
    endMobile: "+=180%",
    scrubDesktop: 0.65,
    scrubMobile: 0.45,
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

      g.set(complete, { opacity: 0, scale: 0.92, y: 16 });
      g.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
      g.set(labels, { opacity: 0, y: 12 });
      g.set(copy, { opacity: 0, y: 18 });
      g.set(calc, { opacity: 0, y: 20 });
      g.set(bridge, { scaleX: 0, opacity: 0, transformOrigin: "center" });
      g.set(chair, { opacity: 0, scale: 1.08 });
      g.set(invite, { opacity: 0, y: 18 });
      g.set(explorer, { opacity: 0, y: 22 });

      // Completion → revenue stream
      tl.to(complete, { opacity: 1, scale: 1, y: 0, duration: 0.45 }, 0);
      tl.to(copy, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, 0.25);
      tl.to(trunk, { strokeDashoffset: 0, duration: 0.55 }, 0.45);
      tl.to(pathDev, { strokeDashoffset: 0, duration: 0.65 }, 0.75);
      tl.to(pathPartner, { strokeDashoffset: 0, duration: 0.65 }, 0.75);
      tl.to(labels, { opacity: 1, y: 0, stagger: 0.1, duration: 0.35 }, 1.15);
      tl.to(calc, { opacity: 1, y: 0, duration: 0.4 }, 1.35);
      tl.to(bridge, { scaleX: 1, opacity: 1, duration: 0.5 }, 1.6);

      // Camera returns to empty chair + invitation
      tl.to(complete, { opacity: 0.25, duration: 0.4 }, 1.85);
      tl.to(chair, { opacity: 1, scale: 1, duration: 0.7 }, 1.9);
      tl.to(invite, { opacity: 1, y: 0, duration: 0.45 }, 2.25);
      tl.to(explorer, { opacity: 1, y: 0, duration: 0.5 }, 2.45);
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
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[var(--color-ink)] px-5 py-16 md:px-10 lg:px-16"
      >
        <div
          data-split="chair"
          className="pointer-events-none absolute inset-0 opacity-0"
        >
          <FilmPlate
            src={FILM_ASSETS.emptyChair.src}
            alt=""
            overlay="heavy"
          />
        </div>

        <div className="relative z-[5] mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <div
              data-split="complete"
              className="mb-6 inline-flex items-center gap-2 border border-[var(--color-signal)]/45 bg-black/55 px-3 py-2"
            >
              <span className="h-2 w-2 bg-[var(--color-signal)]" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-signal)] uppercase">
                Project delivered · {STORY_PROJECT.title}
              </span>
            </div>

            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-copper)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-split-title"
              data-split="title"
              className="mt-3 font-display text-[clamp(2.5rem,8vw,5rem)] leading-none text-white"
            >
              {content.title}
            </h2>
            <p data-split="body" className="mt-5 max-w-md text-white/70">
              {content.body}
            </p>
            <p className="mt-3 text-sm text-[var(--color-tungsten)]">
              {content.closing}
            </p>

            <div className="mt-5 max-w-sm">
              <ProjectBrief compact />
            </div>

            <svg
              viewBox="0 0 420 220"
              className="mt-8 w-full max-w-md"
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
                x="388"
                y="46"
                fill="var(--color-tungsten)"
                fontSize="12"
                fontFamily="var(--font-mono)"
              >
                60% Developer
              </text>
              <text
                data-split="label"
                x="388"
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
              className="mt-6 h-px w-full bg-gradient-to-r from-[var(--color-tungsten)] via-white/40 to-[var(--color-daylight)]"
              aria-hidden
            />

            <div data-split="invite" className="mt-8 max-w-md">
              <p className="font-display text-2xl text-white md:text-3xl">
                The empty chair is yours.
              </p>
              <p className="mt-2 text-sm text-white/65">
                If you lead English communication and want to pursue
                international software projects with me — start here.
              </p>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent("Partnership — The Connection")}`}
                className="mt-5 inline-block border border-[var(--color-paper)] bg-[var(--color-paper)] px-5 py-3 font-mono text-[11px] tracking-[0.2em] text-[var(--color-void)] uppercase hover:bg-transparent hover:text-[var(--color-paper)]"
              >
                Email Aaron
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div
              data-split="calc"
              className="border border-white/15 bg-black/40 p-6 backdrop-blur-sm"
            >
              <p className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
                Illustrative example · {STORY_PROJECT.client}
              </p>
              <p className="mt-2 text-sm text-white/60">
                Current example: {formatUSD(example)} → {formatUSD(developer)} +{" "}
                {formatUSD(partner)}
              </p>
              <div className="mt-6">
                <RevenueExampleSlider value={example} onChange={setExample} />
              </div>
              <p className="mt-5 text-xs leading-relaxed text-white/45">
                {content.disclaimer}
              </p>
            </div>

            <div data-split="explorer">
              <RoleExplorer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
