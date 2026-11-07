import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site.config";
import { Button } from "./Button";
import type { ComponentProps } from "react";
type Props = Omit<ComponentProps<typeof Button>, "href"> & { message?: string };
export function ContactLink({ message, children = "Solicitar orçamento", ...props }: Props) {
  const href = buildWhatsAppUrl(siteConfig.whatsappNumber, message);
  return (
    <Button
      href={href || "#contato"}
      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </Button>
  );
}
