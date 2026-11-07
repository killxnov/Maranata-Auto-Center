import Link from "next/link";
import { Container } from "@/components/ui/Container";
export { metadata } from "@/lib/metadata";
export default function NotFound() {
  return (
    <main id="conteudo">
      <Container className="flex min-h-[75vh] flex-col items-start justify-center">
        <span className="eyebrow text-muted">Maranata Auto Center · 404</span>
        <h1 className="display-heading mt-6 max-w-xl text-5xl">
          Vamos voltar para o caminho certo.
        </h1>
        <p className="body-copy mt-6">A página que você procura não foi encontrada.</p>
        <Link
          href="/"
          className="mt-8 rounded bg-brand-red px-6 py-4 text-sm font-semibold text-white"
        >
          Voltar ao início
        </Link>
      </Container>
    </main>
  );
}
