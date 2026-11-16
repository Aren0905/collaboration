"use client";

import { useId, type CSSProperties } from "react";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { useExperience } from "@/components/experience/ExperienceContext";
import {
  EXAMPLE_REVENUE_MAX,
  EXAMPLE_REVENUE_MIN,
  EXAMPLE_REVENUE_STEP,
  formatUSD,
  splitRevenue,
} from "@/lib/revenue";
import { cn } from "@/lib/cn";

type RevenueExampleSliderProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

export function RevenueExampleSlider({
  value,
  onChange,
  className,
}: RevenueExampleSliderProps) {
  const id = useId();
  const { reducedMotion } = useExperience();
  const { developer, partner } = splitRevenue(value);
  const animatedTotal = useAnimatedNumber(value, { reducedMotion });
  const animatedDev = useAnimatedNumber(developer, { reducedMotion });
  const animatedPartner = useAnimatedNumber(partner, { reducedMotion });

  const percent =
    ((value - EXAMPLE_REVENUE_MIN) /
      (EXAMPLE_REVENUE_MAX - EXAMPLE_REVENUE_MIN)) *
    100;

  return (
    <div
      className={cn(
        "border border-white/15 bg-black/35 p-5 md:p-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
            Illustrative example
          </p>
          <label
            htmlFor={id}
            className="mt-1 block font-display text-xl text-[var(--color-paper)] md:text-2xl"
          >
            Example project revenue
          </label>
        </div>
        <p
          className="font-display text-2xl tabular-nums text-[var(--color-paper)] md:text-3xl"
          aria-live="polite"
        >
          {formatUSD(animatedTotal)}
        </p>
      </div>

      <div className="mt-5">
        <input
          id={id}
          type="range"
          min={EXAMPLE_REVENUE_MIN}
          max={EXAMPLE_REVENUE_MAX}
          step={EXAMPLE_REVENUE_STEP}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-valuemin={EXAMPLE_REVENUE_MIN}
          aria-valuemax={EXAMPLE_REVENUE_MAX}
          aria-valuenow={value}
          aria-valuetext={`${formatUSD(value)} example project revenue`}
          className="revenue-slider w-full cursor-pointer appearance-none bg-transparent"
          style={{ "--slider-progress": `${percent}%` } as CSSProperties}
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] tracking-wide text-white/35 uppercase">
          <span>{formatUSD(EXAMPLE_REVENUE_MIN)}</span>
          <span>{formatUSD(EXAMPLE_REVENUE_MAX)}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="border-l-2 border-[var(--color-tungsten)] pl-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-tungsten)] uppercase">
            Developer · 60%
          </p>
          <p
            className="mt-1 font-display text-2xl tabular-nums md:text-3xl"
            aria-live="polite"
          >
            {formatUSD(animatedDev)}
          </p>
          <p className="mt-1 text-xs text-white/50">
            Technical development and delivery
          </p>
        </div>
        <div className="border-l-2 border-[var(--color-daylight)] pl-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-daylight)] uppercase">
            Communication partner · 40%
          </p>
          <p
            className="mt-1 font-display text-2xl tabular-nums md:text-3xl"
            aria-live="polite"
          >
            {formatUSD(animatedPartner)}
          </p>
          <p className="mt-1 text-xs text-white/50">
            Interviews, client communication, coordination
          </p>
        </div>
      </div>
    </div>
  );
}
