import { Facebook, Instagram } from "lucide-react";
import { socialConfig } from "@/config/social.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site.config";
import { WhatsAppIcon } from "./WhatsAppIcon";
export function SocialLinks({ includeWhatsApp = true }: { includeWhatsApp?: boolean }) {
  const whatsapp = includeWhatsApp ? buildWhatsAppUrl(siteConfig.whatsappNumber) : null;
  if (!socialConfig.instagram && !socialConfig.facebook && !whatsapp) return null;
  const style =
    "grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-white/70 hover:bg-surface/10";
  return (
    <div className="flex gap-2">
      {socialConfig.instagram && (
        <a
          href={socialConfig.instagram}
          aria-label="Instagram da Maranata"
          target="_blank"
          rel="noopener noreferrer"
          className={style}
        >
          <Instagram size={17} />
        </a>
      )}
      {socialConfig.facebook && (
        <a
          href={socialConfig.facebook}
          aria-label="Facebook da Maranata"
          target="_blank"
          rel="noopener noreferrer"
          className={style}
        >
          <Facebook size={17} />
        </a>
      )}
      {whatsapp && (
        <a
          href={whatsapp}
          aria-label="WhatsApp da Maranata"
          target="_blank"
          rel="noopener noreferrer"
          className={style}
        >
          <WhatsAppIcon className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}
