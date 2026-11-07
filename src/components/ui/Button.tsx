import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & { variant?: "primary" | "outline" | "light"; arrow?: boolean };
export function Button({
  children,
  className = "",
  variant = "primary",
  arrow = true,
  ...props
}: Props) {
  const styles = {
    primary:
      "border-brand-red bg-brand-red text-white hover:bg-[var(--color-red-hover)] hover:border-[var(--color-red-hover)]",
    outline: "border-white/30 text-white hover:bg-surface/10",
    light: "border-ink/20 text-ink hover:border-ink hover:bg-ink/5",
  };
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-5 rounded-[var(--radius-sm)] border px-6 py-3.5 text-xs font-semibold transition-colors ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow && <ArrowUpRight size={17} aria-hidden="true" />}
    </a>
  );
}
