import type { ReactNode } from "react";
export function ParallaxSection({
  children,
  className = "",
  distance = 18,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  return (
    <div data-parallax={distance} className={className}>
      {children}
    </div>
  );
}
