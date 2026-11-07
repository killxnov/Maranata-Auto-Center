import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialsCarousel } from "@/components/ui/TestimonialsCarousel";
import { testimonials, testimonialsConfig } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="avaliacoes" className="section-space testimonials-section">
      <Container>
        <div className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Experiências reais"
            title="A confiança de quem já passou por aqui."
            description="Confira algumas avaliações de clientes da Maranata Auto Center no Google."
          />
          <a
            href={testimonialsConfig.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center gap-3 self-start rounded border border-white/20 px-5 text-xs font-semibold hover:bg-white/5"
          >
            Ver avaliações no Google
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </Container>
      <TestimonialsCarousel reviews={testimonials} />
    </section>
  );
}
