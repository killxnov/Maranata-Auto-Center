import { siteConfig } from "@/config/site.config";
import { socialConfig } from "@/config/social.config";
import { normalizeBrazilianPhone } from "@/lib/validations";
export function getStructuredData() {
  const phone = normalizeBrazilianPhone(siteConfig.whatsappNumber);
  const profiles = [socialConfig.instagram, socialConfig.facebook].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: siteConfig.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: { "@type": "City", name: "Porto Alegre" },
    openingHoursSpecification: siteConfig.openingHoursSpecification,
    ...(siteConfig.url ? { url: siteConfig.url } : {}),
    ...(phone ? { telephone: `+${phone}` } : {}),
    ...(profiles.length ? { sameAs: profiles } : {}),
    ...(siteConfig.officialImage && siteConfig.url
      ? { image: new URL(siteConfig.officialImage, siteConfig.url).href }
      : {}),
  };
}
export function serializeStructuredData(value: ReturnType<typeof getStructuredData>) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
