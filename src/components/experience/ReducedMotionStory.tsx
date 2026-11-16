"use client";

import {
  CHEMISTRY_SIDES,
  DELIVERY_TIMELINE,
  INTERVIEW_BEATS,
  MARKET_BEATS,
  PREPARE_ITEMS,
  ROLE_CREDITS,
  SCENES,
  SITE,
} from "@/lib/content";

/**
 * Linear, fully readable alternative when prefers-reduced-motion is on.
 */
export function ReducedMotionStory() {
  return (
    <article
      id="experience"
      className="mx-auto max-w-3xl px-6 py-20 text-[var(--color-paper)]"
    >
      <header className="mb-16 space-y-4 border-b border-white/15 pb-10">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-tungsten)] uppercase">
          Reduced motion edition
        </p>
        <h1 className="font-display text-4xl md:text-5xl">{SITE.title}</h1>
        <p className="text-lg text-white/80">
          What if your strongest skill isn&apos;t coding?
        </p>
        <p className="text-lg text-white/70">
          What if it could still become part of a software business?
        </p>
        <p className="text-sm text-white/55">
          A transparent remote partnership: I build software; you lead
          communication across global markets including the U.S. and U.K.{" "}
          {SITE.tagline}
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

            {scene.id === "strengths" ? (
              <div className="grid gap-6 pt-4 sm:grid-cols-2">
                <RoleBlock {...ROLE_CREDITS.technical} />
                <RoleBlock {...ROLE_CREDITS.communication} />
              </div>
            ) : null}

            {scene.id === "markets" ? (
              <ul className="space-y-3 pt-2">
                {MARKET_BEATS.map((beat) => (
                  <li key={beat.id} className="text-white/70">
                    <span className="font-mono text-[var(--color-daylight)]">
                      {beat.index} · {beat.title}
                    </span>{" "}
                    {beat.detail}
                  </li>
                ))}
              </ul>
            ) : null}

            {scene.id === "prepare" ? (
              <ul className="space-y-2 pt-2">
                {PREPARE_ITEMS.map((item) => (
                  <li key={item.id} className="text-white/70">
                    <span className="text-[var(--color-tungsten)]">
                      {item.label}
                    </span>
                    : {item.detail}
                  </li>
                ))}
              </ul>
            ) : null}

            {scene.id === "interview" ? (
              <ul className="space-y-2 pt-2">
                {INTERVIEW_BEATS.map((beat) => (
                  <li key={beat.id} className="text-white/70">
                    <span className="text-[var(--color-tungsten)]">
                      {beat.label}
                    </span>
                    : {beat.detail}
                  </li>
                ))}
              </ul>
            ) : null}

            {scene.id === "delivery" ? (
              <ul className="space-y-2 pt-2">
                {DELIVERY_TIMELINE.map((step) => (
                  <li key={step.id} className="text-white/70">
                    <span className="text-[var(--color-tungsten)]">
                      {step.label}
                    </span>
                    : {step.detail}
                  </li>
                ))}
              </ul>
            ) : null}

            {scene.id === "split" && "closing" in scene ? (
              <p className="pt-2 text-sm text-white/55">{scene.closing}</p>
            ) : null}

            {scene.id === "chemistry" ? (
              <ul className="space-y-3 pt-2">
                {CHEMISTRY_SIDES.map((side, i) => (
                  <li key={side.id} className="text-white/70">
                    <span className="font-mono text-white/45">
                      Side {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    {side.prompt}
                    <span className="mt-1 block text-sm text-white/50">
                      {side.principle}
                    </span>
                  </li>
                ))}
              </ul>
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
