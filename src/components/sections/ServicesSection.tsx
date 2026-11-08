import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site.config";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
export function ServicesSection() {
  return (
    <section id="servicos" className="section-space border-y border-ink/10 bg-[#101114]">
      <Container>
        <ParallaxSection distance={6}>
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Serviços automotivos"
              title="Serviços para os cuidados do dia a dia."
            />
            <p className="max-w-[300px] text-sm leading-7 text-muted">
              Da manutenção do dia a dia à atenção que o seu carro está pedindo. Encontre o cuidado
              para seguir em frente.
            </p>
          </div>
          {!siteConfig.servicesConfirmed && (
            <p className="mb-6 text-xs leading-6 text-muted">
              Categorias sugeridas para consulta. Serviços sujeitos à confirmação pela oficina.
            </p>
          )}
          <StaggerReveal className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </StaggerReveal>
        </ParallaxSection>
      </Container>
    </section>
  );
}
