import { Star, UserRound } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";
export function TestimonialCard({
  review,
  duplicate = false,
}: {
  review: Testimonial;
  duplicate?: boolean;
}) {
  return (
    <article
      className="testimonial-card flex h-full flex-col rounded-lg border border-white/10 bg-[#17191d] p-6 shadow-[0_10px_30px_#0002]"
      tabIndex={duplicate ? -1 : 0}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="testimonial-avatar grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#282c32] text-[#c9d0da]"
        >
          <UserRound size={20} strokeWidth={1.5} />
        </span>
        <p className="text-sm font-semibold [overflow-wrap:anywhere]">{review.name}</p>
      </div>
      <div
        role="img"
        aria-label={review.rating + " de 5 estrelas"}
        className="mt-5 flex gap-1 text-[#d6b471]"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={14}
            fill={index < review.rating ? "currentColor" : "none"}
            strokeWidth={index < review.rating ? 0 : 1.5}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote
        tabIndex={duplicate ? -1 : 0}
        className="testimonial-text mt-5 max-h-48 overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-[#cbd2dc] [overflow-wrap:anywhere]"
      >
        {review.comment}
      </blockquote>
    </article>
  );
}
