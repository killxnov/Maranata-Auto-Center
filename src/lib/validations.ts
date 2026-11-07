import type { ContactErrors, ContactValues } from "../types/contact.ts";

const brazilianAreaCodes = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43,
  44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77,
  79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

export function normalizeBrazilianPhone(value: string): string | null {
  if (value.length > 25 || /[^\d+().\s-]/.test(value)) return null;
  let digits = value.replace(/\D/g, "");
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55"))
    digits = digits.slice(2);
  if (![10, 11].includes(digits.length) || !brazilianAreaCodes.has(Number(digits.slice(0, 2))))
    return null;
  const subscriber = digits.slice(2);
  if (digits.length === 11 ? !/^9\d{8}$/.test(subscriber) : !/^[2-5]\d{7}$/.test(subscriber))
    return null;
  if (/^(\d)\1+$/.test(subscriber)) return null;
  return `55${digits}`;
}

export function formatPhone(value: string) {
  const normalized = normalizeBrazilianPhone(value);
  if (!normalized) return value.trim();
  const digits = normalized.slice(2);
  const split = digits.length > 10 ? 7 : 6;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, split)}${digits.length > split ? `-${digits.slice(split)}` : ""}`;
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim().replace(/\s+/g, " ");
  if (
    name.length < 5 ||
    name.length > 100 ||
    !/^[\p{L}][\p{L}\p{M}'’.-]*(?: [\p{L}][\p{L}\p{M}'’.-]*)+$/u.test(name)
  )
    errors.name = "Informe seu nome e sobrenome, entre 5 e 100 caracteres.";
  if (!normalizeBrazilianPhone(values.phone))
    errors.phone = "Informe um telefone brasileiro válido com DDD.";
  if (values.description.trim().length < 10 || values.description.length > 1500)
    errors.description = "Descreva o atendimento usando entre 10 e 1.500 caracteres.";
  return errors;
}
