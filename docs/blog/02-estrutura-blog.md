# Blog Grupo Vittore — Estrutura e fidelidade visual

## Referências obrigatórias

A página inicial de `/blog` deve seguir as referências visuais locais com alta fidelidade, seção por seção:

- `public/assets/blog/references/01-home-hero-blog-referencia.png.png`
- `public/assets/blog/references/02-leitura-destaque.png.png`
- `public/assets/blog/references/03-ultimos-artigos.png.png`
- `public/assets/blog/references/04-conteudos-por-categorias.png.png`
- `public/assets/blog/references/05-conteudo-para-operacao.png.png`

Os arquivos têm extensão efetiva `.png.png` no repositório. Não mover ou renomear assets para corrigir a nomenclatura.

## Ordem da página inicial

1. Header global aprovado;
2. Hero editorial com `hero-background.jpg.png`, imagem em `object-cover` e overlay azul-marinho;
3. Seleção editorial e leitura em destaque;
4. Busca local;
5. Últimos artigos com cards e sidebar;
6. Conteúdos por categoria;
7. CTA institucional;
8. Footer global.

## Direção visual por seção

### Hero

A Hero usa a imagem `public/assets/blog/brand/hero-background.jpg.png` como fundo principal, com overlay azul-marinho mais forte à esquerda e imagem visível à direita. O texto permanece alinhado à esquerda, com eyebrow, detalhe dourado sutil, título editorial e descrição legível. Não usar hero azul lisa, card lateral ou imagem externa.

### Leitura em destaque

A seleção editorial mantém grande respiro off-white, eyebrow e título à esquerda, texto contextual no canto direito e card horizontal off-white. O texto fica à esquerda e a imagem correspondente ao artigo fica à direita, com bordas arredondadas, borda sutil e `object-cover`. A busca vem imediatamente abaixo do card, sem pílulas de categorias.

### Últimos artigos e sidebar

A seção usa duas áreas principais no desktop, em 2 colunas: arquivo de artigos à esquerda e sidebar à direita. Os cards têm imagem no topo, metadados, título, descrição, tags e link. A sidebar segue esta ordem, com espaçamento editorial consistente:

1. Sobre o Autor;
2. Categorias;
3. Banner Assessoria Comercial;
4. Leituras recomendadas;
5. Banner Materiais Gráficos.

O card Sobre o Autor usa foto circular local, nome, cargo e descrição centralizados, com links de LinkedIn/e-mail maiores porém discretos. Não inserir o bloco antigo de Próximo passo ou CTA textual na sidebar.

Os banners são imagens locais com largura integral da sidebar e links diretos:

- `banner-sidebar-assessoria.png.png` → `/assessoria-comercial`;
- `banner-sidebar-materiais-graficos-2.png.png` → `/materiais-impressos`.

O artigo `Crescimento previsível começa com clareza sobre o processo` deve usar `artigo-crescimento-previsivel.png.png` em todas as aparições da Home do Blog (`Leitura em destaque`, `Últimos artigos` e blocos editoriais que reutilizem o mesmo post).

O arquivo editorial usa paginação local client-side com `pageSize = 10`. A navegação apresenta seta anterior, indicador `página atual de total` e seta posterior com área clicável levemente maior e indicador mais legível. Busca e filtros recalculam a paginação e retornam à primeira página.

### Conteúdos por categoria

O eyebrow da seção é `Arquivo editorial` e o título é `Conteúdos por categoria`. Cada linha usa duas áreas principais: categoria e descrição à esquerda; card horizontal do artigo à direita. O card possui imagem à esquerda, tempo de leitura, título, descrição e link à direita. Subtítulos, descrições de categoria e descrições de artigo devem permanecer levemente maiores e com altura de linha confortável, sem desequilibrar o card. Separadores horizontais são sutis. No mobile, a ordem empilha categoria, descrição, imagem, tempo, título, descrição e link.

### CTA final

O CTA usa fundo azul-marinho, texto à esquerda e dois botões à direita. O botão principal dourado é `Conhecer Assessoria Comercial`; o secundário com contorno é `Conhecer Materiais Gráficos`. Ambos têm a mesma altura e largura e formam um sistema visual único. No mobile, texto e botões empilham, mantendo os botões com a mesma largura.

## Layout responsivo

- Desktop: manter composição e proporções das cinco referências;
- Tablet: preservar o ritmo editorial, permitindo que cards caiam para duas colunas;
- Mobile: hero com texto legível sobre imagem escurecida, destaque empilhado, busca em largura total, artigos em uma coluna, sidebar abaixo dos artigos, categorias empilhadas e CTA sem overflow.

## Dados locais

Os posts ficam em `src/content/blog/index.ts`. Cada item possui slug, título, descrição, categoria, tags, tempo de leitura, imagem e sinalizadores editoriais opcionais. Não espalhar os dados em componentes diferentes. Não criar CMS, banco, artigos completos, MDX ou métricas fictícias.

## Interações

- busca por título, descrição, categoria e tags;
- filtro por categoria pela sidebar e pelos blocos editoriais;
- estado vazio amigável;
- cards com hover azul-marinho, textos claros e detalhes dourados;
- links de artigos mantidos como pontos de preparação até que as páginas individuais sejam criadas.

## Limites de escopo

A reprodução visual deve alterar somente os arquivos relacionados ao Blog e sua documentação. Não alterar Home, Sobre, Assessoria Comercial, header/rodapé globais, formulário, API de leads, integrações, páginas legais ou assets protegidos.
