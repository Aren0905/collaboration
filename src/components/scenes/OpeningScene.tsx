"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/components/experience/ExperienceContext";
import { OpeningSignal } from "@/components/opening/OpeningSignal";
import { ScrollCue } from "@/components/opening/ScrollCue";
import { WorkspacePlate } from "@/components/opening/WorkspacePlate";
import { SCENES } from "@/lib/content";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const content = SCENES[0];

/**
 * Cinematic opening: darkness → signal → type → camera travel → dual workspaces.
 * Owns its ScrollTrigger pin + timeline; cleaned via matchMedia.revert().
 */
export function OpeningScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const { setActiveSceneId, setSceneProgress, scrollToScene } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const world = worldRef.current;
    if (!root || !pin || !world) return;

    const gsap = registerGsapPlugins();
    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(root);

    const setProgress = (value: number) => {
      setActiveSceneId("threshold");
      setSceneProgress("threshold", value);
    };

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const conditions = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };
        const isDesktop = Boolean(conditions.isDesktop);
        const reduceMotion = Boolean(conditions.reduceMotion);

        const line1 = q('[data-opening="line-1"]');
        const line2 = q('[data-opening="line-2"]');
        const cue = q('[data-opening="scroll-cue"]');
        const bridge = q('[data-opening="bridge"]');
        const signalPath = q('[data-opening="signal-path"]');
        const branchA = q('[data-opening="signal-branch-a"]');
        const branchB = q('[data-opening="signal-branch-b"]');
        const plateA = q('[data-opening="plate-tungsten"]');
        const plateB = q('[data-opening="plate-daylight"]');
        const veil = q('[data-opening="veil"]');
        const parallaxNodes = q("[data-parallax]");

        if (reduceMotion) {
          gsap.set([line1, line2, bridge, plateA, plateB], {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "none",
          });
          gsap.set(cue, { opacity: 0.65, y: 0 });
          gsap.set([signalPath, branchA, branchB], { strokeDashoffset: 0 });
          gsap.set(veil, { opacity: 0.35 });
          setProgress(1);
          return;
        }

        const blurIn = isDesktop ? "blur(8px)" : "none";

        gsap.set(line1, { opacity: 0, y: 28, filter: blurIn });
        gsap.set(line2, { opacity: 0, y: 24, filter: blurIn });
        gsap.set(cue, { opacity: 0, y: 12 });
        gsap.set(bridge, { opacity: 0, y: 20 });
        gsap.set(plateA, {
          opacity: 0,
          y: isDesktop ? 40 : 28,
          scale: 0.96,
          rotate: isDesktop ? -1.5 : 0,
        });
        gsap.set(plateB, {
          opacity: 0,
          y: isDesktop ? 40 : 28,
          scale: 0.96,
          rotate: isDesktop ? 1.5 : 0,
        });
        gsap.set(world, { z: 0, scale: 1, x: 0, y: 0 });
        gsap.set(veil, { opacity: 0.92 });
        gsap.set([signalPath, branchA, branchB], { strokeDashoffset: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: isDesktop ? "+=320%" : "+=240%",
            pin: pin,
            scrub: isDesktop ? 0.75 : 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
            onEnter: () => setActiveSceneId("threshold"),
            onEnterBack: () => setActiveSceneId("threshold"),
          },
        });

        // 1. Darkness → luminous signal
        tl.to(signalPath, { strokeDashoffset: 0, duration: 1.2 }, 0);
        tl.to(veil, { opacity: 0.55, duration: 0.8 }, 0.15);

        // 2. Typography
        tl.to(
          line1,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
          },
          0.45,
        );
        tl.to(
          line2,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
          },
          0.75,
        );
        tl.to(cue, { opacity: 1, y: 0, duration: 0.45 }, 1.05);

        // 3–4. Scroll-driven camera travel
        tl.to(
          world,
          {
            z: isDesktop ? 140 : 70,
            scale: isDesktop ? 1.12 : 1.06,
            y: isDesktop ? -28 : -16,
            duration: 1.6,
          },
          1.2,
        );
        tl.to(veil, { opacity: 0.18, duration: 1 }, 1.3);
        tl.to(cue, { opacity: 0, y: -8, duration: 0.4 }, 1.35);
        tl.to([line1, line2], { opacity: 0.16, y: -12, duration: 0.6 }, 1.55);

        // 5. Abstract → human workspaces
        tl.to(branchA, { strokeDashoffset: 0, duration: 0.7 }, 1.7);
        tl.to(branchB, { strokeDashoffset: 0, duration: 0.7 }, 1.85);
        tl.to(
          plateA,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: isDesktop ? -2 : 0,
            duration: 0.85,
          },
          1.75,
        );
        tl.to(
          plateB,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: isDesktop ? 2 : 0,
            duration: 0.85,
          },
          1.95,
        );

        // 6. Two strengths combined
        tl.to(bridge, { opacity: 1, y: 0, duration: 0.6 }, 2.35);
        tl.to([line1, line2], { opacity: 0, duration: 0.35 }, 2.35);

        const cleanups: Array<() => void> = [];

        if (isDesktop) {
          const onMove = (event: PointerEvent) => {
            const x = event.clientX / window.innerWidth - 0.5;
            const y = event.clientY / window.innerHeight - 0.5;
            parallaxNodes.forEach((node: Element, index: number) => {
              const depth = (index + 1) * 12;
              gsap.to(node, {
                x: x * depth,
                y: y * depth * 0.5,
                duration: 1.15,
                ease: "power3.out",
                overwrite: "auto",
              });
            });
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          cleanups.push(() =>
            window.removeEventListener("pointermove", onMove),
          );
        }

        return () => {
          cleanups.forEach((fn) => fn());
        };
      },
    );

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [setActiveSceneId, setSceneProgress]);

  return (
    <section
      ref={rootRef}
      id="scene-threshold"
      data-scene="threshold"
      data-atmosphere="void"
      aria-labelledby="scene-threshold-title"
      className="relative z-10"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[var(--color-void)]"
      >
        <div
          data-opening="veil"
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_42%,rgba(36,30,24,0.4),transparent_46%),rgba(7,7,8,0.94)]"
          aria-hidden
        />
        <div
          className="film-grain pointer-events-none absolute inset-0 z-[8] opacity-[0.05] mix-blend-overlay"
          aria-hidden
        />

        <div className="absolute inset-0 z-[2] [perspective:1200px]">
          <div
            ref={worldRef}
            data-parallax
            className="relative h-full w-full [transform-style:preserve-3d] will-change-transform"
          >
            <OpeningSignal />

            <div className="pointer-events-none absolute inset-0 z-[3] md:px-12">
              <div data-parallax className="relative h-full w-full">
                <WorkspacePlate
                  tone="tungsten"
                  label="Technical partner · night desk"
                  caption="Build. Prepare. Deliver."
                  className="absolute top-[12%] left-4 aspect-[4/3] w-[58%] max-w-[280px] md:top-[18%] md:left-[4%] md:w-[38%] md:max-w-none lg:left-[8%]"
                />
                <WorkspacePlate
                  tone="daylight"
                  label="Communication partner · day desk"
                  caption="Lead the room. Own the relationship."
                  className="absolute right-4 bottom-[14%] aspect-[4/3] w-[58%] max-w-[280px] md:top-auto md:right-[4%] md:bottom-[16%] md:w-[38%] md:max-w-none lg:right-[8%]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center px-6">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <h1 id="scene-threshold-title" className="sr-only">
              {content.title}
            </h1>
            <p
              data-opening="line-1"
              className="max-w-3xl font-display text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-balance text-[var(--color-paper)]"
            >
              {content.title}
            </p>
            <p
              data-opening="line-2"
              className="mt-5 max-w-2xl font-display text-[clamp(1.15rem,3.2vw,2rem)] leading-snug text-balance text-white/70 md:mt-6"
            >
              {content.body}
            </p>
            <p
              data-opening="bridge"
              className="mt-8 max-w-xl font-mono text-[11px] tracking-[0.28em] text-[var(--color-tungsten)] uppercase md:text-[12px]"
            >
              {content.bridge}
            </p>
          </div>
        </div>

        <ScrollCue label={content.cue} />

        <div className="absolute top-[max(5.5rem,env(safe-area-inset-top))] right-4 z-30 md:right-8">
          <button
            type="button"
            onClick={() => scrollToScene("strengths")}
            className={cn(
              "pointer-events-auto border border-white/20 bg-black/40 px-3 py-2",
              "font-mono text-[9px] tracking-[0.22em] text-white/70 uppercase backdrop-blur-sm",
              "transition-colors hover:border-[var(--color-tungsten)]/50 hover:text-[var(--color-tungsten)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-copper)]",
            )}
          >
            Read the opportunity
          </button>
        </div>
      </div>

      <aside
        className="relative border-t border-white/10 bg-[var(--color-ink)] px-6 py-16 md:px-12"
        aria-label="Opportunity summary"
      >
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div className="space-y-4">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-tungsten)] uppercase">
              The opportunity
            </p>
            <p className="font-display text-2xl leading-snug text-[var(--color-paper)] md:text-3xl">
              {content.title} {content.body}
            </p>
            <p className="max-w-xl text-base leading-relaxed text-white/65">
              If you lead conversations, interviews, and client rooms in English —
              and want those skills inside a real software practice — keep
              scrolling. Roles stay transparent. Delivery stays technical.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-4 border-l border-white/10 pl-6 md:pl-10">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
              Continue
            </p>
            <button
              type="button"
              onClick={() => scrollToScene("strengths")}
              className="text-left font-display text-xl text-[var(--color-paper)] underline-offset-4 hover:underline md:text-2xl"
            >
              Enter the story →
            </button>
            <button
              type="button"
              onClick={() => scrollToScene("split")}
              className="text-left font-mono text-[11px] tracking-[0.18em] text-white/55 uppercase hover:text-[var(--color-tungsten)]"
            >
              Or jump to terms
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
}
