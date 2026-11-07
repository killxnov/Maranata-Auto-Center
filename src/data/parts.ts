import type { Part } from "@/types/service";
export const parts: Part[] = [
  { id: "filtros", title: "Filtros", description: "Ar, óleo e combustível", icon: "scan" },
  { id: "freios", title: "Freios", description: "Pastilhas e componentes", icon: "disc" },
  {
    id: "suspensao",
    title: "Suspensão",
    description: "Amortecedores e componentes",
    icon: "suspension",
  },
  {
    id: "lubrificantes",
    title: "Lubrificantes",
    description: "Óleos para o seu motor",
    icon: "oil",
  },
  { id: "reposicao", title: "Reposição", description: "Consulte pelo seu modelo", icon: "wrench" },
];
