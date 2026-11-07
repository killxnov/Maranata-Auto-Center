import type { ReactNode } from "react";

export function ScrollReveal({
  children,
  className = "",
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  return (
    <div data-scroll-reveal data-scroll-stagger={stagger || undefined} className={className}>
      {children}
    </div>
  );
}
