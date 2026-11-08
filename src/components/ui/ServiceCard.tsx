import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/service";
import { ServiceIcon } from "./ServiceIcon";
import { buildServiceMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site.config";
export function ServiceCard({ service }: { service: Service }) {
  const href = buildWhatsAppUrl(siteConfig.whatsappNumber, buildServiceMessage(service.title));
  return (
    <article className="group flex h-full min-w-0 flex-col border border-ink/10 bg-surface p-3 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[var(--shadow-soft)] sm:p-5 lg:p-7">
      <div className="flex items-start">
        <span className="grid h-10 w-10 place-items-center rounded bg-paper text-ink transition-colors group-hover:bg-navy group-hover:text-white sm:h-12 sm:w-12">
          <ServiceIcon name={service.icon} />
        </span>
      </div>
      <h3 className="font-display mb-2 mt-4 break-words text-sm font-semibold tracking-tight sm:text-base lg:mb-3 lg:mt-7 lg:text-lg">
        {service.title}
      </h3>
      <p className="mb-4 text-xs leading-5 text-muted lg:mb-7 lg:text-[.8rem] lg:leading-6">
        {service.description}
      </p>
      <a
        href={href || "#contato"}
        {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-auto flex min-h-11 items-center justify-between gap-2 border-t border-ink/10 pt-2 text-[.7rem] font-semibold transition-colors hover:text-accent lg:pt-4"
        aria-label={`Consultar serviço: ${service.title}`}
      >
        <span>
          Consultar<span className="hidden sm:inline"> serviço</span>
        </span>
        <ArrowUpRight size={17} className="shrink-0" aria-hidden="true" />
      </a>
    </article>
  );
}
