"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/components/experience/ExperienceContext";
import { FilmPlate } from "@/components/cinematic/FilmPlate";
import { PartnerApplicationForm } from "@/components/apply/PartnerApplicationForm";
import { FILM_ASSETS } from "@/lib/assets";
import { SCENES } from "@/lib/content";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";

const content = SCENES.find((s) => s.id === "invite")!;

/** Scene 7 — Return to the empty chair · invitation + form. */
export function InviteScene() {
  const rootRef = useRef<HTMLElement>(null);
  const { setActiveSceneId, setSceneProgress } = useExperience();

  useEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 55%",
      end: "bottom bottom",
      onEnter: () => setActiveSceneId("invite"),
      onEnterBack: () => setActiveSceneId("invite"),
      onUpdate: (self) => setSceneProgress("invite", self.progress),
    });
    return () => trigger.kill();
  }, [setActiveSceneId, setSceneProgress]);

  return (
    <section
      ref={rootRef}
      id="scene-invite"
      data-scene="invite"
      aria-labelledby="scene-invite-title"
      className="relative overflow-hidden bg-[var(--color-void)]"
    >
      <div className="relative min-h-[75svh] w-full">
        <FilmPlate
          src={FILM_ASSETS.invitation.src}
          alt={FILM_ASSETS.invitation.alt}
          overlay="heavy"
        />
        <div className="relative z-[5] flex min-h-[75svh] items-end px-5 py-16 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-tungsten)] uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="scene-invite-title"
              className="mt-4 space-y-1 font-display text-[clamp(1.8rem,5vw,3.4rem)] leading-[1.05] text-white"
            >
              <span className="block">{content.line1}</span>
              <span className="block">{content.line2}</span>
              <span className="block text-[var(--color-daylight)]">
                {content.line3}
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-white/70">{content.body}</p>
            <a
              href="#partnership-application"
              className="mt-8 inline-block border border-[var(--color-paper)] bg-[var(--color-paper)] px-5 py-3 font-mono text-[11px] tracking-[0.2em] text-[var(--color-void)] uppercase hover:bg-transparent hover:text-white"
            >
              {content.cta}
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-[5] border-t border-white/10 bg-[var(--color-ink)] px-5 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl">
          <h3 className="font-display text-2xl text-white md:text-3xl">
            Become a partner
          </h3>
          <p className="mt-3 text-sm text-white/60">
            Tell me about your English communication strengths and where you
            work from.
          </p>
          <div className="mt-8">
            <PartnerApplicationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
