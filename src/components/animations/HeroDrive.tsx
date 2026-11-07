"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export function HeroDrive({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const query = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let started = false;
    const initialize = () => {
      if (!query.matches || started) return;
      started = true;
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (disposed || !ref.current) return;
          gsap.registerPlugin(ScrollTrigger);
          const media = gsap.matchMedia();
          media.add(
            {
              desktop: "(min-width: 1024px)",
              mobile: "(max-width: 639px)",
              motion: "(prefers-reduced-motion: no-preference)",
            },
            (context) => {
              if (!context.conditions?.motion) return;
              const scope = ref.current!;
              const desktop = Boolean(context.conditions.desktop);
              const mobile = Boolean(context.conditions.mobile);
              const compact = !desktop;
              const car = scope.querySelector(".hero-car");
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: scope.closest("section"),
                  start: () =>
                    `top ${document.querySelector("[data-site-header]")?.getBoundingClientRect().height || 0}px`,
                  end: "bottom bottom",
                  scrub: desktop ? 0.85 : 0.55,
                  invalidateOnRefresh: true,
                },
              });
              // O mesmo percurso é preservado em todas as telas, com escala e deslocamento menores
              // no layout compacto para manter o carro e as mensagens dentro da composição.
              timeline
                .fromTo(
                  car,
                  {
                    scale: desktop ? 0.94 : 0.97,
                    y: desktop ? 12 : 8,
                    rotation: desktop ? -0.4 : -0.2,
                  },
                  {
                    xPercent: desktop ? -5 : -3,
                    scale: desktop ? 1.065 : mobile ? 1.025 : 1.045,
                    y: desktop ? -20 : mobile ? -8 : -14,
                    rotation: desktop ? 0.55 : 0.25,
                    duration: desktop ? 0.66 : 0.64,
                    ease: "none",
                  },
                  0,
                )
                .to(
                  car,
                  {
                    x: () => innerWidth * (desktop ? 1.15 : 1.25),
                    xPercent: 0,
                    y: desktop ? -42 : mobile ? -18 : -28,
                    scale: desktop ? 1.11 : mobile ? 1.04 : 1.07,
                    rotation: desktop ? -0.5 : -0.25,
                    duration: desktop ? 0.34 : 0.36,
                    ease: "power2.in",
                  },
                  desktop ? 0.66 : 0.64,
                )
                .to(
                  scope.querySelector(".road-lines"),
                  { xPercent: compact ? -38 : -52, duration: 1, ease: "none" },
                  0,
                )
                .to(
                  scope.querySelector(".hero-grid"),
                  {
                    xPercent: compact ? -4 : -7,
                    scale: compact ? 1.08 : 1.13,
                    duration: 1,
                    ease: "none",
                  },
                  0,
                )
                .to(
                  scope.querySelector(".road-glow"),
                  { xPercent: compact ? -16 : -25, opacity: 0.35, duration: 1 },
                  0,
                )
                .to(
                  scope.querySelector(".hero-copy"),
                  {
                    opacity: 0,
                    y: compact ? -24 : -38,
                    duration: compact ? 0.18 : 0.2,
                    ease: "power1.in",
                  },
                  compact ? 0.34 : 0.38,
                )
                .fromTo(
                  scope.querySelector(".drive-message"),
                  { opacity: 0, y: compact ? 20 : 28 },
                  { opacity: 1, y: 0, duration: 0.18 },
                  compact ? 0.51 : 0.57,
                )
                .to(
                  scope.querySelector(".drive-message"),
                  { y: compact ? -10 : -16, duration: 0.13 },
                  0.87,
                )
                .to(
                  scope.querySelector(".hero-wordmark"),
                  { xPercent: compact ? -4 : -6, opacity: 0.025, duration: 1 },
                  0,
                )
                .to(scope.querySelector(".hero-handoff"), { opacity: 1, duration: 0.24 }, 0.76);
            },
          );
          cleanup = () => media.revert();
        })
        .catch(() => {
          /* O layout estático permanece disponível se a biblioteca falhar. */
        });
    };
    query.addEventListener("change", initialize);
    initialize();
    return () => {
      disposed = true;
      query.removeEventListener("change", initialize);
      cleanup?.();
    };
  }, []);
  return (
    <div ref={ref} className="hero-stage">
      {children}
    </div>
  );
}
