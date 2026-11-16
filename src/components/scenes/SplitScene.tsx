"use client";

import { useRef, useState } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { RevenueExampleSlider } from "@/components/cinematic/RevenueExampleSlider";
import {
  EXAMPLE_REVENUE_DEFAULT,
  formatUSD,
  splitRevenue,
} from "@/lib/revenue";
import { SCENES } from "@/lib/content";

const content = SCENES.find((s) => s.id === "split")!;

/**
 * Scene 6 — Single revenue filament → 60/40 bifurcation.
 * Signature: SVG stream split + live illustrative calculator.
 */
export function SplitScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [example, setExample] = useState(EXAMPLE_REVENUE_DEFAULT);
  const { developer, partner } = splitRevenue(example);

  useCinematicScene({
    id: "split",
    rootRef,
    pinRef,
    endDesktop: "+=200%",
    endMobile: "+=140%",
    scrubDesktop: 0.65,
    scrubMobile: 0.45,
    build: ({ gsap: g, q }, tl) => {
      const trunk = q("[data-split='trunk']");
      const pathDev = q("[data-split='path-dev']");
      const pathPartner = q("[data-split='path-partner']");
      const labels = q("[data-split='label']");
      const title = q("[data-split='title']");
      const body = q("[data-split='body']");
      const calc = q("[data-split='calc']");
      const bridge = q("[data-split='bridge']");

      g.set([trunk, pathDev, pathPartner], {
        strokeDasharray: 1,
        strokeDashoffset: 1,
      });
      g.set(labels, { opacity: 0, y: 12 });
      g.set([title, body], { opacity: 0, y: 18 });
      g.set(calc, { opacity: 0, y: 20 });
      g.set(bridge, { scaleX: 0, opacity: 0, transformOrigin: "center" });

      tl.to([title, body], { opacity: 1, y: 0, stagger: 0.08, duration: 0.45 }, 0);
      tl.to(trunk, { strokeDashoffset: 0, duration: 0.6 }, 0.2);
      tl.to(pathDev, { strokeDashoffset: 0, duration: 0.7 }, 0.55);
      tl.to(pathPartner, { strokeDashoffset: 0, duration: 0.7 }, 0.55);
      tl.to(labels, { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, 1.0);
      tl.to(calc, { opacity: 1, y: 0, duration: 0.45 }, 1.25);
      // Streams reconnect into partnership bridge
      tl.to(bridge, { scaleX: 1, opacity: 1, duration: 0.6 }, 1.55);
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
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
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
            <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
              Two streams reconnect as one partnership
            </p>
          </div>

          <div
            data-split="calc"
            className="border border-white/15 bg-black/40 p-6 backdrop-blur-sm"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
              Illustrative example
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
        </div>
      </div>
    </section>
  );
}
