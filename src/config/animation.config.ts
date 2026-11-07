export const animationConfig = {
  desktop: "(min-width: 1024px) and (pointer: fine)",
  motion: "(prefers-reduced-motion: no-preference)",
  smoothScroll: { lerp: 0.1, anchorDuration: 0.85 },
  scene: { enter: 36, exit: -26, scrub: 0.35 },
  reveal: { desktop: 32, mobile: 12, stagger: 0.07, scrub: 0.2 },
  image: { scale: 1.045, travelPercent: 1.6, scrub: 0.45 },
} as const;
