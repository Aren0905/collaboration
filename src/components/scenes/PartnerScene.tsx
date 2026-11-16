"use client";

import { useRef } from "react";
import { useCinematicScene } from "@/hooks/useCinematicScene";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { FILM_ASSETS } from "@/lib/assets";
import { ROLE_CREDITS, SCENES } from "@/lib/content";

const content = SCENES.find((s) => s.id === "partner")!;

/**
 * Scene 2 — Empty chair → partner workspace.
 * Signature: crossfade + clip reveal from vacancy to daylight partner.
 */
export function PartnerScene() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useCinematicScene({
    id: "partner",
    rootRef,
    pinRef,
    endDesktop: "+=240%",
    endMobile: "+=160%",
    scrubDesktop: 0.7,
    scrubMobile: 0.5,
    build: ({ gsap: g, q, isDesktop }, tl) => {
      const empty = q("[data-film='empty']");
      const partner = q("[data-film='partner']");
      const title = q("[data-film='title']");
      const body = q("[data-film='body']");
      const roles = q("[data-film='roles']");
      const portal = q("[data-film='portal']");

      g.set(empty, { opacity: 1, scale: 1.04 });
      g.set(partner, {
        opacity: 0,
        clipPath: isDesktop
          ? "inset(0 0 0 100%)"
          : "inset(100% 0 0 0)",
      });
      g.set([title, body], { opacity: 0, y: 24 });
      g.set(roles, { opacity: 0, y: 20 });
      g.set(portal, { opacity: 0, scale: 0.92 });

      tl.to(empty, { scale: 1, duration: 0.6 }, 0);
      tl.to([title, body], { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, 0.15);
      tl.to(
        partner,
        {
          opacity: 1,
          clipPath: "inset(0 0 0 0%)",
          duration: 1.1,
        },
        0.45,
      );
      tl.to(empty, { opacity: 0.25, duration: 0.8 }, 0.55);
      tl.to(roles, { opacity: 1, y: 0, duration: 0.5 }, 1.2);
      tl.to(portal, { opacity: 1, scale: 1, duration: 0.55 }, 1.55);
      // Push into partner laptop as portal cue
      tl.to(
        partner,
        { scale: isDesktop ? 1.12 : 1.08, duration: 0.7 },
        1.7,
      );
    },
  });

  return (
    <section
      ref={rootRef}
      id="scene-partner"
      data-scene="partner"
      aria-labelledby="scene-partner-title"
      className="relative"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-end overflow-hidden bg-[var(--color-ink)] md:items-center"
      >
        <div
          data-film="empty"
          className="absolute inset-0 will-change-transform"
        >
          <FilmPlate
            src={FILM_ASSETS.emptyChair.src}
            alt={FILM_ASSETS.emptyChair.alt}
            overlay="heavy"
          />
        </div>

        <div
          data-film="partner"
          className="absolute inset-0 will-change-transform"
          style={{ clipPath: "inset(0 0 0 100%)" }}
        >
          <FilmPlate
            src={FILM_ASSETS.partnerDay.src}
            alt={FILM_ASSETS.partnerDay.alt}
            overlay="left"
          />
        </div>

        <div className="relative z-[5] w-full px-5 pb-14 md:px-10 lg:px-16">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-daylight)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-partner-title"
              data-film="title"
              className="mt-3 font-display text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.08] text-balance text-white"
            >
              {content.title}
            </h2>
            <p
              data-film="body"
              className="mt-4 text-lg text-[var(--color-daylight)] md:text-xl"
            >
              {content.body}
            </p>

            <div
              data-film="roles"
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              <RoleList
                title={ROLE_CREDITS.technical.title}
                lines={ROLE_CREDITS.technical.lines}
                tone="tungsten"
              />
              <RoleList
                title={ROLE_CREDITS.communication.title}
                lines={ROLE_CREDITS.communication.lines}
                tone="daylight"
              />
            </div>

            <p
              data-film="portal"
              className="mt-8 font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase"
            >
              Through his screen → we search the world together
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleList({
  title,
  lines,
  tone,
}: {
  title: string;
  lines: readonly string[];
  tone: "tungsten" | "daylight";
}) {
  return (
    <div className="border border-white/15 bg-black/40 p-4 backdrop-blur-sm">
      <p
        className={
          tone === "tungsten"
            ? "font-mono text-[10px] tracking-[0.2em] text-[var(--color-tungsten)] uppercase"
            : "font-mono text-[10px] tracking-[0.2em] text-[var(--color-daylight)] uppercase"
        }
      >
        {title}
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-white/75">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
