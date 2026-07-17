Home Institucional - Direcao Visual Oficial

## 1. Regra visual principal

A home institucional deve seguir as imagens de referencia com alta fidelidade visual.

As referencias oficiais da home estao em:

`public/assets/home-institucional/references/`

Essas imagens sao a fonte principal de direcao para composicao, ritmo, proporcao, espacamento, hierarquia visual, organizacao das secoes, estilo dos cards, uso de tipografia e comportamento dos CTAs.

## 2. Objetivo visual da home

A home precisa transmitir uma percepcao:

- premium;
- institucional;
- editorial;
- sofisticada;
- clara;
- madura;
- estrategica.

Ela deve apresentar o Grupo Vittore como uma marca organizada, confiavel e bem posicionada, sem parecer uma landing promocional agressiva.

## 3. Linguagem estetica geral

A home deve parecer uma pagina institucional principal, com mais elegancia e mais respiro do que uma pagina de conversao.

Direcao esperada:

- visual premium e institucional;
- composicao clara e bem organizada;
- ritmo editorial;
- combinacao entre autoridade, presenca e sofisticao;
- foco em navegacao estrategica e apresentacao das frentes;
- menos pressao comercial e mais clareza de posicionamento.

## 4. Bases de cor

A pagina deve trabalhar prioritariamente com:

- azul escuro;
- off-white;
- dourado.

O uso das cores deve ser elegante e controlado, respeitando o equilibrio institucional da pagina.

### Paleta oficial

- `#000717` azul escuro
- `#FBF8F4` off-white
- `#B29157` dourado
- `#960000` vermelho imperial, usar com muita moderacao
- `#008723` verde CTA, nao usar como padrao na home institucional

## 5. Aplicacao visual por secao

### Hero

- fundo azul escuro;
- composicao de ecossistema institucional;
- identidade forte do Grupo Vittore;
- leitura premium e estrategica.

### Materiais Graficos

- fundo claro ou off-white;
- sensacao de presenca de marca;
- equilibrio entre clareza, acabamento e sofisticacao.

### Assessoria Comercial

- fundo azul escuro;
- bloco de frente estrategica;
- contraste de autoridade e profundidade.

### Blog

- cards elegantes;
- aparencia editorial;
- previa institucional de conteudo.

### CTA final

- base azul escuro;
- botoes grandes e institucionais;
- encerramento com forca, mas sem agressividade.

### Rodape

- fundo claro;
- estrutura completa;
- composicao organizada e institucional.

## 6. Logo e identidade de marca

O logo principal do Grupo Vittore deve ser usado obrigatoriamente:

- no header;
- no rodape.

Ele deve funcionar como ancora visual da identidade institucional da pagina.

## 7. Tipografia

A hierarquia tipografica da home deve ser elegante, clara e premium.

Diretrizes:

- titulos com estetica serifada premium;
- textos de apoio com fonte limpa e legivel;
- CTAs com letras espacadas e peso visual forte;
- subtitulos e blocos de apoio com boa leitura;
- composicao tipografica coerente entre secoes.

A home nao deve parecer montada com tipografia generica ou excessivamente promocional.

## Preferência de diagramação e tipografia do usuário

- Títulos devem ser mais controlados, elegantes e bem quebrados em linhas.
- Descrições devem ser mais legíveis e um pouco maiores.
- O padrão deve ser consistente em todas as seções.
- Evitar títulos grandes demais e descrições pequenas demais.
- Cards devem ter subtítulos fortes, mas descrições legíveis.
- A mesma família tipográfica deve ser mantida nas descrições em toda a página.
- Descrições de hero, seções e cards não podem ficar pequenas demais.
- Ajustes de fonte devem preservar harmonia premium, sem ficar grotescos.
- Evitar mistura visual de famílias tipográficas em descrições.

## 8. Botoes e CTAs

Os CTAs da home devem manter aparencia institucional.

Direcao:

- botoes claros e importantes, mas sem excesso;
- verde reservado para acao estrategica, nao como linguagem predominante;
- CTAs com peso visual forte, porem sem sensacao de urgencia agressiva;
- coerencia com o tom premium e maduro da marca.

## 9. O que evitar

A home institucional deve evitar:

- aparencia de landing agressiva;
- excesso de botoes de venda direta;
- repeticao de CTA de diagnostico;
- visual promocional demais;
- excesso de contraste sem refinamento;
- poluicao visual;
- hierarquia tipografica confusa;
- quebra de coerencia entre secoes.

## 10. Responsividade

A home deve manter boa responsividade mobile.

Na adaptacao para telas menores, a prioridade e preservar:

- leitura dos titulos;
- clareza da navegacao;
- organizacao dos blocos;
- qualidade visual dos cards;
- proporcao dos espacamentos;
- sofisticacao da experiencia.

O mobile deve continuar premium, institucional e organizado, sem perder a hierarquia da versao principal.

## 11. Referencias oficiais por secao

- Hero: `public/assets/home-institucional/references/01-home-hero-institucional-referencia.png.png`
- Materiais Graficos: `public/assets/home-institucional/references/02-home-materiais-graficos-referencia.png.png`
- Assessoria Comercial: `public/assets/home-institucional/references/03-home-assessoria-comercial-referencia.png.png`
- Blog: `public/assets/home-institucional/references/04-home-blog-referencia.png.png`
- CTA final: `public/assets/home-institucional/references/05-home-cta-final-referencia.png.png`
- Rodape: arquivo atual encontrado em `public/assets/home-institucional/references/Sessa 6 - Rodape Home - Referencia.png.png`

## 12. Sintese final

A home institucional deve parecer a pagina principal de uma marca premium, estrategica e madura. O resultado visual precisa ser claro, sofisticado, institucional e fiel as referencias, sem se confundir com a linguagem da landing `/assessoria-comercial`.

## Padrao definitivo de titulacao mobile

Titulos importantes da Home não devem depender da quebra automática do navegador. O título real permanece separado do título visual sempre que a composição exigir controle editorial.

Para cards de artigos, as linhas ficam nos dados locais dos posts em `homeCardTitleMobileLines`; cards do Blog podem declarar `blogCardTitleMobileLines` e a leitura em destaque pode declarar `blogFeaturedTitleMobileLines`. Cada item deve usar de 2 a 5 linhas, preferencialmente 3 ou 4, sem conectivos ou palavras isoladas. A renderização deve usar o componente `src/app/_components/controlled-title.tsx`, com um `span` por linha, `display: block` e `white-space: nowrap` no mobile. A Home exibe seis cards no bloco Blog Estratégico.

Se uma linha controlada não couber em 375px, deve-se reduzir levemente o font-size mobile ou o padding do contexto. Não se deve remover o array, permitir quebra interna ou devolver a decisão de linha ao navegador.

Os números são gerados com `String(index + 1).padStart(2, "0")` e tratados como unidade indivisível com `white-space: nowrap`, `inline-flex`, `tabular-nums`, `shrink-0` e largura mínima. Assim, o sexto card aparece como `06`, nunca como `0` e `6` em linhas separadas.

O CTA final usa `Conhecer Assessoria Comercial` e mantém o padrão compartilhado de botões com o CTA final do Blog. As bolinhas douradas permanecem restritas ao desktop.

### Regra de ouro contra corte lateral

- Toda linha controlada deve ser testada pelos glifos em `375px`, `390px` e `430px`, e não apenas pelo `scrollWidth` do container.
- Se a linha não couber com folga em `375px`, reduzir o font-size mobile, o tracking ou o padding local; se ainda não couber, revisar a quebra editorial.
- Nunca usar `overflow-hidden` ou `overflow-x-hidden` para mascarar texto cortado. Proteções gerais de página não substituem o encaixe real do texto.
- Títulos, descrições, botões e cards devem respeitar `max-width: 100%` e o padding lateral do container.
- Os títulos institucionais equivalentes de Materiais Gráficos, Assessoria Comercial e Blog Estratégico usam a mesma escala mobile; Hero e CTA podem ter escalas próprias.

Composições mobile aprovadas:

- Hero: `Grupo Vittore:` / `Crescimento, presença e` / `estrutura para empresas` / `que querem vender` / `melhor`.
- Blog Estratégico: `Conhecimento para` / `decisões empresariais` / `mais claras`.
- CTA final: `Conheça a frente` / `estratégica de` / `crescimento comercial` / `do Grupo Vittore.`.
- Produção nacional: `Produção e entrega para` / `todo o [bandeira] Brasil`. A segunda linha inteira é um único grupo indivisível.
