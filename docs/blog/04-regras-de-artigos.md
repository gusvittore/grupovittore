# Blog Grupo Vittore — Regras de artigos

## Princípios

- escrever para empresários, gestores e profissionais que precisam tomar decisões melhores;
- usar linguagem institucional, clara, didática e estratégica;
- explicar antes de vender;
- manter títulos específicos e controlados;
- usar parágrafos legíveis e subtítulos que orientem a leitura;
- evitar repetição artificial de palavras-chave;
- não prometer resultados garantidos;
- não inventar dados, cases ou métricas;
- não usar o termo `mais lidos` sem dados reais;
- preferir `Leituras recomendadas` enquanto não houver métrica de visualização.

## Relação com serviços

Artigos podem contextualizar a assessoria comercial, consultoria, materiais gráficos, marketing, vendas e tecnologia. A relação deve ser editorial e explicativa, com links internos discretos quando fizer sentido.

## O que evitar

- artigos escritos como anúncios;
- urgência artificial;
- excesso de CTAs;
- promessas de receita, conversão ou crescimento garantido;
- preços, tickets, planos, pacotes ou mensalidades;
- dados de audiência sem fonte;
- conteúdo completo inventado quando a pauta ainda é apenas uma prévia.

## Padrão obrigatório de títulos visuais

O campo `title` continua sendo o título real do artigo e deve ser usado para SEO, slug, metadata, busca, acessibilidade e página do artigo. A diagramação mobile não deve depender da quebra automática do navegador.

Cada novo post usado na Home ou no Blog deve trazer:

- `title`: título real/SEO;
- `excerpt`: descrição resumida;
- `category`;
- `coverImage`;
- `homeCardTitleMobileLines`: array obrigatório de linhas controladas para cards da Home;
- `homeCardTitleDesktopLines`: opcional, apenas quando a composição desktop exigir linhas próprias;
- `blogCardTitleMobileLines`: opcional para cards do arquivo do Blog; quando ausente, o card reutiliza `homeCardTitleMobileLines`;
- `blogFeaturedTitleMobileLines`: opcional para a leitura em destaque;
- `homeCard`: apresentação específica da prévia da Home, quando imagem, categoria ou descrição diferirem do artigo.

As linhas devem seguir estas regras:

- mínimo de 2, ideal de 3 a 4 e máximo de 5 linhas;
- manter grupos semânticos como “gargalos comerciais”, “operação comercial” e “decisões empresariais” juntos;
- não deixar “e”, “de”, “para” ou “com” isolados;
- evitar uma única palavra na última linha;
- renderizar cada linha em um `span` com `display: block` e `white-space: nowrap` no mobile;
- se uma linha controlada não couber em 375px, reduzir levemente o font-size mobile ou o padding do contexto; nunca remover o array nem permitir quebra interna;
- manter o título SEO separado do título visual.

O componente comum `src/app/_components/controlled-title.tsx` é o responsável pela renderização. Números de cards usam `formatDisplayNumber(index)`, que aplica `String(index + 1).padStart(2, "0")`, junto de `white-space: nowrap`, `tabular-nums` e largura mínima para impedir que `06` seja dividido.

A Home institucional deve exibir seis artigos no bloco Blog Estratégico. O CTA final da Home e o CTA final do Blog usam o componente compartilhado `InstitutionalCtaActions`, com os textos `Conhecer Assessoria Comercial` e `Conhecer Materiais Gráficos`, mantendo o mesmo tamanho, raio, preenchimento e empilhamento mobile.

## Validação obrigatória contra overflow mobile

- Testar cada linha controlada pelos glifos em `375px`, `390px` e `430px`.
- Se qualquer palavra tocar ou ultrapassar o limite útil, reduzir o font-size mobile, o tracking ou o padding antes de publicar; se necessário, alterar a quebra editorial aprovada.
- Nunca usar `overflow-hidden` ou `overflow-x-hidden` para mascarar palavras cortadas.
- `white-space: nowrap` só pode permanecer quando a linha inteira cabe de verdade em `375px`.
- Títulos, descrições, botões e cards devem respeitar a largura útil do container e `max-width: 100%`.

Composições obrigatórias atuais:

- Hero do Blog: `Conteúdo estratégico` / `para empresas que` / `querem crescer com` / `mais clareza`.
- Leitura em destaque: `Como identificar` / `gargalos comerciais` / `antes de investir mais` / `em tráfego`.
