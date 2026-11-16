"use client";

import { useState } from "react";
import {
  APPLY_FIELDS,
  ENGLISH_CONFIDENCE,
  OPPORTUNITY_INTERESTS,
  SITE,
} from "@/lib/content";
import {
  buildMailto,
  validatePartnershipPayload,
  type FieldErrors,
  type PartnershipPayload,
} from "@/lib/partnership";
import {
  CheckboxField,
  Field,
  SelectField,
  TextAreaField,
} from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Mode = "idle" | "submitting" | "mailto" | "error";

const initial = {
  name: "",
  countryTimezone: "",
  email: "",
  englishConfidence: "",
  experience: "",
  hasLaptop: false,
  opportunityInterest: [] as string[],
  introduction: "",
  honesty: false,
  noGuarantee: false,
};

export function PartnerApplicationForm({ className }: { className?: string }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [mode, setMode] = useState<Mode>("idle");
  const [message, setMessage] = useState("");

  function toggleInterest(value: string) {
    setValues((v) => ({
      ...v,
      opportunityInterest: v.opportunityInterest.includes(value)
        ? v.opportunityInterest.filter((x) => x !== value)
        : [...v.opportunityInterest, value],
    }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMode("submitting");
    setMessage("");

    const payload: PartnershipPayload = {
      name: values.name,
      countryTimezone: values.countryTimezone,
      email: values.email,
      englishConfidence:
        values.englishConfidence as PartnershipPayload["englishConfidence"],
      experience: values.experience,
      hasLaptop: values.hasLaptop,
      opportunityInterest:
        values.opportunityInterest as PartnershipPayload["opportunityInterest"],
      introduction: values.introduction,
      honesty: values.honesty,
      noGuarantee: values.noGuarantee,
    };

    const result = validatePartnershipPayload(payload);
    if (!result.ok) {
      setErrors(result.errors);
      setMode("error");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    window.location.href = buildMailto(result.data);
    setMode("mailto");
    setMessage(
      `Your email app should open a message to ${SITE.email}. If it does not, email that address directly. No fake “success” without a real message.`,
    );
  }

  return (
    <form
      id="partnership-application"
      onSubmit={onSubmit}
      noValidate
      className={cn("space-y-5", className)}
    >
      <div className="border border-white/15 bg-black/30 p-4 text-sm text-white/65">
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase">
          Partnership arrangement
        </p>
        <p className="mt-2">{APPLY_FIELDS.arrangement}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          error={errors.name}
        />
        <Field
          label="Country and time zone"
          name="countryTimezone"
          required
          placeholder="e.g. United Kingdom · GMT"
          value={values.countryTimezone}
          onChange={(e) =>
            setValues((v) => ({ ...v, countryTimezone: e.target.value }))
          }
          error={errors.countryTimezone}
        />
      </div>

      <Field
        label="Email"
        name="email"
        type="email"
        required
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        error={errors.email}
      />

      <SelectField
        label="English communication confidence"
        name="englishConfidence"
        required
        value={values.englishConfidence}
        onChange={(e) =>
          setValues((v) => ({ ...v, englishConfidence: e.target.value }))
        }
        error={errors.englishConfidence}
      >
        <option value="">Select one</option>
        {ENGLISH_CONFIDENCE.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>

      <TextAreaField
        label="Experience with interviews or client communication"
        name="experience"
        required
        value={values.experience}
        onChange={(e) =>
          setValues((v) => ({ ...v, experience: e.target.value }))
        }
        error={errors.experience}
      />

      <CheckboxField
        label="I have access to a reliable laptop and stable internet."
        name="hasLaptop"
        checked={values.hasLaptop}
        onChange={(e) =>
          setValues((v) => ({ ...v, hasLaptop: e.target.checked }))
        }
        error={errors.hasLaptop}
      />

      <fieldset>
        <legend className="font-mono text-[10px] tracking-[0.18em] text-white/55 uppercase">
          Preferred opportunity markets
        </legend>
        <div className="mt-3 space-y-2">
          {OPPORTUNITY_INTERESTS.map((item) => (
            <CheckboxField
              key={item.value}
              label={item.label}
              name={`interest-${item.value}`}
              checked={values.opportunityInterest.includes(item.value)}
              onChange={() => toggleInterest(item.value)}
            />
          ))}
        </div>
        {errors.opportunityInterest ? (
          <p className="mt-1 text-xs text-red-300">{errors.opportunityInterest}</p>
        ) : null}
      </fieldset>

      <TextAreaField
        label="Short introduction"
        name="introduction"
        required
        placeholder="Who you are, where you work from, and why this collaboration interests you."
        value={values.introduction}
        onChange={(e) =>
          setValues((v) => ({ ...v, introduction: e.target.value }))
        }
        error={errors.introduction}
      />

      <CheckboxField
        label={APPLY_FIELDS.honestyLabel}
        name="honesty"
        checked={values.honesty}
        onChange={(e) =>
          setValues((v) => ({ ...v, honesty: e.target.checked }))
        }
        error={errors.honesty}
      />
      <CheckboxField
        label={APPLY_FIELDS.noGuaranteeLabel}
        name="noGuarantee"
        checked={values.noGuarantee}
        onChange={(e) =>
          setValues((v) => ({ ...v, noGuarantee: e.target.checked }))
        }
        error={errors.noGuarantee}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={mode === "submitting"}>
          {mode === "submitting" ? "Preparing…" : APPLY_FIELDS.submitLabel}
        </Button>
        <a
          href={`mailto:${SITE.email}`}
          className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase underline-offset-4 hover:text-[var(--color-signal)] hover:underline"
        >
          Or email {SITE.email}
        </a>
      </div>

      <div aria-live="polite" className="min-h-6">
        {message ? (
          <p
            className={
              mode === "error"
                ? "text-sm text-red-300"
                : "border border-[var(--color-signal)]/30 bg-[var(--color-signal)]/10 px-4 py-3 text-sm text-[var(--color-signal)]"
            }
            role="status"
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
