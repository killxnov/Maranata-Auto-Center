"use client";
import { MapPin } from "lucide-react";
import { socialConfig } from "@/config/social.config";
import { usePrivacy } from "./PrivacyProvider";
export function ConsentMap() {
  const { externalMaps, setExternalMaps, openPreferences } = usePrivacy();
  if (externalMaps)
    return (
      <iframe
        title="Mapa da Maranata Auto Center, R. Vicente Ferreira Gomes, 35, Sarandi, Porto Alegre"
        src={socialConfig.embed}
        className="h-[340px] w-full border-0 sm:h-[400px]"
        loading="lazy"
        referrerPolicy="no-referrer"
        allowFullScreen
      />
    );
  return (
    <div className="map-placeholder flex h-[340px] flex-col items-center justify-center px-6 text-center sm:h-[400px]">
      <MapPin size={32} strokeWidth={1.2} className="mb-4 text-[#93a8bf]" aria-hidden="true" />
      <h3 className="font-display text-xl font-semibold">Veja o caminho até aqui.</h3>
      <p className="mt-3 max-w-sm text-xs leading-6 text-muted">
        O mapa é opcional. Ao ativá-lo, você permite a conexão com o Google e o uso de tecnologias
        desse serviço.
      </p>
      <button
        type="button"
        onClick={() => setExternalMaps(true)}
        className="mt-5 min-h-12 rounded border border-white/25 bg-white/5 px-6 text-xs font-semibold hover:bg-white/10"
      >
        Permitir e carregar mapa
      </button>
      <button
        type="button"
        onClick={openPreferences}
        className="mt-2 min-h-11 text-xs text-muted underline underline-offset-4"
      >
        Gerenciar preferências
      </button>
      <noscript>
        <p className="mt-2 text-xs text-muted">Use “Como chegar” para abrir o mapa no Google.</p>
      </noscript>
    </div>
  );
}
