import { formatPhone } from "@/lib/validations";
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "5551998508101";

function getSiteUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

export const siteConfig = {
  name: "Maranata Auto Center",
  shortName: "Maranata",
  developer: {
    name: "Daniel Batista dos Santos",
    url: "https://github.com/killxnov",
  },
  url: getSiteUrl(configuredUrl) || "https://maranata-autocenter.vercel.app",
  whatsappNumber,
  phoneDisplay: formatPhone(whatsappNumber),
  address: {
    street: "R. Vicente Ferreira Gomes, 35",
    neighborhood: "Sarandi",
    city: "Porto Alegre",
    region: "RS",
    postalCode: "91110-420",
    country: "BR",
    full: "R. Vicente Ferreira Gomes, 35 - Sarandi, Porto Alegre - RS, 91110-420",
  },
  // Publicar somente depois de confirmar os dados com a empresa.
  servicesConfirmed: false,
  partsConfirmed: false,
  openingHours: "Segunda a sexta, das 8h às 18h",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "https://schema.org/Monday",
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  officialImage: "/images/about/maranata-workshop-4k.webp",
} as const;
