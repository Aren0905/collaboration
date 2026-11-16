"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { useExperience } from "@/components/experience/ExperienceContext";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import type { SceneId } from "@/lib/content";
import { SCENE_THEMES } from "@/lib/scenes";
import { cn } from "@/lib/cn";

type SceneProps = {
  id: SceneId;
  children: ReactNode;
  className?: string;
  /** Extra scroll distance for pin/scrub scaffolding (skeleton keeps this modest). */
  pinSpacer?: boolean;
} & Omit<HTMLAttributes<HTMLElement>, "id">;

export const Scene = forwardRef<HTMLElement, SceneProps>(function Scene(
  { id, children, className, pinSpacer = false, ...rest },
  forwardedRef,
) {
  const localRef = useRef<HTMLElement | null>(null);
  const { setActiveSceneId, setSceneProgress, reducedMotion } = useExperience();
  const theme = SCENE_THEMES[id];

  useEffect(() => {
    const node = localRef.current;
    if (!node) return;

    if (reducedMotion) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveSceneId(id);
            setSceneProgress(id, 1);
          }
        },
        { threshold: 0.45 },
      );
      observer.observe(node);
      return () => observer.disconnect();
    }

    const gsap = registerGsapPlugins();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: node,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveSceneId(id),
        onEnterBack: () => setActiveSceneId(id),
        onUpdate: (self) => setSceneProgress(id, self.progress),
      });

      if (pinSpacer) {
        ScrollTrigger.create({
          trigger: node,
          start: "top top",
          end: "+=40%",
          pin: false,
        });
      }
    }, node);

    return () => {
      ctx.revert();
    };
  }, [id, pinSpacer, reducedMotion, setActiveSceneId, setSceneProgress]);

  return (
    <section
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      id={`scene-${id}`}
      data-scene={id}
      data-atmosphere={theme.atmosphere}
      aria-labelledby={`scene-${id}-title`}
      className={cn(
        "relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 py-24 md:px-12 lg:px-16",
        className,
      )}
      style={
        {
          "--scene-bg": theme.background,
          "--scene-fg": theme.foreground,
          "--scene-accent": theme.accent,
          color: "var(--scene-fg)",
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </section>
  );
});
