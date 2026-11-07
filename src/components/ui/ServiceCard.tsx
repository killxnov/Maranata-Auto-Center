import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/service";
import { ServiceIcon } from "./ServiceIcon";
import { buildServiceMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site.config";
export function ServiceCard({ service }: { service: Service }) {
  const href = buildWhatsAppUrl(siteConfig.whatsappNumber, buildServiceMessage(service.title));
  return (
    <article className="group flex h-full flex-col border border-ink/10 bg-surface p-7 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[var(--shadow-soft)]">
      <div className="flex items-start">
        <span className="grid h-12 w-12 place-items-center rounded bg-paper text-ink transition-colors group-hover:bg-navy group-hover:text-white">
          <ServiceIcon name={service.icon} />
        </span>
      </div>
      <h3 className="font-display mb-3 mt-7 text-lg font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="mb-7 text-[.8rem] leading-6 text-muted">{service.description}</p>
      <a
        href={href || "#contato"}
        {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-auto flex min-h-11 items-center justify-between border-t border-ink/10 pt-4 text-[.7rem] font-semibold transition-colors hover:text-accent"
        aria-label={`Consultar serviço: ${service.title}`}
      >
        Consultar serviço
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </article>
  );
}
