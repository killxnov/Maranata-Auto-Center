import type { ReactNode } from "react";
import { DM_Sans, Manrope } from "next/font/google";
import { metadata } from "@/lib/metadata";
import "./globals.css";
import { PrivacyProvider } from "@/components/privacy/PrivacyProvider";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const headingFont = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <PrivacyProvider>{children}</PrivacyProvider>
      </body>
    </html>
  );
}
