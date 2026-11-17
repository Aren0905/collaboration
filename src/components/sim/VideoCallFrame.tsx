import { FILM_ASSETS, filmFocusStyle } from "@/lib/assets";
import { STORY_PROJECT } from "@/lib/project";
import { cn } from "@/lib/cn";
import Image from "next/image";

type VideoCallFrameProps = {
  phase: "idle" | "ringing" | "connected" | "agree";
  caption?: { speaker: string; text: string } | null;
  className?: string;
};

/** HTML video-call simulation layered over photoreal plates. */
export function VideoCallFrame({
  phase,
  caption = null,
  className,
}: VideoCallFrameProps) {
  const connected = phase === "connected" || phase === "agree";

  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col overflow-hidden border border-white/15 bg-black/85 shadow-[0_28px_90px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-3 py-2 md:px-4 md:py-2.5">
        <p className="font-mono text-[9px] tracking-[0.18em] text-white/45 uppercase md:text-[10px]">
          {phase === "ringing"
            ? "Incoming call…"
            : connected
              ? "Connected · 00:42"
              : "Standby"}
        </p>
        <p className="font-mono text-[9px] tracking-[0.14em] text-[var(--color-daylight)] uppercase md:text-[10px]">
          {STORY_PROJECT.recruiter.company}
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-px bg-white/10 md:min-h-[280px]">
        <div className="relative min-h-[120px] bg-[#121820] md:min-h-0">
          <Image
            src={FILM_ASSETS.partnerDay.src}
            alt=""
            fill
            sizes="(max-width: 767px) 45vw, 26vw"
            style={filmFocusStyle(FILM_ASSETS.partnerDay)}
            className={cn(
              "film-focus transition-opacity duration-500",
              connected ? "opacity-100" : "opacity-40",
            )}
          />
          <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-white/80 uppercase">
            Partner · you
          </span>
        </div>
        <div className="relative min-h-[120px] bg-[#0f141c] md:min-h-0">
          {phase === "ringing" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="h-14 w-14 animate-pulse rounded-full border border-[var(--color-signal)]/50 bg-[var(--color-signal)]/15 md:h-20 md:w-20" />
              <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-signal)] uppercase md:text-[11px]">
                {STORY_PROJECT.recruiter.name}
              </p>
              <p className="text-xs text-white/50 md:text-sm">
                {STORY_PROJECT.recruiter.role}
              </p>
            </div>
          ) : (
            <>
              <Image
                src={FILM_ASSETS.interview.src}
                alt=""
                fill
                sizes="(max-width: 767px) 45vw, 26vw"
                style={filmFocusStyle(FILM_ASSETS.interview)}
                className={cn(
                  "film-focus transition-opacity duration-500",
                  connected ? "opacity-90" : "opacity-30",
                )}
              />
              <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-white/80 uppercase">
                {STORY_PROJECT.recruiter.name}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-4 border-t border-white/10 px-3 py-2.5 md:gap-5 md:py-3">
        <span className="h-8 w-8 rounded-full bg-white/10 md:h-9 md:w-9" />
        <span className="h-8 w-8 rounded-full bg-white/10 md:h-9 md:w-9" />
        <span className="h-8 w-8 rounded-full bg-[#e5484d]/80 md:h-9 md:w-9" />
      </div>

      {caption ? (
        <div
          data-film="caption"
          className="absolute right-3 bottom-14 left-3 border border-white/15 bg-black/75 p-3 backdrop-blur-sm md:right-4 md:bottom-16 md:left-4 md:p-4"
        >
          <p className="font-mono text-[9px] tracking-[0.18em] text-[var(--color-daylight)] uppercase">
            {caption.speaker}
          </p>
          <p className="mt-1 text-sm text-white/85 md:text-base">{caption.text}</p>
        </div>
      ) : null}

      {phase === "agree" ? (
        <div className="absolute top-10 right-3 border border-[var(--color-signal)]/50 bg-black/70 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.16em] text-[var(--color-signal)] uppercase md:top-12 md:right-4 md:text-[10px]">
          Project agreed
        </div>
      ) : null}
    </div>
  );
}
