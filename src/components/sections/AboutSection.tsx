import { siteConfig } from "@/config/site.config";
import { media } from "@/data/media";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactLink } from "@/components/ui/ContactLink";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ParallaxSection } from "@/components/animations/ParallaxSection";

export function AboutSection() {
  return (
    <section id="sobre" className="section-space">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <ParallaxSection distance={16}>
          <EditorialImage
            src={siteConfig.officialImage || media.workshop.src}
            alt={
              siteConfig.officialImage
                ? "Fotografia oficial da Maranata Auto Center"
                : media.workshop.alt
            }
            illustrative={!siteConfig.officialImage && media.workshop.illustrative}
            className="aspect-[5/4] lg:aspect-[4/5]"
          />
        </ParallaxSection>
        <div>
          <SectionHeading
            eyebrow="Sobre a Maranata"
            title="Seu carro merece atenção. Você merece clareza."
          />
          <p className="body-copy mt-6">
            A MARANATA AUTO CENTER é uma empresa de manutenção automotiva que oferece uma gama
            completa de serviços para veículos, desde reparos básicos até manutenção preventiva
            avançada. Com uma equipe experiente e apaixonada por automóveis, destacamo-nos pela
            qualidade do serviço, pelo atendimento personalizado e pelos preços competitivos.
          </p>
          <p className="body-copy mt-4">
            O que diferencia a nossa empresa é o compromisso com a excelência em cada etapa do
            processo, desde a chegada do cliente até a entrega do veículo.
          </p>
          <p className="body-copy mt-4">
            Além dos serviços de manutenção, nós também oferecemos conveniências adicionais, como
            serviço de busca e entrega, agendamento online e deslocamento para clientes frequentes.
            Essas iniciativas visam tornar a experiência do cliente o mais conveniente e agradável
            possível.
          </p>
          <ContactLink variant="light" className="mt-8">
            Falar com a equipe
          </ContactLink>
        </div>
      </Container>
    </section>
  );
}
