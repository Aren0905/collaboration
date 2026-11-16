import { FILM_ASSETS } from "@/lib/assets";
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
        "relative overflow-hidden border border-white/15 bg-black/80 shadow-[0_24px_80px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <p className="font-mono text-[9px] tracking-[0.18em] text-white/45 uppercase">
          {phase === "ringing"
            ? "Incoming call…"
            : connected
              ? "Connected · 00:42"
              : "Standby"}
        </p>
        <p className="font-mono text-[9px] tracking-[0.14em] text-[var(--color-daylight)] uppercase">
          {STORY_PROJECT.recruiter.company}
        </p>
      </div>

      <div className="grid aspect-[16/10] grid-cols-2 gap-px bg-white/10">
        <div className="relative bg-[#121820]">
          <Image
            src={FILM_ASSETS.partnerDay.src}
            alt=""
            fill
            sizes="40vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              connected ? "opacity-100" : "opacity-40",
            )}
          />
          <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-white/80 uppercase">
            Partner · you
          </span>
        </div>
        <div className="relative bg-[#0f141c]">
          {phase === "ringing" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="h-14 w-14 animate-pulse rounded-full border border-[var(--color-signal)]/50 bg-[var(--color-signal)]/15" />
              <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-signal)] uppercase">
                {STORY_PROJECT.recruiter.name}
              </p>
              <p className="text-xs text-white/50">
                {STORY_PROJECT.recruiter.role}
              </p>
            </div>
          ) : (
            <>
              <Image
                src={FILM_ASSETS.interview.src}
                alt=""
                fill
                sizes="40vw"
                className={cn(
                  "object-cover object-top transition-opacity duration-500",
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

      <div className="flex items-center justify-center gap-4 border-t border-white/10 px-3 py-2.5">
        <span className="h-8 w-8 rounded-full bg-white/10" />
        <span className="h-8 w-8 rounded-full bg-white/10" />
        <span className="h-8 w-8 rounded-full bg-[#e5484d]/80" />
      </div>

      {caption ? (
        <div
          data-film="caption"
          className="absolute right-3 bottom-14 left-3 border border-white/15 bg-black/75 p-3 backdrop-blur-sm"
        >
          <p className="font-mono text-[9px] tracking-[0.18em] text-[var(--color-daylight)] uppercase">
            {caption.speaker}
          </p>
          <p className="mt-1 text-sm text-white/85">{caption.text}</p>
        </div>
      ) : null}

      {phase === "agree" ? (
        <div className="absolute top-10 right-3 border border-[var(--color-signal)]/50 bg-black/70 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.16em] text-[var(--color-signal)] uppercase">
          Project agreed
        </div>
      ) : null}
    </div>
  );
}
