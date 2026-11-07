"use client";
import { useEffect, useRef } from "react";
import { layoutTop } from "@/lib/scroll";

type ScrollEngine = {
  scrollTo: (top: number, immediate: boolean, done: () => void) => void;
  cancel: () => void;
};
export function useAnchorNavigation() {
  const engine = useRef<ScrollEngine | null>(null);
  const realign = useRef<() => void>(() => {});
  useEffect(() => {
    let locked = Boolean(location.hash);
    let moving = false;
    let frame = 0;
    let resizeFrame = 0;
    let completion: ReturnType<typeof setTimeout> | undefined;
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    function targetFor(hash: string) {
      try {
        return document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return null;
      }
    }
    function destination(target: HTMLElement) {
      if (target.id === "inicio") return 0;
      const heading = target.querySelector<HTMLElement>("[data-anchor-heading]") || target;
      const header =
        document.querySelector<HTMLElement>("[data-site-header]")?.getBoundingClientRect().height ||
        0;
      const gap =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--anchor-gap")) ||
        24;
      return Math.max(0, layoutTop(heading) - header - gap);
    }
    function correct() {
      if (!locked || moving) return;
      const target = targetFor(location.hash);
      if (!target) return;
      const top = destination(target);
      if (Math.abs(window.scrollY - top) > 1) {
        if (engine.current) engine.current.scrollTo(top, true, () => {});
        else window.scrollTo({ top, behavior: "instant" });
      }
    }
    realign.current = correct;
    function navigate(hash: string, immediate: boolean, focus = false) {
      const target = targetFor(hash);
      if (!target) return;
      locked = true;
      moving = true;
      clearTimeout(completion);
      const finish = () => {
        clearTimeout(completion);
        moving = false;
        correct();
        if (focus && locked) {
          const focusTarget = target.querySelector<HTMLElement>("h1,h2") || target;
          if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
          focusTarget.focus({ preventScroll: true });
        }
      };
      const top = destination(target);
      if (engine.current) engine.current.scrollTo(top, immediate, finish);
      else {
        window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
        if (immediate) finish();
        else completion = setTimeout(finish, 1000);
      }
    }
    const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element)?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self"))
        return;
      const url = new URL(link.href, location.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash ||
        !targetFor(url.hash)
      )
        return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      // Deixa o menu mobile fechar e liberar o scroll antes da navegação.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => navigate(url.hash, reduce(), true));
      });
    }
    function onHistory() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (location.hash) navigate(location.hash, true);
        else {
          locked = false;
          if (engine.current) engine.current.scrollTo(0, true, () => {});
          else window.scrollTo({ top: 0, behavior: "instant" });
        }
      });
    }
    function unlock() {
      locked = false;
      if (moving) {
        moving = false;
        clearTimeout(completion);
        engine.current?.cancel();
      }
    }
    function onKey(event: KeyboardEvent) {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key))
        unlock();
    }
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(correct);
    });
    const main = document.querySelector("main");
    if (main) observer.observe(main);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHistory);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("maranata:layout", correct);
    window.addEventListener("maranata:scroll-refresh", correct);
    if (location.hash) navigate(location.hash, true);
    let disposed = false;
    void document.fonts.ready.then(() => {
      if (!disposed) correct();
    });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      clearTimeout(completion);
      history.scrollRestoration = previousRestoration;
      realign.current = () => {};
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHistory);
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("maranata:layout", correct);
      window.removeEventListener("maranata:scroll-refresh", correct);
    };
  }, [engine, realign]);
  return { engine, realign };
}
