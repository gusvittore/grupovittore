# Especificação de Entrega e Implementação dos Artigos em Markdown

## Finalidade deste documento

Este documento define o padrão técnico e editorial dos arquivos Markdown utilizados nos artigos do blog do Grupo Vittore.

Ele estabelece regras para:

- criação do arquivo;
- nome do arquivo;
- codificação;
- frontmatter;
- campos obrigatórios;
- campos opcionais;
- hierarquia de headings;
- links;
- fontes;
- imagens;
- tabelas;
- listas;
- CTAs;
- status de rascunho;
- publicação;
- atualização;
- integração com o site;
- validação;
- responsabilidades do Marco Aurélio;
- responsabilidades do Hermes;
- preservação do conteúdo aprovado.

Este documento deve ser consultado antes de:

- criar um artigo;
- importar um arquivo Markdown;
- editar um artigo;
- publicar;
- atualizar;
- alterar o frontmatter;
- inserir imagem;
- inserir CTA;
- incluir links internos;
- mudar slug;
- mover artigos;
- alterar o sistema de leitura do blog.

O objetivo é garantir que todos os artigos possuam uma estrutura previsível, consistente e compatível com o projeto.

---

# Princípio central

O arquivo Markdown deve conter o conteúdo editorial do artigo.

Ele não deve conter:

- instruções para o Hermes;
- prompts;
- comentários operacionais;
- observações para agentes;
- relatórios de pesquisa;
- briefing de imagem;
- plano de implementação;
- lembretes;
- URLs fictícias;
- componentes improvisados;
- códigos específicos do site sem necessidade documentada.

A separação correta é:

```text
docs/blog/artigos/
regras, manuais e instruções

content/blog/
artigos reais em Markdown

public/
imagens e arquivos públicos

src/
código, componentes e lógica do site
```

O Markdown representa o artigo.

Os documentos internos representam as regras.

O código representa a implementação.

---

# Localização dos artigos

A localização definitiva deve respeitar a estrutura real do projeto.

A estrutura recomendada é:

```text
content/blog/
```

Exemplo:

```text
content/blog/vendas/crm-nao-e-so-cadastro-e-controle-da-operacao-comercial.md
```

A organização por categoria pode ser utilizada quando estiver definida no projeto.

Exemplo:

```text
content/blog/
├── marketing/
├── vendas/
├── gestao-comercial/
├── gestao-empresarial/
├── tecnologia/
└── materiais-graficos/
```

Não crie essa estrutura automaticamente sem analisar o projeto.

Se o sistema atual já utiliza outra pasta, preserve a estrutura existente até que uma mudança seja aprovada.

Não crie duas estruturas paralelas de conteúdo.

---

# Formato do arquivo

Todo artigo deve ser salvo como:

```text
.md
```

Exemplo:

```text
crm-nao-e-so-cadastro-e-controle-da-operacao-comercial.md
```

Não utilize para artigos:

```text
.txt
.docx
.pdf
.html
.rtf
```

Esses formatos podem ser usados para outras finalidades, mas não como fonte principal do conteúdo do blog.

---

# Codificação

Todos os arquivos devem utilizar:

```text
UTF-8
```

O arquivo deve preservar corretamente:

- acentos;
- cedilha;
- aspas;
- caracteres especiais permitidos;
- nomes próprios;
- links;
- textos em português.

Evite salvar em codificações como:

- ANSI;
- Windows-1252;
- ISO-8859-1.

Antes de concluir, confirme que palavras como estas aparecem corretamente:

```text
operação
gestão
conversão
previsibilidade
qualificação
```

---

# Nome do arquivo

O nome do arquivo deve utilizar o slug do artigo.

Formato:

```text
slug-do-artigo.md
```

Exemplo:

```text
investimento-em-trafego-processo-comercial-desorganizado.md
```

## Regras

O nome deve:

- utilizar letras minúsculas;
- não possuir acentos;
- não possuir cedilha;
- não possuir espaços;
- utilizar hífens entre palavras;
- ser descritivo;
- ser estável;
- corresponder ao campo `slug`;
- evitar palavras desnecessárias;
- evitar códigos internos.

## Exemplos adequados

```text
crm-controle-operacao-comercial.md
```

```text
como-identificar-gargalos-comerciais.md
```

```text
materiais-graficos-presenca-de-marca.md
```

## Exemplos inadequados

```text
Artigo Final CRM.md
```

```text
novo-artigo-02.md
```

```text
blog_post_final_corrigido.md
```

```text
crm-versao-nova-atualizada-final-2.md
```

```text
artigo.md
```

---

# Slug

O campo `slug` deve seguir o mesmo padrão do nome do arquivo.

Exemplo:

```yaml
slug: "crm-controle-operacao-comercial"
```

Arquivo:

```text
crm-controle-operacao-comercial.md
```

O slug deve:

- ser único;
- ser descritivo;
- ser legível;
- permanecer estável depois da publicação;
- representar o tema;
- evitar excesso de palavras;
- evitar datas sem necessidade;
- evitar termos genéricos.

Não é obrigatório reproduzir todo o título.

Exemplo:

```yaml
title: "Por que aumentar o investimento em tráfego não resolve um processo comercial desorganizado"
slug: "trafego-processo-comercial-desorganizado"
```

Essa simplificação é permitida quando o slug continua claro.

---

# Estrutura geral do arquivo

Todo artigo deve seguir esta ordem:

```text
1. Frontmatter YAML
2. Introdução
3. Desenvolvimento
4. Conclusão
5. CTA editorial, quando aplicável
6. Referências finais, quando aplicável
```

Exemplo simplificado:

```md
---
title: "Título"
slug: "slug"
draft: true
---

Introdução do artigo.

## Primeira seção

Conteúdo.

## Segunda seção

Conteúdo.

## Conclusão

Conclusão do artigo.
```

---

# Frontmatter

O frontmatter deve aparecer no início do arquivo.

Ele deve ser delimitado por:

```yaml
---
```

no início e no fim.

Exemplo:

```yaml
---
title: "Título do artigo"
slug: "slug-do-artigo"
draft: true
---
```

Não escreva nenhum texto antes do primeiro delimitador.

Não deixe espaços, comentários ou títulos antes do frontmatter.

---

# Modelo oficial de frontmatter

Utilize este modelo como referência:

```yaml
---
title: "Título editorial do artigo"
slug: "slug-do-artigo"
excerpt: "Resumo curto e claro para cards e listagens."
category: "Categoria"
tags:
  - "Tag principal"
  - "Tag complementar"
seoTitle: "Título recomendado para mecanismos de busca"
seoDescription: "Descrição clara do conteúdo e da utilidade da leitura."
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

Esse modelo pode ser adaptado quando o sistema técnico do projeto exigir outros campos.

Não crie novos campos sem necessidade documentada.

---

# Campos obrigatórios

Os campos mínimos esperados são:

```yaml
title:
slug:
excerpt:
category:
tags:
seoTitle:
seoDescription:
author:
authorRole:
publishedAt:
updatedAt:
coverImage:
coverAlt:
canonical:
intent:
draft:
```

Um campo pode estar vazio quando sua informação ainda não foi confirmada.

Não remova o campo apenas porque ele ainda está vazio.

---

# Campo `title`

Exemplo:

```yaml
title: "CRM não é só cadastro: é controle da operação comercial"
```

O campo `title` representa o título editorial principal.

Ele deve:

- ser claro;
- representar o conteúdo;
- ser único;
- evitar clickbait;
- permanecer coerente com o artigo;
- ser utilizado pelo template como H1.

O título pode conter:

- dois-pontos;
- interrogação;
- números;
- pontuação necessária.

Use aspas quando houver caracteres que possam interferir no YAML.

---

# H1 do artigo

O corpo do Markdown não deve possuir H1.

Não use:

```md
# CRM não é só cadastro
```

O template deve gerar o H1 a partir de:

```yaml
title:
```

A estrutura correta é:

```yaml
---
title: "CRM não é só cadastro: é controle da operação comercial"
---
```

seguida diretamente da introdução.

Isso evita:

- H1 duplicado;
- inconsistência entre frontmatter e corpo;
- título repetido visualmente;
- problemas de hierarquia semântica.

---

# Campo `excerpt`

Exemplo:

```yaml
excerpt: "Entenda por que o CRM precisa controlar oportunidades, atividades e conversão, não apenas armazenar contatos."
```

O excerpt é utilizado em:

- cards;
- listagens;
- página inicial do blog;
- artigos relacionados;
- categorias;
- compartilhamentos internos.

Ele deve:

- resumir o conteúdo;
- funcionar fora da página;
- evitar clickbait;
- ser claro;
- não repetir necessariamente a meta description;
- não conter Markdown;
- não conter link;
- não conter CTA.

---

# Campo `category`

Exemplo:

```yaml
category: "Vendas"
```

A categoria deve corresponder à taxonomia real do blog.

Não invente categoria sem validar.

Exemplos possíveis:

```text
Marketing
Vendas
Marketing e Vendas
Gestão Comercial
Gestão Empresarial
Tecnologia
Automação e Inteligência Artificial
Materiais Gráficos
Crescimento Empresarial
```

Esses exemplos não criam automaticamente a taxonomia.

A lista final precisa ser confirmada no projeto.

O uso de acentos e maiúsculas deve permanecer consistente.

---

# Campo `tags`

Exemplo:

```yaml
tags:
  - "CRM"
  - "Pipeline de vendas"
  - "Processo comercial"
```

As tags devem:

- representar entidades ou subtemas;
- ajudar a organizar artigos;
- ser reutilizáveis;
- evitar duplicação;
- evitar repetir a categoria sem necessidade;
- ser poucas e relevantes.

Evite:

```yaml
tags:
  - "Vendas"
  - "Vender"
  - "Venda"
  - "Comercial"
  - "Negócio"
  - "Empresa"
  - "Crescimento"
  - "Resultados"
```

Não crie muitas tags para um único artigo.

---

# Campo `seoTitle`

Exemplo:

```yaml
seoTitle: "CRM não é só cadastro: como controlar a operação comercial"
```

O SEO title pode ser igual ou diferente do título editorial.

Ele deve:

- representar o conteúdo;
- ser específico;
- evitar exageros;
- conter o tema principal naturalmente;
- funcionar em resultados de busca;
- não ser uma sequência de palavras-chave;
- não prometer algo ausente.

Não aplique limite rígido de caracteres.

Use tamanho suficiente para clareza, evitando títulos excessivamente longos.

---

# Campo `seoDescription`

Exemplo:

```yaml
seoDescription: "Veja como o CRM pode organizar pipeline, atividades, conversão e previsão de receita na operação comercial."
```

A descrição deve:

- resumir o artigo;
- explicar a utilidade;
- manter coerência;
- evitar palavras-chave repetidas;
- evitar promessas;
- evitar texto genérico;
- ser única.

Não trate um número específico de caracteres como regra absoluta.

O mecanismo pode exibir outro trecho da página conforme a consulta.

---

# Campo `author`

Padrão:

```yaml
author: "Gustavo Astério"
```

Não alterar o nome sem autorização.

Não abreviar.

Não substituir automaticamente por:

- Grupo Vittore;
- Equipe Grupo Vittore;
- Redação;
- Administrador;
- Hermes;
- Marco Aurélio.

Caso outro autor seja utilizado futuramente, a alteração deve ser documentada.

---

# Campo `authorRole`

Padrão:

```yaml
authorRole: "Fundador do Grupo Vittore"
```

O cargo deve permanecer coerente com a informação institucional atual.

Não invente:

- CEO, quando não estiver definido;
- especialista certificado;
- consultor sênior;
- professor;
- pesquisador;
- formação;
- cargo acadêmico.

Mudanças de cargo devem ser atualizadas de forma consistente no site.

---

# Campo `publishedAt`

Enquanto o artigo estiver em rascunho:

```yaml
publishedAt: ""
```

Quando for publicado:

```yaml
publishedAt: "AAAA-MM-DD"
```

Exemplo:

```yaml
publishedAt: "2026-07-18"
```

Use o padrão:

```text
ISO 8601
```

Formato:

```text
AAAA-MM-DD
```

Não use:

```text
18/07/2026
18-07-2026
July 18, 2026
```

Não preencha a data antes da aprovação de publicação.

---

# Campo `updatedAt`

Enquanto o artigo nunca foi atualizado após a publicação:

```yaml
updatedAt: ""
```

Depois de uma atualização editorial real:

```yaml
updatedAt: "AAAA-MM-DD"
```

Exemplo:

```yaml
updatedAt: "2026-10-04"
```

Não preencher `updatedAt` quando houver apenas:

- movimentação do arquivo;
- correção de caminho;
- ajuste de componente;
- correção de layout;
- alteração de build;
- mudança de nome de imagem;
- atualização técnica sem mudança editorial.

Atualize quando houver:

- nova seção;
- nova fonte;
- correção factual;
- mudança de conclusão;
- atualização de dados;
- alteração relevante no conteúdo;
- revisão substancial.

---

# Campo `draft`

Artigo em rascunho:

```yaml
draft: true
```

Artigo aprovado e publicado:

```yaml
draft: false
```

Quando `draft: true`:

- não deve entrar no sitemap final;
- não deve ser indexado como publicação;
- pode não gerar rota pública;
- pode permanecer em preview;
- não deve aparecer nas listagens públicas;
- `publishedAt` deve permanecer vazio.

Quando `draft: false`:

- o artigo pode aparecer publicamente;
- `publishedAt` precisa estar preenchido;
- imagem e metadados devem estar validados;
- links precisam funcionar;
- o conteúdo deve estar aprovado.

O Hermes não deve alterar `draft` para `false` sem autorização.

---

# Campo `coverImage`

Enquanto a imagem não estiver aprovada:

```yaml
coverImage: ""
```

Depois da implementação:

```yaml
coverImage: "/caminho-confirmado/imagem.webp"
```

Exemplo apenas conceitual:

```yaml
coverImage: "/assets/blog/articles/crm-controle-operacao-comercial.webp"
```

Esse caminho não deve ser utilizado sem confirmar a estrutura real do projeto.

O campo deve:

- apontar para arquivo existente;
- utilizar caminho compatível com o sistema;
- evitar URL quebrada;
- corresponder à imagem aprovada;
- utilizar formato adequado.

Não invente caminho.

---

# Campo `coverAlt`

Enquanto a imagem ainda não existir:

```yaml
coverAlt: ""
```

Depois da aprovação:

```yaml
coverAlt: "Painel de CRM com oportunidades organizadas por etapas do processo comercial."
```

O alt text deve descrever a imagem final.

Não deve:

- imaginar uma imagem ainda não criada;
- repetir o título completo;
- acumular palavras-chave;
- usar frases promocionais;
- começar obrigatoriamente com “imagem de”;
- descrever elementos que não aparecem.

Exemplo inadequado:

```yaml
coverAlt: "CRM vendas melhor CRM comercial pipeline gestão de vendas."
```

---

# Campo `canonical`

Enquanto a URL final não estiver confirmada:

```yaml
canonical: ""
```

Depois da publicação:

```yaml
canonical: "URL_ABSOLUTA_CONFIRMADA"
```

Exemplo conceitual:

```yaml
canonical: "https://dominio-confirmado.com.br/blog/slug-do-artigo"
```

Não invente:

- domínio;
- protocolo;
- rota;
- subdomínio;
- barra final;
- estrutura de URL.

O canonical precisa corresponder à versão principal do artigo.

---

# Campo `intent`

O campo `intent` registra a intenção principal.

Valores recomendados:

```text
informacional
comercial
comparativa
transacional
informacional-comercial
```

Exemplo:

```yaml
intent: "informacional-comercial"
```

Não crie valores diferentes sem necessidade.

O campo serve para organização editorial.

Ele não é um fator direto de ranqueamento.

---

# Campos adicionais

Novos campos podem ser criados quando o sistema técnico precisar.

Exemplos possíveis:

```yaml
featured:
readingTime:
relatedArticles:
ctaType:
noindex:
```

Esses campos não devem ser adicionados apenas porque parecem úteis.

Antes de criar um campo:

1. confirme a necessidade;
2. verifique se o código o utiliza;
3. documente o tipo esperado;
4. defina valor padrão;
5. atualize os artigos existentes;
6. valide impacto;
7. atualize este manual.

Não deixe campos sem função real.

---

# Tipos de valores no YAML

Respeite os tipos.

## Texto

```yaml
title: "Título"
```

## Booleano

```yaml
draft: true
```

Não use:

```yaml
draft: "true"
```

salvo se o sistema exigir texto.

## Lista

```yaml
tags:
  - "CRM"
  - "Vendas"
```

## Campo vazio

```yaml
canonical: ""
```

Não use:

```yaml
canonical:
```

se o parser exigir string.

A implementação deve ser validada com o sistema real do projeto.

---

# Uso de aspas

Use aspas em textos.

Exemplo:

```yaml
title: "CRM não é só cadastro: é controle da operação comercial"
```

Isso reduz risco de erro com:

- dois-pontos;
- caracteres especiais;
- números;
- palavras interpretadas como booleanos;
- datas.

Use aspas duplas de forma consistente.

Caso o texto contenha aspas internas, escape ou reformule.

Exemplo:

```yaml
excerpt: "Entenda por que o termo \"lead qualificado\" precisa de um critério comum."
```

Quando possível, reformule para evitar excesso de escapes.

---

# Introdução do artigo

Depois do frontmatter, o artigo deve começar diretamente pela introdução.

Exemplo:

```md
Quando as vendas não crescem no ritmo esperado, aumentar o investimento em tráfego parece uma decisão lógica.
```

Não use:

```md
# Título do artigo
```

Não use:

```md
Introdução:
```

Não use:

```md
## Introdução
```

salvo quando houver uma razão editorial específica.

A introdução deve funcionar como abertura natural.

---

# Hierarquia de headings

Use:

```text
## para H2
### para H3
#### para H4
```

Exemplo:

```md
## O que o CRM deveria controlar

### Oportunidades e etapas

#### Critérios de avanço
```

Não pule níveis.

Exemplo inadequado:

```md
## Seção principal

#### Subseção
```

Não use H5 ou H6 sem necessidade real.

Não use headings apenas para aumentar visualmente o texto.

---

# Headings e frontmatter

O campo `title` é responsável pelo H1.

O corpo deve começar em H2.

Estrutura:

```text
H1:
gerado pelo template a partir de title

H2:
seções principais

H3:
subseções

H4:
divisão interna de H3
```

O template não deve criar um H1 adicional fora do artigo que concorra com o título.

---

# Parágrafos

Separe parágrafos com uma linha vazia.

Exemplo:

```md
Primeiro parágrafo.

Segundo parágrafo.
```

Não use espaços ou tags HTML para simular separação.

Evite linhas quebradas manualmente dentro do mesmo parágrafo sem necessidade.

---

# Negrito

Use:

```md
**texto em negrito**
```

O negrito pode destacar:

- conceito;
- conclusão;
- termo;
- orientação;
- informação importante.

Não transforme parágrafos inteiros em negrito.

Não destaque palavras-chave repetidamente.

---

# Itálico

Use:

```md
*texto em itálico*
```

Pode ser utilizado para:

- termo estrangeiro;
- ênfase leve;
- título de obra;
- expressão técnica.

Use com moderação.

---

# Listas não ordenadas

Use:

```md
- Primeiro item
- Segundo item
- Terceiro item
```

Listas devem possuir uma função clara.

Evite itens que repetem o mesmo significado.

---

# Listas ordenadas

Use:

```md
1. Primeiro passo
2. Segundo passo
3. Terceiro passo
```

Listas ordenadas são adequadas para:

- sequência;
- processo;
- prioridade;
- etapas;
- fluxo.

Não use números quando a ordem não importar.

---

# Checklists

Use listas simples.

Exemplo:

```md
- O CRM possui responsável?
- Existe próxima atividade?
- O motivo de perda é registrado?
```

A implementação visual pode transformar a lista em checklist por componente.

Evite sintaxe específica como:

```md
- [ ] Item
```

salvo se o sistema já oferecer suporte e o uso estiver definido.

---

# Tabelas

Utilize tabelas quando melhorarem a comparação.

Exemplo:

```md
| Situação | Problema provável | Próxima análise |
|---|---|---|
| Lead sem resposta | Atendimento | Tempo de primeiro contato |
| Proposta parada | Follow-up | Próxima atividade |
```

Tabelas devem:

- ser curtas;
- possuir cabeçalhos;
- funcionar em mobile;
- evitar células enormes;
- utilizar conteúdo objetivo;
- ter relação com o texto;
- ser interpretáveis sem contexto excessivo.

Não use tabela apenas para aparência.

O projeto deve tratar responsividade da tabela.

---

# Links

Sintaxe:

```md
[texto âncora](URL)
```

Exemplo:

```md
O [Google Ads permite importar conversões offline](URL_CONFIRMADA).
```

O texto âncora deve:

- descrever o destino;
- fazer sentido no contexto;
- evitar termos vagos;
- ajudar o leitor.

Evite:

```md
[clique aqui](URL)
```

```md
[saiba mais](URL)
```

quando uma âncora descritiva puder ser utilizada.

---

# URLs não confirmadas

Não deixe placeholders dentro do artigo.

Proibido:

```md
[Assessoria Comercial](URL_AQUI)
```

```md
[Assessoria Comercial](#)
```

```md
[Assessoria Comercial](INSERIR_LINK)
```

Enquanto a URL não existir:

1. escreva o texto naturalmente sem link;
2. registre a recomendação fora do arquivo;
3. aguarde a confirmação;
4. insira durante a implementação.

---

# Links internos

Links internos podem apontar para:

- outros artigos;
- páginas comerciais;
- categorias;
- página do autor;
- páginas institucionais.

Eles devem respeitar:

```text
08_links_internos_e_conversao.md
```

Não invente URL de artigo ainda não publicado.

Não linke toda ocorrência de uma expressão.

---

# Links externos e fontes

Fontes devem aparecer próximas das afirmações.

Exemplo:

```md
A [documentação do Google Ads](URL_CONFIRMADA) diferencia conversões qualificadas e fechadas registradas fora da plataforma.
```

Evite formato excessivamente mecânico:

```md
A plataforma permite conversões offline. [Fonte: Google]
```

Uma seção final de referências pode existir, mas não deve ser a única forma de conectar fonte e afirmação.

---

# Seção final de referências

Quando necessária:

```md
## Fontes e referências

- [Instituição: título da publicação](URL)
- [Instituição: título da documentação](URL)
```

Não inclua fontes não usadas.

Não repita dezenas de links sem necessidade.

O título da seção deve permanecer consistente entre os artigos quando esse padrão for adotado.

---

# Citações

Use citação em bloco:

```md
> Trecho curto e necessário, com atribuição adequada.
```

Evite citações extensas.

Não copie grandes trechos.

Sempre informe a fonte ou o contexto.

---

# Títulos dinâmicos em cards de artigos

O campo editorial `title` é dinâmico e pode aparecer na Home institucional, na página `/blog`, em destaques, listagens, categorias e artigos relacionados.

Todos esses contextos devem renderizar o título por meio do componente central `ArticleCardTitle`.

## Regras obrigatórias

1. O título completo vindo do Markdown deve permanecer legível dentro da área útil do card.
2. Títulos dinâmicos de artigos não podem usar `nowrap`, `white-space: nowrap`, `whitespace-nowrap`, `text-nowrap`, `truncate` ou `line-clamp`.
3. `overflow-hidden` no card ou no carrossel nunca pode ser usado para mascarar texto que ultrapassa a área útil.
4. Card, área de conteúdo e título devem possuir limites seguros equivalentes a `min-w-0` e `max-w-full` quando participarem de layouts flex ou grid.
5. O título deve permitir quebra natural com `whitespace-normal`, `break-words` e `overflow-wrap: break-word`.
6. O padding direito precisa preservar respiro visual equivalente ou próximo ao padding esquerdo.
7. O tamanho e o entrelinhamento precisam ser responsivos para títulos dinâmicos, sem alterar o título editorial.
8. Novos artigos não podem exigir correção manual de diagramação para que o card funcione.

## Título editorial e composição visual opcional

O campo `title` continua sendo a fonte editorial obrigatória e o fallback seguro universal.

Linhas visuais específicas, quando houver suporte técnico, são apenas uma composição opcional. Elas nunca podem ser requisito para carregar ou publicar um artigo. Mesmo quando fornecidas, cada linha deve poder quebrar naturalmente se o espaço disponível for menor que o previsto.

O sistema não pode depender de um mapa obrigatório por slug. Se não houver linhas visuais, `ArticleCardTitle` deve renderizar automaticamente o `title` completo com largura e quebra seguras.

## Regra específica para os previews da página `/blog`

Na página `/blog`, a Leitura em destaque, Últimos Artigos, Conteúdos por Categoria e Leituras recomendadas não podem receber linhas visuais ou manuais cadastradas por artigo.

Esses quatro contextos devem enviar o título editorial completo ao `ArticleCardTitle` e usar composição automática, sem reescrever o conteúdo do Markdown. Os variants exclusivos desses previews usam `text-wrap: balance` em todos os breakpoints para reduzir linhas órfãs no mobile, tablet e desktop, sem alterar fonte, escala ou largura do card.

Campos legados de composição visual podem permanecer no tipo de dados por compatibilidade, mas não são consumidos pelos previews da página `/blog`. Artigos futuros devem funcionar automaticamente, sem cadastro adicional por slug e sem correção manual de quebra.

## Validação responsiva obrigatória

Ao integrar artigo novo ou alterar componentes de cards, testar os títulos reais em:

- 360px;
- 375px;
- 390px;
- 430px;
- desktop.

A validação deve verificar limites reais dos glifos e da caixa do título, padding lateral, ausência de overflow horizontal e presença integral de todas as palavras. Não é suficiente conferir apenas `scrollWidth` da página, porque um ancestral com `overflow-hidden` pode ocultar o defeito.

---

# Código

Blocos de código só devem aparecer quando o tema exigir.

Use:

````md
```text
conteúdo
```