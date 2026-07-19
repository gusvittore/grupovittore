# Sistema Editorial e Operacional do Blog do Grupo Vittore

## Finalidade deste documento

Este arquivo é a porta de entrada para qualquer trabalho relacionado aos artigos do blog do Grupo Vittore.

Antes de criar, editar, importar, revisar, publicar, atualizar ou excluir qualquer artigo, o agente responsável pela execução deve ler este documento e os demais arquivos obrigatórios indicados nesta pasta.

Este diretório contém as regras editoriais e operacionais do blog.

Ele existe para garantir que:

- os artigos sejam publicados corretamente;
- o conteúdo aprovado não seja alterado sem autorização;
- a identidade editorial do Grupo Vittore seja preservada;
- o Markdown seja interpretado corretamente;
- títulos, metadados, imagens e links sejam implementados sem improviso;
- SEO, AEO, GEO e AIO sejam considerados na camada editorial e técnica;
- o blog mantenha consistência entre diferentes artigos;
- o Hermes saiba exatamente como executar cada publicação;
- a estrutura do projeto não seja modificada de forma desnecessária.

Este documento não substitui os demais manuais. Ele define a ordem de leitura, o fluxo de trabalho e as responsabilidades de cada parte.

---

# Fonte de verdade

Para assuntos relacionados ao blog, considere esta pasta como a fonte de verdade operacional:

```text
docs/blog/artigos/
```

Os artigos reais devem ficar na pasta de conteúdo definida pelo projeto, preferencialmente:

```text
content/blog/
```

Os arquivos públicos, como imagens de capa, devem ficar dentro da estrutura apropriada da pasta:

```text
public/
```

O código responsável por transformar o conteúdo em páginas do site deve permanecer em:

```text
src/
```

Nunca misture essas responsabilidades.

---

# Função de cada diretório

## `docs/blog/artigos/`

Contém:

- regras editoriais;
- padrões de linguagem;
- instruções de SEO;
- especificações do Markdown;
- padrões de imagem;
- regras de links internos e conversão;
- fluxo de publicação;
- checklists de validação;
- instruções para o Hermes.

Esses documentos são internos.

Eles não devem ser exibidos publicamente no site.

## `content/blog/`

Contém os artigos reais em formato Markdown.

Exemplo:

```text
content/blog/vendas/crm-nao-e-so-cadastro-e-controle-da-operacao-comercial.md
```

Essa pasta contém conteúdo editorial, não instruções operacionais.

## `public/`

Contém arquivos que precisam ser acessíveis publicamente pelo site.

Exemplos:

- imagens de capa;
- imagens usadas no corpo dos artigos;
- logos;
- ícones;
- arquivos para download;
- assets visuais.

Não coloque nesta pasta:

- manuais;
- regras editoriais;
- instruções para agentes;
- documentos internos;
- prompts;
- arquivos de planejamento.

## `src/`

Contém o código do site.

Exemplos:

- páginas;
- rotas;
- componentes;
- template dos artigos;
- cards;
- sidebar;
- CTA;
- leitura do Markdown;
- geração de metadados;
- dados estruturados;
- integração com sitemap;
- lógica de categorias;
- rastreamento.

Não coloque artigos ou manuais dentro de `src/`, salvo quando a arquitetura existente exigir isso de forma documentada.

---

# Ordem obrigatória de leitura

Antes de executar qualquer tarefa relacionada a artigos, leia os documentos desta pasta na seguinte ordem:

```text
1. README.md
2. 01_posicionamento_grupo_vittore.md
3. 02_voz_e_linguagem_gustavo.md
4. 03_manual_editorial_blog.md
5. 04_manual_seo_aeo_geo.md
6. 05_fontes_e_originalidade.md
7. 06_especificacao_entrega_markdown.md
8. 07_padrao_capas_blog.md
9. 08_links_internos_e_conversao.md
```

Quando forem criados, leia também:

```text
10. 09_fluxo_publicacao_hermes.md
11. 10_checklist_validacao_artigos.md
12. 11_mapa_urls_links_internos.md
```

Não presuma que já conhece as regras por ter trabalhado anteriormente no projeto.

Sempre consulte a versão atual dos documentos.

Caso algum arquivo obrigatório esteja ausente, não invente suas regras. Informe a ausência antes de executar uma mudança irreversível.

---

# Responsabilidades

## Responsabilidade do Marco Aurélio

O Marco Aurélio é o agente editorial responsável por produzir o conteúdo.

Ele deve entregar:

- pesquisa;
- análise de intenção de busca;
- artigo autoral;
- estrutura editorial;
- título;
- slug;
- excerpt;
- categoria;
- tags;
- título SEO;
- descrição SEO;
- fontes;
- links editoriais;
- estrutura de headings;
- briefing da capa;
- alt text após a aprovação da imagem;
- plano de conversão;
- sugestões de links internos;
- CTA editorial;
- arquivo Markdown.

O Marco Aurélio trabalha na camada de conteúdo.

Ele não deve decidir sozinho:

- estrutura definitiva de pastas do projeto;
- componentes React;
- eventos de rastreamento;
- caminhos ainda não confirmados;
- URLs institucionais;
- configuração do sitemap;
- regras do template;
- implementação de analytics;
- arquitetura técnica do site.

## Responsabilidade do usuário

O usuário é responsável por:

- aprovar o artigo;
- solicitar correções editoriais;
- aprovar a imagem de capa;
- confirmar páginas de destino;
- autorizar publicação;
- informar quando o conteúdo deixa de ser rascunho;
- aprovar alterações em artigos já publicados;
- validar o resultado visual final.

## Responsabilidade do Hermes

O Hermes é responsável pela implementação no projeto.

Ele deve:

- ler os documentos obrigatórios;
- identificar a estrutura real do projeto;
- colocar o artigo no local correto;
- colocar as imagens no local correto;
- preservar o conteúdo aprovado;
- atualizar caminhos de imagens;
- inserir apenas URLs confirmadas;
- implementar links;
- aplicar componentes;
- configurar rastreamento;
- preservar a hierarquia semântica;
- evitar H1 duplicado;
- validar o frontmatter;
- garantir que o artigo compile;
- validar o layout em desktop e mobile;
- manter o sitemap e metadados atualizados;
- validar dados estruturados;
- informar claramente tudo que foi alterado.

O Hermes não deve reescrever o artigo por iniciativa própria.

---

# Regra principal de execução

O conteúdo aprovado pelo usuário deve ser tratado como conteúdo protegido.

O Hermes pode:

- corrigir erro técnico de Markdown;
- ajustar caminho de imagem;
- inserir URL confirmada;
- implementar um componente;
- corrigir problema de compilação;
- aplicar o template do site.

O Hermes não pode, sem autorização:

- mudar a tese do artigo;
- resumir parágrafos;
- criar novas afirmações;
- remover ressalvas;
- adicionar números;
- trocar fontes;
- alterar o tom de voz;
- mudar CTA editorial;
- modificar título;
- alterar slug publicado;
- reescrever a conclusão;
- excluir seções;
- inventar exemplos;
- mudar o sentido de uma frase.

Quando uma alteração editorial parecer necessária, informe o problema e proponha a mudança antes de aplicá-la.

---

# Fluxo geral de produção

O fluxo recomendado é:

```text
Definição do tema
↓
Produção pelo Marco Aurélio
↓
Geração do arquivo Markdown
↓
Revisão editorial
↓
Correções
↓
Aprovação do artigo
↓
Criação do briefing da capa
↓
Geração da imagem
↓
Aprovação da imagem
↓
Inserção do Markdown no projeto
↓
Inserção da capa
↓
Implementação de links e CTA
↓
Validação técnica
↓
Validação visual
↓
Publicação
↓
Monitoramento
```

Não pule a aprovação editorial e visual.

---

# Modos de trabalho

## Modo 1: inclusão de artigo novo

Use quando um novo arquivo Markdown foi entregue.

O Hermes deve:

1. Ler este README.
2. Ler os documentos obrigatórios.
3. Localizar o arquivo entregue.
4. Validar o frontmatter.
5. Verificar se `draft` está correto.
6. Confirmar se existe imagem aprovada.
7. Colocar o artigo na pasta correta.
8. Colocar a capa na pasta correta.
9. Atualizar `coverImage`.
10. Atualizar `coverAlt` com base na imagem aprovada.
11. Inserir apenas links confirmados.
12. Implementar o CTA conforme a estratégia aprovada.
13. Executar o projeto.
14. Verificar erros.
15. Validar desktop e mobile.
16. Informar o que foi feito.

## Modo 2: revisão de artigo existente

Use quando o usuário pedir alteração em conteúdo já incluído.

Antes de editar:

1. Identifique se o artigo está publicado ou em rascunho.
2. Preserve o slug quando o artigo já estiver publicado.
3. Leia a solicitação exata.
4. Altere somente o que foi pedido.
5. Não aproveite a tarefa para reescrever outras partes.
6. Atualize `updatedAt` somente quando houver atualização editorial real.
7. Valide novamente o artigo.

## Modo 3: atualização técnica

Use quando a mudança não altera o conteúdo editorial.

Exemplos:

- mudança de componente;
- melhoria no layout;
- correção de responsividade;
- dados estruturados;
- rastreamento;
- performance;
- sitemap;
- acessibilidade.

Nesse modo:

- não reescreva o conteúdo;
- não altere o frontmatter sem necessidade;
- não mude o slug;
- não altere datas editoriais;
- não troque a imagem sem autorização.

## Modo 4: publicação

Um artigo somente pode ser publicado quando houver autorização.

Antes da publicação, confirme:

```yaml
draft: false
```

Também confirme:

- data de publicação;
- imagem;
- alt text;
- categoria;
- tags;
- links;
- CTA;
- metadados;
- canonical;
- página do autor;
- renderização;
- sitemap;
- dados estruturados.

---

# Regras do arquivo Markdown

## Codificação

Todos os arquivos devem ser salvos em UTF-8.

## Extensão

Use:

```text
.md
```

Não transforme o artigo em `.txt`, `.docx` ou HTML estático sem solicitação.

## Nome do arquivo

Use o slug do artigo:

```text
slug-do-artigo.md
```

Exemplo:

```text
crm-nao-e-so-cadastro-e-controle-da-operacao-comercial.md
```

## H1

Não inclua H1 no corpo do Markdown.

O H1 deve ser gerado pelo template com base no campo:

```yaml
title:
```

O corpo começa pela introdução.

## Hierarquia

Use:

```text
## para H2
### para H3
#### somente quando houver subdivisão real de H3
```

Não pule níveis.

Não use headings apenas para aumentar o tamanho visual de um texto.

---

# Frontmatter

O frontmatter deve permanecer no início do arquivo.

Modelo de referência:

```yaml
---
title: "Título editorial"
slug: "slug-do-artigo"
excerpt: "Resumo do artigo."
category: "Categoria"
tags:
  - "Tag principal"
  - "Tag complementar"
seoTitle: "Título para mecanismos de busca"
seoDescription: "Descrição clara do conteúdo."
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

Não remova campos sem verificar como o template do site funciona.

Não crie novos campos sem necessidade técnica documentada.

---

# Datas e status

## Artigo em rascunho

```yaml
publishedAt: ""
updatedAt: ""
draft: true
```

## Artigo publicado

```yaml
publishedAt: "AAAA-MM-DD"
updatedAt: ""
draft: false
```

## Artigo atualizado posteriormente

```yaml
publishedAt: "AAAA-MM-DD"
updatedAt: "AAAA-MM-DD"
draft: false
```

Não preencha `updatedAt` apenas porque um arquivo foi movido ou formatado.

Use `updatedAt` quando o conteúdo tiver sido realmente atualizado.

---

# Slug

O slug deve ser:

- minúsculo;
- sem acentos;
- sem caracteres especiais;
- separado por hífens;
- descritivo;
- estável.

Exemplo:

```text
processo-comercial-desorganizado
```

Não altere o slug de um artigo publicado sem:

- autorização;
- planejamento de redirecionamento;
- verificação de links internos;
- atualização do sitemap;
- atualização do canonical.

---

# Categoria e tags

A categoria deve corresponder à taxonomia real do blog.

Não invente nova categoria por conta própria.

Tags devem ser:

- relevantes;
- específicas;
- consistentes;
- reutilizáveis;
- diferentes da categoria quando possível.

Evite:

- tags genéricas demais;
- dezenas de tags;
- variações quase idênticas;
- tags criadas para apenas um artigo sem necessidade;
- repetir a categoria como tag sem justificativa.

---

# Fontes e referências

As fontes devem estar próximas das afirmações que sustentam.

Prefira links integrados à frase.

Exemplo:

```md
O [Google Ads permite importar conversões offline](URL_CONFIRMADA) registradas fora da plataforma.
```

Evite:

```md
[Fonte: site]
```

quando o link puder ser integrado naturalmente.

Não inclua fonte que não foi consultada.

Não altere uma fonte aprovada por outra sem verificar se ela sustenta a mesma afirmação.

Não invente:

- pesquisas;
- datas;
- percentuais;
- resultados;
- estudos;
- citações;
- autores;
- links.

---

# Links internos

Links internos devem:

- ajudar o leitor;
- aprofundar o assunto;
- conectar artigos relacionados;
- criar clusters temáticos;
- distribuir autoridade;
- conduzir para páginas comerciais quando houver relação real.

Não use:

```md
[clique aqui](...)
```

Prefira âncoras descritivas.

Exemplo:

```md
A organização do [processo comercial](URL_CONFIRMADA) influencia diretamente a capacidade de converter demanda.
```

Nunca invente URLs.

Quando a URL ainda não existir, registre a recomendação no plano de implementação e aguarde confirmação.

Não deixe placeholders dentro do artigo publicado.

Exemplos proibidos:

```md
[Assessoria Comercial](#)
```

```md
[Assessoria Comercial](URL_AQUI)
```

---

# Conversão e páginas comerciais

Cada artigo pode funcionar como uma etapa de consciência e pré-aquecimento.

Os dois destinos comerciais principais são:

```text
Assessoria Comercial
Materiais Gráficos Personalizados
```

## Assessoria Comercial

Use como destino principal em artigos relacionados a:

- vendas;
- gestão comercial;
- CRM;
- pipeline;
- follow-up;
- qualificação;
- tráfego e conversão;
- geração de demanda;
- processos;
- indicadores;
- previsibilidade;
- tecnologia comercial;
- automação;
- integração entre marketing e vendas.

## Materiais Gráficos Personalizados

Use como destino principal em artigos relacionados a:

- materiais impressos;
- papelaria;
- presença física da marca;
- materiais comerciais;
- prospecção;
- catálogos;
- pastas;
- folders;
- cartões;
- comunicação impressa;
- apresentação empresarial.

Por padrão, um artigo pode conter:

- uma ligação contextual;
- um CTA final;
- links para outros artigos.

Não transforme o artigo em página de vendas.

O conteúdo deve continuar útil mesmo sem o CTA.

---

# CTAs

O CTA deve continuar o raciocínio da conclusão.

Exemplos:

```text
Conheça a Assessoria Comercial do Grupo Vittore.
```

```text
Conheça os Materiais Gráficos Personalizados do Grupo Vittore.
```

Adapte o CTA ao tema.

Não use sempre a mesma frase.

Evite:

- urgência falsa;
- promessa de resultado;
- pressão;
- linguagem agressiva;
- medo artificial;
- garantia de crescimento;
- excesso de autopromoção.

A implementação visual do CTA pode ser feita por componente, desde que o texto e o destino respeitem a estratégia editorial.

---

# Imagens de capa

As capas devem seguir o documento:

```text
07_padrao_capas_blog.md
```

Padrão principal:

```text
1600 × 900 px
proporção 16:9
horizontal
alta resolução
sem texto
sem logotipo
sem moldura
aparência realista
estilo institucional
```

Não use o alt text imaginado antes de a imagem existir.

Enquanto não houver capa aprovada:

```yaml
coverImage: ""
coverAlt: ""
```

Depois da aprovação:

```yaml
coverImage: "/caminho-confirmado/imagem.webp"
coverAlt: "Descrição objetiva da imagem final."
```

O caminho definitivo deve seguir a estrutura real do projeto.

Não invente caminho de imagem.

---

# Imagens no corpo

Por padrão, não insira imagens no corpo do artigo.

Imagens internas só devem ser adicionadas quando:

- ajudam a explicar;
- representam um processo;
- apresentam um dado;
- mostram uma comparação;
- facilitam compreensão;
- foram aprovadas.

Não adicione imagens decorativas apenas para preencher espaço.

Toda imagem deve ter:

- nome de arquivo adequado;
- tamanho otimizado;
- formato correto;
- alt text;
- contexto;
- autorização de uso.

---

# SEO, AEO, GEO e AIO

A implementação deve preservar:

- título principal;
- headings;
- respostas diretas;
- parágrafos claros;
- tabelas;
- listas;
- fontes;
- entidades;
- links;
- metadados;
- autoria;
- datas;
- canonical;
- dados estruturados;
- acessibilidade;
- performance;
- experiência mobile.

Não existe um campo mágico de AEO, GEO ou AIO.

A base é:

- conteúdo útil;
- originalidade;
- clareza;
- estrutura;
- fontes;
- autoridade;
- indexação;
- arquitetura;
- experiência;
- consistência.

Não prejudique a leitura para tentar forçar palavras-chave.

---

# Dados estruturados

Quando o projeto implementar dados estruturados, priorize:

- `Article` ou `BlogPosting`;
- `Person`;
- `Organization`;
- `BreadcrumbList`.

Os dados estruturados devem corresponder ao que está visível na página.

Não inclua informação inexistente.

Não invente:

- data;
- autor;
- imagem;
- organização;
- avaliação;
- FAQ;
- endereço;
- resultado.

Não aplique `FAQPage` automaticamente em todos os artigos.

---

# Canonical

Enquanto a URL definitiva não estiver confirmada:

```yaml
canonical: ""
```

Quando a página estiver publicada, use a URL canônica real.

Não invente domínio ou rota.

Não use canonical de outra página.

---

# Sitemap e indexação

Antes de publicar, verifique se:

- o artigo pode ser rastreado;
- a rota está correta;
- a página não está bloqueada;
- o sitemap inclui a URL;
- o canonical está correto;
- o conteúdo aparece no HTML;
- não existe `noindex` indevido;
- o artigo está com `draft: false`.

Artigos com `draft: true` não devem ser indexados como publicações finais.

---

# Rastreamento

Links comerciais e CTAs podem receber rastreamento técnico.

O rastreamento deve ser implementado pelo projeto.

O artigo não deve conter parâmetros inventados.

O Hermes pode configurar eventos como:

- clique no CTA;
- clique em link contextual;
- acesso à página comercial;
- profundidade de rolagem;
- navegação para outro artigo.

Os nomes dos eventos devem seguir o padrão de analytics definido no projeto.

---

# Backlinks

O artigo pode ser construído para aumentar a chance de receber backlinks por meio de:

- conceitos próprios;
- frameworks;
- tabelas;
- checklists;
- diagnósticos;
- dados originais autorizados;
- sínteses úteis;
- materiais de referência.

Não invente backlinks.

Não crie links falsos.

Não afirme que um artigo recebeu menções sem comprovação.

Backlinks dependem de distribuição, relacionamento, autoridade e utilidade externa.

---

# Regras de publicação

Antes de publicar, confirme:

- artigo aprovado;
- título correto;
- slug correto;
- excerpt;
- categoria;
- tags;
- SEO title;
- SEO description;
- autor;
- datas;
- status;
- capa;
- alt text;
- canonical;
- links;
- CTA;
- headings;
- fontes;
- responsividade;
- dados estruturados;
- sitemap;
- ausência de erros.

Não publique automaticamente apenas porque o artigo foi adicionado ao projeto.

---

# Validação técnica obrigatória

Depois de qualquer implementação:

1. Execute as verificações do projeto.
2. Confirme que não existem erros de compilação.
3. Confirme que a página abre.
4. Verifique o console.
5. Verifique links.
6. Verifique a imagem.
7. Verifique desktop.
8. Verifique mobile.
9. Verifique metadados.
10. Verifique headings.
11. Verifique CTA.
12. Verifique o status do artigo.

Use os comandos definidos no `package.json`.

Exemplos comuns:

```bash
npm run lint
npm run build
```

Não presuma que esses são os únicos comandos. Consulte o projeto.

---

# Validação visual

Verifique:

- tamanho do título;
- legibilidade;
- largura da coluna;
- espaçamento entre parágrafos;
- hierarquia dos headings;
- tabelas em dispositivos móveis;
- listas;
- links;
- CTA;
- imagem de capa;
- card do autor;
- sidebar;
- artigos relacionados;
- rodapé;
- comportamento responsivo.

Não considere o trabalho concluído apenas porque compilou.

---

# Acessibilidade

Garanta:

- alt text adequado;
- links identificáveis;
- headings em ordem;
- contraste;
- navegação por teclado;
- botões com rótulos;
- tabelas legíveis;
- imagens otimizadas;
- elementos interativos acessíveis.

Evite links com texto genérico.

---

# Regras de segurança editorial

Nunca invente informações sobre:

- Grupo Vittore;
- Gustavo Astério;
- clientes;
- resultados;
- percentuais;
- cases;
- faturamento;
- prazos;
- quantidade de projetos;
- depoimentos;
- metodologias não documentadas.

Quando uma afirmação interna precisar ser publicada, exija:

- fonte;
- período;
- amostra;
- critério;
- autorização.

---

# Ações proibidas

Não faça sem autorização:

- apagar artigo;
- mudar slug publicado;
- alterar URL;
- reescrever conteúdo;
- trocar categoria;
- remover fonte;
- criar dado;
- alterar autor;
- substituir imagem;
- publicar rascunho;
- adicionar propaganda;
- criar CTA sem relação;
- inventar rota;
- criar nova estrutura paralela de pastas;
- mover arquivos em massa;
- alterar o template global;
- modificar outros artigos fora do escopo;
- instalar dependências desnecessárias.

---

# Alterações estruturais

Antes de criar uma nova pasta, componente, rota ou sistema:

1. Analise o que já existe.
2. Verifique se há solução equivalente.
3. Evite duplicação.
4. Explique a proposta.
5. Avalie impacto.
6. Preserve compatibilidade.

Não crie uma segunda estrutura de blog paralela.

Não crie componentes duplicados com nomes diferentes.

---

# Relatório após execução

Ao concluir uma tarefa, informe:

```text
Resumo da implementação
```

Inclua:

- artigo trabalhado;
- arquivos criados;
- arquivos modificados;
- caminhos usados;
- imagem utilizada;
- links inseridos;
- CTA implementado;
- status do artigo;
- testes executados;
- resultado dos testes;
- pendências;
- pontos que exigem aprovação.

Não afirme que está funcionando sem ter executado as verificações possíveis.

---

# Definição de concluído

Uma tarefa de artigo só está concluída quando:

- o conteúdo correto está no projeto;
- o frontmatter está válido;
- a imagem está correta;
- os links funcionam;
- o CTA está implementado;
- a página renderiza;
- o layout está responsivo;
- não existem erros conhecidos;
- o artigo segue os manuais;
- o usuário consegue revisar;
- as pendências estão declaradas.

---

# Prompt operacional recomendado para o Hermes

Use este modelo ao solicitar uma publicação:

```text
Leia primeiro:

docs/blog/artigos/README.md

Depois, leia todos os documentos obrigatórios indicados nele.

Analise a estrutura atual do projeto antes de criar ou mover qualquer pasta.

Publique o artigo informado seguindo integralmente o sistema editorial do blog.

Preserve o conteúdo aprovado.

Não reescreva o artigo sem autorização.

Não invente URLs, caminhos, dados, componentes ou regras.

Ao final:

1. execute as validações disponíveis;
2. informe os arquivos criados e modificados;
3. informe os testes realizados;
4. apresente pendências;
5. aguarde minha aprovação antes de mudanças adicionais.
```

---

# Regra final

O objetivo deste sistema não é apenas colocar textos no site.

O objetivo é construir um blog:

- editorialmente consistente;
- tecnicamente confiável;
- útil para empresários;
- conectado às frentes do Grupo Vittore;
- preparado para mecanismos de busca;
- preparado para mecanismos de resposta e inteligência artificial;
- capaz de gerar autoridade;
- capaz de conduzir leitores para próximos passos relevantes;
- sustentável no longo prazo.

Em caso de conflito entre velocidade e consistência, preserve a consistência.

Em caso de dúvida sobre uma regra, não improvise.

Leia os documentos, identifique a pendência e solicite confirmação.