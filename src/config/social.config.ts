import { siteConfig } from "./site.config";

function safeSocial(value: string | undefined, hostname: string) {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" &&
      (url.hostname === hostname || url.hostname === `www.${hostname}`)
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export const socialConfig = {
  instagram: safeSocial(process.env.NEXT_PUBLIC_INSTAGRAM_URL, "instagram.com"),
  facebook: safeSocial(process.env.NEXT_PUBLIC_FACEBOOK_URL, "facebook.com"),
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address.full)}`,
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address.full)}&output=embed`,
};
