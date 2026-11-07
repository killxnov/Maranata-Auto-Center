import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeBrazilianPhone, formatPhone, validateContact } from "../src/lib/validations.ts";
import { buildWhatsAppUrl, buildContactMessage, buildServiceMessage } from "../src/lib/whatsapp.ts";

const values = {
  name: "João da Silva",
  phone: "(51) 99876-5432",
  description: "Gostaria de revisar os freios do carro.",
};
test("valida nomes com acentos e telefone brasileiro", () => {
  assert.deepEqual(validateContact(values), {});
  assert.equal(normalizeBrazilianPhone(values.phone), "5551998765432");
  assert.equal(normalizeBrazilianPhone("+55 51 3456-7890"), "555134567890");
});
test("rejeita campos vazios, nome único, DDD inválido, número repetido e limites", () => {
  assert.equal(Object.keys(validateContact({ name: "", phone: "", description: "" })).length, 3);
  assert.ok(validateContact({ ...values, name: "João" }).name);
  assert.ok(validateContact({ ...values, name: "a".repeat(101) }).name);
  for (const value of ["00998765432", "51999999999", "123", "5112345678", "55123456789999"])
    assert.equal(normalizeBrazilianPhone(value), null);
  assert.ok(validateContact({ ...values, description: "x".repeat(1501) }).description);
});
test("formata celular, fixo e telefone com país sem perder dígitos", () => {
  assert.equal(formatPhone("51998765432"), "(51) 99876-5432");
  assert.equal(formatPhone("5134567890"), "(51) 3456-7890");
  assert.equal(formatPhone("+55 51 99876-5432"), "(51) 99876-5432");
});
test("WhatsApp sem número configurado não produz link", () => {
  assert.equal(buildWhatsAppUrl(""), null);
  assert.equal(buildWhatsAppUrl("invalid"), null);
});
test("codifica acentos, quebras de linha e caracteres reservados sem injeção", () => {
  const message = buildContactMessage({
    ...values,
    description: "Freios & revisão? #carro\nObrigado!",
  });
  const url = new URL(buildWhatsAppUrl("5551998765432", message)!);
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/5551998765432");
  assert.equal(url.searchParams.get("text"), message);
  assert.equal([...url.searchParams].length, 1);
  assert.ok(message.includes("Nome: João da Silva"));
  assert.ok(message.includes("Descrição:\nFreios"));
});
test("mensagens de serviços e peças identificam a consulta", () => {
  assert.ok(buildServiceMessage("Freios").includes("orçamento para Freios"));
  assert.ok(buildServiceMessage("Filtros", "part").includes("disponibilidade"));
});

test("não transforma números longos ou com letras em contatos válidos", () => {
  assert.equal(normalizeBrazilianPhone("abc51998765432"), null);
  assert.equal(formatPhone("51998765432123"), "51998765432123");
  assert.equal(normalizeBrazilianPhone(formatPhone("51998765432123")), null);
});
