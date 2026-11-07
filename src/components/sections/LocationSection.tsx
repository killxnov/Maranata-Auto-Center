import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";
import { socialConfig } from "@/config/social.config";
import { ConsentMap } from "@/components/privacy/ConsentMap";
export function LocationSection() {
  return (
    <section id="localizacao" className="section-space">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <SectionHeading eyebrow="Encontre a Maranata" title="O cuidado está aqui. No Sarandi." />
          <Button
            href={socialConfig.directions}
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
          >
            Como chegar
          </Button>
        </div>
        <div className="grid overflow-hidden rounded border border-ink/15 lg:grid-cols-[1fr_320px]">
          <ConsentMap />
          <div className="flex flex-col justify-between bg-navy p-8 text-white">
            <MapPin size={28} strokeWidth={1.3} aria-hidden="true" />
            <div className="mt-8">
              <h3 className="font-display text-2xl font-medium">
                Esperamos
                <br />
                por você.
              </h3>
              <address className="mt-5 text-sm not-italic leading-7 text-white/70">
                {siteConfig.address.street}
                <br />
                Sarandi, Porto Alegre · RS
                <br />
                CEP {siteConfig.address.postalCode}
              </address>
              <p className="mt-5 text-xs leading-6 text-white/70">
                {siteConfig.openingHours || "Consulte os horários antes de visitar."}
              </p>
              <a
                href={socialConfig.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex min-h-11 items-center justify-between border-t border-white/20 pt-4 text-xs font-semibold"
              >
                Abrir no Google Maps
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
