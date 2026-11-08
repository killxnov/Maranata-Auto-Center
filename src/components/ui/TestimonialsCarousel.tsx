"use client";
import { useEffect, useRef } from "react";
import { TestimonialCard } from "./TestimonialCard";
import type { Testimonial } from "@/types/testimonial";
export function TestimonialsCarousel({ reviews }: { reviews: Testimonial[] }) {
  const focusFrame = useRef(0);
  useEffect(
    () => () => {
      cancelAnimationFrame(focusFrame.current);
    },
    [],
  );
  // Repete apenas os mesmos depoimentos locais para preencher um período do looping.
  const repetitions = Math.max(1, Math.ceil(2560 / (reviews.length * 344)));
  const entries = Array.from({ length: repetitions }, () => reviews).flat();
  return (
    <div className="testimonials-carousel">
      <div
        className="testimonials-window"
        role="region"
        aria-label="Avaliações de clientes"
        tabIndex={0}
        onFocusCapture={(event) => {
          const target = event.target as HTMLElement;
          const viewport = event.currentTarget;
          if (!target.matches(":focus-visible") || !target.closest(".testimonial-card")) return;
          cancelAnimationFrame(focusFrame.current);
          focusFrame.current = requestAnimationFrame(() => {
            // Mantém o card original visível ao percorrê-lo com Tab, sem focar cópias do loop.
            viewport.scrollLeft = 0;
            const card = target.closest<HTMLElement>(".testimonial-card")!;
            const track = viewport.querySelector<HTMLElement>(".testimonials-track")!;
            const animation = track.getAnimations()[0];
            if (!animation) return;
            const rect = card.getBoundingClientRect();
            const view = viewport.getBoundingClientRect();
            const desired = Math.max(
              view.left + 24,
              Math.min(rect.left, view.right - rect.width - 24),
            );
            const duration = Number(animation.effect?.getTiming().duration);
            const delta = rect.left - desired;
            if (Number.isFinite(duration) && Math.abs(delta) > 1)
              animation.currentTime = Math.max(
                0,
                Number(animation.currentTime) + (delta * duration) / (track.scrollWidth / 2),
              );
          });
        }}
      >
        <div
          className="testimonials-track"
          style={{ animationDuration: `${entries.length * 11}s` }}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="testimonials-group"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {entries.map((review, index) => (
                <li
                  key={`${review.id}-${index}`}
                  aria-hidden={copy === 0 && index >= reviews.length ? true : undefined}
                >
                  <TestimonialCard
                    review={review}
                    duplicate={copy === 1 || index >= reviews.length}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
