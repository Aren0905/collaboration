import {
  ENGLISH_CONFIDENCE,
  OPPORTUNITY_INTERESTS,
  SITE,
} from "@/lib/content";

export type PartnershipPayload = {
  name: string;
  countryTimezone: string;
  email: string;
  englishConfidence: (typeof ENGLISH_CONFIDENCE)[number]["value"];
  experience: string;
  hasLaptop: boolean;
  opportunityInterest: Array<(typeof OPPORTUNITY_INTERESTS)[number]["value"]>;
  introduction: string;
  honesty: boolean;
  noGuarantee: boolean;
};

export type FieldErrors = Partial<Record<keyof PartnershipPayload, string>>;

export function validatePartnershipPayload(
  input: unknown,
): { ok: true; data: PartnershipPayload } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const raw = (input ?? {}) as Record<string, unknown>;

  const name = String(raw.name ?? "").trim();
  const countryTimezone = String(raw.countryTimezone ?? "").trim();
  const email = String(raw.email ?? "").trim();
  const englishConfidence = String(raw.englishConfidence ?? "").trim();
  const experience = String(raw.experience ?? "").trim();
  const introduction = String(raw.introduction ?? "").trim();
  const hasLaptop = Boolean(raw.hasLaptop);
  const honesty = Boolean(raw.honesty);
  const noGuarantee = Boolean(raw.noGuarantee);
  const opportunityInterest = Array.isArray(raw.opportunityInterest)
    ? raw.opportunityInterest.map(String)
    : [];

  if (name.length < 2) errors.name = "Please enter your name.";
  if (countryTimezone.length < 2)
    errors.countryTimezone = "Please enter country and time zone.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email.";
  if (!ENGLISH_CONFIDENCE.some((c) => c.value === englishConfidence))
    errors.englishConfidence = "Select your English confidence.";
  if (experience.length < 20)
    errors.experience = "Add a short note on your communication experience.";
  if (!hasLaptop)
    errors.hasLaptop = "A reliable laptop and internet are required.";
  const allowed = new Set(OPPORTUNITY_INTERESTS.map((i) => i.value));
  const cleaned = opportunityInterest.filter((v) =>
    allowed.has(v as (typeof OPPORTUNITY_INTERESTS)[number]["value"]),
  );
  if (cleaned.length < 1)
    errors.opportunityInterest = "Select at least one market interest.";
  if (introduction.length < 40)
    errors.introduction = "Please write a short introduction.";
  if (!honesty) errors.honesty = "Honesty acknowledgment is required.";
  if (!noGuarantee) errors.noGuarantee = "Please confirm you understand.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      countryTimezone,
      email,
      englishConfidence:
        englishConfidence as PartnershipPayload["englishConfidence"],
      experience,
      hasLaptop,
      opportunityInterest:
        cleaned as PartnershipPayload["opportunityInterest"],
      introduction,
      honesty,
      noGuarantee,
    },
  };
}

export function buildMailto(data: PartnershipPayload): string {
  const body = [
    `Name: ${data.name}`,
    `Country / time zone: ${data.countryTimezone}`,
    `Email: ${data.email}`,
    `English: ${data.englishConfidence}`,
    `Laptop/internet: yes`,
    `Markets: ${data.opportunityInterest.join(", ")}`,
    `Experience: ${data.experience}`,
    `Introduction: ${data.introduction}`,
  ].join("\n");

  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Partnership interest — ${data.name}`,
  )}&body=${encodeURIComponent(body)}`;
}
