import { Clock3, MessageCircle, ArrowDownRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
export function ContactSection() {
  const whatsapp = buildWhatsAppUrl(siteConfig.whatsappNumber);
  return (
    <section id="contato" className="section-space bg-surface">
      <Container className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Fale com a Maranata"
            title="Vamos conversar sobre o seu carro?"
          />
          <p className="body-copy mt-6 max-w-sm">
            Descreva o que precisa, informe os dados do veículo e prepare sua solicitação. Você
            confirma o envio no WhatsApp.
          </p>
          <div className="mt-10 space-y-7">
            <div className="flex items-start gap-4">
              <MessageCircle
                size={22}
                strokeWidth={1.4}
                className="mt-1 shrink-0"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-sm font-semibold">WhatsApp</h3>
                <a
                  href={whatsapp || "#contato"}
                  target={whatsapp ? "_blank" : undefined}
                  rel={whatsapp ? "noopener noreferrer" : undefined}
                  className="contact-phone mt-3 inline-flex min-h-12 items-center gap-4 rounded border border-white/20 bg-white/[.025] px-4 text-base text-ink hover:border-white/45 focus-visible:border-white/60 active:bg-white/10"
                >
                  {siteConfig.phoneDisplay}
                  <ArrowRight className="contact-phone-arrow" size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock3 size={22} strokeWidth={1.4} className="mt-1 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold">Horário de atendimento</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{siteConfig.openingHours}</p>
              </div>
            </div>
          </div>
          <ArrowDownRight
            size={70}
            strokeWidth={0.8}
            className="mt-12 hidden text-ink/25 lg:block"
            aria-hidden="true"
          />
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
