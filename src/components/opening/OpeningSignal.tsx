import { forwardRef } from "react";

/**
 * Single luminous path — warm, restrained, documentary — not neon network kitsch.
 */
export const OpeningSignal = forwardRef<SVGSVGElement>(
  function OpeningSignal(_, ref) {
    return (
      <svg
        ref={ref}
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="opening-signal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(243,239,230,0)" />
            <stop offset="35%" stopColor="rgba(201,162,126,0.55)" />
            <stop offset="70%" stopColor="rgba(243,239,230,0.85)" />
            <stop offset="100%" stopColor="rgba(123,163,184,0.35)" />
          </linearGradient>
          <filter
            id="opening-signal-soft"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="0.35" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient guide — almost invisible */}
        <path
          d="M -5 62 C 18 58, 28 40, 42 38 S 62 48, 72 42 S 88 28, 105 30"
          fill="none"
          stroke="rgba(243,239,230,0.06)"
          strokeWidth="0.15"
          vectorEffect="non-scaling-stroke"
        />

        {/* Primary signal */}
        <path
          data-opening="signal-path"
          d="M -5 62 C 18 58, 28 40, 42 38 S 62 48, 72 42 S 88 28, 105 30"
          fill="none"
          stroke="url(#opening-signal-grad)"
          strokeWidth="0.28"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#opening-signal-soft)"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />

        {/* Split toward dual workspaces */}
        <path
          data-opening="signal-branch-a"
          d="M 55 44 C 48 52, 36 58, 22 68"
          fill="none"
          stroke="rgba(201,162,126,0.55)"
          strokeWidth="0.18"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
        <path
          data-opening="signal-branch-b"
          d="M 58 42 C 68 36, 78 34, 92 28"
          fill="none"
          stroke="rgba(123,163,184,0.5)"
          strokeWidth="0.18"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
      </svg>
    );
  },
);
