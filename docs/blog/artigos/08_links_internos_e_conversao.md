# Links Internos, Conversão Editorial e Integração com Páginas Comerciais

## Finalidade deste documento

Este documento define como os links internos, links comerciais, chamadas para ação e elementos de conversão devem ser implementados nos artigos do blog do Grupo Vittore.

Ele estabelece regras para:

- links entre artigos;
- links para páginas institucionais;
- links para páginas comerciais;
- textos âncora;
- CTAs editoriais;
- componentes visuais de CTA;
- artigos relacionados;
- clusters temáticos;
- rastreamento de cliques;
- URLs pendentes;
- preservação da experiência de leitura;
- responsabilidades do Marco Aurélio;
- responsabilidades do usuário;
- responsabilidades do Hermes.

Este documento deve ser consultado antes de:

- inserir um link em um artigo;
- alterar uma URL;
- criar um CTA;
- transformar um trecho em botão;
- implementar artigos relacionados;
- direcionar o leitor para um serviço;
- criar eventos de rastreamento;
- alterar textos âncora;
- publicar um artigo;
- atualizar um artigo já publicado.

O objetivo é garantir que o blog funcione como:

```text
canal de educação
+
canal de construção de autoridade
+
canal de pré-aquecimento
+
canal de navegação
+
canal de geração de oportunidades
```

A conversão deve acontecer como consequência da utilidade do conteúdo.

---

# Princípio central

O artigo deve primeiro ajudar o leitor a:

- compreender um problema;
- identificar causas;
- avaliar impactos;
- reconhecer gargalos;
- organizar uma decisão;
- entender possíveis caminhos.

Somente depois disso o conteúdo pode apresentar uma próxima etapa comercial.

A estrutura conceitual é:

```text
problema
↓
contexto
↓
causas
↓
consequências
↓
critérios de análise
↓
possíveis caminhos
↓
próximo passo
↓
página comercial relacionada
```

O artigo não deve começar vendendo.

O leitor não deve precisar clicar em uma página comercial para receber a resposta prometida pelo título.

---

# Separação de responsabilidades

## Responsabilidade do Marco Aurélio

O Marco Aurélio trabalha na camada editorial.

Ele pode entregar:

- destino comercial recomendado;
- justificativa da escolha;
- trecho de ligação contextual;
- texto âncora;
- CTA editorial;
- posição recomendada;
- sugestões de artigos relacionados;
- plano de links internos;
- páginas que precisam existir;
- URLs que ainda precisam ser confirmadas.

O Marco Aurélio não deve:

- inventar URLs;
- inventar slugs de artigos publicados;
- inserir links fictícios;
- criar parâmetros de rastreamento;
- configurar eventos de analytics;
- criar componentes React;
- alterar rotas do site;
- assumir que uma página existe;
- publicar automaticamente.

## Responsabilidade do usuário

O usuário é responsável por:

- aprovar o destino comercial;
- aprovar o CTA;
- confirmar a página de destino;
- informar URLs oficiais;
- aprovar links para artigos;
- autorizar mudanças em artigos publicados;
- definir quando uma menção comercial deve ser removida;
- validar o resultado final.

## Responsabilidade do Hermes

O Hermes trabalha na camada de implementação.

Ele deve:

- analisar a estrutura atual do projeto;
- identificar URLs reais;
- verificar se as páginas existem;
- inserir links confirmados;
- preservar o texto aprovado;
- implementar o CTA visual;
- configurar rastreamento;
- validar navegação;
- validar links;
- evitar duplicação;
- manter acessibilidade;
- informar tudo que foi alterado.

O Hermes não deve criar a estratégia comercial por iniciativa própria.

---

# Destinos comerciais principais

O blog do Grupo Vittore possui duas frentes comerciais principais.

```text
Assessoria Comercial
```

e:

```text
Materiais Gráficos Personalizados
```

Cada artigo deve possuir, quando aplicável, um destino comercial principal.

Não tente direcionar o mesmo artigo para todas as soluções da empresa.

---

# Assessoria Comercial

A Assessoria Comercial deve ser o destino principal de artigos relacionados a:

- vendas;
- gestão comercial;
- CRM;
- pipeline;
- follow-up;
- qualificação;
- atendimento;
- conversão;
- previsão de receita;
- indicadores;
- rotina comercial;
- motivos de perda;
- geração de demanda;
- tráfego pago;
- integração entre marketing e vendas;
- automação comercial;
- tecnologia aplicada ao processo;
- produtividade da equipe;
- gestão de oportunidades;
- processos;
- diagnóstico de gargalos;
- crescimento empresarial;
- previsibilidade;
- organização da operação.

Exemplos de temas:

```text
CRM não é só cadastro: é controle da operação comercial
```

```text
Por que mais tráfego não resolve um comercial desorganizado
```

```text
Como identificar gargalos comerciais antes de investir mais em mídia
```

```text
Por que o follow-up não pode depender da memória do vendedor
```

Nesses casos, a Assessoria Comercial pode aparecer como próxima etapa natural.

---

# Materiais Gráficos Personalizados

Materiais Gráficos Personalizados devem ser o destino principal de artigos relacionados a:

- materiais impressos;
- presença física da marca;
- papelaria corporativa;
- catálogos;
- folders;
- pastas;
- cartões;
- materiais de apresentação;
- materiais comerciais;
- materiais de prospecção;
- comunicação impressa;
- experiência física;
- percepção de valor;
- profissionalismo;
- identidade aplicada;
- materiais para eventos;
- kits corporativos;
- apresentação de propostas;
- relacionamento com clientes.

Exemplos de temas:

```text
Por que materiais gráficos ainda fortalecem a presença de marca
```

```text
Como materiais impressos apoiam a apresentação comercial
```

```text
Catálogo, folder ou pasta: qual material faz sentido para cada objetivo?
```

```text
O papel dos materiais gráficos na percepção de profissionalismo
```

Nesses casos, a frente de Materiais Gráficos Personalizados pode ser apresentada como próxima etapa.

---

# Artigos híbridos

Alguns artigos podem envolver mais de uma frente.

Exemplos:

- materiais impressos dentro de um processo de prospecção;
- tecnologia aplicada ao processo comercial;
- marketing integrado à apresentação física da marca;
- materiais gráficos usados em reuniões comerciais.

Mesmo nesses casos, o artigo deve ter um destino principal.

A escolha deve considerar:

1. a tese do artigo;
2. o problema central;
3. a intenção do leitor;
4. o tema predominante;
5. a solução mais próxima do conteúdo.

A segunda frente pode ser mencionada apenas quando ajudar a compreensão.

Não inclua dois CTAs concorrentes sem necessidade.

---

# Artigos sem destino comercial direto

Nem todo artigo precisa levar imediatamente a um serviço.

Um CTA comercial pode não ser adequado quando o artigo:

- é puramente institucional;
- apresenta uma notícia;
- comunica uma atualização;
- trata de um tema distante das soluções;
- possui intenção exclusivamente navegacional;
- não criou contexto suficiente;
- está no início de um cluster;
- funciona melhor conduzindo para outro artigo;
- possui risco de parecer oportunista.

Nesses casos, o próximo passo pode ser:

- outro artigo;
- uma página de categoria;
- um guia;
- a página do autor;
- uma página institucional;
- nenhuma ação comercial direta.

Não force conversão apenas para cumprir uma regra.

---

# Estrutura padrão de conversão

Quando o tema permitir, a estrutura recomendada é:

```text
1 ligação contextual dentro do artigo
+
1 CTA final
+
artigos relacionados
```

Essa é uma referência, não uma obrigação matemática.

O conteúdo pode precisar de:

- apenas um CTA final;
- apenas um link contextual;
- dois links contextuais;
- nenhum CTA comercial;
- mais links editoriais em artigos longos.

A decisão deve preservar naturalidade.

---

# Ligação contextual

A ligação contextual é um trecho dentro do desenvolvimento que conecta o problema discutido a uma possível solução.

Exemplo:

> Quando a empresa já gera demanda, mas não consegue acompanhar oportunidades, medir conversão ou organizar o CRM, pode ser necessário revisar a estrutura comercial como um todo. A Assessoria Comercial do Grupo Vittore trabalha justamente sobre esse tipo de diagnóstico e organização.

Quando a URL estiver confirmada, a âncora pode ser aplicada em:

```text
Assessoria Comercial do Grupo Vittore
```

A ligação contextual não deve interromper a explicação.

Ela deve aparecer em uma seção na qual a solução seja realmente relevante.

---

# Posição da ligação contextual

Uma ligação comercial não deve aparecer:

- no primeiro parágrafo;
- antes da apresentação do problema;
- antes da resposta principal;
- repetidamente em todas as seções;
- no meio de uma explicação sem relação;
- como banner entre cada bloco;
- como condição para continuar a leitura.

Ela pode aparecer:

- depois do diagnóstico;
- ao explicar caminhos;
- em uma seção sobre implementação;
- antes da conclusão;
- em uma passagem que diferencia problema e solução.

---

# CTA final

O CTA final deve continuar o raciocínio da conclusão.

Estrutura recomendada:

```text
síntese
+
situação em que a solução faz sentido
+
próximo passo
```

Exemplo:

> Aumentar tráfego pode gerar mais oportunidades, mas não corrige falhas de atendimento, CRM e follow-up. Quando o gargalo está na operação comercial, o próximo passo é entender onde as oportunidades estão sendo perdidas e como reorganizar esse processo.

> Conheça a Assessoria Comercial do Grupo Vittore.

Outro exemplo:

> Materiais impressos não substituem posicionamento ou processo comercial. Eles podem, porém, fortalecer a forma como a empresa se apresenta em reuniões, eventos e ações de prospecção.

> Conheça os Materiais Gráficos Personalizados do Grupo Vittore.

---

# Tipos de CTA

## CTA editorial leve

Adequado para leitores no início da consciência.

Exemplos:

> Conheça uma abordagem estruturada para analisar a operação comercial.

> Entenda como organizar esse processo com mais clareza.

> Veja como o Grupo Vittore trabalha a integração entre marketing, vendas e tecnologia.

## CTA de aprofundamento

Adequado quando o artigo já apresentou diagnóstico.

Exemplos:

> Entenda como a Assessoria Comercial pode apoiar o diagnóstico e a organização desse processo.

> Conheça a atuação do Grupo Vittore na estruturação da operação comercial.

## CTA direto

Adequado quando o leitor já demonstra intenção comercial.

Exemplos:

> Conheça a Assessoria Comercial do Grupo Vittore.

> Conheça os Materiais Gráficos Personalizados do Grupo Vittore.

## CTA de contato

Só deve ser usado quando a página e o fluxo comercial estiverem confirmados.

Exemplos:

> Agende uma conversa sobre sua operação comercial.

> Solicite uma análise inicial.

> Solicite um orçamento para seus materiais gráficos.

Não invente oferta, diagnóstico gratuito, reunião ou orçamento quando isso não estiver confirmado.

---

# Estágio de consciência

O CTA deve respeitar o estágio do leitor.

## Leitor pouco consciente

Ele percebe um sintoma, mas ainda não compreende o problema.

Exemplo de artigo:

```text
Por que os leads param de responder?
```

CTA recomendado:

- outro artigo;
- diagnóstico leve;
- conteúdo complementar;
- abordagem educativa.

## Leitor consciente do problema

Ele entende que existe um gargalo.

Exemplo de artigo:

```text
Sinais de que o processo comercial está desorganizado
```

CTA recomendado:

- conhecer a Assessoria Comercial;
- acessar conteúdo de aprofundamento;
- entender como funciona o diagnóstico.

## Leitor consciente da solução

Ele já procura uma forma de organizar a operação.

Exemplo de artigo:

```text
Como funciona uma assessoria comercial
```

CTA recomendado:

- conhecer a página do serviço;
- agendar uma conversa;
- entrar em contato.

## Leitor pronto para agir

Ele demonstra intenção direta.

Exemplo de consulta:

```text
empresa para estruturar CRM e processo comercial
```

CTA recomendado:

- página comercial;
- formulário;
- contato;
- reunião.

Não use o mesmo CTA em todos os estágios.

---

# Texto âncora

Texto âncora é o trecho clicável do link.

Ele deve:

- descrever o destino;
- fazer sentido dentro da frase;
- ajudar o leitor;
- indicar o assunto;
- permanecer natural;
- evitar repetição excessiva.

Exemplo adequado:

```md
A organização do [processo comercial](URL_CONFIRMADA) ajuda a liderança a entender onde as oportunidades estão parando.
```

Outro exemplo:

```md
A [Assessoria Comercial do Grupo Vittore](URL_CONFIRMADA) atua na análise e organização desse tipo de operação.
```

---

# Textos âncora que devem ser evitados

Evite:

```text
clique aqui
```

```text
acesse
```

```text
saiba mais
```

```text
veja aqui
```

```text
link
```

```text
página
```

Essas construções podem ser utilizadas em situações específicas, mas normalmente uma âncora descritiva é melhor.

Evite também âncoras artificiais como:

```text
melhor assessoria comercial para empresas
```

```text
comprar materiais gráficos personalizados baratos
```

```text
empresa número um em vendas
```

O texto âncora não deve parecer manipulação de palavra-chave.

---

# Variação de texto âncora

Ao utilizar vários links para o mesmo destino, varie naturalmente.

Exemplos para Assessoria Comercial:

- Assessoria Comercial do Grupo Vittore;
- organização do processo comercial;
- diagnóstico da operação comercial;
- estruturação comercial;
- integração entre marketing e vendas;
- atuação comercial do Grupo Vittore.

Exemplos para Materiais Gráficos:

- Materiais Gráficos Personalizados;
- materiais impressos para empresas;
- materiais de apresentação comercial;
- soluções gráficas personalizadas;
- materiais corporativos personalizados.

A variação deve seguir o contexto.

Não crie dezenas de âncoras artificiais apenas para SEO.

---

# URLs confirmadas

Um link só pode ser incluído quando a URL estiver confirmada.

A confirmação pode vir de:

- rota existente no projeto;
- mapa de URLs;
- página publicada;
- indicação explícita do usuário;
- configuração oficial do site.

O Hermes deve verificar se:

- a página existe;
- a rota está correta;
- não existe redirecionamento desnecessário;
- a URL final é a versão canônica;
- o link não retorna erro;
- a página está publicada;
- o destino corresponde à âncora.

---

# URLs não confirmadas

Quando a URL não estiver confirmada:

1. não invente a rota;
2. não crie um placeholder no artigo;
3. não utilize `#`;
4. não utilize texto fictício;
5. registre a pendência;
6. aguarde a confirmação;
7. mantenha o trecho sem link quando ele fizer sentido editorialmente.

Exemplo aceitável enquanto a URL não existir:

```md
A Assessoria Comercial do Grupo Vittore atua na análise e organização desse tipo de processo.
```

Exemplo proibido:

```md
A [Assessoria Comercial do Grupo Vittore](#) atua na análise desse processo.
```

Outro exemplo proibido:

```md
A [Assessoria Comercial do Grupo Vittore](URL_AQUI) atua na análise desse processo.
```

---

# URLs futuras

O Marco Aurélio pode recomendar um artigo que ainda não existe.

Exemplo:

```text
Sugestão futura:
Como estruturar um processo de follow-up
```

Essa sugestão deve ficar fora do Markdown publicado.

Não crie link para um artigo inexistente.

Quando o artigo for publicado:

1. confirme o slug;
2. confirme a URL;
3. insira o link;
4. revise o contexto;
5. valide a navegação.

---

# Mapa de URLs

O projeto pode possuir um documento como:

```text
docs/blog/artigos/11_mapa_urls_links_internos.md
```

Esse arquivo pode registrar:

```text
Nome da página:
Tipo:
URL:
Status:
Destino principal:
Observações:
```

Exemplo conceitual:

```text
Nome:
Assessoria Comercial

Tipo:
Página comercial

URL:
URL real confirmada

Status:
Publicada
```

O mapa deve facilitar a implementação.

Ele não substitui a validação da rota real.

---

# Links entre artigos

Links entre artigos devem ajudar o leitor a aprofundar um assunto.

Exemplo:

```text
Artigo atual:
Por que mais tráfego não resolve um comercial desorganizado

Artigos relacionados:
CRM não é só cadastro
Como identificar gargalos comerciais
Como organizar follow-up
```

O link deve aparecer quando o outro artigo:

- explica um conceito;
- aprofunda uma etapa;
- responde uma dúvida complementar;
- oferece um diagnóstico;
- apresenta um próximo passo;
- pertence ao mesmo cluster.

---

# Função dos links internos

Os links internos ajudam:

- navegação;
- descoberta;
- rastreamento;
- contextualização;
- formação de clusters;
- distribuição de autoridade;
- aumento de profundidade;
- continuidade da leitura;
- conversão;
- redução de páginas órfãs.

Eles não devem ser inseridos apenas para aumentar quantidade.

---

# Quantidade de links internos

Não existe um número obrigatório.

A quantidade depende de:

- extensão;
- complexidade;
- número de conceitos;
- disponibilidade de páginas;
- intenção;
- cluster;
- experiência de leitura.

Um artigo pode possuir:

- dois links internos;
- quatro links internos;
- seis links internos;
- apenas um link;
- nenhum link, quando ainda não existirem páginas adequadas.

Evite:

- linkar todas as palavras;
- repetir o mesmo destino em todos os parágrafos;
- inserir links sem relação;
- criar blocos excessivos;
- prejudicar a leitura.

---

# Primeira ocorrência

Não existe obrigação de linkar sempre a primeira ocorrência de um termo.

O link deve aparecer na passagem mais útil.

Exemplo:

A primeira menção a CRM pode fazer parte da introdução.

A segunda menção pode aparecer em uma seção que explica o controle da operação.

O segundo contexto pode ser mais adequado para o link.

---

# Links repetidos para o mesmo destino

Evite repetir o mesmo link muitas vezes dentro de um artigo.

Uma repetição pode ser aceitável quando:

- o artigo é longo;
- os links estão muito distantes;
- um é contextual;
- outro é CTA;
- as funções são diferentes.

Exemplo aceitável:

- um link contextual para Assessoria Comercial;
- um botão final para a mesma página.

Exemplo inadequado:

- cinco links para a Assessoria Comercial em cinco parágrafos seguidos.

---

# Clusters temáticos

Os links internos devem ajudar a construir clusters.

## Cluster de CRM

Possíveis conteúdos:

- CRM como cadastro;
- CRM como controle;
- pipeline;
- campos essenciais;
- motivos de perda;
- atividades;
- forecast;
- integração com marketing;
- automações.

## Cluster de processo comercial

Possíveis conteúdos:

- diagnóstico;
- qualificação;
- atendimento;
- follow-up;
- proposta;
- negociação;
- indicadores;
- produtividade;
- gestão;
- previsibilidade.

## Cluster de geração de demanda

Possíveis conteúdos:

- tráfego pago;
- qualidade dos leads;
- conversão;
- landing pages;
- origem;
- integração;
- métricas;
- aproveitamento da demanda.

## Cluster de materiais gráficos

Possíveis conteúdos:

- pastas;
- catálogos;
- folders;
- papelaria;
- prospecção;
- apresentação;
- presença de marca;
- experiência;
- percepção de valor.

Cada artigo deve possuir uma função dentro do cluster.

---

# Conteúdo central e conteúdos de apoio

Um cluster pode possuir:

```text
conteúdo central
+
conteúdos complementares
```

Exemplo:

```text
Conteúdo central:
Guia de gestão comercial

Conteúdos complementares:
Como estruturar pipeline
Como organizar follow-up
Como definir qualificação
Como utilizar CRM
Como acompanhar conversão
```

Os conteúdos complementares devem apontar para o conteúdo central quando houver relação.

O conteúdo central deve apontar para os complementares.

Isso cria uma rede navegável e coerente.

---

# Páginas órfãs

Nenhum artigo publicado deve depender apenas do sitemap para ser encontrado.

Um artigo deve receber link de pelo menos uma página como:

- página inicial do blog;
- categoria;
- artigo relacionado;
- página de cluster;
- listagem;
- busca interna;
- página institucional.

O Hermes deve verificar se o novo artigo será acessível pela navegação do site.

---

# Artigos relacionados

O bloco de artigos relacionados pode ser gerado por:

- categoria;
- tags;
- lista manual;
- similaridade;
- configuração no frontmatter;
- lógica do projeto.

Antes de alterar o sistema, analise a implementação existente.

O bloco deve priorizar:

- relação temática;
- utilidade;
- continuidade;
- variedade;
- artigos publicados;
- URLs válidas.

Não exiba:

- rascunhos;
- o próprio artigo;
- páginas sem imagem quando o componente exigir;
- artigos sem relação;
- artigos excluídos;
- links quebrados.

---

# Seleção manual versus automática

## Seleção manual

Pode oferecer mais controle editorial.

É adequada quando:

- existem poucos artigos;
- cada link possui função estratégica;
- o conteúdo faz parte de um cluster;
- o CTA depende da sequência de leitura.

## Seleção automática

Pode facilitar escala.

É adequada quando:

- existem muitas páginas;
- categorias e tags estão organizadas;
- o sistema possui boa lógica;
- os resultados são relevantes.

Mesmo em seleção automática, o Hermes deve validar se os artigos exibidos fazem sentido.

---

# Links comerciais no corpo

Links comerciais devem ser identificáveis como parte do texto.

Eles não devem parecer escondidos.

O link deve:

- possuir contraste;
- funcionar com teclado;
- ter estado de foco;
- possuir `href`;
- ser rastreável;
- manter acessibilidade.

Não transforme texto comum em link apenas por cor, sem comportamento claro.

---

# CTA em componente visual

O CTA final pode ser implementado por um componente visual do site.

Exemplo conceitual:

```text
ArticleCTA
```

O componente pode receber:

- tipo;
- título;
- descrição;
- texto do botão;
- URL;
- evento de rastreamento.

A implementação exata depende do projeto.

Não crie um componente novo sem verificar se já existe um equivalente.

---

# Conteúdo do CTA visual

Um CTA pode conter:

```text
título
descrição
botão
```

Exemplo para Assessoria Comercial:

```text
Título:
Seu gargalo pode estar no processo, não na geração de demanda.

Descrição:
Conheça a atuação do Grupo Vittore na análise e organização da operação comercial.

Botão:
Conhecer a Assessoria Comercial
```

Exemplo para Materiais Gráficos:

```text
Título:
Sua apresentação também comunica o nível de profissionalismo da empresa.

Descrição:
Conheça os Materiais Gráficos Personalizados do Grupo Vittore.

Botão:
Conhecer os Materiais Gráficos
```

Esses exemplos precisam ser adaptados ao artigo.

Não utilize o mesmo título em todas as páginas.

---

# CTA editorial e CTA visual

O artigo pode conter um texto editorial de transição e um componente visual.

Exemplo:

```md
## Próximo passo

Quando a empresa já gera demanda, mas não consegue acompanhar oportunidades e medir conversão, o próximo passo pode ser organizar a operação antes de ampliar a mídia.
```

Depois, o template pode renderizar o componente.

Evite repetir exatamente a mesma mensagem no texto e no componente.

O trecho editorial prepara.

O componente apresenta a ação.

---

# CTA no frontmatter

O projeto pode futuramente utilizar campos como:

```yaml
ctaType: "assessoria-comercial"
```

ou:

```yaml
cta:
  type: "assessoria-comercial"
  title: "Título"
  description: "Descrição"
  label: "Texto do botão"
  url: "URL confirmada"
```

Esses campos só devem ser criados quando:

- o projeto precisar;
- a estrutura estiver documentada;
- o parser suportar;
- o template utilizar;
- os artigos existentes forem considerados;
- a decisão for aprovada.

Não adicione campos sem implementação real.

---

# CTA automático por categoria

O projeto não deve associar automaticamente uma categoria a um CTA sem avaliar contexto.

Exemplo de risco:

```text
Todo artigo da categoria Vendas recebe o mesmo CTA.
```

Isso pode gerar:

- repetição;
- mensagem desconectada;
- excesso comercial;
- CTA inadequado;
- baixa relevância.

Um padrão automático pode existir como fallback.

O ideal é permitir adaptação editorial.

---

# Tom do CTA

O CTA deve ser:

- claro;
- profissional;
- convidativo;
- coerente;
- respeitoso;
- direto;
- sem pressão.

Evite:

- urgência falsa;
- medo;
- escassez;
- promessa;
- garantia;
- exagero;
- manipulação.

Exemplos proibidos:

```text
Não perca mais vendas. Contrate agora.
```

```text
Sua empresa está deixando dinheiro na mesa.
```

```text
Transforme seu comercial em poucos dias.
```

```text
Garanta resultados previsíveis.
```

```text
Descubra o segredo para vender mais.
```

---

# Promessas proibidas

Links e CTAs não devem prometer:

- aumento garantido de vendas;
- crescimento em prazo específico;
- percentual de melhoria;
- retorno financeiro;
- redução garantida de custos;
- previsibilidade absoluta;
- quantidade de leads;
- resultado sem participação do cliente;
- sucesso automático.

Prefira linguagem como:

- conhecer;
- entender;
- analisar;
- organizar;
- estruturar;
- identificar;
- avaliar;
- melhorar a visibilidade;
- criar mais controle;
- apoiar decisões.

---

# Relevância editorial

O artigo precisa continuar útil mesmo que:

- o link comercial seja removido;
- o CTA não apareça;
- o leitor não tenha interesse na empresa;
- a página comercial esteja temporariamente indisponível.

Essa é uma regra importante.

O conteúdo não pode depender da oferta para cumprir sua promessa.

---

# Conversão sem interrupção

Evite elementos que interrompam excessivamente a leitura:

- pop-up antes do conteúdo;
- modal obrigatório;
- banner a cada seção;
- CTA fixo cobrindo texto;
- formulário no meio do primeiro parágrafo;
- bloqueio de conteúdo;
- animações invasivas;
- contagem regressiva;
- alertas falsos.

A conversão deve acompanhar a experiência.

Não deve atrapalhá-la.

---

# Sidebar

A sidebar pode conter:

- card do autor;
- categorias;
- artigos relacionados;
- CTA discreto;
- banner institucional.

Não deve possuir vários CTAs concorrentes.

Exemplo de excesso:

- CTA de Assessoria Comercial;
- CTA de Materiais Gráficos;
- CTA de newsletter;
- CTA de WhatsApp;
- formulário;
- banner;
- pop-up;

todos ao mesmo tempo.

O projeto deve estabelecer prioridade visual.

---

# Card do autor

O card do autor pode contribuir para confiança e navegação.

Ele pode conter:

- foto;
- nome;
- cargo;
- descrição;
- link para página do autor;
- LinkedIn;
- e-mail corporativo.

O card do autor não deve ser transformado em CTA comercial agressivo.

A função principal é:

- autoria;
- credibilidade;
- contexto;
- acesso a informações profissionais.

---

# Links de contato

Links de:

- e-mail;
- WhatsApp;
- formulário;
- agendamento;

só devem ser inseridos quando:

- o canal estiver confirmado;
- a URL estiver correta;
- o fluxo estiver ativo;
- o destino estiver autorizado;
- o rastreamento estiver definido.

Não invente:

- número;
- e-mail;
- link de WhatsApp;
- agenda;
- formulário;
- parâmetro.

---

# Links externos comerciais

Um artigo do Grupo Vittore não deve direcionar para serviços de terceiros sem uma razão editorial clara.

Links externos podem apontar para:

- documentação;
- dados;
- estudos;
- ferramentas citadas;
- legislação;
- fontes.

Não transforme o artigo em uma coleção de recomendações comerciais.

Links patrocinados ou afiliados exigem:

- autorização;
- identificação;
- regras específicas;
- transparência.

O blog não deve possuir links afiliados por padrão.

---

# Abertura de links

Links internos normalmente devem abrir na mesma aba.

Links externos podem abrir na mesma aba ou em nova aba, de acordo com o padrão do projeto.

Não force nova aba em todos os links.

Quando utilizar:

```html
target="_blank"
```

garanta os atributos de segurança adequados.

O comportamento deve ser consistente.

---

# Links rastreáveis

Links precisam ser implementados como links reais.

Exemplo:

```html
<a href="/rota-real">Texto âncora</a>
```

Não simule navegação apenas com:

- `div`;
- `span`;
- clique em JavaScript;
- elemento sem `href`.

Isso prejudica:

- acessibilidade;
- rastreamento;
- navegação;
- descoberta;
- comportamento esperado.

---

# Rastreamento de conversão

O projeto pode rastrear:

- clique em link contextual;
- clique no CTA final;
- clique em CTA da sidebar;
- acesso à página comercial;
- clique em contato;
- leitura de artigo relacionado;
- profundidade de rolagem;
- tempo de engajamento.

O rastreamento deve seguir o padrão de analytics do projeto.

Não invente uma nova convenção sem analisar o que já existe.

---

# Eventos de analytics

Exemplos conceituais de eventos:

```text
blog_cta_click
```

```text
blog_internal_link_click
```

```text
blog_commercial_link_click
```

```text
blog_related_article_click
```

```text
blog_author_link_click
```

Esses nomes são exemplos.

Não devem ser implementados automaticamente sem confirmar a convenção atual.

---

# Propriedades de rastreamento

Um evento pode registrar propriedades como:

```text
article_slug
article_category
link_type
link_position
destination
cta_type
anchor_text
```

Exemplo conceitual:

```text
event:
blog_commercial_link_click

article_slug:
crm-controle-operacao-comercial

link_type:
contextual

destination:
assessoria-comercial
```

Não enviar dados pessoais desnecessários.

Não incluir conteúdo confidencial.

---

# Tipos de link para rastreamento

Pode ser útil diferenciar:

```text
contextual
```

```text
cta_final
```

```text
sidebar
```

```text
related_article
```

```text
author_card
```

```text
navigation
```

Essa separação ajuda a compreender qual elemento gera interação.

---

# Parâmetros de URL

Não acrescente parâmetros à URL sem necessidade.

Não invente:

```text
utm_source
utm_medium
utm_campaign
```

para links internos sem estratégia definida.

Parâmetros internos podem:

- poluir URLs;
- criar duplicação em relatórios;
- afetar atribuição;
- gerar URLs desnecessárias;
- confundir canonicalização.

Prefira eventos de analytics para rastrear links internos.

---

# UTM em links internos

Por padrão, não utilize UTM em links internos.

UTMs normalmente são destinados a campanhas externas.

O uso interno pode substituir a origem real da sessão em algumas ferramentas.

Quando houver necessidade específica, a decisão deve ser documentada.

---

# Preservação do canonical

Links internos devem apontar para a URL canônica da página.

Evite linkar para:

- URL com parâmetro desnecessário;
- redirecionamento;
- preview;
- domínio alternativo;
- versão antiga;
- rota com erro;
- URL não canônica.

O Hermes deve confirmar a rota final.

---

# Mudança de URL

Quando uma página comercial ou artigo mudar de URL:

1. identifique todos os links internos;
2. atualize os links;
3. configure redirecionamento;
4. atualize canonical;
5. atualize sitemap;
6. revise rastreamento;
7. valide a página;
8. confirme ausência de erros.

Não confie apenas no redirecionamento para sempre.

Atualize os links internos para o destino final.

---

# Links quebrados

Antes da publicação, valide:

- status da página;
- redirecionamento;
- conteúdo;
- destino;
- protocolo;
- domínio;
- slug;
- maiúsculas;
- barras;
- fragmentos.

Não publique artigos com links comerciais quebrados.

Links de fontes quebrados também precisam ser tratados.

---

# Fragmentos de página

Links para seções específicas podem utilizar fragmentos.

Exemplo conceitual:

```text
/pagina#secao
```

Antes de utilizar, confirme:

- o identificador existe;
- é estável;
- não muda por tradução;
- funciona em mobile;
- não fica escondido por cabeçalho fixo;
- o link abre na posição correta.

Não invente fragmentos.

---

# Links em imagens

A imagem da capa não precisa ser um link dentro da página do próprio artigo.

Nos cards, a imagem pode apontar para o artigo.

O card deve tornar a navegação clara.

Evite criar múltiplos links idênticos com comportamento confuso dentro do mesmo elemento.

A implementação precisa manter acessibilidade.

---

# Artigos publicados

Ao adicionar um novo link em artigo publicado:

- confirme o destino;
- preserve o conteúdo;
- verifique se a inserção muda o sentido;
- valide o layout;
- valide o rastreamento;
- verifique a data de atualização.

Inserir um link sem alterar o conteúdo não exige necessariamente atualizar `updatedAt`.

Uma mudança editorial relevante pode exigir.

---

# Atualização de CTA

A alteração do CTA de um artigo publicado pode ser considerada editorial.

Antes de alterar:

- confirme a solicitação;
- preserve a tese;
- verifique o estágio de consciência;
- valide o novo destino;
- registre a mudança;
- avalie `updatedAt`.

Não substituir todos os CTAs em massa sem revisão.

---

# Migração de componentes

Quando o projeto substituir um CTA antigo por um novo componente:

1. identifique todas as ocorrências;
2. confirme os textos;
3. preserve URLs;
4. preserve rastreamento;
5. valide artigos;
6. valide mobile;
7. evite alterações editoriais;
8. informe impacto.

Não aplicar migração em massa sem testes.

---

# Regras para o Hermes

O Hermes deve:

- ler o artigo;
- compreender a tese;
- ler o plano de conversão, quando fornecido;
- identificar o destino aprovado;
- verificar URLs;
- implementar o link;
- preservar o texto;
- implementar CTA;
- configurar rastreamento;
- validar acessibilidade;
- validar desktop;
- validar mobile;
- informar alterações.

O Hermes não deve:

- criar um CTA por conta própria;
- trocar o destino;
- adicionar pressão comercial;
- inserir dois serviços;
- inventar URL;
- inventar oferta;
- inventar contato;
- criar texto publicitário;
- remover conteúdo para abrir espaço;
- inserir link em toda palavra-chave;
- alterar a conclusão;
- modificar o tom;
- substituir a âncora aprovada sem motivo;
- publicar link quebrado.

---

# Plano de conversão entregue fora do Markdown

O Marco Aurélio pode entregar um plano como:

```text
Destino principal:
Assessoria Comercial

Objetivo:
Conduzir o leitor que identificou falhas no processo para conhecer a atuação do Grupo Vittore.

Ligação contextual:
Inserir após a seção sobre sinais de desorganização.

Texto âncora:
Assessoria Comercial do Grupo Vittore

CTA final:
Conheça como o Grupo Vittore atua na análise e estruturação da operação comercial.

Artigos relacionados:
CRM não é só cadastro
Como identificar gargalos comerciais

URLs pendentes:
Página da Assessoria Comercial
Artigo sobre gargalos
```

Esse plano é operacional.

Ele não deve aparecer como texto público no artigo.

---

# Implementação do plano

Ao receber o plano, o Hermes deve:

1. conferir se os destinos existem;
2. localizar as URLs;
3. revisar o trecho do artigo;
4. inserir o link na posição indicada;
5. implementar o CTA;
6. configurar rastreamento;
7. validar artigos relacionados;
8. executar testes;
9. informar pendências.

Quando uma URL não existir, implemente apenas as partes confirmadas.

Não crie link fictício.

---

# Artigo sem plano de conversão

Quando um artigo não possuir plano:

- não invente estratégia;
- não adicione CTA automaticamente;
- verifique se há um padrão aprovado no projeto;
- informe a ausência;
- aguarde orientação.

Um CTA padrão só pode ser utilizado quando isso estiver documentado e aprovado.

---

# Preservação do conteúdo aprovado

O Hermes pode inserir um link dentro de uma frase existente quando isso não alterar o texto.

Exemplo:

Antes:

```md
A Assessoria Comercial do Grupo Vittore atua na organização desse processo.
```

Depois:

```md
A [Assessoria Comercial do Grupo Vittore](URL_CONFIRMADA) atua na organização desse processo.
```

Isso é uma implementação técnica.

Quando for necessário reescrever a frase para criar a ponte, a alteração deve seguir o conteúdo aprovado.

Não invente a nova redação.

---

# Conteúdo protegido

O Hermes não pode alterar sem autorização:

- tese;
- conclusão;
- promessa editorial;
- ressalvas;
- tom;
- exemplos;
- fontes;
- argumentação;
- CTA aprovado;
- destino aprovado;
- texto âncora estratégico.

A necessidade de um link não justifica reescrever o artigo.

---

# Experiência mobile

Links e CTAs precisam funcionar em dispositivos móveis.

Verifique:

- área de toque;
- tamanho do botão;
- legibilidade;
- quebra de linha;
- espaçamento;
- contraste;
- posição;
- ausência de sobreposição;
- ausência de rolagem horizontal;
- foco;
- carregamento.

Um CTA não deve ocupar espaço desproporcional.

---

# Acessibilidade

Links e botões devem:

- ser identificáveis;
- possuir contraste;
- funcionar com teclado;
- possuir estado de foco;
- ter texto compreensível;
- evitar âncoras genéricas;
- utilizar elemento semântico adequado;
- não depender apenas de cor;
- não possuir área de toque pequena.

Um link navega.

Um botão executa uma ação.

Não utilize botão para navegação quando um link for mais adequado.

---

# Diferença entre link e botão

Use link quando o usuário será levado para:

- outro artigo;
- página comercial;
- página do autor;
- categoria;
- site externo;
- contato por URL.

Use botão quando o elemento:

- abre modal;
- envia formulário;
- altera estado;
- executa ação dentro da página.

Um CTA visual que leva a outra página deve ser implementado semanticamente como link, mesmo que pareça um botão.

---

# Validação de links

Antes de concluir:

- todos os links abrem?
- apontam para o destino correto?
- não existem erros 404?
- não existem placeholders?
- não existem links para rascunhos?
- não existem URLs antigas?
- as âncoras fazem sentido?
- links internos usam URL canônica?
- links externos correspondem às fontes?
- CTAs estão rastreados?
- artigos relacionados estão publicados?

---

# Validação de conversão

Confirme:

- o destino combina com o artigo?
- o CTA aparece depois da entrega de valor?
- não há excesso comercial?
- o texto continua útil sem o CTA?
- o CTA não promete resultado?
- a mensagem combina com o estágio do leitor?
- existe apenas um destino principal?
- o CTA visual não repete excessivamente o texto?
- o link contextual está em uma seção coerente?
- o artigo não parece página de vendas?

---

# Validação técnica

Depois da implementação, execute os comandos definidos no projeto.

Exemplos comuns:

```bash
npm run lint
npm run build
```

Consulte o `package.json`.

Também verifique:

- console;
- navegação;
- desktop;
- mobile;
- eventos;
- acessibilidade;
- links externos;
- links internos;
- componentes;
- renderização;
- sitemap quando aplicável.

---

# Problemas que impedem a publicação

Não publique quando houver:

- URL fictícia;
- link quebrado;
- CTA sem destino;
- link para rascunho;
- promessa não autorizada;
- CTA desconectado;
- vários destinos concorrentes;
- artigo relacionado inexistente;
- evento com erro;
- componente quebrado;
- botão inacessível;
- navegação sem `href`;
- alteração editorial não aprovada;
- conteúdo comercial excessivo;
- link para página errada.

---

# Relatório após implementação

Ao concluir, o Hermes deve informar:

```text
Artigo:
Slug:
Destino comercial principal:
Link contextual:
Texto âncora:
Posição:
CTA final:
URL utilizada:
Artigos relacionados:
Eventos configurados:
Arquivos modificados:
Testes executados:
Resultado:
Pendências:
```

Não afirmar que os links funcionam sem validar.

---

# Exemplo de relatório

```text
Artigo:
CRM não é só cadastro: é controle da operação comercial

Destino principal:
Assessoria Comercial

Link contextual:
Inserido na seção sobre organização da operação

Texto âncora:
Assessoria Comercial do Grupo Vittore

CTA:
Componente final implementado

Artigos relacionados:
Dois artigos publicados adicionados

Rastreamento:
Evento de clique configurado conforme o padrão existente

Validações:
Links testados
Desktop validado
Mobile validado
Build concluído

Pendências:
Nenhuma
```

---

# Prompt operacional para o Hermes

Use este modelo ao solicitar a implementação:

```text
Leia primeiro:

docs/blog/artigos/README.md
docs/blog/artigos/08_links_internos_e_conversao.md

Leia também o artigo e o plano de conversão fornecido.

Analise a estrutura atual do projeto antes de alterar componentes, rotas ou frontmatter.

Implemente somente:

1. links internos confirmados;
2. link comercial aprovado;
3. CTA aprovado;
4. artigos relacionados publicados;
5. rastreamento conforme o padrão existente.

Não invente URLs.

Não utilize placeholders.

Não crie novos textos comerciais.

Não altere a tese, a conclusão ou a voz do artigo.

Não direcione para mais de uma frente comercial sem autorização.

Valide:

1. links;
2. URLs;
3. CTA;
4. acessibilidade;
5. desktop;
6. mobile;
7. eventos;
8. build.

Ao final, informe os arquivos modificados, testes realizados e pendências.
```

---

# Checklist estratégico

- O artigo possui destino principal?
- O destino combina com a tese?
- A intenção do leitor foi respeitada?
- O conteúdo entrega valor antes do CTA?
- O CTA continua o raciocínio?
- Existe excesso comercial?
- Existe mais de um destino concorrente?
- O artigo funciona sem a oferta?
- A página comercial está confirmada?
- A conversão é natural?

---

# Checklist de links internos

- Os artigos relacionados existem?
- Estão publicados?
- As URLs estão corretas?
- A relação temática é real?
- As âncoras são descritivas?
- Não existem links repetidos excessivamente?
- O artigo não ficará órfão?
- Os links apontam para URLs canônicas?
- Não existem placeholders?
- Não existem rascunhos públicos?

---

# Checklist de CTA

- O texto foi aprovado?
- O destino foi aprovado?
- O CTA combina com o estágio do leitor?
- Não existe promessa?
- Não existe urgência falsa?
- O botão funciona?
- A área de toque é adequada?
- O CTA é acessível?
- O mobile funciona?
- O rastreamento funciona?
- O CTA não repete excessivamente outro trecho?

---

# Checklist técnico

- Os links possuem `href`?
- O destino retorna corretamente?
- Não há erro 404?
- Não há redirecionamento desnecessário?
- O canonical está preservado?
- Os eventos seguem o padrão?
- O lint passou?
- O build passou?
- O console está limpo?
- O desktop foi validado?
- O mobile foi validado?
- O CTA não causa mudança de layout?
- Não existem UTMs internas indevidas?

---

# Definição de concluído

A implementação de links e conversão está concluída quando:

- o destino principal foi respeitado;
- os links internos são úteis;
- as URLs são reais;
- o link contextual está correto;
- o CTA foi implementado;
- o CTA não prejudica o conteúdo;
- os artigos relacionados funcionam;
- o rastreamento foi validado;
- a acessibilidade foi validada;
- desktop funciona;
- mobile funciona;
- o build passa;
- não existem placeholders;
- não existem promessas;
- todas as alterações foram informadas.

---

# Regra final

O objetivo dos links internos e dos CTAs não é transformar todos os leitores imediatamente em clientes.

O objetivo é ajudar o leitor a avançar de forma coerente.

A progressão deve ser:

```text
compreender
+
aprofundar
+
confiar
+
avaliar
+
agir
```

O artigo deve entregar valor antes de pedir uma ação.

O link deve ajudar antes de vender.

O CTA deve continuar o raciocínio, não interrompê-lo.

O Hermes não deve inventar estratégia, URL, oferta ou texto comercial.

Quando não houver URL confirmada, mantenha o trecho sem link.

Quando não houver CTA aprovado, não crie um.

Quando não houver relação real com uma página comercial, priorize outro conteúdo.

A conversão deve preservar:

```text
clareza
+
utilidade
+
credibilidade
+
naturalidade
+
experiência
```

O blog do Grupo Vittore deve gerar oportunidades porque ajuda empresários a compreender problemas e tomar decisões melhores, não porque pressiona o leitor.