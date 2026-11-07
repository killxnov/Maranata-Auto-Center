import type { Testimonial } from "../types/testimonial.ts";

// Transcrição das capturas fornecidas pela Maranata. Não corrigir a escrita dos autores.
// Estevam Barros não foi incluído: a captura contém um comentário truncado.
export const testimonials: Testimonial[] = [
  {
    id: "natalia-munari",
    name: "Natália Munari",
    rating: 5,
    comment:
      "Melhor mecânica! Atendimento top e de super confiança. Preço justo e qualidade. 3° carro na mão deles! Só agradecer por ter encontrado o Aurino!",
  },
  {
    id: "wilson-vittorazzi",
    name: "wilson vittorazzi",
    rating: 5,
    comment: "Ótimo atendimento e serviço de qualidade. Recomendo.",
  },
  {
    id: "elias-correa",
    name: "Elias Correa",
    rating: 5,
    comment: "Ambiente abençoado e serviço de qualidade top",
  },
  {
    id: "arthur-martins",
    name: "Arthur Martins",
    rating: 5,
    comment:
      "Atendimento top, qualidade e acima de.tudo honestidade com os clientes e.muito profissionalismo e tem um café expresso top na recepção 😉",
  },
  {
    id: "juliano-andrade",
    name: "Juliano Andrade",
    rating: 5,
    comment:
      "Super recomendo com super atendimento,ótimos serviços d mecânica e pessoas de confiança.",
  },
  {
    id: "valeci-maciel",
    name: "Valeci Maciel",
    rating: 5,
    comment: "Serviço de qualidade, bom atendimento, garantia preço justo.",
  },
  {
    id: "helio-vinicius-santos",
    name: "Hélio Vinícius Santos",
    rating: 5,
    comment: "Excelente atendimento. Recomendo!",
  },
  {
    id: "paulo-dias",
    name: "paulo dias",
    rating: 5,
    comment: "Pessoal de confiança preço acessível ótimo atendimento nota 100000",
  },
];

export const testimonialsConfig = {
  sourceUrl: "https://share.google/39LqwbAXVyeApOmGk",
  touchPauseMs: 12000,
} as const;
