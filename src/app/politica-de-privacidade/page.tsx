import { siteConfig } from "@/config/site.config";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { privacySections } from "@/data/legal";
export const metadata = {
  title: "Política de Privacidade | Maranata Auto Center",
  ...(siteConfig.url ? { alternates: { canonical: "/politica-de-privacidade" } } : {}),
};
export default function PrivacyPage() {
  return <LegalDocument title="Política de Privacidade" sections={privacySections} />;
}
