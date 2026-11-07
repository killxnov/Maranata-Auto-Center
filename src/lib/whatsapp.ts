import type { ContactValues } from "../types/contact.ts";
import { normalizeBrazilianPhone } from "./validations.ts";

export const defaultWhatsAppMessage =
  "Olá, Maranata Auto Center! Visitei o site e gostaria de informações sobre os serviços.";

export function buildWhatsAppUrl(number: string, message = defaultWhatsAppMessage): string | null {
  const normalized = normalizeBrazilianPhone(number);
  if (!normalized) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function buildContactMessage(values: ContactValues) {
  const name = values.name.trim().replace(/\s+/g, " ");
  return `Olá, equipe Maranata Auto Center!\n\nGostaria de solicitar atendimento.\n\nNome: ${name}\nTelefone: ${values.phone.trim()}\n\nDescrição:\n${values.description.trim()}\n\nAguardo retorno. Obrigado!`;
}

export function buildServiceMessage(title: string, kind: "service" | "part" = "service") {
  return kind === "part"
    ? `Olá, Maranata Auto Center! Gostaria de consultar a disponibilidade e a aplicação de peças da categoria ${title}.`
    : `Olá, Maranata Auto Center! Gostaria de solicitar um orçamento para ${title}. Posso informar os dados do meu veículo?`;
}
