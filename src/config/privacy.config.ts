export const privacyConfig = {
  updatedAt: "2026-11-05",
  updatedAtLabel: "5 de novembro de 2026",
  storageKey: "maranata.privacy.v1",
  // Dados ainda não fornecidos pela empresa. Não publicar valores presumidos.
  legalName: undefined as string | undefined,
  cnpj: undefined as string | undefined,
  privacyEmail: undefined as string | undefined,
  retentionPolicy: undefined as string | undefined,
  hostingProvider: undefined as string | undefined,
  legallyReviewed: false,
} as const;
export const legalNavigation = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
] as const;
