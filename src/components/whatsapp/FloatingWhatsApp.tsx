import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(siteConfig.whatsappNumber);
  return (
    <a
      href={href || "#contato"}
      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={
        href
          ? "Vamos conversar? Conversar com a Maranata no WhatsApp"
          : "Fale com a Maranata, WhatsApp aguardando configuração"
      }
      className="floating-whatsapp group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex h-13 items-center gap-3 rounded-full bg-[var(--color-whatsapp)] px-4 text-white shadow-lg transition-transform hover:-translate-y-1 sm:right-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-xs font-semibold sm:inline">
        {href ? "Vamos conversar?" : "Fale com a Maranata"}
      </span>
    </a>
  );
}
