import { ArrowUpRight } from "lucide-react";
import type { Part } from "@/types/service";
import { ServiceIcon } from "./ServiceIcon";
import { buildWhatsAppUrl, buildServiceMessage } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site.config";
export function PartCard({ part }: { part: Part }) {
  const href = buildWhatsAppUrl(siteConfig.whatsappNumber, buildServiceMessage(part.title, "part"));
  return (
    <article className="group">
      <div className="relative mb-5 grid aspect-[1.25] place-items-center overflow-hidden rounded bg-[#1b1d21]">
        <div className="absolute h-28 w-28 rounded-full border border-ink/10 transition-transform duration-500 group-hover:scale-125" />
        <div className="relative text-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <ServiceIcon name={part.icon} size={62} />
        </div>
        <span className="absolute bottom-3 left-3 text-[.55rem] uppercase tracking-[.16em] text-muted">
          Consulta por modelo
        </span>
      </div>
      <h3 className="font-display text-lg font-semibold">{part.title}</h3>
      <p className="mb-3 mt-1 text-xs leading-6 text-muted">{part.description}</p>
      <a
        className="inline-flex min-h-11 items-center gap-3 text-xs font-semibold transition-colors hover:text-accent"
        href={href || "#contato"}
        {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={`Consultar peças: ${part.title}`}
      >
        Consultar
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
