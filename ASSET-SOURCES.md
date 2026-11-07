# Fontes dos assets

## Hero ? BMW 420i M Sport Coup?

- Visualiza??o de produto BMW 420i M Sport Coup?, na cor Dravit Grey, obtida na [p?gina oficial da BMW](https://www.bmw.co.uk/en/all-models/4-series/coupe/bmw-4-series-coupe.html). Copyright BMW AG; n?o ? uma fotografia pr?pria da oficina, nem um asset sob licen?a Creative Commons.
- Arquivo utilizado: [bmw-420i-coupe.webp](public/images/hero/bmw-420i-coupe.webp), 1800 ? 598, aproximadamente 100 KiB, com transpar?ncia nativa.
- Otimiza??o: remo??o somente das margens transparentes do canvas, redimensionamento e codifica??o WebP. Sem contorno poligonal por CSS, reconstru??o por IA ou recorte manual da carroceria.
- O endpoint original est? registrado em [bmw-420i-coupe.source.txt](public/images/hero/bmw-420i-coupe.source.txt). Configura??o centralizada em [hero.config.ts](src/config/hero.config.ts).

## Asset anterior do hero ? Honda Civic EX 2022 (sem uso)

- Fotografia de Kevauto: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2022_Honda_Civic_EX,_front_10.29.21.jpg), sob [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Original: [honda-civic-2022-original.jpg](public/images/hero/honda-civic-2022-original.jpg). Vers?o redimensionada e convertida para WebP: [honda-civic-2022.webp](public/images/hero/honda-civic-2022.webp), tamb?m sob CC BY-SA 4.0. Ambos permanecem arquivados e n?o s?o carregados pelo site.

## Logotipos automotivos

SVGs oficiais de identificação das marcas distribuídos pelo projeto [Simple Icons, versão 14.0.0](https://github.com/simple-icons/simple-icons/tree/14.0.0). Os arquivos foram obtidos de `https://cdn.jsdelivr.net/npm/simple-icons@14.0.0/icons/{slug}.svg`.

Pasta: [public/images/brands](public/images/brands). Slugs: `peugeot`, `citroen`, `jeep`, `chevrolet`, `volkswagen`, `fiat`, `ford`, `toyota`, `honda`, `mercedes` e `bmw`.

Os onze arquivos somam aproximadamente 26 KiB. O tratamento monocromático é aplicado por CSS; o `viewBox` foi ajustado para remover margens internas e equilibrar a escala visual, preservando as formas dos logotipos. As marcas e seus símbolos pertencem aos respectivos titulares; sua exibição não indica parceria ou certificação. Consulte os metadados e diretrizes de cada marca no projeto de origem para reutilização.

O cadastro e a ordem ficam em [brands.ts](src/data/brands.ts), permitindo substituir cada arquivo sem alterar o componente.
