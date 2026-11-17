"use client";

import { DASHBOARD_CUSTOMERS } from "@/lib/project";
import { cn } from "@/lib/cn";

export type DashboardStage = 0 | 1 | 2 | 3 | 4 | 5;
/** 0 blank · 1 nav · 2 table · 3 charts · 4 tested · 5 filter added */

type CustomerDashboardProps = {
  stage: DashboardStage;
  filterDays?: 7 | 30 | 90 | null;
  className?: string;
};

/**
 * Live React customer dashboard that builds progressively during scroll events.
 * Not a static screenshot — UI pieces appear as the story progresses.
 */
export function CustomerDashboard({
  stage,
  filterDays = null,
  className,
}: CustomerDashboardProps) {
  const showNav = stage >= 1;
  const showTable = stage >= 2;
  const showCharts = stage >= 3;
  const tested = stage >= 4;
  const showFilter = stage >= 5;

  const rows = DASHBOARD_CUSTOMERS.filter((row) => {
    if (!showFilter || filterDays == null) return true;
    return row.activity <= filterDays;
  });

  return (
    <div
      className={cn(
        "overflow-hidden border border-white/12 bg-[#0e141d] text-[11px] text-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        className,
      )}
      aria-label="Illustrative customer dashboard"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-[#121a24] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <p className="font-mono text-[9px] tracking-[0.16em] text-white/40 uppercase">
          Northline · Customers
        </p>
        {tested ? (
          <span className="font-mono text-[9px] tracking-[0.14em] text-[var(--color-signal)] uppercase">
            Tests · pass
          </span>
        ) : (
          <span className="font-mono text-[9px] text-white/25">…</span>
        )}
      </div>

      <div className="flex min-h-[160px] md:min-h-[220px]">
        <aside
          className={cn(
            "w-[28%] border-r border-white/10 bg-[#0b1119] p-2 transition-opacity duration-300",
            showNav ? "opacity-100" : "opacity-20",
          )}
        >
          {showNav ? (
            <ul className="space-y-1.5 font-mono text-[9px] tracking-[0.12em] uppercase">
              <li className="bg-white/8 px-2 py-1.5 text-[var(--color-signal)]">
                Customers
              </li>
              <li className="px-2 py-1.5 text-white/35">Overview</li>
              <li className="px-2 py-1.5 text-white/35">Reports</li>
              <li className="px-2 py-1.5 text-white/35">Settings</li>
            </ul>
          ) : (
            <div className="space-y-2 p-1">
              <div className="h-3 w-full bg-white/5" />
              <div className="h-3 w-[80%] bg-white/5" />
              <div className="h-3 w-[60%] bg-white/5" />
            </div>
          )}
        </aside>

        <div className="flex-1 p-3">
          {!showNav && !showTable ? (
            <div className="flex h-full min-h-[180px] items-center justify-center border border-dashed border-white/10">
              <p className="font-mono text-[10px] tracking-[0.18em] text-white/30 uppercase">
                Blank dashboard
              </p>
            </div>
          ) : null}

          {showFilter ? (
            <div
              data-dash="filter"
              className="mb-3 flex flex-wrap items-center gap-2"
            >
              <span className="font-mono text-[9px] tracking-[0.14em] text-white/45 uppercase">
                Activity
              </span>
              {([7, 30, 90] as const).map((days) => (
                <span
                  key={days}
                  className={cn(
                    "border px-2 py-1 font-mono text-[9px] tracking-[0.12em] uppercase",
                    filterDays === days
                      ? "border-[var(--color-signal)] text-[var(--color-signal)]"
                      : "border-white/15 text-white/40",
                  )}
                >
                  {days}d
                </span>
              ))}
            </div>
          ) : null}

          {showTable ? (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase">
                  <th className="pb-2 font-normal">Customer</th>
                  <th className="pb-2 font-normal">Company</th>
                  <th className="hidden pb-2 font-normal sm:table-cell">
                    Plan
                  </th>
                  <th className="pb-2 font-normal">Active</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-white/5">
                    <td className="py-1.5 text-white/85">{row.name}</td>
                    <td className="py-1.5 text-white/55">{row.company}</td>
                    <td className="hidden py-1.5 text-white/45 sm:table-cell">
                      {row.plan}
                    </td>
                    <td className="py-1.5 text-[var(--color-tungsten)]">
                      {row.activity}d
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          {showCharts ? (
            <div
              data-dash="charts"
              className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3"
            >
              {[42, 68, 51].map((h, i) => (
                <div key={i} className="flex h-16 items-end gap-1 bg-white/[0.03] p-2">
                  {[0.4, 0.7, 0.55, 0.9, 0.6].map((n, j) => (
                    <div
                      key={j}
                      className="flex-1 bg-[var(--color-signal)]/70"
                      style={{ height: `${h * n * 0.7}%` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
