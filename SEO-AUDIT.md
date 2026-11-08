# Auditoria técnica e SEO — Maranata Auto Center

Data: 08/11/2026. Todas as mudanças desta iteração permanecem locais, sem commit, push ou deploy.

## Diagnóstico comprovado

A consulta HTTP ao domínio público `https://maranata-autocenter.vercel.app/` retornou 200, sem autenticação e sem `X-Robots-Tag`, mas com `<meta name="robots" content="noindex, nofollow"/>`. O `robots.txt` respondeu `Disallow: /`, e o sitemap não continha URLs. Canonical, `og:url` e imagens sociais também estavam ausentes.

A origem no código era a condição `siteConfig.url`: a configuração só aceitava `NEXT_PUBLIC_SITE_URL`; ausente ou inválida, retornava `undefined`. `metadata.ts`, `robots.ts` e `sitemap.ts` usavam esse valor para bloquear indexação e omitir URLs. A saída publicada corresponde a esse caminho. Não houve acesso ao painel da Vercel para inspecionar o valor da variável ou suas configurações privadas.

Não há `public/robots.txt` concorrente, `generateMetadata` sobrescrevendo a regra ou header `X-Robots-Tag` em `next.config.ts`. A consulta ao domínio oficial não mostrou esse header. A Vercel pode adicioná-lo em URLs de preview/deploys antigos: [documentação de headers](https://vercel.com/docs/headers/response-headers).

Uma execução nova do Lighthouse 13.6.0 contra o site publicado reproduziu SEO **66**, com `is-crawlable` reprovado. O relatório completo anterior do PageSpeed não foi fornecido. A API pública do PageSpeed retornou HTTP 429 nesta auditoria.

## Correções

- URL oficial padrão centralizada em `site.config.ts`, substituível por `NEXT_PUBLIC_SITE_URL`. A configuração vazia local não remove mais a identidade pública.
- Indexação separada da existência da URL. `VERCEL_TARGET_ENV` e `VERCEL_ENV` têm precedência sobre `NODE_ENV`. Produção pública HTTPS permite indexação; preview, desenvolvimento e ambientes customizados bloqueiam. Vercel identificada sem ambiente também bloqueia. Fora da Vercel, uma build com `NODE_ENV=production` simula produção; `next dev` continua bloqueado.
- Produção: meta `index, follow`, robots com `Allow: /` e referência ao sitemap, quatro URLs públicas no sitemap, sem datas inventadas.
- Título e descrição locais atualizados, preservando a copy visível. `metadataBase`, canonical, Open Graph e Twitter usam a mesma origem oficial.
- Favicon do peixinho preservado pela convenção `src/app/icon.svg` do Next.js, sem declaração duplicada.
- Verificação opcional do Search Console via `GOOGLE_SITE_VERIFICATION` na Metadata API, sem token fictício.
- `AutoRepair` preservado e acrescido de `@id` estável e bairro em `PostalAddress.extendedAddress`. Telefone, endereço, foto oficial e horários corretos. Uma entidade na home; sem `aggregateRating`, `review`, coordenadas ou redes sociais inventadas. A serialização continua escapando `<`.
- Corrigida uma falha funcional encontrada na regressão: a camada decorativa `.drive-message`, transparente no início, interceptava cliques no CTA. `pointer-events: none` resolve isso sem alterar aparência ou animações.
- A primeira medição desktop apontou acessibilidade 97 por contraste do footer: a animação deixava seus filhos com opacidade 0,55 antes da entrada na tela. Foi preservado o movimento vertical e a opacidade do rodapé passou a permanecer em 1 durante esse movimento. Cores, tipografia e composição não mudaram.

As avaliações continuam em movimento mesmo com toques, hover e foco, conforme a orientação mais recente do usuário, que prevalece sobre a indicação de pausa no anexo. Movimento reduzido continua respeitado.

## Validação da saída real

Build de produção servida com `next start` e consultada via HTTP:

- Home HTTP 200, sem `X-Robots-Tag` restritivo; meta `index, follow` no HTML inicial e depois da hidratação.
- Canonical `https://maranata-autocenter.vercel.app` (a ausência de barra final é a normalização do Next.js).
- Robots HTTP 200: `Allow: /` e `Sitemap: https://maranata-autocenter.vercel.app/sitemap.xml`.
- Sitemap HTTP 200: home, `/politica-de-privacidade`, `/politica-de-cookies`, `/termos-de-uso`; URLs absolutas, únicas e com respostas 200. Páginas legais mantêm canonicals próprios. Rota inexistente retorna 404.
- JSON-LD extraído e parseado nos testes, com tipo, entidade, endereço, telefone e cinco dias úteis das 08:00 às 18:00 verificados.
- Build adicional com `VERCEL_ENV=preview`: HTML gerado com `noindex, nofollow`, robots com `Disallow: /` e sitemap vazio. Build de produção restaurada ao final.
- Matriz de testes unitários cobre desenvolvimento, produção, preview, ambiente customizado e precedência de variáveis.

## Semântica, privacidade e desempenho

Um H1 na landing page, com a copy atual; H2 nas seções e H3 nos cards/categorias. Conteúdo principal presente no HTML sem JavaScript. Textos alternativos, links rastreáveis, nomes acessíveis e foco foram preservados. Endereço completo continua concentrado em Localização e JSON-LD.

Consentimento continua com snapshot de servidor estável via `useSyncExternalStore`. Conteúdo institucional não depende do consentimento, o mapa só conecta após autorização, e o banner não oculta conteúdo dos rastreadores. Testes cobrem persistência, recusa, revogação e armazenamento bloqueado.

BMW, assets, fontes locais via Next/font, carregamento de imagens via Next/Image, carrosséis e smooth scroll foram preservados. Hero continua com prioridade alta; foto abaixo da dobra mantém carregamento sob demanda. GSAP/Lenis continuam com importação dinâmica. Nenhuma dependência foi adicionada ao projeto; Lighthouse foi executado via `npx`. Não houve otimizações especulativas.

Lighthouse 13.6.0 local, com Chrome headless, nas quatro categorias:

| Medição                             | Performance | Acessibilidade | Boas práticas | SEO |
| ----------------------------------- | ----------: | -------------: | ------------: | --: |
| Site publicado, nova medição mobile |          98 |            100 |           100 |  66 |
| Primeira mobile                     |          98 |            100 |           100 | 100 |
| Desktop após correção do footer     |         100 |            100 |           100 | 100 |
| Mobile após correções               |          92 |            100 |           100 | 100 |
| Repetição mobile                    |          92 |            100 |           100 | 100 |

A primeira mobile teve LCP 0,92 s, CLS 0 e TBT 40,5 ms; as duas últimas tiveram LCP 3,3–3,4 s, CLS 0,016 e TBT 40 ms. O elemento LCP identificado foi a imagem da BMW, que não foi substituída nem teve seu carregamento alterado. Desktop: LCP 0,3 s, CLS 0,009 e TBT 0 ms.

Não foi comprovada a manutenção da meta mobile de 97; também não há evidência isolando uma regressão causada pelo SEO. Uma nova medição remota do site publicado no mesmo computador marcou performance 98 (LCP 1,1 s, CLS 0, TBT 60 ms) e SEO 66. Ela usa Vercel/CDN, enquanto a versão corrigida foi medida em servidor local, e não constitui comparação controlada entre duas versões publicadas. Não foram feitas mudanças especulativas no hero para perseguir nota. Os números não são uma nova nota do PageSpeed e não são diretamente comparáveis ao relatório fornecido. É necessário repetir PageSpeed após publicação manual e investigar LCP caso a redução persista. INP exige dados de uso real; TBT não é INP.

## Testes

- Build de produção: aprovada; build de preview: aprovada.
- TypeScript e ESLint: aprovados.
- Testes unitários: 10 aprovados.
- Playwright: 33 aprovados na suíte completa. Após o ajuste de opacidade do footer, os 5 testes afetados de transições, limpeza no resize/reduced motion, banner/footer, SEO e acessibilidade foram repetidos e aprovados. A suíte inclui navbar/âncoras, CTA, BMW desktop e mobile, scroll, carrosséis, formulário/WhatsApp sem envio real, mapa/consentimento, footer, páginas legais, SEO e axe WCAG 2.2 AA desktop/mobile.
- Responsividade verificada em 320, 375, 390, 430, 768, 1024 e 1440 px, incluindo ausência de overflow e geometria das marcas.

## Arquivos desta iteração

`.env.example`, `README.md`, `SEO-AUDIT.md`, `src/config/site.config.ts`, `src/config/seo.config.ts`, `src/lib/indexing.ts` (novo), `src/lib/metadata.ts`, `src/lib/structured-data.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/globals.css` (somente `pointer-events` nesta iteração), `src/components/animations/SectionTransitions.tsx` (opacidade do footer), `tests/indexing.test.ts` (novo), `tests/browser/site.spec.ts`.

Alterações locais anteriores em Serviços, ServiceCard, TestimonialsCarousel, testes de refinamentos e remoção das pausas no CSS foram preservadas. Não foram refeitas nesta auditoria.

## Ações externas após revisão

1. Revisar e publicar manualmente. O site publicado ainda contém o bloqueio antigo; corrigir o código local não altera produção.
2. Na Vercel, confirmar `NEXT_PUBLIC_SITE_URL=https://maranata-autocenter.vercel.app` e as variáveis de sistema expostas. Ao trocar para domínio próprio, atualizar essa única URL e recompilar. Não usar URL temporária de preview como canonical.
3. Depois da publicação, repetir HTTP/HTML, headers, robots e sitemap no domínio público, além do PageSpeed mobile e desktop. Inspecionar a URL oficial, não uma URL antiga de deployment que a Vercel pode marcar com `noindex`.
4. No Search Console, adicionar a propriedade de prefixo de URL `https://maranata-autocenter.vercel.app/`; se usar verificação HTML, copiar o token real para `GOOGLE_SITE_VERIFICATION`, recompilar e verificar. Enviar `sitemap.xml`, executar inspeção ao vivo da home e solicitar indexação. Sem acesso autenticado, essas ações não foram executadas.
5. Rodar o [Schema Markup Validator](https://validator.schema.org/) e o [Google Rich Results Test](https://search.google.com/test/rich-results) com o HTML corrigido ou a URL após publicar. Validações externas não foram concluídas nesta sessão; o teste local confirma JSON e dados, não substitui essas ferramentas. A interface de navegador integrada necessária ao teste externo estava indisponível.
6. Acompanhar indexação e Core Web Vitals reais. Permitir indexação não comprova presença no índice nem posição no Google. Marcação válida também não garante rich snippets; [política do Google para avaliações do próprio negócio](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).
