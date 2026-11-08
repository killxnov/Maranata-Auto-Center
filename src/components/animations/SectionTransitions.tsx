"use client";

import { useEffect } from "react";
import { animationConfig as motion } from "@/config/animation.config";

export function SectionTransitions() {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add({ desktop: motion.desktop, motion: motion.motion }, (context) => {
          if (!context.conditions?.motion) return;
          const desktop = Boolean(context.conditions.desktop);
          const main = document.querySelector<HTMLElement>("#conteudo");
          if (!main) return;

          // As seções continuam no fluxo; só as camadas internas recebem movimento.
          // BMW, tracks, formulário e mapa conservam seus próprios comportamentos.
          if (desktop) {
            const sections = document.querySelectorAll<HTMLElement>(
              "#conteudo > section:not(.drive-hero), #conteudo ~ footer",
            );
            sections.forEach((section, index) => {
              if (section.id === "contato" || section.id === "localizacao") return;
              const carousel = section.classList.contains("testimonials-section");
              const brands = section.classList.contains("brands-section");
              const footer = section.tagName === "FOOTER";
              const layers = carousel ? [section.firstElementChild] : Array.from(section.children);
              const targets = layers.filter(
                (layer): layer is HTMLElement => layer instanceof HTMLElement,
              );
              const timeline = gsap.timeline({
                scrollTrigger: {
                  id: `scene:${section.id || (brands ? "brands" : footer ? "footer" : index)}`,
                  trigger: section,
                  start: "clamp(top 94%)",
                  end: footer ? "clamp(top 52%)" : "clamp(bottom top)",
                  scrub: motion.scene.scrub,
                  invalidateOnRefresh: true,
                },
              });
              timeline.fromTo(
                targets,
                // Keep footer text contrast while preserving its scroll translation.
                { y: brands ? 14 : motion.scene.enter, opacity: brands || footer ? 1 : 0.55 },
                { y: 0, opacity: 1, duration: footer ? 1 : 0.24, ease: "none" },
                0,
              );
              if (!footer)
                timeline.to(
                  targets,
                  {
                    y: motion.scene.exit,
                    opacity: brands || carousel ? 1 : 0.65,
                    duration: 0.14,
                    ease: "none",
                  },
                  0.86,
                );
            });
          }

          main.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((reveal, index) => {
            const targets = Array.from(reveal.children);
            const cards = reveal.hasAttribute("data-scroll-stagger");
            const initial = {
              y: desktop ? motion.reveal.desktop : motion.reveal.mobile,
              opacity: desktop ? 0.25 : 0.65,
            };
            ScrollTrigger.saveStyles(targets);
            // Inicializa também os elementos atrasados do stagger, antes da primeira rolagem.
            gsap.set(targets, initial);
            gsap.to(targets, {
              y: 0,
              opacity: 1,
              stagger: cards ? motion.reveal.stagger : motion.reveal.stagger * 0.7,
              ease: "power1.out",
              scrollTrigger: {
                id: `reveal:${index}`,
                trigger: reveal,
                start: "clamp(top 94%)",
                end: "clamp(top 57%)",
                scrub: desktop ? motion.reveal.scrub : true,
                invalidateOnRefresh: true,
              },
            });
          });

          if (desktop)
            main.querySelectorAll<HTMLElement>("[data-parallax]").forEach((layer, index) => {
              const image = layer.querySelector(".editorial-image img");
              if (!image) return;
              const travel = Math.min(
                Number(layer.dataset.parallax) / 10,
                motion.image.travelPercent,
              );
              gsap.fromTo(
                image,
                { scale: motion.image.scale, yPercent: travel },
                {
                  yPercent: -travel,
                  ease: "none",
                  scrollTrigger: {
                    id: `image:${index}`,
                    trigger: layer,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: motion.image.scrub,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });
        });

        let refreshFrame = 0;
        const refresh = () => {
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            window.dispatchEvent(new Event("maranata:scroll-refresh"));
          });
        };
        const layout = new ResizeObserver(refresh);
        for (const element of document.querySelectorAll("#conteudo, #conteudo ~ footer"))
          layout.observe(element);
        window.addEventListener("maranata:layout", refresh);
        void document.fonts.ready.then(() => {
          if (!disposed) refresh();
        });
        refresh();
        cleanup = () => {
          layout.disconnect();
          cancelAnimationFrame(refreshFrame);
          window.removeEventListener("maranata:layout", refresh);
          media.revert();
        };
      })
      .catch(() => {
        /* O HTML permanece legível sem o módulo de animação. */
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  return null;
}
