"use client";

import {
  DELIVERY_TIMELINE,
  INTERVIEW_BEATS,
  MARKET_BEATS,
  PREP_STEPS,
  ROLE_CREDITS,
  SCENES,
  SITE,
} from "@/lib/content";
import { EXAMPLE_REVENUE_DEFAULT, formatUSD, splitRevenue } from "@/lib/revenue";

/**
 * Linear, fully readable alternative when prefers-reduced-motion is on.
 */
export function ReducedMotionStory() {
  const split = splitRevenue(EXAMPLE_REVENUE_DEFAULT);

  return (
    <article
      id="experience"
      className="mx-auto max-w-3xl px-6 py-20 text-[var(--color-paper)]"
    >
      <header className="mb-16 space-y-4 border-b border-white/15 pb-10">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-signal)] uppercase">
          Reduced motion edition · {SITE.title}
        </p>
        <h1 className="font-display text-4xl md:text-5xl">
          I build software. You lead conversations. We win projects together.
        </h1>
        <p className="text-lg text-white/80">
          I&apos;m a software developer seeking English-speaking partners to
          pursue remote software opportunities—especially in the US and UK.
        </p>
        <p className="text-sm text-white/55">
          Developer 60% · Communication partner 40%. Transparent roles. No
          impersonation.
        </p>
      </header>

      <ol className="space-y-12">
        {SCENES.filter((s) => s.id !== "threshold").map((scene, index) => (
            <li key={scene.id} className="space-y-3">
              <p className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
                {String(index + 1).padStart(2, "0")} · {scene.label}
              </p>
              <h2 className="font-display text-2xl md:text-3xl">{scene.title}</h2>
              <p className="text-white/70">{scene.body}</p>

              {scene.id === "partner" ? (
                <div className="grid gap-6 pt-4 sm:grid-cols-2">
                  <RoleBlock {...ROLE_CREDITS.technical} />
                  <RoleBlock {...ROLE_CREDITS.communication} />
                </div>
              ) : null}

              {scene.id === "markets" ? (
                <ul className="space-y-3 pt-2">
                  {MARKET_BEATS.map((beat) => (
                    <li key={beat.id} className="text-white/70">
                      <span className="font-mono text-[var(--color-signal)]">
                        {beat.index} · {beat.title}
                      </span>{" "}
                      {beat.detail}
                    </li>
                  ))}
                </ul>
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

              {scene.id === "split" ? (
                <p className="pt-2 text-sm text-white/55">
                  Example {formatUSD(EXAMPLE_REVENUE_DEFAULT)} → Developer{" "}
                  {formatUSD(split.developer)} · Partner{" "}
                  {formatUSD(split.partner)}. Illustrative only — not guaranteed
                  earnings.
                </p>
              ) : null}
            </li>
        ))}
      </ol>
    </article>
  );
}

function RoleBlock({
  title,
  lines,
}: {
  title: string;
  lines: readonly string[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-copper)] uppercase">
        {title}
      </h3>
      <ul className="mt-2 space-y-1 text-sm text-white/70">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
