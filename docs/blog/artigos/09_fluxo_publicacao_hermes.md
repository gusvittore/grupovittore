# Fluxo Operacional de Publicação de Artigos pelo Hermes

## Finalidade deste documento

Este documento define o fluxo obrigatório que o Hermes deve seguir para incluir, revisar tecnicamente, implementar, validar, publicar, atualizar ou remover artigos do blog do Grupo Vittore.

Ele organiza a execução prática das regras presentes nos demais documentos desta pasta.

Este arquivo deve ser consultado sempre que a tarefa envolver:

- inclusão de artigo novo;
- importação de arquivo Markdown;
- implementação de imagem de capa;
- inserção de links internos;
- inserção de CTA;
- publicação de rascunho;
- atualização de artigo existente;
- alteração de metadados;
- mudança de categoria;
- correção técnica;
- mudança de slug;
- substituição de capa;
- atualização de fontes;
- alteração de dados estruturados;
- inclusão no sitemap;
- retirada de publicação;
- remoção de artigo;
- redirecionamento;
- correção de erro após publicação.

O objetivo é garantir que o Hermes não apenas coloque um arquivo dentro do projeto, mas execute uma publicação completa, segura, rastreável e consistente.

---

# Princípio central

O Hermes deve trabalhar nesta ordem:

```text
entender
↓
analisar
↓
confirmar
↓
implementar
↓
validar
↓
informar
```

O Hermes não deve trabalhar nesta ordem:

```text
alterar
↓
descobrir o que aconteceu
↓
corrigir
```

Antes de modificar qualquer arquivo, é necessário compreender:

- o pedido;
- o estado do artigo;
- a estrutura do projeto;
- as regras aplicáveis;
- as dependências;
- os riscos;
- as informações pendentes;
- o resultado esperado.

---

# Escopo de atuação do Hermes

O Hermes é responsável pela implementação técnica e operacional dos artigos no projeto.

Sua função não é substituir:

- o autor;
- o redator;
- o revisor editorial;
- o usuário;
- o responsável pela criação de imagens;
- o responsável pela aprovação comercial.

O Hermes recebe conteúdo produzido e aprovado, adapta-o à estrutura técnica existente e garante que ele funcione corretamente no site.

---

# Fonte de verdade

Para tarefas relacionadas ao blog, o Hermes deve consultar:

```text
docs/blog/artigos/
```

A ordem de leitura obrigatória é:

```text
1. README.md
2. 01_posicionamento_grupo_vittore.md
3. 02_voz_e_linguagem_gustavo.md
4. 03_manual_editorial_blog.md
5. 04_manual_seo_aeo_geo.md
6. 05_fontes_e_originalidade.md
7. 06_especificacao_entrega_markdown.md
8. 07_implementacao_capas_blog.md
9. 08_links_internos_e_conversao.md
10. 09_fluxo_publicacao_hermes.md
```

Quando existirem, também devem ser consultados:

```text
10_checklist_validacao_artigos.md
11_mapa_urls_links_internos.md
```

Não utilizar versões antigas de documentos encontradas em outras pastas sem confirmar qual é a versão vigente.

---

# Regra de análise antes da alteração

Antes de criar, mover, renomear ou editar qualquer arquivo, o Hermes deve analisar:

- a raiz do projeto;
- a pasta de conteúdo;
- a pasta pública;
- o sistema de rotas;
- o parser de Markdown;
- o template de artigos;
- os componentes existentes;
- o formato do frontmatter;
- os artigos já publicados;
- as categorias;
- as tags;
- o sistema de metadados;
- o sitemap;
- os dados estruturados;
- o sistema de analytics;
- os scripts disponíveis no `package.json`.

O Hermes não deve presumir que a estrutura recomendada nos documentos já foi implementada.

Primeiro, deve verificar a estrutura real.

---

# Proibição de estrutura paralela

O Hermes não deve criar uma nova estrutura de blog se já existir uma estrutura funcional.

Exemplo de erro:

```text
content/posts/
```

já é utilizado pelo site, mas o Hermes cria:

```text
content/blog/
```

sem adaptar o sistema.

Outro exemplo:

```text
public/blog/
```

já armazena imagens, mas o Hermes cria:

```text
public/assets/blog/articles/
```

sem necessidade.

Antes de criar uma pasta, confirme:

- se já existe outra com a mesma finalidade;
- se o código atual utiliza outro caminho;
- se a mudança exigiria migração;
- se a alteração foi solicitada;
- se o impacto foi explicado.

---

# Estados possíveis de um artigo

Um artigo pode estar em diferentes estados.

## 1. Em produção editorial

O artigo ainda está sendo escrito ou revisado.

Características:

```yaml
publishedAt: ""
updatedAt: ""
draft: true
```

Pode faltar:

- revisão;
- fontes;
- imagem;
- CTA;
- links;
- aprovação.

O Hermes não deve publicar.

## 2. Aprovado editorialmente

O conteúdo foi aprovado, mas ainda pode aguardar implementação.

Características:

```yaml
publishedAt: ""
updatedAt: ""
draft: true
```

Pode faltar:

- capa;
- URL;
- canonical;
- links;
- implementação;
- validação técnica.

O Hermes pode implementar em modo de pré-visualização.

## 3. Pronto para publicação

O artigo possui:

- conteúdo aprovado;
- imagem aprovada;
- links confirmados;
- CTA aprovado;
- metadados;
- URL;
- canonical;
- data;
- validação técnica.

Ainda permanece como rascunho até a autorização final.

## 4. Publicado

Características:

```yaml
publishedAt: "AAAA-MM-DD"
draft: false
```

Também deve possuir:

- rota pública;
- canonical;
- imagem;
- alt text;
- metadados;
- sitemap;
- dados estruturados;
- links válidos;
- aprovação.

## 5. Atualizado

Características:

```yaml
publishedAt: "AAAA-MM-DD"
updatedAt: "AAAA-MM-DD"
draft: false
```

O campo `updatedAt` deve ser utilizado somente quando houver mudança editorial real.

## 6. Arquivado ou removido

O artigo não está mais disponível como publicação normal.

Essa situação pode exigir:

- redirecionamento;
- remoção do sitemap;
- atualização de links;
- análise de tráfego;
- preservação do arquivo;
- página substituta.

O Hermes não deve remover um artigo publicado sem análise e autorização.

---

# Tipos de tarefa

Antes de começar, o Hermes deve classificar a tarefa.

## Tipo A: inclusão de artigo novo

Usado quando um novo Markdown precisa entrar no projeto.

## Tipo B: implementação de artigo já existente

Usado quando o arquivo já está no repositório, mas ainda não foi integrado corretamente.

## Tipo C: publicação de rascunho

Usado quando o artigo já está implementado e precisa se tornar público.

## Tipo D: atualização editorial

Usado quando o conteúdo, fontes, tese, conclusão ou informações do artigo serão alterados.

## Tipo E: atualização técnica

Usado quando a mudança envolve:

- layout;
- componente;
- performance;
- acessibilidade;
- metadados;
- schema;
- imagem;
- rastreamento;
- caminho;
- build.

## Tipo F: correção emergencial

Usado quando existe:

- erro 404;
- imagem quebrada;
- conteúdo incorreto;
- informação falsa;
- link errado;
- problema de segurança;
- exposição de dados;
- erro grave de renderização.

## Tipo G: retirada ou remoção

Usado quando o artigo precisa sair do ar.

Cada tipo possui cuidados diferentes.

---

# Fase 1: recebimento da tarefa

Ao receber uma solicitação, o Hermes deve identificar:

```text
Artigo:
Slug:
Tipo de tarefa:
Arquivo fornecido:
Imagem fornecida:
Status atual:
Destino comercial:
URLs confirmadas:
Autorização de publicação:
Prazo:
Escopo:
```

Quando alguma informação não estiver presente, o Hermes deve tentar encontrá-la no projeto.

Só deve perguntar ao usuário quando a ausência realmente impedir a execução segura.

Não perguntar novamente por uma informação que já existe no repositório ou nos documentos.

---

# Fase 2: leitura obrigatória

Antes de alterar o projeto:

1. Ler o `README.md`.
2. Ler os documentos obrigatórios.
3. Ler o artigo completo.
4. Ler o plano de conversão, quando existir.
5. Ler a solicitação do usuário.
6. Verificar se há instruções específicas do projeto.
7. Identificar conflitos entre instruções.

Em caso de conflito:

- preservar conteúdo aprovado;
- priorizar documentos mais específicos;
- não improvisar;
- informar o conflito antes de uma alteração irreversível.

---

# Fase 3: análise da estrutura real

O Hermes deve localizar:

```text
pasta de artigos
pasta de imagens
template do artigo
componente de capa
componente de CTA
página do autor
listagem do blog
página de categoria
sistema de artigos relacionados
geração de metadados
dados estruturados
sitemap
robots
analytics
```

Também deve verificar:

- como os artigos são carregados;
- se o projeto usa Markdown ou MDX;
- se existe validação de frontmatter;
- se as categorias são fixas;
- se as tags geram páginas;
- se `draft` é respeitado;
- se a data é interpretada corretamente;
- como a URL é construída;
- como `coverImage` é processado;
- como o canonical é gerado.

---

# Fase 4: inventário antes da implementação

Antes de adicionar um artigo, procure:

- slug igual;
- título igual;
- arquivo com nome semelhante;
- artigo com a mesma intenção;
- imagem com o mesmo nome;
- rota existente;
- versão anterior;
- rascunho duplicado;
- conteúdo semelhante.

O objetivo é evitar:

- duplicação;
- canibalização;
- sobrescrita;
- rotas conflitantes;
- imagens duplicadas;
- versões divergentes.

Se já existir um artigo com o mesmo slug, não crie outro.

Analise se a tarefa é atualização.

---

# Fase 5: validação do arquivo recebido

O Hermes deve verificar:

## Arquivo

- extensão `.md`;
- codificação UTF-8;
- nome relacionado ao slug;
- ausência de cópias;
- ausência de caracteres corrompidos.

## Frontmatter

- delimitadores;
- YAML válido;
- campos obrigatórios;
- tipos corretos;
- listas;
- aspas;
- booleanos;
- datas;
- campos vazios;
- ausência de duplicação.

## Conteúdo

- ausência de H1 no corpo;
- introdução após o frontmatter;
- H2, H3 e H4 em ordem;
- links válidos;
- fontes;
- tabelas;
- listas;
- conclusão;
- CTA quando aprovado;
- ausência de placeholders;
- ausência de instruções internas.

## Segurança editorial

- ausência de números inventados;
- ausência de cases não autorizados;
- ausência de dados de clientes;
- ausência de promessas;
- ausência de URLs fictícias;
- ausência de conteúdo confidencial.

---

# Fase 6: validação do frontmatter

O modelo esperado é:

```yaml
---
title: "Título editorial"
slug: "slug-do-artigo"
excerpt: "Resumo do artigo."
category: "Categoria"
tags:
  - "Tag principal"
seoTitle: "Título para mecanismos de busca"
seoDescription: "Descrição do artigo."
author: "Gustavo Astério"
authorRole: "Fundador do Grupo Vittore"
publishedAt: ""
updatedAt: ""
coverImage: ""
coverAlt: ""
canonical: ""
intent: "informacional-comercial"
draft: true
---
```

O Hermes deve comparar esse modelo com o formato real aceito pelo projeto.

Se o projeto utilizar nomes diferentes, não alterar automaticamente todos os artigos.

Deve propor uma adaptação documentada.

---

# Fase 7: validação de categoria e tags

Antes de implementar:

- verificar categorias existentes;
- confirmar grafia;
- confirmar capitalização;
- evitar duplicação;
- verificar se a categoria gera rota;
- verificar se a tag já existe;
- evitar variações equivalentes.

Exemplo de inconsistência:

```text
Gestão Comercial
Gestao Comercial
gestão comercial
Comercial
```

Não criar variações apenas porque o Markdown recebido usa outra grafia.

Ajustes editoriais precisam ser informados.

---

# Fase 8: definição da URL

A URL do artigo deve nascer da estrutura real do projeto.

Pode ser algo como:

```text
/blog/slug-do-artigo
```

ou outra rota definida no código.

O Hermes deve confirmar:

- prefixo;
- slug;
- domínio;
- protocolo;
- uso de barra final;
- versão canônica.

Não inventar URL com base apenas em exemplo de documentação.

---

# Fase 9: validação do slug

O slug deve:

- corresponder ao arquivo;
- ser único;
- utilizar minúsculas;
- não possuir acentos;
- utilizar hífens;
- permanecer estável;
- evitar excesso de palavras.

Para artigo novo, pequenos ajustes podem ser sugeridos antes da publicação.

Para artigo publicado, não alterar sem:

- autorização;
- redirecionamento;
- atualização de links;
- canonical;
- sitemap;
- análise de impacto.

---

# Fase 10: implementação do arquivo

Depois das validações:

1. Colocar o Markdown na pasta correta.
2. Preservar o nome aprovado.
3. Manter o conteúdo intacto.
4. Corrigir somente erros técnicos necessários.
5. Registrar alterações editoriais, se houver.
6. Confirmar que o sistema consegue ler o arquivo.
7. Confirmar que o artigo aparece no ambiente de desenvolvimento.

O Hermes não deve reescrever o conteúdo para adaptá-lo ao template.

O template deve se adaptar ao conteúdo válido.

---

# Fase 11: implementação da capa

A capa deve seguir:

```text
07_implementacao_capas_blog.md
```

O Hermes deve:

1. localizar a imagem aprovada;
2. confirmar qual versão utilizar;
3. verificar proporção;
4. verificar dimensões;
5. verificar formato;
6. verificar peso;
7. identificar a pasta correta;
8. nomear adequadamente;
9. otimizar sem prejudicar a qualidade;
10. atualizar `coverImage`;
11. atualizar `coverAlt`;
12. validar cards;
13. validar página interna;
14. validar desktop;
15. validar mobile.

O Hermes não deve criar ou editar artisticamente a imagem.

---

# Fase 12: links internos e conversão

A implementação deve seguir:

```text
08_links_internos_e_conversao.md
```

O Hermes deve verificar:

- destino principal;
- link contextual;
- texto âncora;
- CTA;
- artigos relacionados;
- URLs reais;
- rastreamento;
- acessibilidade.

Não inserir:

- link fictício;
- `#`;
- `URL_AQUI`;
- rota presumida;
- CTA não aprovado;
- segunda frente comercial sem autorização.

---

# Fase 13: página do autor

Antes da publicação, verificar se o artigo apresenta:

```text
Gustavo Astério
Fundador do Grupo Vittore
```

O artigo deve se conectar à página do autor quando ela existir.

A página do autor deve utilizar apenas informações confirmadas.

Não inventar:

- formação;
- tempo de experiência;
- resultados;
- certificações;
- clientes;
- cargos;
- prêmios.

O Hermes não deve criar uma biografia extensa sem conteúdo aprovado.

---

# Fase 14: metadados

O template deve gerar metadados com base no frontmatter.

Verifique:

- `<title>`;
- meta description;
- canonical;
- Open Graph;
- imagem social;
- URL;
- autor;
- data;
- tipo de conteúdo.

O Hermes deve confirmar que:

- o título não está duplicado;
- a descrição corresponde ao artigo;
- a imagem carrega;
- a URL é absoluta quando necessário;
- o canonical aponta para a página correta;
- o artigo não herda metadados errados de outra página.

---

# Fase 15: dados estruturados

Quando o projeto utilizar dados estruturados, verificar:

- `BlogPosting` ou `Article`;
- `Person`;
- `Organization`;
- `BreadcrumbList`.

Os dados devem corresponder ao conteúdo visível.

Confirmar:

```text
headline
description
image
datePublished
dateModified
author
publisher
mainEntityOfPage
```

Não incluir:

- data inexistente;
- autor falso;
- imagem inexistente;
- avaliação;
- FAQ não visível;
- informação institucional inventada.

---

# Fase 16: breadcrumbs

Quando houver breadcrumb, ele deve representar a estrutura real.

Exemplo:

```text
Início
> Blog
> Vendas
> Título do artigo
```

Verifique:

- links;
- categoria;
- página atual;
- acessibilidade;
- dados estruturados;
- comportamento mobile.

Não criar breadcrumb com páginas inexistentes.

---

# Fase 17: artigos relacionados

Verifique se o sistema:

- não exibe o próprio artigo;
- não exibe rascunhos;
- não exibe artigos sem relação;
- utiliza URLs válidas;
- utiliza imagens existentes;
- possui quantidade adequada;
- funciona em mobile.

Quando a seleção for automática, revisar o resultado.

Quando for manual, utilizar somente artigos confirmados.

---

# Fase 18: status de rascunho

Enquanto não houver autorização de publicação:

```yaml
draft: true
```

O projeto deve garantir que rascunhos:

- não apareçam na página pública;
- não entrem em categorias públicas;
- não apareçam em artigos relacionados;
- não entrem no sitemap;
- não sejam indexados;
- não sejam distribuídos como publicação.

Quando houver preview público, avaliar uso de:

```text
noindex
```

ou proteção adequada.

---

# Fase 19: pré-visualização

Antes de publicar, o Hermes deve disponibilizar ou validar uma visualização do artigo.

A pré-visualização deve permitir revisar:

- conteúdo;
- título;
- capa;
- layout;
- links;
- CTA;
- autor;
- datas;
- artigos relacionados;
- desktop;
- mobile.

O usuário precisa conseguir revisar antes da publicação final.

Não mudar `draft` para `false` apenas para criar preview.

---

# Fase 20: validação editorial

Mesmo sem reescrever o artigo, o Hermes deve verificar sinais evidentes de problema:

- H1 duplicado;
- texto cortado;
- parágrafo ausente;
- link no lugar errado;
- CTA repetido;
- tabela quebrada;
- caracteres corrompidos;
- seção fora de ordem;
- fonte sem link;
- instrução interna visível;
- placeholder;
- conteúdo duplicado.

Quando o problema for editorial, o Hermes deve informar antes de alterar, salvo erro técnico evidente.

---

# Fase 21: validação visual

O Hermes deve verificar:

## Desktop

- largura do conteúdo;
- tamanho do título;
- capa;
- legibilidade;
- espaçamento;
- headings;
- listas;
- tabelas;
- CTA;
- sidebar;
- autor;
- relacionados;
- rodapé.

## Mobile

- título;
- quebra de linha;
- imagem;
- tabelas;
- listas;
- links;
- CTA;
- sidebar;
- largura;
- rolagem horizontal;
- área de toque;
- estabilidade.

Não considerar o trabalho concluído apenas com validação em desktop.

---

# Fase 22: validação de acessibilidade

Verificar:

- H1 único;
- headings em ordem;
- alt text;
- links descritivos;
- foco;
- navegação por teclado;
- contraste;
- botões;
- tabelas;
- elementos semânticos;
- áreas de toque;
- ausência de informação exclusiva na imagem.

Um CTA que navega para outra página deve ser um link semântico.

---

# Fase 23: validação de performance

Verificar:

- peso da capa;
- carregamento;
- LCP;
- mudança de layout;
- imagens responsivas;
- scripts;
- componentes;
- fontes;
- lazy loading;
- prioridade da capa;
- excesso de JavaScript.

Não instalar uma biblioteca pesada para resolver uma necessidade simples.

Não alterar a arquitetura global sem solicitação.

---

# Fase 24: validação técnica

O Hermes deve consultar o `package.json` e executar os comandos adequados.

Exemplos comuns:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Nem todos os projetos possuem esses comandos.

Execute apenas os que estiverem definidos ou forem apropriados.

Também verificar:

- erros no terminal;
- erros no console;
- warnings relevantes;
- rotas;
- arquivos ausentes;
- imports;
- tipos;
- metadados;
- imagens;
- links.

---

# Fase 25: validação de links

Todos os links devem ser testados.

Verificar:

- links internos;
- links externos;
- fontes;
- CTA;
- autor;
- artigos relacionados;
- categoria;
- breadcrumbs;
- e-mail;
- LinkedIn;
- contato.

Não publicar com:

- erro 404;
- redirecionamento incorreto;
- página de rascunho;
- URL fictícia;
- domínio errado;
- fragmento inexistente.

---

# Fase 26: canonical

Antes da publicação, confirmar:

- URL final;
- domínio;
- protocolo;
- rota;
- barra final;
- correspondência com o sitemap;
- correspondência com links internos.

O canonical deve apontar para a própria URL principal do artigo.

Não utilizar canonical vazio em uma publicação final quando o projeto exige valor explícito.

Quando o template gera automaticamente o canonical, verificar se ele está correto.

---

# Fase 27: sitemap

Antes da publicação, verificar se o artigo:

- entra no sitemap;
- utiliza URL canônica;
- não aparece duplicado;
- possui data coerente;
- está com `draft: false`.

Não incluir:

- rascunhos;
- páginas com `noindex`;
- redirects;
- previews;
- URLs quebradas.

Se o sitemap for gerado automaticamente, validar o resultado.

---

# Fase 28: robots e indexação

Verificar se a página:

- não está bloqueada indevidamente;
- não recebe `noindex`;
- pode ser rastreada;
- retorna status adequado;
- está disponível em HTML;
- não depende de autenticação.

Não utilizar `robots.txt` como substituto de `noindex`.

---

# Fase 29: rastreamento

Quando houver rastreamento aprovado, verificar:

- clique no CTA;
- clique no link contextual;
- clique em artigo relacionado;
- clique no autor;
- eventos existentes;
- propriedades;
- ausência de dados pessoais;
- consistência de nomes.

Não criar uma nova convenção de eventos sem analisar a existente.

Não utilizar UTM em links internos por padrão.

---

# Fase 30: autorização de publicação

O Hermes só deve publicar quando houver uma solicitação clara.

Exemplos de autorização:

```text
Pode publicar o artigo.
```

```text
Coloque o artigo no ar.
```

```text
Altere para draft false e publique hoje.
```

Aprovar o texto não significa necessariamente autorizar publicação.

Aprovar a capa também não significa autorização de publicação.

Na ausência de autorização:

```yaml
draft: true
```

---

# Fase 31: preparação da publicação

Antes de alterar o status, confirmar:

- conteúdo aprovado;
- capa aprovada;
- alt text;
- categoria;
- tags;
- SEO title;
- SEO description;
- autor;
- data;
- canonical;
- URLs;
- CTA;
- artigos relacionados;
- schema;
- sitemap;
- build;
- desktop;
- mobile.

Se algum elemento obrigatório estiver pendente, informar antes da publicação.

---

# Fase 32: alteração para publicado

Quando autorizado:

```yaml
publishedAt: "AAAA-MM-DD"
updatedAt: ""
draft: false
```

Utilizar a data real de publicação.

Não preencher uma data passada ou futura sem solicitação.

Se houver horário no sistema, seguir o formato adotado pelo projeto.

---

# Fase 33: build e deploy

Depois da alteração:

1. executar verificações;
2. executar build;
3. corrigir erros dentro do escopo;
4. realizar deploy pelo fluxo existente;
5. aguardar conclusão;
6. verificar a URL publicada.

O Hermes não deve mudar o provedor de hospedagem ou o fluxo de deploy sem solicitação.

Não deve criar um segundo ambiente de produção.

---

# Fase 34: validação após publicação

Depois do deploy, abrir a URL real e verificar:

- status HTTP;
- título;
- conteúdo;
- imagem;
- metadados;
- canonical;
- schema;
- links;
- CTA;
- autor;
- datas;
- categoria;
- relacionados;
- mobile;
- desktop.

A validação local não substitui a validação da página publicada.

---

# Fase 35: validação da listagem

Confirmar que o artigo aparece corretamente em:

- página inicial do blog;
- categoria;
- busca;
- artigos recentes;
- artigos relacionados;
- páginas de cluster, quando existirem.

Verificar:

- imagem;
- título;
- excerpt;
- categoria;
- link;
- data.

---

# Fase 36: validação do compartilhamento

Quando possível, confirmar:

- `og:title`;
- `og:description`;
- `og:image`;
- `og:url`;
- tipo de página;
- imagem acessível.

A imagem social deve apontar para URL pública absoluta.

Não afirmar que o compartilhamento está correto sem verificar os metadados.

---

# Fase 37: submissão e descoberta

Quando o projeto possuir integração, o Hermes pode:

- atualizar sitemap;
- acionar IndexNow;
- solicitar inspeção manual quando apropriado;
- informar que a página está pronta para rastreamento.

Não prometer indexação.

Não prometer posicionamento.

Não enviar repetidamente a mesma URL sem mudança relevante.

---

# Fase 38: relatório de publicação

Ao concluir, o Hermes deve entregar um relatório.

Modelo:

```text
Artigo:
Slug:
URL publicada:
Status:
Data de publicação:
Categoria:
Imagem:
Canonical:
CTA:
Links internos:
Artigos relacionados:
Schema:
Sitemap:
Rastreamento:
Arquivos criados:
Arquivos modificados:
Comandos executados:
Resultado do lint:
Resultado do build:
Validação desktop:
Validação mobile:
Pendências:
```

Não omitir erros.

Não declarar que tudo funciona se alguma validação não foi executada.

---

# Fluxo para artigo novo

## Etapa 1: recebimento

Receber:

- Markdown;
- imagem;
- plano de conversão;
- autorização ou status.

## Etapa 2: análise

Ler documentos e analisar o projeto.

## Etapa 3: validação

Validar:

- frontmatter;
- slug;
- categoria;
- tags;
- conteúdo;
- fontes;
- links.

## Etapa 4: inclusão

Adicionar o Markdown à pasta correta.

## Etapa 5: imagem

Implementar a capa aprovada.

## Etapa 6: links

Implementar links e CTA confirmados.

## Etapa 7: template

Confirmar renderização.

## Etapa 8: preview

Apresentar para revisão.

## Etapa 9: publicação

Somente após autorização.

## Etapa 10: validação final

Validar produção e entregar relatório.

---

# Fluxo para atualização editorial

Antes de atualizar:

- ler o artigo atual;
- identificar URL;
- preservar slug;
- analisar tráfego e links quando necessário;
- comparar conteúdo antigo e novo;
- confirmar alteração solicitada.

Durante a atualização:

- alterar somente o escopo;
- manter fontes válidas;
- inserir novas fontes;
- preservar links;
- atualizar CTA quando solicitado;
- revisar metadados.

Depois:

```yaml
publishedAt: "DATA_ORIGINAL"
updatedAt: "DATA_DA_ATUALIZACAO"
draft: false
```

O `updatedAt` só deve ser alterado quando houver mudança editorial real.

---

# Fluxo para atualização técnica

Exemplos:

- correção de layout;
- caminho de imagem;
- componente;
- performance;
- acessibilidade;
- analytics;
- schema.

Nesse caso:

- preservar conteúdo;
- preservar slug;
- preservar `publishedAt`;
- preservar `updatedAt`, salvo alteração editorial;
- preservar CTA;
- preservar fontes;
- validar artigos afetados.

Não aproveitar a tarefa para reescrever o texto.

---

# Fluxo para substituição de capa

1. Confirmar nova imagem.
2. Confirmar aprovação.
3. Verificar arquivo anterior.
4. Implementar conforme o documento 07.
5. Atualizar `coverImage`.
6. Atualizar `coverAlt`.
7. Validar cards.
8. Validar Open Graph.
9. Validar cache.
10. Informar se o arquivo antigo foi preservado.

Não alterar `updatedAt` apenas pela troca da imagem.

---

# Fluxo para alteração de links e CTA

1. Ler plano de conversão.
2. Confirmar URL.
3. Confirmar texto âncora.
4. Confirmar CTA.
5. Preservar conteúdo.
6. Implementar.
7. Configurar rastreamento.
8. Validar links.
9. Validar mobile.
10. Informar alterações.

Não criar CTA sem aprovação.

---

# Fluxo para mudança de slug

Alterar slug publicado é uma tarefa de alto risco.

Antes:

- confirmar autorização;
- registrar URL antiga;
- definir URL nova;
- identificar backlinks;
- identificar links internos;
- identificar compartilhamentos;
- verificar canonical;
- verificar sitemap.

Durante:

- renomear arquivo quando necessário;
- atualizar slug;
- configurar redirecionamento permanente;
- atualizar links internos;
- atualizar canonical;
- atualizar sitemap;
- atualizar referências.

Depois:

- testar URL antiga;
- testar redirecionamento;
- testar URL nova;
- validar metadados;
- validar produção.

Não alterar slug apenas porque um novo título parece melhor.

---

# Fluxo para retirada do ar

Antes de retirar:

- confirmar autorização;
- verificar tráfego;
- verificar backlinks;
- verificar conversões;
- identificar página substituta;
- avaliar redirecionamento.

Possíveis ações:

```text
manter publicado
atualizar
redirecionar
arquivar
remover
retornar 410
```

A decisão depende do contexto.

Não simplesmente apagar o arquivo.

---

# Fluxo para correção emergencial

Quando houver:

- dado falso;
- exposição de dados;
- erro grave;
- informação prejudicial;
- página quebrada;
- imagem confidencial;
- link perigoso;

o Hermes deve priorizar:

1. reduzir o impacto;
2. retirar temporariamente quando necessário;
3. preservar evidências técnicas;
4. corrigir;
5. validar;
6. informar claramente;
7. documentar a causa.

Não esconder o problema.

---

# Tratamento de informações ausentes

Quando faltar uma informação, o Hermes deve agir conforme o caso.

## URL comercial ausente

- manter texto sem link;
- registrar pendência;
- não usar placeholder.

## Imagem ausente

- manter `coverImage` e `coverAlt` vazios;
- não criar imagem;
- não utilizar outra capa.

## Alt text ausente

- propor descrição objetiva da imagem;
- confirmar quando houver dúvida.

## Canonical ausente

- verificar se o template gera automaticamente;
- não inventar domínio.

## Categoria inexistente

- não criar automaticamente;
- informar e propor enquadramento.

## CTA ausente

- não inventar;
- informar a ausência.

## Data de publicação ausente

- manter rascunho;
- não preencher sem autorização.

---

# Alterações permitidas sem aprovação editorial

O Hermes pode corrigir:

- YAML inválido;
- indentação;
- aspas;
- encoding;
- caminho;
- link confirmado;
- extensão;
- sintaxe de Markdown;
- caractere corrompido;
- erro de compilação;
- import;
- tipo;
- acessibilidade técnica.

Mesmo nesses casos, deve preservar o sentido.

---

# Alterações que exigem aprovação

O Hermes deve solicitar confirmação antes de alterar:

- título;
- slug;
- tese;
- introdução;
- conclusão;
- CTA;
- texto âncora estratégico;
- fontes;
- categoria;
- tags;
- datas editoriais;
- exemplos;
- números;
- promessas;
- autoria;
- imagem aprovada;
- URL comercial;
- estrutura do artigo.

---

# Alterações estruturais no projeto

Antes de alterar:

- sistema de Markdown;
- parser;
- rotas;
- frontmatter;
- componentes globais;
- sitemap;
- schema;
- taxonomia;
- estrutura de pastas;

o Hermes deve:

1. analisar a implementação atual;
2. explicar a necessidade;
3. listar arquivos afetados;
4. identificar risco;
5. propor plano;
6. aguardar autorização quando a mudança for relevante;
7. testar em escopo controlado.

Não transformar a publicação de um artigo em uma refatoração geral.

---

# Controle de escopo

Se a tarefa for:

```text
Publicar um artigo
```

não alterar:

- homepage inteira;
- menu;
- rodapé;
- identidade visual;
- outras páginas;
- componentes não relacionados;
- dependências;
- hospedagem;
- analytics global;

salvo quando indispensável e explicado.

---

# Uso de dependências

Não instalar nova dependência para:

- ler um campo simples;
- renderizar uma imagem;
- criar um botão;
- calcular tempo de leitura;
- validar uma URL;

quando o projeto já possuir solução ou uma implementação simples for suficiente.

Antes de instalar:

- verificar dependências atuais;
- avaliar manutenção;
- avaliar peso;
- avaliar compatibilidade;
- explicar a necessidade.

---

# Versionamento

As mudanças devem ser registradas de forma clara.

Exemplos de mensagens:

```text
content(blog): adiciona artigo sobre CRM
```

```text
content(blog): publica artigo sobre processo comercial
```

```text
fix(blog): corrige imagem da capa do artigo
```

```text
seo(blog): atualiza metadados e canonical
```

Não criar arquivos como:

```text
artigo-final.md
artigo-final-corrigido.md
artigo-agora-vai.md
```

Utilizar o controle de versão.

---

# Rollback

Antes de alterações de alto impacto, o Hermes deve garantir que seja possível reverter.

Exemplos:

- atualização em massa;
- mudança de parser;
- mudança de slug;
- migração de pastas;
- substituição de componentes;
- remoção de artigos.

Em caso de erro:

1. interromper novas alterações;
2. identificar o ponto de falha;
3. restaurar versão funcional;
4. validar;
5. corrigir em ambiente controlado;
6. informar o ocorrido.

---

# Checklist antes de tocar no projeto

- A tarefa está clara?
- O artigo foi identificado?
- O tipo de tarefa foi classificado?
- Os documentos foram lidos?
- A estrutura foi analisada?
- Existe artigo duplicado?
- Existe slug duplicado?
- O conteúdo foi aprovado?
- A publicação foi autorizada?
- A imagem foi aprovada?
- As URLs estão confirmadas?
- O escopo está definido?

---

# Checklist do artigo

- O arquivo está em UTF-8?
- O nome corresponde ao slug?
- O frontmatter está válido?
- Os campos obrigatórios existem?
- `draft` está correto?
- As datas estão coerentes?
- Não existe H1 no corpo?
- Os headings estão em ordem?
- Não existem placeholders?
- Não existem instruções internas?
- As fontes funcionam?
- Os links funcionam?
- O CTA está aprovado?
- O conteúdo não foi alterado?

---

# Checklist da implementação

- O arquivo está na pasta correta?
- A capa está na pasta correta?
- `coverImage` funciona?
- `coverAlt` está correto?
- A URL está correta?
- O canonical está correto?
- O autor aparece?
- A categoria funciona?
- Os artigos relacionados funcionam?
- O CTA funciona?
- O rastreamento funciona?
- O template renderiza?

---

# Checklist técnico

- O lint passou?
- O typecheck passou, quando existir?
- Os testes passaram, quando existirem?
- O build passou?
- A rota abre?
- O console está limpo?
- Não existe 404?
- O sitemap está correto?
- O schema está correto?
- Os metadados estão corretos?
- O artigo está em HTML?
- O mobile funciona?
- O desktop funciona?

---

# Checklist de publicação

- Existe autorização explícita?
- `draft` está `false`?
- `publishedAt` está correto?
- `updatedAt` está coerente?
- A imagem foi aprovada?
- O alt text está correto?
- O canonical está correto?
- Os links funcionam?
- O CTA funciona?
- O artigo está no sitemap?
- Não existe `noindex`?
- O deploy foi concluído?
- A URL pública foi validada?

---

# Checklist pós-publicação

- A página retorna HTTP 200?
- O título está correto?
- A capa aparece?
- O conteúdo está completo?
- A data está correta?
- O autor está correto?
- A categoria está correta?
- Os links funcionam?
- O CTA funciona?
- O mobile funciona?
- O desktop funciona?
- Os metadados estão corretos?
- O canonical está correto?
- O schema está correto?
- O artigo aparece nas listagens?
- O sitemap contém a URL?
- Não existem erros no console?

---

# Problemas que impedem a publicação

Não publicar quando houver:

- conteúdo não aprovado;
- ausência de autorização;
- `draft: true`;
- frontmatter inválido;
- erro de build;
- slug duplicado;
- rota duplicada;
- imagem quebrada;
- URL fictícia;
- canonical incorreto;
- fonte falsa;
- dado inventado;
- CTA sem destino;
- link quebrado;
- artigo relacionado inexistente;
- informação confidencial;
- autoria incorreta;
- data incorreta;
- H1 duplicado;
- erro grave no mobile;
- página não acessível.

---

# Relatório mínimo obrigatório

Ao final de qualquer tarefa, o Hermes deve informar:

```text
Resumo:
Artigo:
Tipo de tarefa:
Status anterior:
Status atual:
Arquivos criados:
Arquivos modificados:
Arquivos removidos:
Imagem:
URL:
Canonical:
Links:
CTA:
Metadados:
Schema:
Sitemap:
Rastreamento:
Comandos executados:
Resultados:
Validação desktop:
Validação mobile:
Pendências:
Riscos:
```

O relatório deve ser proporcional à tarefa.

Uma correção pequena não exige um relatório excessivamente longo, mas precisa declarar o que foi feito.

---

# Prompt operacional para artigo novo

```text
Leia primeiro:

docs/blog/artigos/README.md
docs/blog/artigos/09_fluxo_publicacao_hermes.md

Depois, leia todos os documentos obrigatórios indicados no README.

Analise a estrutura atual do projeto antes de criar, mover ou renomear qualquer arquivo.

Implemente o artigo novo informado seguindo o padrão editorial e técnico do blog.

Preserve integralmente o conteúdo aprovado.

Não invente:

- URLs;
- caminhos;
- categorias;
- tags;
- imagens;
- dados;
- CTAs;
- componentes;
- eventos.

Mantenha o artigo como rascunho até receber autorização explícita de publicação.

Valide:

1. arquivo;
2. frontmatter;
3. Markdown;
4. imagem;
5. links;
6. CTA;
7. autor;
8. metadados;
9. schema;
10. sitemap;
11. desktop;
12. mobile;
13. lint;
14. build.

Ao final, informe todos os arquivos criados e modificados, testes realizados, resultados e pendências.
```

---

# Prompt operacional para publicação

```text
Leia:

docs/blog/artigos/README.md
docs/blog/artigos/09_fluxo_publicacao_hermes.md

O artigo já foi aprovado e está autorizado para publicação.

Antes de alterar o status, faça a validação completa de pré-publicação.

Confirme:

- frontmatter;
- imagem;
- alt text;
- links;
- CTA;
- metadados;
- canonical;
- autor;
- data;
- schema;
- sitemap;
- desktop;
- mobile;
- build.

Somente depois das validações:

1. preencha a data real de publicação;
2. altere draft para false;
3. publique pelo fluxo existente;
4. valide a URL pública;
5. entregue o relatório final.

Não altere o conteúdo editorial.
```

---

# Prompt operacional para atualização

```text
Leia:

docs/blog/artigos/README.md
docs/blog/artigos/09_fluxo_publicacao_hermes.md

Analise o artigo publicado e altere somente o que foi solicitado.

Preserve:

- slug;
- URL;
- publishedAt;
- autoria;
- conteúdo fora do escopo;
- links válidos;
- fontes válidas.

Atualize updatedAt somente se houver mudança editorial real.

Não aproveite a tarefa para reescrever outras seções.

Execute as validações e informe exatamente o que foi alterado.
```

---

# Gate de títulos de cards

Antes de concluir a integração ou publicação de um artigo, o Hermes deve confirmar que o título dinâmico usa `ArticleCardTitle` em todos os cards aplicáveis:

- carrossel Blog Estratégico da Home;
- Leitura em destaque de `/blog`;
- Últimos Artigos;
- Conteúdos por Categoria;
- artigos relacionados;
- outros cards de artigo reutilizados pelo projeto.

O título editorial e uma eventual composição visual são responsabilidades distintas. A composição visual manual é opcional; o fallback automático do título vindo do Markdown é obrigatório e deve funcionar sem cadastro adicional por slug.

É proibido aplicar diretamente a títulos dinâmicos:

- `nowrap` ou equivalentes;
- `truncate`;
- `line-clamp`;
- `overflow-hidden` para esconder texto excedente.

O QA deve cobrir todos os artigos reais em 360px, 375px, 390px, 430px e desktop. Verificar a caixa e os glifos do título dentro do card, além do overflow da página. Nenhuma palavra pode desaparecer, ser cortada ou ultrapassar o padding direito.

---

# Definição de tarefa concluída

Uma publicação só está concluída quando:

- os documentos foram consultados;
- a estrutura real foi respeitada;
- o artigo correto foi implementado;
- o conteúdo aprovado foi preservado;
- o frontmatter está válido;
- a imagem está correta;
- os links estão corretos;
- o CTA está correto;
- a página renderiza;
- o desktop funciona;
- o mobile funciona;
- os metadados estão corretos;
- o canonical está correto;
- o schema está correto;
- o sitemap está correto;
- o build passou;
- a página publicada foi verificada;
- o relatório foi entregue;
- as pendências foram declaradas.

---

# Regra final

O Hermes não deve tratar a publicação como uma simples cópia de arquivo.

Publicar um artigo significa conectar corretamente:

```text
conteúdo
+
estrutura
+
imagem
+
metadados
+
links
+
conversão
+
acessibilidade
+
performance
+
indexação
+
rastreamento
```

A velocidade não deve substituir a validação.

A automação não deve substituir a responsabilidade.

O Hermes não deve inventar o que estiver ausente.

Não deve alterar o que já foi aprovado.

Não deve publicar sem autorização.

Quando houver dúvida sobre o status:

```yaml
draft: true
```

Quando houver dúvida sobre uma URL, não inserir link.

Quando houver dúvida sobre uma imagem, não substituir.

Quando houver dúvida sobre uma alteração editorial, apresentar a proposta antes de executar.

A função do Hermes é garantir que o artigo aprovado pelo usuário entre no site corretamente, funcione tecnicamente e preserve o padrão editorial do Grupo Vittore.