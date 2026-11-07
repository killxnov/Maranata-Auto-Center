import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Brand } from "@/components/ui/Brand";
import { Footer } from "./Footer";
import { privacyConfig } from "@/config/privacy.config";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { LegalSection } from "@/data/legal";

export function LegalDocument({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <>
      <header className="border-b border-white/10 bg-paper py-6">
        <Container className="flex flex-wrap items-center justify-between gap-5">
          <Brand />
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-xs text-muted">
            <ArrowLeft size={16} aria-hidden="true" />
            Voltar ao site
          </Link>
        </Container>
      </header>
      <main id="conteudo" className="py-14 sm:py-20">
        <Container>
          <article className="legal-document mx-auto max-w-3xl">
            <p className="eyebrow text-muted">Informações institucionais</p>
            <h1 className="display-heading mt-6 text-4xl sm:text-5xl">{title}</h1>
            <p className="mt-5 text-xs text-muted">
              Atualização:{" "}
              <time dateTime={privacyConfig.updatedAt}>{privacyConfig.updatedAtLabel}</time>
            </p>
            {sections.map((section) => (
              <section key={section.title} className="mt-10">
                <h2 className="font-display text-xl font-semibold">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-sm leading-8 text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
            <section className="mt-10 border-t border-white/15 pt-8">
              <h2 className="font-display text-xl font-semibold">Atendimento e referências</h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                {siteConfig.name} ·{" "}
                <a
                  className="underline underline-offset-4"
                  href={buildWhatsAppUrl(siteConfig.whatsappNumber) || "/#contato"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-muted">
                <li>
                  <a
                    href="https://policies.google.com/privacy?hl=pt-BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Política de Privacidade do Google
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/intl/pt-BR_US/help/terms_maps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Termos de Serviço do Google Maps/Google Earth
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.whatsapp.com/legal/privacy-policy?lang=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Política de Privacidade do WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Direitos dos titulares: orientações da ANPD
                  </a>
                </li>
              </ul>
            </section>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
