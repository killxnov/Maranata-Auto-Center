import type { Service } from "@/types/service";

// Categorias iniciais para validação comercial. Controle o aviso em site.config.ts.
export const services: Service[] = [
  {
    id: "mecanica",
    title: "Mecânica geral",
    description: "Cuidado com o funcionamento do seu veículo, do diagnóstico à manutenção.",
    icon: "wrench",
  },
  {
    id: "preventiva",
    title: "Manutenção preventiva",
    description: "Antecipe os cuidados e converse sobre a revisão indicada para o seu carro.",
    icon: "shield",
  },
  {
    id: "diagnostico",
    title: "Diagnóstico automotivo",
    description: "Luz acesa no painel? Consulte a avaliação dos sistemas do seu veículo.",
    icon: "scan",
  },
  {
    id: "freios",
    title: "Sistema de freios",
    description: "Atenção aos componentes que fazem a diferença em cada parada.",
    icon: "disc",
  },
  {
    id: "suspensao",
    title: "Suspensão e direção",
    description: "Conforto, estabilidade e controle para os seus trajetos do dia a dia.",
    icon: "suspension",
  },
  {
    id: "oleo",
    title: "Óleo e filtros",
    description: "Consulte a troca de lubrificantes e filtros conforme o seu modelo.",
    icon: "oil",
  },
  {
    id: "revisao",
    title: "Revisões automotivas",
    description: "Organize os cuidados com o carro antes da rotina ou da próxima viagem.",
    icon: "check",
  },
  {
    id: "importados",
    title: "Nacionais e importados",
    description: "Conte o modelo do seu veículo e consulte o atendimento adequado.",
    icon: "car",
  },
];
