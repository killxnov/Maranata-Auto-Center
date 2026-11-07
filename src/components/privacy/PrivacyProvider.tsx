"use client";
import { createContext, useContext, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { privacyConfig } from "@/config/privacy.config";
import { CookieConsent } from "./CookieConsent";

const changeEvent = "maranata:privacy-change";
let sessionChoice: boolean | undefined;
function readChoice(): boolean | null {
  try {
    const raw = localStorage.getItem(privacyConfig.storageKey);
    if (!raw) return sessionChoice ?? null;
    const value = JSON.parse(raw);
    return value && value.version === 1 && typeof value.externalMaps === "boolean"
      ? value.externalMaps
      : null;
  } catch {
    return sessionChoice ?? null;
  }
}
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(changeEvent, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(changeEvent, listener);
  };
}
function saveChoice(allowed: boolean) {
  try {
    localStorage.setItem(
      privacyConfig.storageKey,
      JSON.stringify({ version: 1, externalMaps: allowed }),
    );
    sessionChoice = undefined;
  } catch {
    sessionChoice = allowed;
  }
  window.dispatchEvent(new Event(changeEvent));
}
const PrivacyContext = createContext<{
  externalMaps: boolean;
  setExternalMaps: (allowed: boolean) => void;
  openPreferences: () => void;
} | null>(null);
export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (!context) throw new Error("PrivacyProvider ausente");
  return context;
}
export function PrivacyProvider({ children }: { children: ReactNode }) {
  // undefined: hidratação pendente; null: ainda não existe uma escolha válida.
  const choice = useSyncExternalStore<boolean | null | undefined>(
    subscribe,
    readChoice,
    () => undefined,
  );
  const externalMaps = choice === true;
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  function openPreferences() {
    setDraft(externalMaps);
    setPreferencesOpen(true);
    dialog.current?.showModal();
  }
  function save(allowed: boolean) {
    saveChoice(allowed);
    dialog.current?.close();
  }
  return (
    <PrivacyContext.Provider value={{ externalMaps, setExternalMaps: saveChoice, openPreferences }}>
      {children}
      {choice === null && !preferencesOpen && (
        <CookieConsent
          onAccept={() => saveChoice(true)}
          onReject={() => saveChoice(false)}
          onCustomize={openPreferences}
        />
      )}
      <dialog
        ref={dialog}
        aria-labelledby="privacy-title"
        aria-describedby="privacy-description"
        onClose={() => setPreferencesOpen(false)}
        className="privacy-dialog m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg border border-white/15 bg-surface p-6 text-ink shadow-2xl backdrop:bg-black/75 sm:p-8"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="privacy-title" className="font-display text-2xl font-semibold">
            Sua privacidade
          </h2>
          <button
            type="button"
            autoFocus
            aria-label="Fechar preferências"
            onClick={() => dialog.current?.close()}
            className="grid h-11 w-11 shrink-0 place-items-center rounded border border-white/15"
          >
            <X size={19} />
          </button>
        </div>
        <p id="privacy-description" className="mt-4 text-sm leading-7 text-muted">
          O site funciona sem carregar o mapa do Google. Não utilizamos ferramentas de análise ou
          publicidade.
        </p>
        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded border border-white/15 p-4">
          <input
            type="checkbox"
            checked={draft}
            onChange={(event) => setDraft(event.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-red)]"
          />
          <span>
            <span className="block text-sm font-semibold">Permitir Google Maps</span>
            <span className="mt-2 block text-xs leading-6 text-muted">
              Ao carregar o mapa, seu navegador se conecta ao Google, que pode receber seu IP e usar
              cookies conforme suas políticas.
            </span>
          </span>
        </label>
        <p className="mt-4 text-xs leading-6 text-muted">
          Guardamos apenas esta escolha neste navegador. Você pode alterá-la aqui a qualquer
          momento.{" "}
          <a href="/politica-de-cookies" className="underline underline-offset-4">
            Saiba mais
          </a>
          .
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => save(false)}
            className="min-h-12 rounded border border-white/25 px-4 text-xs font-semibold hover:bg-white/5"
          >
            Rejeitar opcionais
          </button>
          <button
            type="button"
            onClick={() => save(draft)}
            className="min-h-12 rounded border border-white/25 px-4 text-xs font-semibold hover:bg-white/5"
          >
            Salvar preferências
          </button>
        </div>
      </dialog>
    </PrivacyContext.Provider>
  );
}
export function PrivacyPreferencesButton() {
  const { openPreferences } = usePrivacy();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className="privacy-preferences min-h-11 text-center text-xs text-white/65 underline underline-offset-4 hover:text-white"
    >
      Configurações de privacidade
    </button>
  );
}
