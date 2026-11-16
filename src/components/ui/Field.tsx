import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const labelClass =
  "block font-mono text-[10px] tracking-[0.18em] text-white/55 uppercase";
const controlClass =
  "mt-2 w-full border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[var(--color-signal)]";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Field({ label, id, className, error, ...rest }: FieldProps) {
  const fieldId = id ?? rest.name;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className={labelClass}>
        {label}
      </label>
      <input id={fieldId} className={controlClass} {...rest} />
      {error ? <p className="mt-1 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextAreaField({
  label,
  id,
  className,
  error,
  ...rest
}: TextAreaProps) {
  const fieldId = id ?? rest.name;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className={labelClass}>
        {label}
      </label>
      <textarea id={fieldId} className={cn(controlClass, "min-h-28")} {...rest} />
      {error ? <p className="mt-1 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  children: ReactNode;
};

export function SelectField({
  label,
  id,
  className,
  error,
  children,
  ...rest
}: SelectFieldProps) {
  const fieldId = id ?? rest.name;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className={labelClass}>
        {label}
      </label>
      <select id={fieldId} className={controlClass} {...rest}>
        {children}
      </select>
      {error ? <p className="mt-1 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function CheckboxField({
  label,
  id,
  className,
  error,
  ...rest
}: CheckboxProps) {
  const fieldId = id ?? rest.name;
  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className="flex cursor-pointer items-start gap-3 text-sm text-white/75"
      >
        <input
          id={fieldId}
          type="checkbox"
          className="mt-1 h-4 w-4 accent-[var(--color-signal)]"
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error ? <p className="mt-1 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
