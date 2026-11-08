# Maranata Auto Center

Landing page institucional para a oficina Maranata Auto Center, no bairro Sarandi, em Porto Alegre. O projeto apresenta a empresa, categorias de serviços e peças, contato via WhatsApp e localização, com renderização no servidor e componentes independentes para manutenção no VS Code.

**Estado da entrega:** aplicação evoluída com tema onyx, carro dirigindo conforme o scroll, faixa de marcas e imagens temporárias identificadas. WhatsApp e horário oficiais já configurados. Domínio, perfis, equipe e fotografias oficiais continuam pendentes. Consulte [REFINEMENT.md](REFINEMENT.md) para o resumo desta iteração.

## Executar

Requisitos: Node.js 22.19 ou superior e npm 10 ou superior. Utilize o arquivo de lock para instalar as mesmas versões validadas.

```bash
npm ci
```

No PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Em macOS/Linux:

```bash
cp .env.example .env.local
```

Preencha os dados conhecidos e inicie:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Para produção:

```bash
npm run build
npm start
```

## Tecnologias e decisões

- Next.js 16 com App Router, React 19 e TypeScript strict.
- Tailwind CSS 4, Lucide React, DM Sans e Manrope via Next/Font.
- GSAP e ScrollTrigger carregados dinamicamente para reveal, stagger e parallax.
- Hero com carro recortado em WebP transparente, animação GSAP e smooth scroll com Lenis. A cena Three.js anterior permanece disponível como componente opcional.
- Next/Image com dimensões ou área reservada, AVIF/WebP e imagem principal com prioridade alta.
- Metadata API, JSON-LD AutoRepair, imagem Open Graph, ícone, sitemap e robots.
- ESLint, Prettier, Node Test Runner, Playwright e axe-core.

A página e as seções são Server Components. As ilhas de cliente cuidam apenas do menu, formulário, lightbox, estado do cabeçalho, animações e cena 3D. Não há backend, banco de dados, cookies de análise ou armazenamento do formulário.

O Drei não foi mantido: o modelo procedural não utiliza seus recursos. Isso evita uma dependência e código desnecessários. Não há modelos GLB fictícios ou downloads externos de HDR/texturas.

## Estrutura

```text
public/
  images/                 imagens locais por finalidade
  models/                 reservado a futuros modelos licenciados
  icons/                  reservado a ícones adicionais
src/
  app/                    composição, layout, CSS e rotas de metadados
  components/
    layout/               header, navegação, menu e footer
    sections/             uma seção por componente
    ui/                   botões, cards, títulos e lightbox
    animations/           reveal, stagger e parallax
    three/                cena, roda procedural e fallback
    forms/                formulário de contato
    whatsapp/             botão flutuante
  config/                 empresa, navegação, redes sociais e SEO
  data/                   serviços, peças, equipe e galeria
  hooks/                  media queries e movimento reduzido
  lib/                    validação, mensagens, metadata e JSON-LD
  styles/                 tokens e animações globais
  types/                  tipos reutilizáveis
tests/
  contact.test.ts         utilitários de validação e WhatsApp
  browser/site.spec.ts    fluxos, responsividade, SEO, acessibilidade e scroll
```

[page.tsx](src/app/page.tsx) apenas compõe as seções e inclui o JSON-LD. Não concentre novas funcionalidades nesse arquivo.

## Configuração comercial

As informações da empresa ficam em [site.config.ts](src/config/site.config.ts), e o modelo das variáveis está em [.env.example](.env.example).

| Dado                 | Onde configurar                              | Comportamento enquanto pendente                                 |
| -------------------- | -------------------------------------------- | --------------------------------------------------------------- |
| WhatsApp             | `NEXT_PUBLIC_WHATSAPP_NUMBER`                | Oficial configurado: (51) 99850-8101                            |
| Domínio              | `NEXT_PUBLIC_SITE_URL`                       | Noindex, robots bloqueado, sitemap sem URLs e canonical omitido |
| Instagram            | `NEXT_PUBLIC_INSTAGRAM_URL`                  | Link omitido                                                    |
| Facebook             | `NEXT_PUBLIC_FACEBOOK_URL`                   | Link omitido                                                    |
| Horários             | `openingHours` e `openingHoursSpecification` | Segunda a sexta, das 8h às 18h                                  |
| Fachada oficial      | `officialImage` na configuração              | Fotografia institucional 4K em `public/images/about`            |
| Serviços confirmados | `servicesConfirmed`                          | Aviso de categorias sugeridas                                   |
| Peças confirmadas    | `partsConfirmed`                             | Aviso de catálogo de referência                                 |

O endereço fornecido foi preservado: **R. Vicente Ferreira Gomes, 35 - Sarandi, Porto Alegre - RS, 91110-420**. O mapa utiliza busca pelo endereço, sem coordenadas presumidas. Confirme o marcador antes da publicação. O iframe é lazy e possui título acessível; seu carregamento faz conexão com o Google Maps.

Todas as variáveis `NEXT_PUBLIC_*` são públicas e ficam incorporadas ao build. **Reinicie o desenvolvimento ou gere um novo build após alterá-las. Nunca coloque credenciais nelas.**

### WhatsApp

O número oficial é **(51) 99850-8101**, configurado tecnicamente como `5551998508101`. A variável de ambiente pode sobrescrever esse padrão. O telefone exibido é derivado da configuração, sem repetir o número em componentes.

[whatsapp.ts](src/lib/whatsapp.ts) centraliza a URL `wa.me`, a mensagem padrão, as mensagens de serviços/peças e o texto do formulário. Os textos são codificados com `encodeURIComponent`.

O formulário exige nome e sobrenome, telefone brasileiro com DDD válido e descrição entre 10 e 1.500 caracteres. A validação de formato não confirma a titularidade do telefone. Ao enviar com WhatsApp configurado, a aplicação abre uma nova aba para o visitante confirmar o envio no aplicativo; não confirma entrega ou resposta da oficina. Campos não são limpos automaticamente nem persistidos.

Sem número válido, nenhum link `wa.me` é criado. O aviso é visível e a mensagem pode ser preparada e copiada localmente. O botão flutuante leva à seção de contato.

### Serviços e peças

Edite [services.ts](src/data/services.ts) e [parts.ts](src/data/parts.ts). Cada objeto tem ID único, título, descrição e uma chave de ícone tipada em [service.ts](src/types/service.ts).

As categorias iniciais são sugestões do briefing, não uma afirmação de disponibilidade. Confirme cada item, ajuste os textos e só então marque as duas confirmações na configuração. Não acrescente preços ou garantias sem fonte comercial real.

### Equipe e galeria

[team.ts](src/data/team.ts) permanece vazio para não inventar funcionários. A seção usa uma imagem de grupo fictício, com aviso explícito. [gallery.ts](src/data/gallery.ts) referencia três cenas temporárias de oficina, recepção e manutenção. [media.ts](src/data/media.ts) centraliza os caminhos, textos alternativos e a marcação `illustrative`.

Para um membro real, preencha `id`, `name`, `role`, `description` e `image`. Para a galeria, preencha `id`, `src`, `alt`, `caption` e `illustrative`. Marque `illustrative: false` somente em fotografias oficiais autorizadas. Salve imagens em suas pastas de finalidade em [public/images](public/images) e referencie por caminhos como `/images/gallery/oficina.webp`.

A galeria preenchida disponibiliza lightbox com diálogo nativo, fechamento por Escape e retorno de foco. Publique somente imagens com autorização. O fluxo com fotos oficiais preenchidas deve ser revisado visualmente ao inserir os arquivos.

### Imagens e identidade

O hero usa uma visualiza??o de produto da BMW 420i M Sport Coup? cinza grafite, otimizada em [bmw-420i-coupe.webp](public/images/hero/bmw-420i-coupe.webp), com transpar?ncia nativa. A imagem acompanha o scroll atrav?s das transforma??es GSAP existentes, sem recorte manual por CSS. A fonte est? em [ASSET-SOURCES.md](ASSET-SOURCES.md), com configura??o centralizada em [hero.config.ts](src/config/hero.config.ts). Os nove logotipos da faixa de marcas est?o em [public/images/brands](public/images/brands), cadastrados em [brands.ts](src/data/brands.ts). Os assets anteriores do hero permanecem no projeto sem uso. A se??o Equipe e sua ?ncora foram removidas da p?gina. O hist?rico visual est? em [VISUAL-REVISION.md](VISUAL-REVISION.md); os prompts das demais imagens tempor?rias est?o em [REFINEMENT.md](REFINEMENT.md).

A fotografia da oficina está configurada em `public/images/about/maranata-workshop-4k.webp` e referenciada por `officialImage`; a seção Sobre a exibe mantendo a proporção e a otimização do Next/Image. A identidade textual e o ícone permanecem em assets próprios de branding.

Para substituir a foto do hero, troque o arquivo mantendo proporção e resolução adequadas e atualize o texto alternativo em [HeroSection.tsx](src/components/sections/HeroSection.tsx). Não apresente fotografias de terceiros como registros da oficina.

As cores e demais tokens estão em [variables.css](src/styles/variables.css). Estilos globais essenciais ficam em [globals.css](src/app/globals.css). Aplique alterações pontuais nos componentes da seção correspondente.

### Animações, carro e smooth scroll

[HeroDrive.tsx](src/components/animations/HeroDrive.tsx) combina avanço em profundidade, leve inclinação e deslocamento do cenário com ScrollTrigger. O carro é acompanhado pela câmera e sai completamente pela direita no trecho final; um overlay escuro conduz à faixa de marcas e à seção Sobre. O hero usa `position: sticky` durante esse trecho. O carro é uma imagem recortada com transparência, e não um modelo 3D.

[SmoothScroll.tsx](src/components/animations/SmoothScroll.tsx) integra Lenis ao ScrollTrigger no desktop com ponteiro preciso. Âncoras continuam funcionando. Mobile e movimento reduzido usam scroll nativo e o carro estático. A preferência é acompanhada por `gsap.matchMedia`, com limpeza dos listeners e instâncias.

Os componentes de reveal, stagger e parallax das seções permanecem separados. A cena de roda em `components/three` está preservada como recurso opcional, mas não é carregada pelo hero atual.

### Redes sociais e SEO

[social.config.ts](src/config/social.config.ts) aceita perfis HTTPS de Instagram/Facebook e centraliza Maps. Links ausentes ou com domínio incompatível são omitidos. Links externos usam `noopener noreferrer`.

[seo.config.ts](src/config/seo.config.ts) contém título, descrição e termos locais. [metadata.ts](src/lib/metadata.ts) depende do domínio oficial para canonical e URLs sociais. [structured-data.ts](src/lib/structured-data.ts) produz apenas os dados reais disponíveis no tipo `AutoRepair` e serializa o JSON de forma segura.

A URL oficial padrão é `https://maranata-autocenter.vercel.app`; `NEXT_PUBLIC_SITE_URL` permite trocar o domínio canônico em um único lugar. A indexação depende do ambiente: `VERCEL_TARGET_ENV`/`VERCEL_ENV` têm precedência sobre `NODE_ENV`, bloqueando previews, ambientes customizados e desenvolvimento. Fora da Vercel, uma build de produção com URL HTTPS permite indexação. O sitemap fica vazio nos ambientes não indexáveis. O token opcional `GOOGLE_SITE_VERIFICATION` configura a verificação do Search Console, sem inventar códigos. Recompile após mudar variáveis. O horário oficial está configurado em texto e em `openingHoursSpecification`, com cinco dias úteis, abertura às 08:00 e fechamento às 18:00. Notas e avaliações não são geradas. Consulte [SEO-AUDIT.md](SEO-AUDIT.md) para evidências, resultados e próximos passos externos.

## Validação e manutenção

```bash
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build
npm run test:e2e
```

`test:e2e` utiliza o Chrome instalado e inicia o build de produção na porta 3100, encerrando-o ao terminar. Alternativamente, altere `channel` em [playwright.config.ts](playwright.config.ts) para um navegador Playwright instalado. Os testes verificam o telefone e o horário oficiais, interceptam a navegação ao WhatsApp e não enviam mensagens nem contatam o número. Também verificam o carro saindo à direita, pausa da faixa de marcas, lightbox, identificação das imagens temporárias e endereço concentrado em localização.

O teste automático de acessibilidade usa axe-core com critérios WCAG 2.2 AA em desktop/mobile. Isso não equivale a certificação completa: revise com leitor de tela, dispositivos físicos e os arquivos oficiais inseridos. [VALIDATION.md](VALIDATION.md) registra os resultados executados, limites e pendências.

Após alterações, rode as verificações relevantes. Revise contrastes ao mudar cores, responsividade ao trocar imagens e limite de JavaScript ao adicionar interatividade. Mantenha o lock versionado. Não aplique `npm audit fix --force` indiscriminadamente; valide compatibilidade do ecossistema Next/ESLint.

## Deploy

Pode ser publicado em uma plataforma com suporte a Next.js 16/Node 22, como Vercel, ou em servidor Node com `npm ci`, `npm run build` e `npm start`, atrás de HTTPS. Configure as variáveis no ambiente de build. A otimização de imagens usa o runtime de Next, portanto esta entrega não usa exportação HTML estática.

Nenhum deploy ou domínio foi criado nesta entrega. Antes da publicação comercial:

1. Configurar domínio oficial e confirmar serviços e categorias de peças.
2. Inserir fotos autorizadas, equipe real e perfis oficiais.
3. Conferir identidade visual com a fotografia da fachada.
4. Confirmar o ponto do mapa pelo endereço fornecido.
5. Recompilar e testar o caminho real do WhatsApp sem efetuar envio automático.
6. Verificar canonical, sitemap, robots e JSON-LD no domínio definitivo; executar Rich Results Test e nova auditoria de performance.
7. Medir Core Web Vitals com tráfego real após o lançamento. INP não é validado por um único teste de laboratório.

## Etapas implementadas

1. **Arquitetura:** configuração, tokens, tipos, estrutura e componentes básicos; TypeScript e testes de utilitários.
2. **Interface:** header/menu, nove seções, catálogo, estados sem dados, footer e navegação; revisão em navegador.
3. **Animações:** GSAP, parallax, stagger, hero 2.5D, cenário em movimento e fallbacks; testes de scroll e movimento reduzido.
4. **Funcionalidades e SEO:** formulário, mensagens, WhatsApp flutuante, Maps, metadados, JSON-LD e rotas técnicas.
5. **Auditoria:** build, lint, testes unitários, testes em seis larguras, axe-core e inspeção visual.
6. **Entrega:** este guia, modelo de ambiente e registro de validação com pendências reais.

## Avaliações, privacidade e navegação

A seção de avaliações utiliza oito depoimentos locais transcritos das capturas fornecidas pela empresa, com avatares genéricos e sem API, datas ou fotografias. O banner de primeira visita oferece aceitar, rejeitar e personalizar a autorização do Google Maps, preservando preferências válidas já salvas. Os links legais ficam centralizados no footer. As transcrições, a captura incompleta não utilizada, o diagnóstico do banner e o inventário de arquivos estão em [PRIVACY-AND-REVIEWS.md](PRIVACY-AND-REVIEWS.md).
