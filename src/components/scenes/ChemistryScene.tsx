"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Scene } from "@/components/experience/Scene";
import { SceneFrame } from "@/components/experience/SceneFrame";
import { CHEMISTRY_SIDES, SCENES } from "@/lib/content";
import { cn } from "@/lib/cn";

const content = SCENES.find((s) => s.id === "chemistry")!;

export function ChemistryScene() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <Scene id="chemistry">
      <SceneFrame
        titleId="scene-chemistry-title"
        eyebrow={content.eyebrow}
        title={content.title}
        body={content.body}
      >
        <ul className="mt-2 w-full max-w-3xl space-y-3">
          {CHEMISTRY_SIDES.map((side, index) => {
            const open = openId === side.id;
            return (
              <li key={side.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : side.id)}
                  aria-expanded={open}
                  className={cn(
                    "w-full border border-white/20 bg-black/20 px-5 py-4 text-left transition-colors hover:border-white/40",
                    open && "border-[var(--color-tungsten)]/60",
                  )}
                >
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
                    Side {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block font-display text-xl md:text-2xl">
                    {side.prompt}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="principle"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border border-t-0 border-white/15 bg-black/30 px-5 py-4 text-sm leading-relaxed text-white/70 md:text-base">
                        {side.principle}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </SceneFrame>
    </Scene>
  );
}
