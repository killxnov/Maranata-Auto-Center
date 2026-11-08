import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { seoConfig } from "@/config/seo.config";
import { allowsIndexing } from "./indexing";
export const metadata: Metadata = {
  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  ...(siteConfig.url
    ? { metadataBase: new URL(siteConfig.url), alternates: { canonical: "/" } }
    : {}),
  openGraph: {
    images: [],
    title: seoConfig.title,
    description: seoConfig.description,
    locale: "pt_BR",
    type: "website",
    siteName: siteConfig.name,
    ...(siteConfig.url
      ? {
          url: siteConfig.url,
          images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
        }
      : {}),
  },
  twitter: {
    images: siteConfig.url ? [`${siteConfig.url}/opengraph-image`] : [],
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
  },
  robots: allowsIndexing(process.env, siteConfig.url)
    ? { index: true, follow: true }
    : { index: false, follow: false },
  ...(process.env.GOOGLE_SITE_VERIFICATION?.trim()
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION.trim() } }
    : {}),
};
