import { CODE_LINES, STORY_PROJECT } from "@/lib/project";
import { cn } from "@/lib/cn";

type CodeEditorFrameProps = {
  visibleLines?: number;
  className?: string;
};

/** Believable IDE chrome with progressive code reveal. */
export function CodeEditorFrame({
  visibleLines = CODE_LINES.length,
  className,
}: CodeEditorFrameProps) {
  const count = Math.max(0, Math.min(CODE_LINES.length, visibleLines));

  return (
    <div
      className={cn(
        "overflow-hidden border border-white/12 bg-[#0d1117] font-mono text-[10px] leading-relaxed shadow-[0_20px_50px_rgba(0,0,0,0.4)]",
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <span className="tracking-[0.12em] text-white/35 uppercase">
          customers-page.tsx
        </span>
        <span className="text-white/25">{STORY_PROJECT.stack[0]}</span>
      </div>
      <pre className="overflow-hidden p-3 text-[var(--color-signal)]/90">
        {CODE_LINES.slice(0, count).map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-4 shrink-0 text-right text-white/20">
              {i + 1}
            </span>
            <code className="text-white/75">{line}</code>
          </div>
        ))}
        {count < CODE_LINES.length ? (
          <div className="mt-1 h-3 w-2 animate-pulse bg-[var(--color-signal)]/80" />
        ) : null}
      </pre>
    </div>
  );
}
