import { siteConfig } from "@/config/site.config";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { cookieSections } from "@/data/legal";
export const metadata = {
  title: "Política de Cookies | Maranata Auto Center",
  ...(siteConfig.url ? { alternates: { canonical: "/politica-de-cookies" } } : {}),
};
export default function CookiesPage() {
  return <LegalDocument title="Política de Cookies" sections={cookieSections} />;
}
