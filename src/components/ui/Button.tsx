import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        "border border-[var(--color-paper)] bg-[var(--color-paper)] px-5 py-3",
        "font-mono text-[11px] tracking-[0.18em] text-[var(--color-void)] uppercase",
        "transition-colors hover:bg-transparent hover:text-[var(--color-paper)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signal)]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
