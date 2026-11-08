import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { allowsIndexing } from "@/lib/indexing";
export default function robots(): MetadataRoute.Robots {
  const indexable = allowsIndexing(process.env, siteConfig.url);
  return {
    rules: { userAgent: "*", ...(indexable ? { allow: "/" } : { disallow: "/" }) },
    ...(indexable ? { sitemap: `${siteConfig.url}/sitemap.xml` } : {}),
  };
}
