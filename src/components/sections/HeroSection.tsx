import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactLink } from "@/components/ui/ContactLink";
import { HeroDrive } from "@/components/animations/HeroDrive";
import { heroConfig } from "@/config/hero.config";

export function HeroSection() {
  return (
    <section id="inicio" className="drive-hero">
      <HeroDrive>
        <div className="hero-grid" aria-hidden="true" />
        <div className="road-glow" aria-hidden="true" />
        <div className="road-plane" aria-hidden="true">
          <div className="road-lines" />
        </div>
        <span className="hero-wordmark" aria-hidden="true">
          MARANATA
        </span>
        <Container className="relative z-10 h-full">
          <div className="hero-copy">
            <h1 className="display-heading text-[clamp(2.9rem,6.3vw,6.2rem)]">
              Seu caminho.
              <br />
              Nosso cuidado.
              <br />
              <span className="text-[#93a8bf]">Sem atalhos.</span>
            </h1>
            <p className="mt-6 max-w-[370px] text-sm leading-7 text-white/70">
              Serviços automotivos para o seu carro. Conte com a Maranata para planejar os cuidados
              com o seu veículo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactLink />
              <Button href="#servicos" variant="outline" arrow={false}>
                Conhecer serviços
                <ArrowDown size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="drive-message" aria-hidden="true">
            <span className="eyebrow text-white/60">O próximo passo</span>
            <p className="display-heading mt-6 text-5xl xl:text-6xl">
              Mova-se com
              <br />
              <span className="text-[#93a8bf]">mais confiança.</span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
              Do primeiro contato aos cuidados do dia a dia. Conheça a Maranata.
            </p>
          </div>
        </Container>
        <div className="hero-car" data-testid="hero-car">
          <div className="car-shadow" />
          <Image
            src={heroConfig.car.src}
            alt={heroConfig.car.alt}
            width={heroConfig.car.width}
            height={heroConfig.car.height}
            sizes="(max-width: 1023px) 100vw, 75vw"
            loading="eager"
            fetchPriority="high"
            className="hero-car-image relative h-auto w-full object-contain grayscale"
          />
        </div>
        <Container className="hero-bottom">
          <span className="scroll-cue text-[.58rem] uppercase tracking-[.18em] text-white/60">
            Role para explorar
            <ArrowDown size={15} aria-hidden="true" />
          </span>
        </Container>
        <div className="hero-handoff" aria-hidden="true" />
      </HeroDrive>
    </section>
  );
}
