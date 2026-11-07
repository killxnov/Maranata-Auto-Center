# Validação da versão onyx

Esta versão incorpora o WhatsApp e o horário fornecidos pela empresa, novo percurso do carro, faixa de marcas e imagens temporárias identificadas. Os relatórios antigos permanecem históricos; os resultados atuais estão abaixo.

## Verificações executadas

| Verificação                     | Resultado                                                        |
| ------------------------------- | ---------------------------------------------------------------- |
| Build de produção Next.js       | Aprovado, sem erros                                              |
| TypeScript strict               | Aprovado                                                         |
| ESLint com zero avisos          | Aprovado                                                         |
| Testes unitários                | 7 aprovados                                                      |
| Playwright no build de produção | 16 aprovados                                                     |
| axe-core em desktop/mobile      | Zero violações detectadas nos critérios automáticos WCAG 2.2 AA  |
| npm audit de produção           | Zero vulnerabilidades                                            |
| JSON-LD                         | JSON válido, AutoRepair, telefone e horários oficiais conferidos |

Os testes cobrem seis larguras (320, 375, 390, 768, 1024 e 1440 px), navegação por âncoras, foco e Escape no menu, validação do formulário, mensagem para o número oficial, metadados, rotas técnicas, progressão e saída do carro pela direita, movimento reduzido, conteúdo sem JavaScript, pausa do carousel, lightbox, identificação das imagens geradas e endereço restrito à seção Localização.

A navegação ao WhatsApp foi interceptada nos testes antes de qualquer contato externo. Nenhuma mensagem foi enviada. Telefone verificado no link e no JSON-LD: `5551998508101`. Horário verificado no JSON-LD: segunda a sexta, das 08:00 às 18:00.

## Lighthouse atual

Lighthouse 13.6.0, Chrome 156, servidor local de produção, simulação mobile padrão e perfil desktop. Resultados de laboratório:

| Métrica             | Mobile      | Desktop     |
| ------------------- | ----------- | ----------- |
| Performance         | **93/100**  | **100/100** |
| Acessibilidade      | **100/100** | **100/100** |
| Boas práticas       | **100/100** | **100/100** |
| SEO                 | **66/100**  | **66/100**  |
| LCP                 | **2,9 s**   | **0,8 s**   |
| Total Blocking Time | **30 ms**   | **0 ms**    |
| CLS                 | **0**       | **0**       |

A primeira medição desta iteração teve performance mobile 88, LCP 3,7 s e TBT 130 ms. Após adiar os imports de GSAP/Lenis do hero e smooth scroll até que o modo desktop esteja habilitado, os resultados foram 93, 2,9 s e 30 ms, respectivamente. O breakpoint e a preferência de movimento continuam acompanhados em tempo real, com cleanup correto.

A meta de LCP mobile até 2,5 s ainda não foi atingida. INP não foi medido; TBT não substitui INP. A nota SEO é reduzida pelo noindex/robots intencional enquanto não há domínio oficial configurado. Não remova essa proteção somente para aumentar a nota: configure o domínio real, recompile e revalide.

Relatórios atuais:

- [Mobile HTML](artifacts/lighthouse/onyx-mobile.report.html)
- [Mobile JSON](artifacts/lighthouse/onyx-mobile.report.json)
- [Desktop HTML](artifacts/lighthouse/onyx-desktop.report.html)
- [Desktop JSON](artifacts/lighthouse/onyx-desktop.report.json)

## Limites e pendências

- Domínio oficial e perfis sociais ainda não fornecidos.
- Serviços e categorias de peças continuam sujeitos à confirmação comercial.
- O mapa usa o endereço fornecido; o marcador ainda precisa de conferência com a empresa.
- As quatro imagens temporárias foram geradas por IA. Elas não comprovam estrutura, equipe ou trabalhos reais. As legendas e alt text informam isso.
- Os nomes das marcas são placeholders tipográficos. Logos oficiais podem ser inseridos pelo campo `logo` dos dados, sem indicar parceria.
- Os testes automáticos não equivalem a certificação integral de acessibilidade. Não foram realizados testes com leitores de tela ou dispositivos físicos.
- JSON-LD foi verificado no HTML, sem submissão ao Google Rich Results Test no domínio definitivo.
- Medições locais não comprovam Core Web Vitals de campo. Reavalie após hospedagem e fotos oficiais.
- A auditoria completa anterior registrou 16 alertas moderados no ecossistema de desenvolvimento ESLint/minimatch. A auditoria de produção atual continua sem alertas. Não foi forçada uma atualização incompatível de plugins ou um downgrade para ferramentas obsoletas.

O inventário de alterações, os componentes novos, os caminhos das imagens e os prompts utilizados estão em [REFINEMENT.md](REFINEMENT.md). O guia de execução e configuração está no [README](README.md).
