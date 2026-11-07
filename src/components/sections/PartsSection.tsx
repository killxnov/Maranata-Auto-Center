import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartCard } from "@/components/ui/PartCard";
import { parts } from "@/data/parts";
import { siteConfig } from "@/config/site.config";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
export function PartsSection() {
  return (
    <section id="pecas" data-nav-active="#servicos" className="section-space">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Peças e componentes"
            title="Consulte a peça para o seu modelo."
          />
          <p className="max-w-[320px] text-sm leading-7 text-muted">
            Informe o modelo e o ano do veículo para consultar aplicação e disponibilidade. Sem
            preços ou estoque presumidos.
          </p>
        </div>
        <StaggerReveal className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </StaggerReveal>
        {!siteConfig.partsConfirmed && (
          <p className="mt-8 border-t border-ink/10 pt-5 text-xs leading-6 text-muted">
            Catálogo institucional de referência. Categorias e fornecimento pendentes de confirmação
            comercial.
          </p>
        )}
      </Container>
    </section>
  );
}
