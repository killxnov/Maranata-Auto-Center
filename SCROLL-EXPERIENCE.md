# Scroll e transições — Maranata Auto Center

Implementação e inspeção em 7 de novembro de 2026. Alterações locais, sem commit ou publicação.

## Referência observada

O site https://riangle.com/ foi aberto no Chrome com Playwright em desktop (1440 px) e mobile (390 px). Foram observados scroll por wheel, retorno, posições intermediárias, estilos computados e capturas da interface. A inspeção usou o comportamento público em execução, sem copiar código, imagens ou conteúdo.

Na versão acessada, as seções permaneciam no fluxo vertical; `scroll-snap-type` era `none`. Foram observados títulos com revelação vertical e opacidade, grupos coordenados e imagens com escala/parallax discretos. Não foi observada sobreposição generalizada das seções ou pinning de tela inteira. Os links principais consultados apontavam para rotas próprias, como `/about`, em vez de uma navegação exclusivamente por hash.

## Sistema implementado

- Lenis continua restrito a desktop a partir de 1024 px com ponteiro preciso e sem preferência por movimento reduzido. Seu RAF automático foi desativado; `gsap.ticker` fornece o tempo a `lenis.raf`, e o evento de scroll atualiza ScrollTrigger.
- `SectionTransitions` coordena entrada e saída de camadas internas das seções, sem alterar a altura ou a posição de layout de suas raízes. Timelines com scrub tornam o movimento reversível.
- Títulos, textos auxiliares e grupos de cards recebem reveal em blocos com stagger. Não há divisão de letras ou duplicação de texto.
- A imagem de Sobre recebe escala de 1.045 e deslocamento vertical limitado dentro da moldura existente. O arquivo da imagem permanece o mesmo.
- A BMW conserva a timeline e a área sticky de `HeroDrive`. O novo controlador exclui a hero; a faixa de marcas recebe apenas uma entrada vertical discreta após o handoff existente.
- Os tracks e controles internos dos carrosséis continuam sob responsabilidade dos componentes originais. O controlador movimenta a moldura externa da faixa de marcas e o cabeçalho das avaliações, sem controlar o avanço horizontal.
- Contato e localização recebem os reveals de título, mas suas superfícies funcionais não recebem deslocamento de seção. Formulário e mapa permanecem no fluxo livre, sem pinning ou snapping.
- No mobile, o scroll permanece nativo; ficam apenas reveals curtos de texto e cards. Escala/parallax da imagem e transições de seção são desativados.

## Âncoras e ciclo de vida

`useAnchorNavigation` permanece como ponto único de navegação interna. A medição usa `layoutTop`, baseada no fluxo de layout, para excluir transforms visuais da conta. O destino desconta a altura atual do header e o intervalo de 24 px.

Navbar, footer, CTA, hash direto e histórico utilizam esse mesmo caminho. Wheel, toque e teclas de navegação liberam o alinhamento; uma navegação animada em andamento pode ser interrompida pelo usuário. A regra CSS global de scroll suave foi removida para evitar competição com o controlador.

`gsap.matchMedia` reúne os efeitos em contextos com cleanup. `ScrollTrigger.saveStyles` preserva os estilos anteriores dos reveals para restaurá-los em mudanças de breakpoint e de preferência de movimento. Um ResizeObserver agrupa os refreshes de layout por frame; fontes e mudanças do header também provocam recálculo. O ticker do Lenis e seus listeners são removidos no cleanup.

O hover dos cards de serviços usa transição apenas de borda, sombra e translate CSS. Assim, a transição de CSS não atrasa os transforms e a opacidade escritos pelo GSAP.

## Arquivos

| Arquivo                                            | Alteração                                                 |
| -------------------------------------------------- | --------------------------------------------------------- |
| `src/config/animation.config.ts`                   | Novo: parâmetros comuns de movimento                      |
| `src/lib/scroll.ts`                                | Novo: medição de posição independente de transforms       |
| `src/components/animations/SectionTransitions.tsx` | Novo: coordenação de cenas, reveals e imagem              |
| `src/components/animations/SmoothScroll.tsx`       | Integração Lenis/GSAP e montagem do controlador           |
| `src/components/animations/ScrollReveal.tsx`       | Marcadores de reveal renderizados no servidor             |
| `src/components/animations/ParallaxSection.tsx`    | Marcador de camada, sem efeito concorrente próprio        |
| `src/hooks/useAnchorNavigation.ts`                 | Medição estável, interrupção e sincronização após refresh |
| `src/app/globals.css`                              | Scroll CSS global em modo automático                      |
| `src/components/sections/PartsSection.tsx`         | Reutilização de StaggerReveal na grade existente          |
| `src/components/sections/WhyChooseUs.tsx`          | Reutilização de StaggerReveal na lista existente          |
| `src/components/ui/ServiceCard.tsx`                | Transição CSS compatível com a animação de entrada        |
| `tests/browser/scroll-transitions.spec.ts`         | Novo: regressão das transições e do scroll                |

`page.tsx`, `layout.tsx`, `HeroDrive`, dados comerciais, textos, imagens e componentes dos carrosséis não precisaram de alterações nesta iteração. A galeria anteriormente removida não foi reintroduzida. Nenhuma dependência foi adicionada.

## Validação executada

- TypeScript, ESLint e build de produção aprovados.
- Nove testes unitários aprovados.
- Suíte final completa: 32 testes de navegador aprovados.
- Verificação de ida/volta dos reveals, altura estável de seção e ausência de novos pin-spacers.
- Mudança desktop/mobile/desktop e ativação/desativação de reduced motion na mesma sessão.
- Navbar, footer, CTA e hash direto; interrupção da navegação por scroll manual.
- BMW em profundidade e saída pela direita; estado estático em reduced motion.
- Carrossel de marcas contínuo e responsivo; avaliações com pausa por hover, foco e toque e retomada.
- Formulário e WhatsApp, com saídas interceptadas nos testes: nenhuma mensagem foi enviada.
- Consentimento, carregamento e revogação do mapa com requisições interceptadas.
- Acessibilidade automática WCAG 2.2 AA e conteúdo disponível sem JavaScript.
- Layout sem overflow em 320, 375, 390, 768, 1024 e 1440 px; o teste de marcas inclui também 430 px.
- Capturas e inspeção visual em desktop e mobile; scroll com deltas pequenos e grandes; sequência de eventos de toque em ambos os sentidos.
- Nenhum erro de console/hidratação observado na sessão de inspeção final.

## Diferenças e limites

A implementação adapta os princípios visuais observados ao conteúdo e ao espaço da Maranata. O Riangle tem tipografia, mídia, comprimentos de seção e rotas diferentes; o resultado não é uma reprodução idêntica. A Maranata mantém sua narrativa da BMW e suas âncoras locais. Os títulos são revelados em blocos, sem reconstruir as quebras de linha da referência. A preferência por transições reversíveis é uma adaptação explícita ao pedido.

Os testes foram executados no Chrome de desktop com emulação mobile. Deltas pequenos de wheel simulam o padrão de entrada de um trackpad; eventos CDP simulam gestos de toque. Não houve teste com trackpad físico, iPhone/Safari ou aparelho Android físico, nem benchmark de FPS nesses aparelhos.
