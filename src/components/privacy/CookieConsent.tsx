"use client";
import { useEffect, useRef } from "react";

export function CookieConsent({
  onAccept,
  onReject,
  onCustomize,
}: {
  onAccept: () => void;
  onReject: () => void;
  onCustomize: () => void;
}) {
  const banner = useRef<HTMLElement>(null);
  useEffect(() => {
    const measure = () => {
      if (banner.current)
        document.documentElement.style.setProperty(
          "--consent-banner-height",
          `${banner.current.getBoundingClientRect().height}px`,
        );
    };
    const observer = new ResizeObserver(measure);
    if (banner.current) observer.observe(banner.current);
    measure();
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--consent-banner-height");
    };
  }, []);
  return (
    <section
      ref={banner}
      aria-labelledby="cookie-consent-title"
      className="cookie-consent fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-50 rounded-lg border border-white/20 bg-[#111316] p-5 text-ink shadow-[0_12px_48px_#0008] sm:right-auto sm:w-[min(40rem,calc(100%-2rem))] sm:p-6"
    >
      <h2 id="cookie-consent-title" className="font-display text-lg font-semibold">
        Sua privacidade, sua escolha.
      </h2>
      <p className="mt-2 text-xs leading-6 text-muted">
        O Google Maps é opcional e pode usar cookies ao carregar. Você decide se permite esse
        recurso; o restante do site funciona sem ele.{" "}
        <a href="/politica-de-cookies" className="underline underline-offset-4">
          Política de Cookies
        </a>
        .
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <button
          type="button"
          onClick={onAccept}
          className="min-h-11 rounded border border-white/25 bg-white/5 px-4 font-semibold hover:bg-white/10"
        >
          Aceitar opcionais
        </button>
        <button
          type="button"
          onClick={onReject}
          className="min-h-11 rounded border border-white/25 bg-white/5 px-4 font-semibold hover:bg-white/10"
        >
          Rejeitar opcionais
        </button>
        <button
          type="button"
          onClick={onCustomize}
          className="col-span-2 min-h-11 rounded border border-white/25 px-4 font-semibold hover:bg-white/10"
        >
          Personalizar
        </button>
      </div>
    </section>
  );
}
