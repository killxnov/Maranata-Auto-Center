import { test } from "node:test";
import assert from "node:assert/strict";
import { testimonials } from "../src/data/testimonials.ts";

test("cadastro contém oito avaliações completas, únicas, sem fotografias ou datas", () => {
  assert.equal(testimonials.length, 8);
  assert.equal(new Set(testimonials.map((item) => item.id)).size, 8);
  for (const item of testimonials) {
    assert.deepEqual(Object.keys(item).sort(), ["comment", "id", "name", "rating"]);
    assert.equal(item.rating, 5);
    assert.ok(item.comment.trim());
  }
  assert.equal(
    testimonials.some((item) => item.name === "Estevam Barros"),
    false,
  );
});
test("transcrição mantém escrita, pontuação e emoji dos prints", () => {
  const comments = Object.fromEntries(testimonials.map((item) => [item.name, item.comment]));
  assert.equal(
    comments["Natália Munari"],
    "Melhor mecânica! Atendimento top e de super confiança. Preço justo e qualidade. 3° carro na mão deles! Só agradecer por ter encontrado o Aurino!",
  );
  assert.equal(
    comments["wilson vittorazzi"],
    "Ótimo atendimento e serviço de qualidade. Recomendo.",
  );
  assert.equal(comments["Elias Correa"], "Ambiente abençoado e serviço de qualidade top");
  assert.equal(
    comments["Arthur Martins"],
    "Atendimento top, qualidade e acima de.tudo honestidade com os clientes e.muito profissionalismo e tem um café expresso top na recepção 😉",
  );
  assert.equal(
    comments["Juliano Andrade"],
    "Super recomendo com super atendimento,ótimos serviços d mecânica e pessoas de confiança.",
  );
  assert.equal(
    comments["Valeci Maciel"],
    "Serviço de qualidade, bom atendimento, garantia preço justo.",
  );
  assert.equal(comments["Hélio Vinícius Santos"], "Excelente atendimento. Recomendo!");
  assert.equal(
    comments["paulo dias"],
    "Pessoal de confiança preço acessível ótimo atendimento nota 100000",
  );
});
