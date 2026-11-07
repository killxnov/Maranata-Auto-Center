import { siteConfig } from "@/config/site.config";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { termsSections } from "@/data/legal";
export const metadata = {
  title: "Termos de Uso | Maranata Auto Center",
  ...(siteConfig.url ? { alternates: { canonical: "/termos-de-uso" } } : {}),
};
export default function TermsPage() {
  return <LegalDocument title="Termos de Uso" sections={termsSections} />;
}
