# Avaliações locais, consentimento e footer

Revisão local de 5 de novembro de 2026. Sem publicação nesta etapa.

## Avaliações transcritas

O cadastro em [testimonials.ts](src/data/testimonials.ts) utiliza apenas nome público, estrelas e comentário, além de um identificador interno. Foram preservados grafia, pontuação e emoji. As quebras de linha decorrentes da largura dos prints foram unidas por espaços. Não foram cadastrados fotos, datas, perfis ou quantidade de contribuições.

| Captura | Autor                 | Estrelas | Situação                                                                                       |
| ------- | --------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| 1       | Natália Munari        | 5        | Comentário completo cadastrado.                                                                |
| 2       | wilson vittorazzi     | 5        | Comentário completo cadastrado.                                                                |
| 3       | Elias Correa          | 5        | Comentário completo cadastrado.                                                                |
| 4       | Arthur Martins        | 5        | Pontuação original e emoji 😉 preservados.                                                     |
| 5       | Juliano Andrade       | 5        | Mantida a escrita “atendimento,ótimos serviços d mecânica”.                                    |
| 6       | Estevam Barros        | —        | Não cadastrado: comentário truncado em “More”. Necessária uma captura expandida para inclusão. |
| 7       | Valeci Maciel         | 5        | Comentário completo cadastrado.                                                                |
| 8       | Hélio Vinícius Santos | 5        | Comentário completo cadastrado.                                                                |
| 9       | paulo dias            | 5        | Mantida a escrita e a nota textual “100000”.                                                   |

O endpoint e o cliente da Places API foram removidos, assim como suas variáveis no exemplo de ambiente. A seção usa dados locais, sem API, banco, scraping ou requisição externa para carregar comentários. O link do perfil Google permanece como navegação voluntária; não foram presumidos links individuais de avaliações.

Os cards usam `UserRound` do Lucide em círculo grafite, nome, estrelas e comentário. Não há fotos, iniciais, datas, média calculada ou indicação de sincronização em tempo real. A nota da seção identifica a seleção como transcrição das capturas fornecidas.

## Carrosséis

Preservados: loop CSS contínuo de avaliações, pausa por hover, foco visível e controle manual; pausa por toque e retomada após o intervalo existente de 12 segundos. A reprodução retorna do mesmo ponto. Cópias do loop não entram na ordem de Tab e são ocultadas da árvore de acessibilidade.

O carrossel de fabricantes não foi modificado e continua independente, sem pausa no hover ou toque. Ambos respeitam movimento reduzido.

## Diagnóstico e correção do banner

A versão anterior tinha painel de preferências e autorização no mapa, mas não renderizava um componente de banner. A ausência não era causada por importação incorreta de um banner existente, z-index ou estilos de ocultação. O estado também confundia ausência de registro com rejeição.

O estado atual distingue: `undefined` durante hidratação; `null` quando falta uma escolha válida; `false` para rejeição; `true` para autorização. O novo [CookieConsent.tsx](src/components/privacy/CookieConsent.tsx) aparece somente sem escolha válida e oferece **Aceitar opcionais**, **Rejeitar opcionais** e **Personalizar**. Apenas o mapa é opcional; não foram criadas categorias de análise ou publicidade inexistentes.

A chave `maranata.privacy.v1` e o formato `{ version: 1, externalMaps: boolean }` foram preservados. Registros válidos anteriores não são apagados. Registros inválidos permitem nova escolha sem serem automaticamente removidos. Com armazenamento bloqueado, a escolha vale na página aberta. O footer continua permitindo revisar a preferência; não há opção marcada na primeira personalização.

O banner tem entrada suave, desativada com movimento reduzido. Sua altura é medida para reservar espaço no fim da página e posicionar o WhatsApp acima dele em telas menores. O mapa permanece bloqueado antes da autorização e após a rejeição.

## Footer e textos legais

Os links legais usam alinhamento central e quebra de linha. Foi removida somente a borda imediatamente acima dessa faixa. O divisor dos direitos autorais foi mantido, assim como contato, horário, navegação e crédito sublinhado de Daniel Batista dos Santos.

As políticas foram atualizadas somente nos trechos sobre API, fotos de autores, armazenamento dos depoimentos e fluxo do banner. Permanecem as pendências institucionais anteriores de [privacy.config.ts](src/config/privacy.config.ts) e a revisão dos textos e práticas reais pela empresa. Esta implementação não declara conformidade jurídica definitiva.

## Arquivos desta revisão

- Avaliações: [testimonials.ts](src/data/testimonials.ts), [testimonial.ts](src/types/testimonial.ts), [TestimonialsSection.tsx](src/components/sections/TestimonialsSection.tsx), [TestimonialCard.tsx](src/components/ui/TestimonialCard.tsx), [TestimonialsCarousel.tsx](src/components/ui/TestimonialsCarousel.tsx), [.env.example](.env.example).
- Consentimento e footer: novo [CookieConsent.tsx](src/components/privacy/CookieConsent.tsx), [PrivacyProvider.tsx](src/components/privacy/PrivacyProvider.tsx), [Footer.tsx](src/components/layout/Footer.tsx), [FloatingWhatsApp.tsx](src/components/whatsapp/FloatingWhatsApp.tsx) somente para evitar colisão com o banner, [globals.css](src/app/globals.css), [legal.ts](src/data/legal.ts).
- Testes e documentação: novos [testimonials.test.ts](tests/testimonials.test.ts) e [cookie-consent.spec.ts](tests/browser/cookie-consent.spec.ts), [refinements.spec.ts](tests/browser/refinements.spec.ts), [site.spec.ts](tests/browser/site.spec.ts), [README.md](README.md) e este relatório.
- Removidos: Route Handler de `/api/testimonials`, módulo servidor da Places API e testes exclusivos dessa integração.

Nenhuma dependência adicionada. Hero, Sobre, serviços, peças, contato e lógica de navegação por âncoras foram preservados.

## Validação executada

- Build de produção, TypeScript e ESLint aprovados.
- 9 testes unitários aprovados, incluindo cadastro e transcrição fiel das oito avaliações.
- 27 testes de navegador aprovados: primeira visita, aceitar/rejeitar/personalizar, recarga, preferências antigas válidas e inválidas, armazenamento bloqueado, painel do footer, mapa bloqueado antes de autorizar, centro dos links legais por linha e preservação do divisor dos direitos autorais.
- Também foram validados os carrosséis, retomada no mesmo ponto, foco, toque, movimento reduzido, acessibilidade automática, âncoras e funcionalidades existentes.
- Conferência visual em 320, 390 e 1440 px: banner de sessão limpa, distância do WhatsApp, cards com avatares genéricos e footer centralizado. Sem publicação ou envio real de mensagem.

Pendência de conteúdo desta revisão: uma captura expandida do comentário de Estevam Barros. Não é mais necessária nenhuma configuração de API para exibir os depoimentos locais.
