import { ScrollReveal } from "@/components/animations/ScrollReveal";
export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div data-anchor-heading className="max-w-2xl">
      <ScrollReveal>
        <span className={`eyebrow ${light ? "text-white/70" : "text-muted"}`}>{eyebrow}</span>
        <h2
          className={`display-heading mt-5 text-4xl sm:text-5xl lg:text-[3.3rem] ${light ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-5 max-w-xl text-[.94rem] leading-7 ${light ? "text-white/65" : "text-muted"}`}
          >
            {description}
          </p>
        )}
      </ScrollReveal>
    </div>
  );
}
