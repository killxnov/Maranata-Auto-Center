import { ClipboardCheck, CarFront, MessageSquareText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
const items = [
  {
    icon: ClipboardCheck,
    title: "Cuidados para a sua rotina",
    description: "Conte como você usa o carro e consulte a manutenção indicada para o seu momento.",
  },
  {
    icon: CarFront,
    title: "Nacionais e importados",
    description: "Um ponto de contato para conversar sobre os cuidados com o seu veículo.",
  },
  {
    icon: MessageSquareText,
    title: "Seu atendimento começa aqui",
    description: "Descreva o que precisa e prepare sua solicitação para a equipe da Maranata.",
  },
];
export function WhyChooseUs() {
  return (
    <section data-nav-active="#sobre" className="section-space bg-navy text-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="O que nos aproxima"
              title="Confiança começa com uma boa conversa."
              light
            />
            <p className="mt-7 max-w-md text-sm leading-7 text-white/65">
              Seu carro tem uma história. Conte a sua e descubra como dar o próximo passo no cuidado
              com ele.
            </p>
          </div>
          <StaggerReveal>
            {items.map((item) => (
              <article
                key={item.title}
                className="flex gap-6 border-b border-white/15 py-7 first:pt-0 last:border-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <item.icon
                      size={21}
                      strokeWidth={1.4}
                      className="text-[#9cb7d0]"
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-lg font-medium">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.description}</p>
                </div>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </Container>
    </section>
  );
}
