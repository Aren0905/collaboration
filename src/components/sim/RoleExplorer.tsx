"use client";

import { useState } from "react";
import { STORY_PROJECT } from "@/lib/project";
import { cn } from "@/lib/cn";

type Role = "partner" | "developer";

/**
 * Interactive perspective switch — experience the same project from either chair.
 */
export function RoleExplorer() {
  const [role, setRole] = useState<Role>("partner");
  const isPartner = role === "partner";

  return (
    <div className="border border-white/15 bg-black/45 p-5 backdrop-blur-sm">
      <p className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
        Experience the same project from two perspectives
      </p>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Choose a role"
      >
        {(
          [
            ["partner", "Communication partner"],
            ["developer", "Developer"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setRole(id)}
            className={cn(
              "border px-3 py-2 font-mono text-[10px] tracking-[0.16em] uppercase",
              role === id
                ? id === "partner"
                  ? "border-[var(--color-daylight)] text-[var(--color-daylight)]"
                  : "border-[var(--color-tungsten)] text-[var(--color-tungsten)]"
                : "border-white/20 text-white/45 hover:text-white",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <p className="font-mono text-[9px] tracking-[0.18em] text-white/40 uppercase">
          Your workspace ·{" "}
          {isPartner ? "Communication partner — you" : "Developer — me"}
        </p>
        <div className="mt-3 border border-white/10 bg-black/35 p-4">
          <p className="font-mono text-[9px] tracking-[0.16em] text-[var(--color-signal)] uppercase">
            Illustrative client message
          </p>
          <p className="mt-2 text-sm text-white/80">
            &ldquo;We need Senior Full Stack Engineer. Can you help us build
            it?&rdquo;
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {isPartner
              ? "You can take the interview when a call is booked. You handle the communication side."
              : "I set up LinkedIn and manage applications remotely. Then I ship the React + Node build while the partner leads interviews."}
          </p>
        </div>
        <p className="mt-4 font-mono text-[9px] tracking-[0.14em] text-white/30 uppercase">
          Project · {STORY_PROJECT.title}
        </p>
      </div>
    </div>
  );
}
