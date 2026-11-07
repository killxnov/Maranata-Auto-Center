"use client";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import type { ContactErrors, ContactValues } from "@/types/contact";
import { siteConfig } from "@/config/site.config";
import { validateContact, formatPhone } from "@/lib/validations";
import { buildContactMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const initial: ContactValues = { name: "", phone: "", description: "" };
export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const configured = Boolean(buildWhatsAppUrl(siteConfig.whatsappNumber));
  const inputClass =
    "mt-2 min-h-12 w-full rounded border border-ink/20 bg-surface px-4 py-3 text-sm text-ink transition-colors placeholder:text-[#9aa9bc] focus:border-ink";
  function update(field: keyof ContactValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setStatus("");
    setPreview("");
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const message = buildContactMessage(values);
    const url = buildWhatsAppUrl(siteConfig.whatsappNumber, message);
    if (!url) {
      setPreview(message);
      setStatus(
        "Mensagem preparada. O WhatsApp oficial ainda precisa ser configurado; nenhum dado foi enviado.",
      );
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
    setStatus("WhatsApp aberto com sua mensagem. Confirme o envio no aplicativo.");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(preview);
      setStatus("Mensagem copiada. Nenhum dado foi enviado.");
    } catch {
      setStatus(
        "Não foi possível copiar automaticamente. Selecione e copie o texto da mensagem abaixo.",
      );
    }
  }
  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="min-w-0 rounded border border-ink/10 bg-surface p-6 sm:p-9"
    >
      <h3 className="font-display text-2xl font-semibold tracking-tight">
        Vamos cuidar do seu próximo passo.
      </h3>
      <p className="mt-3 text-xs leading-6 text-muted">
        Preencha os dados para preparar sua mensagem de atendimento.
      </p>
      {!configured && (
        <p
          id="whatsapp-pending"
          className="mt-5 rounded border border-[#625037] bg-[#292319] px-4 py-3 text-xs leading-6 text-[#e8c995]"
        >
          WhatsApp oficial aguardando configuração. Você pode preparar e copiar a mensagem, mas ela
          ainda não será enviada.
        </p>
      )}
      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor="contact-name" className="text-xs font-semibold">
            Nome completo <span className="text-accent">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Como podemos chamar você?"
            className={inputClass}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-xs text-accent">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-xs font-semibold">
            Telefone com DDD <span className="text-accent">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            maxLength={22}
            required
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            onBlur={() => {
              if (values.phone)
                setValues((previous) => ({ ...previous, phone: formatPhone(previous.phone) }));
            }}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="(51) 9XXXX-XXXX"
            className={inputClass}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 text-xs text-accent">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-description" className="text-xs font-semibold">
            Como podemos ajudar? <span className="text-accent">*</span>
          </label>
          <textarea
            id="contact-description"
            name="description"
            rows={4}
            minLength={10}
            maxLength={1500}
            required
            value={values.description}
            onChange={(event) => update("description", event.target.value)}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={`description-hint${errors.description ? " description-error" : ""}`}
            placeholder="Conte o modelo, o ano e o que seu veículo precisa."
            className={`${inputClass} resize-y`}
          />
          <div id="description-hint" className="mt-1 flex justify-between text-[.65rem] text-muted">
            <span>Entre 10 e 1.500 caracteres</span>
            <span>{values.description.length}/1500</span>
          </div>
          {errors.description && (
            <p id="description-error" className="mt-2 text-xs text-accent">
              {errors.description}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        aria-describedby={!configured ? "whatsapp-pending" : undefined}
        className="mt-7 flex min-h-13 w-full items-center justify-center gap-3 rounded bg-brand-red px-5 py-4 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-red-hover)]"
      >
        {configured ? <WhatsAppIcon className="h-4 w-4" /> : <Check size={17} aria-hidden="true" />}
        {configured ? "Continuar no WhatsApp" : "Preparar mensagem"}
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <p role="status" aria-live="polite" className="mt-3 text-xs leading-6 text-muted">
        {status}
      </p>
      {preview && (
        <div className="mt-4 rounded border border-ink/15 bg-paper p-4">
          <pre className="whitespace-pre-wrap font-sans text-xs leading-6 [overflow-wrap:anywhere]">
            {preview}
          </pre>
          <button
            type="button"
            onClick={copy}
            className="mt-4 flex min-h-11 items-center gap-2 text-xs font-semibold"
          >
            <Copy size={16} aria-hidden="true" />
            Copiar mensagem
          </button>
        </div>
      )}
      <p className="mt-4 text-[.65rem] leading-5 text-muted">
        O formulário prepara a mensagem neste navegador, sem gravar os campos no servidor do site.
        Ao abrir o WhatsApp, os dados entram no link da mensagem; você confirma o envio no
        aplicativo.{" "}
        <a href="/politica-de-privacidade" className="underline underline-offset-4">
          Leia a Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}
