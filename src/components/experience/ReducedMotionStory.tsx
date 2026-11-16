"use client";

import {
  DELIVERY_TIMELINE,
  INTERVIEW_BEATS,
  MARKET_BEATS,
  OUTREACH_STEPS,
  PREP_STEPS,
  SCENES,
  SITE,
} from "@/lib/content";
import { BUILD_STEPS, STORY_PROJECT } from "@/lib/project";
import { EXAMPLE_REVENUE_DEFAULT, formatUSD, splitRevenue } from "@/lib/revenue";
import { RoleExplorer } from "@/components/sim/RoleExplorer";
import { ProjectBrief } from "@/components/sim/ProjectBrief";

export function ReducedMotionStory() {
  const split = splitRevenue(
    STORY_PROJECT.budgetExample || EXAMPLE_REVENUE_DEFAULT,
  );

  return (
    <article
      id="experience"
      className="mx-auto max-w-3xl px-6 py-20 text-[var(--color-paper)]"
    >
      <header className="mb-16 space-y-4 border-b border-white/15 pb-10">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-signal)] uppercase">
          Reduced motion · {SITE.title}
        </p>
        <h1 className="font-display text-4xl md:text-5xl">
          I build software. You lead conversations. We win projects together.
        </h1>
        <p className="text-lg text-white/80">{SITE.description}</p>
        <p className="text-sm text-white/55">
          Developer 60% · Communication partner 40%. Transparent roles.
        </p>
        <div className="pt-4">
          <ProjectBrief />
        </div>
      </header>

      <ol className="space-y-12">
        {SCENES.filter((s) => s.id !== "threshold").map((scene, index) => (
          <li key={scene.id} className="space-y-3">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
              {String(index + 1).padStart(2, "0")} · {scene.label}
            </p>
            <h2 className="font-display text-2xl md:text-3xl">{scene.title}</h2>
            <p className="text-white/70">{scene.body}</p>

            {scene.id === "markets" ? (
              <div className="space-y-4 pt-2">
                <ul className="space-y-3">
                  {MARKET_BEATS.map((beat) => (
                    <li key={beat.id} className="text-white/70">
                      <span className="font-mono text-[var(--color-signal)]">
                        {beat.index} · {beat.title}
                      </span>{" "}
                      {beat.detail}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {OUTREACH_STEPS.map((step) => (
                    <li key={step.id} className="text-white/70">
                      <span className="text-[var(--color-tungsten)]">
                        {step.label}
                      </span>
                      : {step.detail}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {scene.id === "interview" ? (
              <div className="space-y-4 pt-2">
                <ul className="space-y-2">
                  {PREP_STEPS.map((step) => (
                    <li key={step.id} className="text-white/70">
                      <span className="text-[var(--color-tungsten)]">
                        {step.label}
                      </span>
                      : {step.detail}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {INTERVIEW_BEATS.map((beat) => (
                    <li key={beat.id} className="text-white/70">
                      <span className="text-[var(--color-daylight)]">
                        {beat.label}
                      </span>
                      : {beat.detail}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {scene.id === "delivery" ? (
              <ul className="space-y-2 pt-2">
                {BUILD_STEPS.map((step) => (
                  <li key={step.id} className="text-white/70">
                    <span className="text-[var(--color-signal)]">
                      {step.label}
                    </span>
                    : {step.detail}
                  </li>
                ))}
                {DELIVERY_TIMELINE.map((step) => (
                  <li key={step.id} className="text-white/70">
                    <span className="text-[var(--color-signal)]">
                      {step.label}
                    </span>
                    : {step.detail}
                  </li>
                ))}
              </ul>
            ) : null}

            {scene.id === "change" ? (
              <div className="space-y-2 pt-2 text-white/70">
                <p>
                  Client: &ldquo;{STORY_PROJECT.changeRequest.message}&rdquo;
                </p>
                <p>Partner clarifies: {STORY_PROJECT.changeRequest.clarified}</p>
                <p>Developer ships: {STORY_PROJECT.changeRequest.implemented}</p>
                <p>Client: {STORY_PROJECT.changeRequest.approved}</p>
              </div>
            ) : null}

            {scene.id === "split" ? (
              <div className="space-y-6 pt-2">
                <p className="text-sm text-white/55">
                  Example {formatUSD(STORY_PROJECT.budgetExample)} → Developer{" "}
                  {formatUSD(split.developer)} · Partner{" "}
                  {formatUSD(split.partner)}. Illustrative only.
                </p>
                <RoleExplorer />
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-block border border-white/30 px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase"
                >
                  Email Aaron
                </a>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </article>
  );
}
