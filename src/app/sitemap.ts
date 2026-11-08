import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { legalNavigation } from "@/config/privacy.config";
import { allowsIndexing } from "@/lib/indexing";
export default function sitemap(): MetadataRoute.Sitemap {
  return allowsIndexing(process.env, siteConfig.url)
    ? [
        { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
        ...legalNavigation.map((item) => ({
          url: `${siteConfig.url}${item.href}`,
          changeFrequency: "yearly" as const,
          priority: 0.2,
        })),
      ]
    : [];
}
