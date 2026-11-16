import { STORY_PROJECT } from "@/lib/project";
import { cn } from "@/lib/cn";

type ProjectBriefProps = {
  className?: string;
  compact?: boolean;
};

/** Persistent fictional project card used across film events. */
export function ProjectBrief({ className, compact = false }: ProjectBriefProps) {
  return (
    <article
      className={cn(
        "border border-[var(--color-signal)]/35 bg-black/70 text-left backdrop-blur-md",
        compact ? "p-3" : "p-4 sm:p-5",
        className,
      )}
    >
      <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--color-signal)] uppercase">
        {STORY_PROJECT.market}
      </p>
      <h3
        className={cn(
          "mt-2 font-display leading-tight text-white",
          compact ? "text-base" : "text-lg sm:text-xl",
        )}
      >
        {STORY_PROJECT.title}
      </h3>
      {!compact ? (
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          {STORY_PROJECT.summary}
        </p>
      ) : null}
      <p className="mt-2 text-xs text-white/45">
        {STORY_PROJECT.client} · {STORY_PROJECT.duration}
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {STORY_PROJECT.stack.map((tag) => (
          <li
            key={tag}
            className="border border-white/15 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-white/60 uppercase"
          >
            {tag}
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[9px] tracking-[0.16em] text-white/35 uppercase">
        {STORY_PROJECT.label}
      </p>
    </article>
  );
}
