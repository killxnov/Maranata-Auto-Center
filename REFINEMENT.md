# Refinamento onyx, conteúdo e conversão

## Resultado desta iteração

A arquitetura existente foi mantida. O hero agora mostra progressão: o cenário desliza em sentido contrário, o carro cresce discretamente em profundidade e inclina suavemente, enquanto a câmera acompanha seu percurso. No último terço, o carro acelera e sai completamente pela direita. Um overlay em onyx prepara a entrada da faixa de marcas e da seção Sobre.

A composição continua em 2.5D com a imagem recortada existente. Não foi introduzido um modelo 3D fictício. Mobile e movimento reduzido mantêm a composição estática e o scroll nativo. Cleanup, mudanças de media query e interrupção de Lenis ao abrir diálogos foram preservados.

As seções ganharam superfícies onyx/grafite e camadas de gradiente para continuidade. O azul aparece apenas como apoio. Headings e textos foram simplificados, e o endereço completo ficou somente em Localização, além do JSON-LD destinado aos buscadores.

## Dados oficiais

Em [site.config.ts](src/config/site.config.ts):

- WhatsApp: **(51) 99850-8101**, tecnicamente `5551998508101`.
- Horário: **segunda a sexta, das 8h às 18h**.
- A representação textual e `OpeningHoursSpecification` ficam centralizadas na mesma configuração.
- Componentes exibem o telefone formatado a partir do número central. Mensagens e links continuam centralizados em [whatsapp.ts](src/lib/whatsapp.ts).

## Componentes e dados criados

- [BrandsSection.tsx](src/components/sections/BrandsSection.tsx): faixa contínua de marcas logo após o hero, com pausa manual, pausa por hover/foco, duplicata fora da árvore de acessibilidade e alternativa sem animação.
- [EditorialImage.tsx](src/components/ui/EditorialImage.tsx): fotografia com proporção reservada e identificação visível de imagem temporária.
- [brands.ts](src/data/brands.ts): doze marcas com `name` e campo opcional `logo`. Inicialmente usa referências tipográficas, não logos oficiais. Para inserir um logo autorizado, configure seu caminho local em `logo`, preferencialmente em SVG transparente adequado ao fundo escuro.
- [media.ts](src/data/media.ts): caminhos, alt text e indicador `illustrative` das quatro imagens temporárias.

## Arquivos alterados

| Área                        | Arquivos                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero e rolagem              | [HeroDrive.tsx](src/components/animations/HeroDrive.tsx), [SmoothScroll.tsx](src/components/animations/SmoothScroll.tsx), [HeroSection.tsx](src/components/sections/HeroSection.tsx)                                                                                                                                                                                                     |
| Design e composição         | [globals.css](src/app/globals.css), [variables.css](src/styles/variables.css), [page.tsx](src/app/page.tsx)                                                                                                                                                                                                                                                                              |
| Conteúdo e fotos            | [AboutSection.tsx](src/components/sections/AboutSection.tsx), [TeamSection.tsx](src/components/sections/TeamSection.tsx), [GallerySection.tsx](src/components/sections/GallerySection.tsx), [ServicesSection.tsx](src/components/sections/ServicesSection.tsx), [PartsSection.tsx](src/components/sections/PartsSection.tsx), [WhyChooseUs.tsx](src/components/sections/WhyChooseUs.tsx) |
| Contato e presença física   | [ContactSection.tsx](src/components/sections/ContactSection.tsx), [LocationSection.tsx](src/components/sections/LocationSection.tsx), [Header.tsx](src/components/layout/Header.tsx), [Footer.tsx](src/components/layout/Footer.tsx), [SocialLinks.tsx](src/components/ui/SocialLinks.tsx)                                                                                               |
| Acessibilidade e microtexto | [GalleryLightbox.tsx](src/components/ui/GalleryLightbox.tsx), [Brand.tsx](src/components/ui/Brand.tsx), [FloatingWhatsApp.tsx](src/components/whatsapp/FloatingWhatsApp.tsx)                                                                                                                                                                                                             |
| Configuração e SEO          | [site.config.ts](src/config/site.config.ts), [seo.config.ts](src/config/seo.config.ts), [structured-data.ts](src/lib/structured-data.ts), [opengraph-image.tsx](src/app/opengraph-image.tsx), [.env.example](.env.example)                                                                                                                                                               |
| Dados e tipos               | [gallery.ts](src/data/gallery.ts), [team.ts](src/types/team.ts)                                                                                                                                                                                                                                                                                                                          |
| Validação e documentação    | [site.spec.ts](tests/browser/site.spec.ts), [README.md](README.md), [VALIDATION.md](VALIDATION.md), [VISUAL-REVISION.md](VISUAL-REVISION.md)                                                                                                                                                                                                                                             |

## Imagens temporárias

Geradas com a ferramenta integrada ImageGen, inspecionadas visualmente e otimizadas em WebP com largura máxima de 1280 px. Todas têm alt text explícito e avisos visíveis na página. Não representam equipe, instalações ou trabalhos reais da empresa. Os componentes usam Next/Image e áreas com proporção definida; imagens secundárias carregam com prioridade baixa.

| Cena                            | Caminho                                                                          | Tamanho aproximado |
| ------------------------------- | -------------------------------------------------------------------------------- | ------------------ |
| Oficina                         | [workshop-illustrative.webp](public/images/gallery/workshop-illustrative.webp)   | 130 KB             |
| Grupo fictício de profissionais | [team-illustrative.webp](public/images/team/team-illustrative.webp)              | 98 KB              |
| Recepção                        | [reception-illustrative.webp](public/images/gallery/reception-illustrative.webp) | 123 KB             |
| Manutenção de freios            | [brakes-illustrative.webp](public/images/services/brakes-illustrative.webp)      | 122 KB             |

Para substituir, atualize os caminhos e alt text em `media.ts` e os itens em `gallery.ts`. Marque `illustrative: false` apenas ao inserir fotografia real autorizada. A lista de funcionários permanece vazia; dados de pessoas reais continuam em `data/team.ts`.

### Prompts finais utilizados

**Oficina:**

> Wide editorial photograph of a fictional premium Brazilian independent auto repair workshop interior. Three clean service bays, an unbranded silver car on a lift, realistic professional tools, warm neutral LED lighting, charcoal onyx walls with restrained muted blue details, tidy practical concrete floor. Human scale, credible mid-sized workshop, not an exotic luxury showroom. Architectural photography, natural realistic materials, soft shadows, no people, no logos, no text, no signs, no watermark. Landscape 3:2 composition. Temporary illustrative website placeholder, not a real business location.

**Equipe ilustrativa:**

> Editorial group portrait of three fictional Brazilian automotive workshop professionals, diverse adults, two men and one woman, in clean charcoal mechanic work clothes without logos, standing naturally together beside a service bay, approachable composed expressions, credible everyday workshop interior softly blurred, onyx and graphite palette with muted blue accents, realistic skin texture, natural soft light, premium documentary photography rather than corporate stock, waist-up or three-quarter portrait. Landscape 3:2 composition. No names, no lettering, no logos, no watermark. Fictional illustrative team, not employees of an actual business.

**Recepção:**

> Professional architectural editorial photograph of a fictional independent Brazilian auto repair workshop reception. Small elegant functional reception desk in charcoal laminate, two visitor chairs, glass partition with a softly blurred clean service bay, muted blue accent detail, warm off-white overhead light, onyx graphite palette, natural realistic materials, no people, no readable text, no brand signs, no logos, no watermark. Landscape 3:2 composition. Temporary illustrative placeholder for a website, not an actual business location.

**Manutenção:**

> Premium documentary automotive photograph, close-up of anonymous mechanic's gloved hands carefully working on a car brake disc assembly, credible tools and realistic parts, graphite workshop background softly blurred, restrained cool highlights with natural neutral soft light, detailed metal texture, precision and care, photographic realism. Landscape 3:2 composition. No face, no logos, no letters, no text, no watermark. Fictional illustrative automotive service image, not a real record of company work.

## Pendências comerciais

Continuam pendentes o domínio oficial, perfis sociais, fotografias oficiais, nomes e funções reais da equipe, confirmação das categorias de serviços/peças e conferência do marcador do mapa. A faixa usa placeholders tipográficos de marcas, sem indicar parceria. Os resultados de testes e limites das auditorias estão em [VALIDATION.md](VALIDATION.md).
