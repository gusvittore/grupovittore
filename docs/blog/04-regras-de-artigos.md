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

O campo `title` continua sendo o título real do artigo e deve ser usado para SEO, slug, metadata, busca, acessibilidade, cards e página do artigo. Todo card deve possuir fallback automático seguro para esse valor.

Cada novo post usado na Home ou no Blog deve trazer:

- `title`: título real/SEO;
- `excerpt`: descrição resumida;
- `category`;
- `coverImage`;
- `homeCardTitleMobileLines`: opcional, como dica de composição para cards da Home;
- `homeCardTitleDesktopLines`: opcional, apenas quando a composição desktop exigir linhas próprias;
- `blogCardTitleMobileLines`: campo legado opcional, preservado apenas por compatibilidade de dados; os previews atuais de `/blog` não o consomem;
- `blogFeaturedTitleMobileLines`: campo legado opcional, preservado apenas por compatibilidade de dados; a Leitura em destaque atual não o consome;
- `homeCard`: apresentação específica da prévia da Home, quando imagem, categoria ou descrição diferirem do artigo.

Quando linhas visuais opcionais forem usadas em algum contexto ainda compatível fora dos previews da página `/blog`, devem seguir estas regras:

- mínimo de 2, ideal de 3 a 4 e máximo de 5 linhas;
- manter grupos semânticos como “gargalos comerciais”, “operação comercial” e “decisões empresariais” juntos;
- não deixar “e”, “de”, “para” ou “com” isolados;
- evitar uma única palavra na última linha;
- renderizar cada linha em um `span` com `display: block`, `white-space: normal` e quebra interna segura;
- se uma linha sugerida não couber, permitir quebra natural e ajustar responsivamente font-size, tracking ou padding;
- manter o título SEO separado do título visual.

O componente comum `src/app/_components/blog/article-card-title.tsx` (`ArticleCardTitle`) é obrigatório em títulos de cards. Ele usa `title` como fallback completo, aceita linhas visuais opcionais apenas onde o renderizador ainda as fornecer e garante `min-w-0`, `max-w-full`, `white-space: normal`, `break-words` e `overflow-wrap: break-word`. Na página `/blog`, Leitura em destaque, Últimos Artigos, Conteúdos por Categoria e Leituras recomendadas usam o título editorial completo com composição automática; esses previews não podem depender de linhas visuais ou manuais por artigo. Números de cards continuam usando `formatDisplayNumber(index)`, que aplica `String(index + 1).padStart(2, "0")`, junto de `white-space: nowrap`, `tabular-nums` e largura mínima para impedir que `06` seja dividido.

A Home institucional deve exibir seis artigos no bloco Blog Estratégico. O CTA final da Home e o CTA final do Blog usam o componente compartilhado `InstitutionalCtaActions`, com os textos `Conhecer Assessoria Comercial` e `Conhecer Materiais Gráficos`, mantendo o mesmo tamanho, raio, preenchimento e empilhamento mobile.

## Validação obrigatória contra overflow mobile

- Testar todos os títulos reais pelos glifos em `360px`, `375px`, `390px` e `430px`.
- Se qualquer palavra tocar ou ultrapassar o limite útil, corrigir largura, padding, quebra natural, font-size ou tracking no componente; não alterar o título editorial.
- Nunca usar `overflow-hidden` ou `overflow-x-hidden` para mascarar palavras cortadas.
- Títulos dinâmicos de artigos nunca usam `white-space: nowrap`, `truncate` ou `line-clamp`.
- Títulos, descrições, botões e cards devem respeitar a largura útil do container e `max-width: 100%`.

Composições obrigatórias atuais:

- Hero do Blog: `Conteúdo estratégico` / `para empresas que` / `querem crescer com` / `mais clareza`.
- Previews de artigos na página `/blog`: composição automática do `title` completo, com `text-wrap: balance` em todos os breakpoints para evitar linhas órfãs também em tablet e desktop.

## Hierarquia secundária dos cards no mobile

- O título principal da seção permanece maior que o subtítulo de apoio.
- O título de card deve ser menor que o subtítulo de seção e manter peso editorial suficiente.
- A descrição permanece legível, mas não compete com o título.
- O texto de rodapé é institucional e discreto.
- Em `Últimos artigos`, a escala mobile deve preservar o título completo com folga dentro do card, com ou sem linhas visuais opcionais.
- Em `Conteúdos por categoria`, `Vendas`, `Marketing`, `Materiais Gráficos` e `Tecnologia` são títulos internos de categoria, não títulos principais da página.
- Validar em `360px`, `375px`, `390px` e `430px`, sem alterar imagens, categorias, descrições, links ou estrutura editorial.
