import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";
export function StaggerReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ScrollReveal stagger className={className}>
      {children}
    </ScrollReveal>
  );
}
