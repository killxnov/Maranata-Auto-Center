import { Camera, ImagePlus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery } from "@/data/gallery";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
export function GallerySection() {
  return (
    <section id="galeria" className="section-space border-b border-ink/10">
      <Container>
        <ParallaxSection distance={10}>
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Ambiente e cuidados"
              title="Um olhar sobre o dia a dia automotivo."
            />
            <span className="inline-flex items-center gap-2 text-xs text-muted">
              <Camera size={17} aria-hidden="true" />
              Prévia visual
            </span>
          </div>
          {gallery.length ? (
            <GalleryLightbox images={gallery} />
          ) : (
            <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr_1fr]">
              {["Fachada e oficina", "Nosso ambiente", "O dia a dia"].map((label, index) => (
                <div
                  key={label}
                  className={`flex min-h-48 flex-col justify-between rounded border border-ink/10 p-6 ${index === 0 ? "bg-[#1b1d21] sm:min-h-64" : "bg-[#101114]"}`}
                >
                  <ImagePlus size={24} strokeWidth={1} className="text-muted" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-base font-medium">{label}</h3>
                    <p className="mt-2 text-[.67rem] leading-5 text-muted">
                      Fotografia oficial em breve.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="mt-5 text-xs leading-6 text-muted">
            Imagens temporárias geradas por IA para apresentação visual. Serão substituídas por
            registros oficiais da Maranata.
          </p>
        </ParallaxSection>
      </Container>
    </section>
  );
}
