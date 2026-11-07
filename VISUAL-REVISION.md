# Revisão visual — tema escuro e carro em movimento

> Registro histórico da primeira revisão. A animação atual e os dados oficiais estão descritos em [REFINEMENT.md](REFINEMENT.md).

A pedido do usuário, o design passou a usar superfícies grafite e azul quase preto, textos claros e acentos vermelhos. Cards, formulário, menu, galeria, placeholders e ícones foram ajustados aos novos tokens.

## Experiência de scroll

- Desktop: Lenis suaviza a rolagem sobre o scroll nativo e sincroniza ScrollTrigger. Links de seção continuam disponíveis.
- Hero: uma cena sticky segura a composição durante a passagem do carro, a saída do primeiro texto e a entrada de uma segunda mensagem. O movimento acompanha o avanço e o retorno do scroll.
- As seções seguintes mantêm reveal, stagger e parallax com limpeza dos efeitos.
- Mobile, ponteiro sem precisão e movimento reduzido preservam scroll nativo. O carro permanece visível em composição estática.
- O conteúdo comercial, as validações e o fluxo do formulário foram preservados.

O carro usa uma **imagem recortada com transformações em 2.5D**, sem simulação de um modelo tridimensional. O componente anterior de roda 3D continua disponível no código, mas não é carregado na página atual.

## Asset

Arquivo utilizado: [car-silver.webp](public/images/hero/car-silver.webp), 1752 × 897, com canal alpha, aproximadamente 180 KB. Gerado com a ferramenta integrada ImageGen e convertido para WebP preservando a transparência. É uma imagem ilustrativa, identificada na página, sem representar veículo ou serviço real da oficina.

Prompt final utilizado na ferramenta integrada:

> Create a premium photorealistic automotive hero asset: one complete unbranded silver graphite sports coupe, front three-quarter view with nose pointing to the left, low eye-level camera, entire car including all wheels fully inside frame. Realistic proportions, precise metallic silver bodywork, dark windows, sculpted headlights, black alloy wheels, sophisticated cool soft studio rim lighting, visible body detail on a nearly black website. Isolated on a genuinely transparent background, no ground plane, no cast shadow outside the car, no scenery, no logos, no lettering, no watermark. Wide landscape composition closely framing the car with modest transparent padding. This is an illustrative car for an automotive workshop website, not a real company vehicle.

## Manutenção

- Paleta: [variables.css](src/styles/variables.css).
- Composição e responsividade do hero: [globals.css](src/app/globals.css).
- Textos e imagem: [HeroSection.tsx](src/components/sections/HeroSection.tsx).
- Trajeto e duração: [HeroDrive.tsx](src/components/animations/HeroDrive.tsx).
- Intensidade de suavização: `lerp` em [SmoothScroll.tsx](src/components/animations/SmoothScroll.tsx).

Os testes da revisão verificam movimento do carro, ativação de Lenis, modo estático com movimento reduzido, ausência de overflow em seis larguras, formulário, navegação, SEO e acessibilidade automática. Não foi executada nova auditoria Lighthouse; os relatórios da primeira entrega permanecem históricos.
