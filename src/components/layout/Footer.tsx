import { Container } from "@/components/ui/Container";
import { Brand } from "@/components/ui/Brand";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/config/site.config";
import { navigation } from "@/config/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { legalNavigation } from "@/config/privacy.config";
import { PrivacyPreferencesButton } from "@/components/privacy/PrivacyProvider";
import { Phone } from "lucide-react";
export function Footer() {
  const whatsapp = buildWhatsAppUrl(siteConfig.whatsappNumber);
  return (
    <footer className="bg-[var(--color-navy-deep)] pb-24 pt-14 text-white sm:pb-8">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr]">
          <div>
            <Brand light />
            <p className="mb-6 mt-6 max-w-xs text-xs leading-6 text-white/60">
              Serviços automotivos para nacionais e importados. Fale com a equipe sobre o próximo
              cuidado com o seu carro.
            </p>
            <SocialLinks includeWhatsApp={false} />
          </div>
          <div>
            <h2 className="mb-5 text-[.65rem] font-semibold uppercase tracking-[.17em] text-white/50">
              Explore
            </h2>
            <nav aria-label="Navegação do rodapé" className="grid grid-cols-2 gap-x-6 gap-y-1">
              {navigation.map((item) => (
                <a
                  href={`/${item.href}`}
                  key={item.href}
                  className="flex min-h-10 items-center text-xs text-white/75 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <h2 className="mb-5 text-[.65rem] font-semibold uppercase tracking-[.17em] text-white/50">
              Atendimento
            </h2>
            <p className="text-xs leading-7 text-white/75">{siteConfig.openingHours}</p>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-white/90 underline-offset-4 hover:underline"
              >
                <Phone size={15} strokeWidth={1.7} aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
            )}
          </div>
        </div>
        <nav
          aria-label="Informações legais"
          className="footer-legal mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 pt-5 text-center"
        >
          {legalNavigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center justify-center text-xs text-white/65 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <PrivacyPreferencesButton />
        </nav>
        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[.6rem] leading-5 text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Maranata Auto Center. Todos os direitos reservados.</p>
          <a
            href={siteConfig.developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-white/80"
          >
            Desenvolvido por {siteConfig.developer.name}
          </a>
        </div>
      </Container>
    </footer>
  );
}
