import type { GalleryImage } from "@/types/team";
import { media } from "./media";
export const gallery: GalleryImage[] = [
  { id: "workshop-preview", ...media.workshop, caption: "Espaço de trabalho" },
  { id: "reception-preview", ...media.reception, caption: "Área de atendimento" },
  { id: "service-preview", ...media.service, caption: "Cuidados em detalhe" },
];
