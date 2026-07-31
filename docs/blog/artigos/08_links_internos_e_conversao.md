# Links Internos, Conversão Editorial e Integração com Páginas Comerciais

> **Versão atualizada em 31 de julho de 2026**
>
> Esta versão incorpora a regra obrigatória de 2 a 3 links comerciais contextuais no corpo dos artigos, com destinos e parâmetros UTM aprovados pelo usuário.


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
- regra obrigatória de 2 a 3 links comerciais contextuais;
- parâmetros UTM aprovados para links comerciais internos;
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

O Marco Aurélio trabalha na camada editorial e é responsável por entregar o Markdown final com os links comerciais contextuais já inseridos no corpo do artigo.

Ele deve:

- identificar a categoria principal do artigo;
- utilizar o slug final do artigo;
- selecionar o destino comercial obrigatório correspondente à categoria;
- inserir de 2 a 3 links comerciais contextuais no corpo;
- criar textos âncora naturais e diferentes entre si;
- distribuir os links ao longo do conteúdo;
- utilizar as URLs e UTMs aprovadas neste documento;
- substituir todos os placeholders pelos valores reais;
- preservar a tese, a voz, a utilidade e a naturalidade do artigo;
- realizar auditoria antes da entrega.

O Marco Aurélio não deve:

- inventar páginas de destino;
- criar campanhas UTM diferentes das aprovadas;
- deixar placeholders no Markdown final;
- utilizar âncoras genéricas como `clique aqui`;
- transformar o conteúdo em anúncio;
- inserir links em títulos ou subtítulos;
- concentrar links em parágrafos consecutivos;
- configurar eventos de analytics;
- criar componentes React;
- alterar rotas do site;
- publicar automaticamente.

As regras detalhadas de destino, UTM, quantidade e distribuição estão na seção `Regra obrigatória de links comerciais contextuais`.

## Responsabilidade do usuário

O usuário é responsável por:

- aprovar as páginas comerciais de destino;
- aprovar a estrutura de rastreamento;
- aprovar os artigos e as imagens de capa;
- autorizar mudanças em artigos publicados;
- definir exceções a esta regra;
- validar o resultado final;
- autorizar a publicação.

As seguintes páginas e campanhas já foram confirmadas pelo usuário:

```text
Assessoria Comercial:
https://grupovittore.com.br/assessoria-comercial

Materiais Impressos:
https://grupovittore.com.br/materiais-impressos
```

Portanto, o Marco Aurélio e o Hermes não devem tratar esses dois destinos como pendentes.

## Responsabilidade do Hermes

O Hermes trabalha na camada de implementação.

Ele deve:

- analisar a estrutura atual do projeto;
- ler o Markdown final aprovado;
- verificar se os links comerciais obrigatórios já estão inseridos;
- confirmar a categoria, o slug, o destino, a campanha e a numeração;
- preservar os textos âncora e as URLs aprovadas;
- verificar se as páginas de destino existem;
- validar os links em desktop e mobile;
- preservar a acessibilidade;
- executar as validações técnicas do projeto;
- informar tudo que foi alterado.

O Hermes não deve criar a estratégia comercial por iniciativa própria.

Quando os links obrigatórios estiverem ausentes, incorretos ou com placeholders, ele deve interromper a conclusão, informar a pendência e solicitar correção editorial. Ele não deve inventar novas frases para encaixar links.

A correção puramente técnica de sintaxe Markdown, URL ou escape pode ser feita quando não alterar o texto aprovado.

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

# Regra obrigatória de links comerciais contextuais

Esta seção prevalece sobre orientações genéricas anteriores deste documento.

## Quantidade

Cada artigo deve conter no corpo:

```text
2 links comerciais contextuais
```

Artigos mais longos podem conter:

```text
3 links comerciais contextuais
```

Nunca utilizar mais de 3 links comerciais no corpo.

Não entram nessa contagem:

- banner;
- CTA final;
- menu;
- sidebar;
- rodapé;
- card;
- link do frontmatter.

## Distribuição

O primeiro link deve aparecer na primeira metade do artigo, depois que o problema já estiver contextualizado.

O segundo link deve aparecer na segunda metade, próximo de diagnóstico, decisão, organização ou próximo passo.

O terceiro link só deve ser usado quando o artigo for longo e existir outro contexto realmente natural.

Não inserir links:

- no primeiro parágrafo;
- em títulos ou subtítulos;
- em parágrafos consecutivos;
- em trechos sem relação com a página de destino.

## Destino para cinco categorias

Artigos das categorias:

```text
vendas
marketing
gestao-comercial
crescimento-empresarial
tecnologia-automacoes
```

devem direcionar para:

```text
https://grupovittore.com.br/assessoria-comercial
```

Estrutura obrigatória:

```text
https://grupovittore.com.br/assessoria-comercial?utm_source=blog&utm_medium=internal_link&utm_campaign=assessoria_comercial&utm_content={{categoria_utm}}__{{slug_do_artigo}}__link-corpo-01
```

Identificadores obrigatórios de `categoria_utm`:

```text
vendas
marketing
gestao_comercial
crescimento_empresarial
tecnologia_automacoes
```

Os links seguintes usam:

```text
link-corpo-02
link-corpo-03
```

Exemplo:

```text
https://grupovittore.com.br/assessoria-comercial?utm_source=blog&utm_medium=internal_link&utm_campaign=assessoria_comercial&utm_content=gestao_comercial__crm-nao-e-cadastro__link-corpo-01
```

## Destino para Materiais Gráficos Personalizados

Artigos da categoria:

```text
materiais-graficos
```

devem direcionar para:

```text
https://grupovittore.com.br/materiais-impressos
```

Estrutura obrigatória:

```text
https://grupovittore.com.br/materiais-impressos?utm_source=blog&utm_medium=internal_link&utm_campaign=materiais_impressos&utm_content=materiais_graficos__{{slug_do_artigo}}__link-corpo-01
```

Os links seguintes usam:

```text
link-corpo-02
link-corpo-03
```

Exemplo:

```text
https://grupovittore.com.br/materiais-impressos?utm_source=blog&utm_medium=internal_link&utm_campaign=materiais_impressos&utm_content=materiais_graficos__cartao-de-visita-com-qr-code__link-corpo-01
```

## Formato no Markdown

Usar:

```md
[texto âncora contextual](URL_COMPLETA_COM_UTM)
```

Exemplo para Assessoria Comercial:

```md
Antes de ampliar o investimento em mídia, a empresa precisa verificar se existe uma [estrutura comercial organizada](https://grupovittore.com.br/assessoria-comercial?utm_source=blog&utm_medium=internal_link&utm_campaign=assessoria_comercial&utm_content=marketing__mais-trafego-poucas-vendas__link-corpo-01) capaz de transformar demanda em oportunidades reais.
```

Exemplo para Materiais Impressos:

```md
A escolha do acabamento deve considerar a função do cartão e a percepção que os [materiais impressos personalizados](https://grupovittore.com.br/materiais-impressos?utm_source=blog&utm_medium=internal_link&utm_campaign=materiais_impressos&utm_content=materiais_graficos__acabamento-cartao-de-visita__link-corpo-01) precisam transmitir.
```

## Slug e placeholders

O valor utilizado em `utm_content` deve ser o slug final do artigo.

Todos os placeholders devem ser substituídos antes da entrega e da implementação.

São proibidos no arquivo final:

```text
{{categoria_utm}}
{{slug_do_artigo}}
{{categoria}}
{{slug}}
URL_CONFIRMADA
URL_AQUI
```

## Textos âncora

As âncoras devem ser naturais, descritivas e diferentes entre si.

Possibilidades para Assessoria Comercial:

- assessoria comercial estruturada;
- diagnóstico do processo comercial;
- estrutura comercial organizada;
- gestão comercial com método;
- integração entre marketing e vendas;
- previsibilidade comercial;
- estruturação do funil;
- organização da operação de vendas.

Possibilidades para Materiais Impressos:

- materiais impressos personalizados;
- materiais gráficos profissionais;
- cartão de visita profissional;
- produção de materiais impressos;
- materiais de apresentação da empresa;
- produção gráfica para empresas.

Essas expressões são referências. A âncora final deve fazer sentido na frase e no tema do artigo.

## Tom

A ligação deve ser educativa, contextual e indireta.

Exemplos proibidos:

```text
Contrate agora.
Clique aqui.
Compre agora.
Somos a melhor empresa.
Garanta resultados.
```

O artigo deve continuar útil mesmo que o leitor não clique.

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

Para as seis categorias oficiais do blog, existe agora um destino comercial obrigatório por categoria.

Artigos de:

- Vendas;
- Marketing;
- Gestão Comercial;
- Crescimento Empresarial;
- Tecnologia e Automações;

direcionam para Assessoria Comercial.

Artigos de:

- Materiais Gráficos Personalizados;

direcionam para Materiais Impressos.

Uma exceção só pode ocorrer com autorização expressa do usuário para um artigo específico.

Artigos institucionais, notícias ou conteúdos que não pertençam a essas seis categorias podem não possuir destino comercial direto. Nesses casos, a decisão deve ser registrada no briefing ou no pedido de implementação.

# Estrutura padrão de conversão

Para as seis categorias oficiais, a estrutura padrão é:

```text
2 links comerciais contextuais no corpo
+
até 1 terceiro link quando o artigo for longo
+
1 CTA final, quando aprovado
+
artigos relacionados
```

Os 2 links no corpo são obrigatórios.

O terceiro link é opcional e depende de contexto natural.

O CTA final continua sujeito à estratégia editorial e à aprovação. Banner, CTA final e artigos relacionados não substituem os links obrigatórios no corpo.

# Ligação contextual

A ligação contextual é um trecho do desenvolvimento que conecta o problema discutido a uma solução relacionada.

Para as seis categorias oficiais, devem existir 2 ligações contextuais no corpo, podendo chegar a 3 em artigos longos.

Exemplo:

> Quando a empresa já gera demanda, mas não consegue acompanhar oportunidades, medir conversão ou organizar o CRM, pode ser necessário revisar a estrutura comercial como um todo.

A âncora deve ser aplicada em uma expressão que já faça sentido editorialmente, como:

```text
estrutura comercial organizada
```

ou:

```text
diagnóstico do processo comercial
```

A ligação contextual não deve interromper a explicação e não precisa citar o Grupo Vittore de forma explícita em todas as ocorrências.

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

As duas páginas comerciais abaixo estão confirmadas pelo usuário:

```text
Assessoria Comercial:
https://grupovittore.com.br/assessoria-comercial
```

```text
Materiais Impressos:
https://grupovittore.com.br/materiais-impressos
```

O Hermes deve verificar tecnicamente se:

- a página responde;
- a rota está correta;
- não existe erro;
- o domínio utiliza HTTPS;
- o destino corresponde à categoria.

A presença de UTM aprovada não torna a URL um destino diferente. O caminho base continua sendo a página comercial confirmada.

Para outras páginas, artigos relacionados e contatos, a confirmação continua podendo vir de:

- rota existente no projeto;
- mapa de URLs;
- página publicada;
- indicação explícita do usuário;
- configuração oficial do site.

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

A repetição do mesmo destino comercial é obrigatória entre 2 e 3 vezes no corpo dos artigos das seis categorias oficiais.

Essa repetição é aceitável porque cada link possui:

- posição diferente;
- contexto diferente;
- texto âncora diferente;
- identificador UTM diferente;
- função de acompanhamento diferente.

Os sufixos devem ser:

```text
link-corpo-01
link-corpo-02
link-corpo-03
```

Exemplo inadequado:

- links em parágrafos consecutivos;
- a mesma âncora repetida;
- cinco links para a mesma página;
- links sem relação com o trecho.

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

Os links comerciais no corpo possuem destino obrigatório por categoria, conforme a seção `Regra obrigatória de links comerciais contextuais`.

Isso não significa que todos os artigos devem receber o mesmo texto de CTA final.

A distinção é:

```text
Links contextuais no corpo:
destino obrigatório por categoria

CTA final:
texto e formato adaptados ao contexto do artigo
```

O CTA pode variar conforme:

- estágio de consciência;
- tese;
- conclusão;
- intenção de busca;
- ação aprovada.

Não repetir automaticamente o mesmo título e a mesma descrição de CTA em todos os artigos.

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

Os parâmetros UTM definidos na seção `Regra obrigatória de links comerciais contextuais` foram aprovados pelo usuário e são obrigatórios nos links comerciais do corpo.

Não criar outros parâmetros por iniciativa própria.

Não alterar:

```text
utm_source=blog
utm_medium=internal_link
```

Para Assessoria Comercial, usar:

```text
utm_campaign=assessoria_comercial
```

Para Materiais Impressos, usar:

```text
utm_campaign=materiais_impressos
```

O `utm_content` deve registrar:

```text
categoria
+
slug
+
posição do link
```

Formato:

```text
categoria__slug__link-corpo-01
```

O Hermes deve preservar a URL aprovada e verificar se não existem espaços, acentos, placeholders ou numeração duplicada.

# UTM em links internos

Este projeto possui uma exceção documentada ao padrão geral.

O usuário aprovou o uso de UTM nos links internos comerciais do corpo dos artigos para identificar:

- categoria de origem;
- artigo de origem;
- posição do link;
- campanha comercial.

Portanto, os links definidos neste documento devem manter as UTMs.

O Hermes não deve removê-las com base em uma regra genérica de analytics.

A decisão pode afetar relatórios de atribuição em algumas ferramentas. Essa possibilidade foi aceita no desenho atual da estratégia.

Essa exceção vale somente para:

- links comerciais do corpo direcionados à Assessoria Comercial;
- links comerciais do corpo direcionados a Materiais Impressos.

Links comuns entre artigos não devem receber UTM automaticamente.

# Preservação do canonical

Os links comerciais do corpo podem conter as UTMs aprovadas.

A página de destino deve manter sua própria canonical apontando para a URL canônica sem parâmetros, conforme a implementação existente do site.

O Hermes não deve:

- criar páginas novas para cada UTM;
- alterar a canonical da página comercial para uma URL parametrizada;
- incluir versões parametrizadas no sitemap;
- tratar cada UTM como conteúdo diferente.

Links comuns entre artigos devem continuar apontando para a URL canônica, sem parâmetros desnecessários.

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
- verificar a categoria principal;
- verificar o slug final;
- confirmar a presença de 2 links comerciais no corpo;
- aceitar um terceiro link quando houver contexto natural;
- confirmar o destino correto por categoria;
- validar campanha, `utm_content` e numeração;
- preservar as âncoras aprovadas;
- preservar o texto aprovado;
- validar os links;
- implementar o CTA aprovado;
- configurar rastreamento adicional somente conforme o padrão existente;
- validar acessibilidade;
- validar desktop;
- validar mobile;
- informar alterações.

O Hermes não deve:

- criar novas frases comerciais;
- trocar o destino;
- remover as UTMs aprovadas;
- alterar categoria ou slug na UTM;
- adicionar pressão comercial;
- inserir dois serviços no mesmo artigo;
- inventar URL;
- inventar oferta;
- inventar contato;
- remover conteúdo para abrir espaço;
- alterar a conclusão;
- modificar o tom;
- substituir a âncora aprovada sem motivo;
- publicar link quebrado.

Se o Markdown chegar sem os links obrigatórios ou com placeholders, o Hermes deve informar a pendência e não considerar a implementação concluída.

# Plano de conversão entregue fora do Markdown

O Plínio pode incluir no briefing uma seção de estratégia de links comerciais.

O Marco Aurélio pode utilizar esse plano como orientação editorial.

Entretanto, o artigo final deve ser entregue com os links efetivamente inseridos no próprio Markdown.

Um plano separado pode registrar:

```text
Destino principal
Quantidade
Momentos sugeridos
Textos âncora
URLs completas
CTA final
Artigos relacionados
```

Esse plano não substitui os links dentro do artigo e não deve aparecer como texto público.

# Implementação do plano

Ao receber o artigo final e o plano, o Hermes deve:

1. conferir se os destinos existem;
2. confirmar a categoria e o slug;
3. localizar os links já inseridos no Markdown;
4. validar as URLs completas;
5. verificar `link-corpo-01`, `02` e, quando houver, `03`;
6. preservar os textos âncora;
7. implementar o CTA aprovado;
8. validar artigos relacionados;
9. executar testes;
10. informar pendências.

O Hermes não deve inventar uma nova redação para inserir links que estejam ausentes.

Quando houver ausência editorial, deve solicitar correção ao responsável pelo conteúdo.

# Artigo sem plano de conversão

A ausência de um plano separado não elimina a regra obrigatória dos links comerciais contextuais.

Se o artigo pertencer a uma das seis categorias oficiais, o Markdown final deve conter os links definidos neste documento.

O Marco Aurélio deve aplicar a regra mesmo quando o briefing antigo não possuir uma seção específica de conversão.

O Hermes deve validar a execução.

Para CTA final, artigos relacionados e outros elementos não definidos, não inventar estratégia. Informar a ausência e aguardar orientação.

# Preservação do conteúdo aprovado

O Marco Aurélio deve entregar o artigo com os links comerciais já inseridos.

O Hermes deve preservar:

- frase;
- texto âncora;
- URL;
- UTM;
- posição;
- sentido editorial.

Exemplo aprovado:

```md
A [estrutura comercial organizada](URL_COMPLETA_COM_UTM) ajuda a liderança a entender onde as oportunidades estão parando.
```

O Hermes pode corrigir apenas problemas técnicos que não alterem o conteúdo, como:

- sintaxe Markdown;
- escape;
- quebra indevida;
- caractere inválido;
- URL truncada.

Quando for necessário reescrever uma frase para criar uma ponte, a alteração deve voltar para revisão editorial.

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

- o artigo possui pelo menos 2 links comerciais no corpo?
- o terceiro link, quando existe, possui contexto natural?
- a página de destino corresponde à categoria?
- todos os links abrem?
- não existem erros 404?
- não existem placeholders?
- `utm_source` está como `blog`?
- `utm_medium` está como `internal_link`?
- `utm_campaign` corresponde ao destino?
- `utm_content` contém categoria, slug e posição?
- os sufixos `01`, `02` e `03` não estão duplicados?
- as âncoras são naturais e diferentes?
- os links estão distribuídos?
- não existem links em títulos ou subtítulos?
- links de artigos relacionados apontam para páginas publicadas?
- links externos correspondem às fontes?

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

Leia também o artigo final fornecido.

Analise a estrutura atual do projeto antes de alterar componentes, rotas ou frontmatter.

Valide no Markdown:

1. presença de 2 links comerciais contextuais no corpo;
2. terceiro link somente quando houver;
3. destino correto por categoria;
4. campanha UTM correta;
5. categoria e slug corretos no utm_content;
6. sufixos link-corpo-01, link-corpo-02 e, quando houver, link-corpo-03;
7. ausência de placeholders;
8. textos âncora naturais;
9. distribuição dos links;
10. preservação do conteúdo aprovado.

Não invente URLs.

Não remova as UTMs aprovadas.

Não crie novas frases comerciais.

Não altere a tese, a conclusão ou a voz do artigo.

Não direcione para mais de uma frente comercial sem autorização.

Valide também:

1. links;
2. URLs;
3. CTA;
4. acessibilidade;
5. desktop;
6. mobile;
7. eventos existentes;
8. build.

Se os links obrigatórios estiverem ausentes ou exigirem reescrita editorial, informe a pendência e não considere a tarefa concluída.

Ao final, informe os arquivos modificados, links validados, testes realizados e pendências.
```

# Checklist estratégico

- O artigo pertence a qual categoria?
- O destino comercial corresponde à categoria?
- Existem 2 links comerciais no corpo?
- O terceiro link é realmente necessário?
- A intenção do leitor foi respeitada?
- O conteúdo entrega valor antes dos links?
- As âncoras são contextuais?
- Existe excesso comercial?
- Existe mais de um destino concorrente?
- O artigo funciona sem o clique?
- A conversão é natural?

# Checklist de links internos

- Existem 2 links comerciais contextuais no corpo?
- O terceiro link, quando usado, está justificado?
- As URLs comerciais estão completas?
- As UTMs estão corretas?
- A categoria UTM está padronizada?
- O slug corresponde ao artigo?
- A numeração dos links está correta?
- Não existem placeholders?
- As âncoras são descritivas?
- Os links estão distribuídos?
- Os artigos relacionados existem?
- Estão publicados?
- As URLs editoriais estão corretas?
- O artigo não ficará órfão?
- Os links editoriais apontam para URLs canônicas?

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
- As UTMs comerciais aprovadas foram preservadas?
- Não existem outras UTMs inventadas?
- O canonical da página de destino continua sem parâmetros?
- Não há redirecionamento desnecessário?
- Os eventos seguem o padrão existente?
- O lint passou?
- O build passou?
- O console está limpo?
- O desktop foi validado?
- O mobile foi validado?
- O CTA não causa mudança de layout?

# Definição de concluído

A implementação de links e conversão está concluída quando:

- o destino principal foi respeitado;
- o artigo possui 2 links comerciais contextuais no corpo;
- o terceiro link, quando presente, é natural;
- as URLs são reais;
- as UTMs estão completas e corretas;
- o slug e a categoria estão corretos;
- a numeração está correta;
- não existem placeholders;
- as âncoras estão preservadas;
- o CTA aprovado foi implementado;
- os artigos relacionados funcionam;
- a acessibilidade foi validada;
- desktop funciona;
- mobile funciona;
- o build passa;
- não existem promessas indevidas;
- todas as alterações foram informadas.

# Regra final

O objetivo dos links comerciais não é transformar todos os leitores imediatamente em clientes.

O objetivo é permitir que o leitor avance de forma coerente depois de compreender o problema.

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

Nos artigos das seis categorias oficiais, os links comerciais contextuais são obrigatórios.

A obrigação não elimina a naturalidade.

O artigo deve entregar valor antes de pedir uma ação.

O link deve complementar o raciocínio, não interrompê-lo.

O Marco Aurélio deve inserir os links no Markdown final.

O Hermes deve validar e preservar esses links durante a implementação.

Quando houver problema editorial, o Hermes deve informar a pendência em vez de inventar uma nova frase.

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

O blog do Grupo Vittore deve gerar oportunidades porque ajuda empresários a compreender problemas e tomar decisões melhores.

