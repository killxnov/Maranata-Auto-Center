import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(siteConfig.url ? { allow: "/" } : { disallow: "/" }) },
    ...(siteConfig.url ? { sitemap: `${siteConfig.url}/sitemap.xml` } : {}),
  };
}
