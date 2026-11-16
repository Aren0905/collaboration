import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SceneAsideProps = {
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
  className?: string;
};

/** Static readable strip — information without relying on motion. */
export function SceneAside({
  eyebrow,
  title,
  body,
  children,
  className,
}: SceneAsideProps) {
  return (
    <aside
      className={cn(
        "relative border-t border-white/10 bg-[var(--color-ink)] px-6 py-14 md:px-12",
        className,
      )}
      aria-label={`${title} summary`}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--color-tungsten)] uppercase">
          {eyebrow}
        </p>
        <h3 className="font-display text-2xl text-[var(--color-paper)] md:text-3xl">
          {title}
        </h3>
        <p className="max-w-3xl text-base leading-relaxed text-white/65">{body}</p>
        {children}
      </div>
    </aside>
  );
}
