export const DEVELOPER_SHARE = 0.6;
export const PARTNER_SHARE = 0.4;

export const EXAMPLE_REVENUE_MIN = 5_000;
export const EXAMPLE_REVENUE_MAX = 100_000;
export const EXAMPLE_REVENUE_DEFAULT = 25_000;
export const EXAMPLE_REVENUE_STEP = 1_000;

/** Split so the two parts always sum exactly to `revenue`. */
export function splitRevenue(revenue: number): {
  total: number;
  developer: number;
  partner: number;
} {
  const total = Math.max(0, Math.round(revenue));
  const developer = Math.round(total * DEVELOPER_SHARE);
  const partner = total - developer;
  return { total, developer, partner };
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
