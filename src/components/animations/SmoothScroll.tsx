"use client";
import { useEffect } from "react";
import { useAnchorNavigation } from "@/hooks/useAnchorNavigation";
import { animationConfig } from "@/config/animation.config";
import { SectionTransitions } from "./SectionTransitions";

export function SmoothScroll() {
  const { engine, realign } = useAnchorNavigation();
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const query = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let started = false;
    const initialize = () => {
      if (!query.matches || started) return;
      started = true;
      void Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
          if (disposed) return;
          gsap.registerPlugin(ScrollTrigger);
          const media = gsap.matchMedia();
          media.add(
            "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
            () => {
              const lenis = new Lenis({
                autoRaf: false,
                lerp: animationConfig.smoothScroll.lerp,
                syncTouch: false,
                anchors: false,
                prevent: (node) => node.matches("dialog, textarea, .testimonial-text"),
              });
              const tick = (time: number) => lenis.raf(time * 1000);
              gsap.ticker.add(tick);
              lenis.on("scroll", ScrollTrigger.update);
              engine.current = {
                scrollTo: (top, immediate, done) =>
                  lenis.scrollTo(top, {
                    immediate,
                    force: true,
                    duration: animationConfig.smoothScroll.anchorDuration,
                    onComplete: done,
                  }),
                cancel: () => lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true }),
              };
              realign.current();
              const refresh = () => {
                lenis.resize();
                realign.current();
              };
              ScrollTrigger.addEventListener("refresh", refresh);
              const syncDialog = () => {
                if (document.querySelector("dialog[open]")) lenis.stop();
                else lenis.start();
              };
              document.addEventListener("toggle", syncDialog, true);
              syncDialog();
              return () => {
                gsap.ticker.remove(tick);
                ScrollTrigger.removeEventListener("refresh", refresh);
                engine.current = null;
                document.removeEventListener("toggle", syncDialog, true);
                lenis.off("scroll", ScrollTrigger.update);
                lenis.destroy();
              };
            },
          );
          cleanup = () => media.revert();
        })
        .catch(() => {
          /* O scroll nativo permanece funcional em falhas de carregamento. */
        });
    };
    query.addEventListener("change", initialize);
    initialize();
    return () => {
      disposed = true;
      query.removeEventListener("change", initialize);
      cleanup?.();
    };
  }, [engine, realign]);
  return <SectionTransitions />;
}
