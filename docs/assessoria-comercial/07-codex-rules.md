# 07 — Codex Rules

# Regras Obrigatórias para Implementação no Codex — Grupo Vittore

Este documento define as regras obrigatórias que o Codex deve seguir ao desenvolver a landing page do **Grupo Vittore**.

A partir desta versão, a principal regra de execução é:

**O Codex deve seguir fielmente as referências visuais da pasta `public/references/3`, seção por seção.**

As referências não são apenas inspiração.

As referências são a fonte visual principal da implementação.

A página também passa a ter uma nova seção chamada **Inteligência, Tecnologia e Automação**, posicionada depois da seção **Assessoria Personalizada** e antes da seção **FAQ**.

---

# 1. Regra máxima do projeto

A landing page deve ser construída com base nas referências visuais da pasta:

`public/references/3`

Cada seção da página possui uma referência específica ou uma direção visual definida nos documentos oficiais do projeto.

O Codex deve reproduzir cada seção com o máximo de fidelidade possível, respeitando:

* layout;
* estrutura;
* fundo;
* cores;
* composição;
* proporção;
* espaçamento;
* tipografia;
* tamanho dos títulos;
* alinhamento;
* posição dos elementos;
* imagens;
* cards;
* botões;
* gráficos;
* dashboards;
* radar comercial;
* ícones;
* linhas;
* bordas;
* elementos decorativos;
* ritmo visual;
* responsividade.

Não é para reinterpretar.

Não é para criar uma versão própria.

Não é para “melhorar” com base em gosto próprio.

Não é para misturar a direção antiga com a nova.

Não é para remover seções aprovadas.

Não é para mudar a ordem da página sem solicitação direta.

O objetivo é deixar a página visualmente muito próxima das referências atuais e consistente com a identidade premium do Grupo Vittore.

---

# 2. Prioridade entre arquivos

Quando houver conflito entre arquivos, seguir esta ordem de prioridade:

1. Referência visual da seção em `public/references/3`;
2. Estrutura definida em `docs/04-page-structure.md`;
3. Direção visual definida em `docs/06-visual-direction.md`;
4. Regras deste arquivo `docs/07-codex-rules.md`;
5. Copy final em `docs/03-copy-final.md`;
6. Assets finais em `public/brand/3`;
7. Assets complementares em `public/brand/2`, quando aplicável;
8. Demais arquivos do projeto.

Se algum documento antigo contradizer as novas referências, ignorar a regra antiga.

Exemplos:

* Se algum arquivo antigo disser que a página inteira deve ser off-white, mas a referência da Hero for escura, a Hero deve ser escura.
* Se algum arquivo antigo disser para não usar fundo escuro, mas a referência da seção for escura, usar fundo escuro.
* Se algum arquivo antigo disser para centralizar tudo, mas a referência usar composição lateral, seguir a composição lateral.
* Se algum arquivo antigo disser para não usar dashboard, mas a referência tiver dashboard, usar dashboard.
* Se algum arquivo antigo disser para não usar imagem de estátua, mas a referência tiver estátua, usar a estátua.
* Se algum arquivo antigo disser para remover elementos comerciais, mas a referência tiver elementos comerciais, manter os elementos comerciais.
* Se algum arquivo antigo disser para usar grid em todas as seções claras, mas a versão final pede fundo off-white limpo, remover o grid.

A referência visual da seção sempre vence.

---

# 3. Referências obrigatórias por seção

As referências principais estão na pasta:

`public/references/3`

O Codex deve seguir estes arquivos:

## Seção 1 — Hero

`public/references/3/hero-grupo-vittore-referencia2.png`

## Seção 2 — Formulário

`public/references/3/secao-02-formulario-referencia2.png`

## Seção 3 — Processo Comercial

`public/references/3/secao-03-diagnostico-comercial-referencia2.png`

## Seção 4 — Método e Receita

`public/references/3/secao-04-processo-comercial-referencia2.png`

## Seção 5 — Como Trabalhamos

`public/references/3/secao-05-metodo-receita-referencia2.png`

## Seção 6 — Clientes e Parceiros

`public/references/3/secao-06-clientes-parceiros-referencia2.png`

## Seção 7 — Assessoria de Vendas

`public/references/3/secao-07-assessoria-vendas-referencia2.png`

## Seção 8 — Assessoria Personalizada

`public/references/3/secao-08-radar-comercial-referencia2.png`

## Seção 9 — Inteligência, Tecnologia e Automação

Caso exista referência específica em:

`public/references/3`

usar essa referência.

Caso ainda não exista referência específica, seguir a direção definida em:

* `docs/03-copy-final.md`;
* `docs/04-page-structure.md`;
* `docs/06-visual-direction.md`;
* `AI_DESIGN_GUIDE.md`;
* este arquivo `docs/07-codex-rules.md`.

## Seção 10 — FAQ

`public/references/3/secao-09-faq-referencia.png`

## Seção 11 — Rodapé

`public/references/3/secao-10-rodape-referencia.png`

---

# 4. Assets finais

Os assets finais devem ser buscados principalmente em:

`public/brand/3`

Essa pasta deve ser usada para:

* logos;
* símbolos;
* imagens finais;
* fundos finais;
* background da Hero;
* imagens de estátua;
* dashboards;
* gráficos;
* radar comercial;
* imagens de cards;
* ícones;
* elementos visuais prontos;
* elementos de tecnologia;
* elementos de automação;
* elementos de inteligência artificial;
* imagens ou composições relacionadas a dados e integrações.

A pasta `public/references/3` serve para orientar o visual, layout e composição.

A pasta `public/brand/3` serve para os arquivos que devem aparecer na página final.

Se existir um asset final em `public/brand/3`, usar esse asset.

Se existir apenas a referência visual em `public/references/3`, recriar a seção com HTML, CSS, SVG ou componentes, mantendo o visual da referência.

A pasta `public/brand/2` pode ser usada para imagens dos cards da seção **Assessoria de Vendas**, caso os assets dos serviços estejam lá.

Não buscar imagens externas.

Não baixar imagens da internet.

Não usar logos de ferramentas, empresas ou marcas de terceiros se eles não estiverem fornecidos nos assets do projeto.

---

# 5. Regra contra direção antiga

Não seguir mais a regra antiga de que a página inteira precisa ser off-white.

A página agora deve alternar entre seções escuras e claras conforme as referências.

Não usar regras antigas como:

* página inteira clara;
* fundo off-white em todas as seções;
* não usar fundo escuro;
* não usar dashboard;
* não usar imagem forte;
* não usar estátua;
* não usar elementos comerciais;
* não usar radar;
* centralizar todas as seções;
* remover elementos visuais da Hero;
* aplicar grid em todas as seções claras;
* manter estrutura antiga sem a nova seção de tecnologia.

Essas regras antigas não valem mais quando contradizem as referências atuais.

---

# 6. Regras gerais de implementação

O Codex deve:

* usar Next.js;
* usar TypeScript;
* usar Tailwind CSS;
* manter App Router;
* manter código limpo;
* criar componentes organizados;
* evitar repetição desnecessária;
* respeitar responsividade;
* não instalar dependências sem necessidade;
* não buscar imagens externas;
* não usar logos externos;
* não criar conteúdo fora da copy oficial;
* não alterar a ordem das seções;
* não remover seções;
* não criar novas seções além das definidas nos documentos oficiais;
* não implementar integrações externas agora;
* não conectar Supabase, CRM, ClickUp, WhatsApp ou automações sem pedido específico;
* não alterar regras de negócio sem solicitação.

O foco é a landing page visual e estrutural.

---

# 7. Ordem obrigatória das seções

A ordem final da página deve ser:

1. Hero;
2. Formulário;
3. Processo Comercial;
4. Método e Receita;
5. Como Trabalhamos;
6. Clientes e Parceiros;
7. Assessoria de Vendas;
8. Assessoria Personalizada;
9. Inteligência, Tecnologia e Automação;
10. FAQ;
11. Rodapé.

Não alterar essa ordem.

Não misturar elementos de uma seção dentro de outra.

Não colocar a seção de tecnologia antes da Assessoria Personalizada.

Não colocar a seção de tecnologia depois do FAQ.

Não remover a seção de tecnologia depois que ela for implementada.

---

# 8. Copy oficial

A copy oficial da página deve vir do arquivo:

`docs/03-copy-final.md`

Não usar textos antigos.

Não inventar novas frases.

Não alterar títulos, subtítulos e descrições sem necessidade.

Não transformar os textos internos de imagens, gráficos, dashboards e assets visuais em copy escrita separada.

Elementos como:

* números de dashboard;
* labels de gráfico;
* nomes de meses;
* dados de funil;
* dados de radar;
* indicadores visuais;
* textos pequenos dentro de imagens;

devem ser tratados como parte visual do asset, não como copy principal da página.

A nova seção **Inteligência, Tecnologia e Automação** também deve puxar sua copy oficial do arquivo:

`docs/03-copy-final.md`

---

# 9. Regra de fidelidade visual

Para cada seção, o Codex deve comparar mentalmente a implementação com a referência correspondente.

A seção só estará correta se parecer visualmente próxima da referência.

Deve observar:

* o fundo está igual ou muito próximo?
* a composição está igual?
* os elementos estão na mesma posição relativa?
* o título tem tamanho parecido?
* a fonte tem aparência parecida?
* as cores seguem a referência?
* os cards têm o mesmo estilo?
* os botões seguem o padrão?
* as imagens estão na posição correta?
* o espaçamento está parecido?
* os elementos decorativos foram respeitados?
* a seção ficou com a mesma sensação visual?
* a seção respeita a identidade premium do Grupo Vittore?

Se a resposta for não, ajustar.

Quando uma seção ainda não tiver referência específica, como pode acontecer com a seção de **Inteligência, Tecnologia e Automação**, ela deve seguir o padrão visual das seções claras premium da página e não parecer uma seção genérica de tecnologia.

---

# 10. Regra de tipografia

Os títulos principais devem usar fonte serifada premium.

Fontes recomendadas:

* Cormorant Garamond;
* Playfair Display;
* Libre Baskerville;
* Bodoni Moda.

A fonte precisa parecer:

* elegante;
* editorial;
* sofisticada;
* premium;
* institucional;
* semelhante às referências.

Não usar fonte sans-serif genérica nos títulos principais.

Não usar fonte pesada e grosseira.

Não deixar títulos grotescamente grandes.

Não deixar títulos pequenos demais.

O tamanho deve seguir a proporção da referência.

Os títulos das seções claras devem manter padrão visual entre si.

Os textos de apoio, descrições, cards, gráficos e labels devem ter boa leitura.

Não usar fonte de formiguinha.

---

# 11. Regra de títulos

Os títulos devem respeitar a diagramação das referências e os ajustes definidos pelo usuário.

Não aumentar título por conta própria.

Não deixar headline quebrando de forma feia.

Não transformar uma headline em bloco gigante.

Não colocar título em 8, 9 ou 10 linhas se a referência não faz isso.

Não usar line-height apertado demais.

Não usar line-height solto demais.

A hierarquia deve ficar próxima da referência.

Quando uma quebra de título tiver sido definida manualmente, respeitar essa quebra.

Exemplos de quebras já definidas:

## Seção 3 — Processo Comercial

Linha 1:

`Você não tem lucro,`

Linha 2:

`previsibilidade e nem`

Linha 3:

`escala por esse motivo`

## Seção 4 — Método e Receita

Linha 1:

`Você não precisa de mais marketing,`

Linha 2:

`precisa de vendas acontecendo`

Linha 3:

`com método.`

## Seção 9 — Inteligência, Tecnologia e Automação

Quebra recomendada:

Linha 1:

`Inteligência, Tecnologia`

Linha 2:

`e Automação`

O trecho `e Automação` pode ficar em vermelho `#960000`, se isso fizer sentido visualmente.

---

# 12. Regra de fundos

O fundo de cada seção deve seguir sua referência específica.

## Se a referência for escura

Usar fundo escuro.

Pode usar:

* azul marinho profundo;
* imagem de fundo escura;
* elementos em dourado;
* grid técnico;
* dashboards;
* estátua;
* radar;
* gráficos;
* overlays.

Não transformar em off-white.

## Se a referência for clara

Usar fundo claro.

Usar o off-white:

`#FBF8F4`

Pode usar:

* detalhes dourados;
* textos azul marinho;
* destaques vermelhos;
* elementos técnicos muito sutis;
* imagens e diagramas integrados ao fundo.

Não usar branco puro.

Não transformar em fundo escuro.

Não aplicar grid de quadrados nas seções claras se a versão final pede fundo limpo.

---

# 13. Regra de cores

Usar as cores principais da identidade:

* Azul marinho profundo: `#000717`
* Off-white: `#FBF8F4`
* Vermelho imperial: `#960000`
* Dourado: `#B29157`
* Verde CTA: `#008723`

Aplicação:

* azul marinho para textos e fundos escuros;
* off-white para fundos claros e textos em fundos escuros;
* vermelho para trechos de dor, perda, gargalo, automação e destaque em seções claras;
* dourado para detalhes premium, bordas, linhas, ícones e palavras estratégicas em seções escuras;
* verde para botões e CTAs.

Não usar cores aleatórias.

Não usar verde fora de CTA sem motivo.

Não usar vermelho em excesso.

Não usar dourado como destaque principal em todas as frases.

Não usar branco puro como base de seção clara.

---

# 14. Regra da Hero

A Hero deve seguir:

`public/references/3/hero-grupo-vittore-referencia2.png`

A Hero deve ser escura, premium e forte.

Deve conter, conforme versão aprovada:

* eyebrow;
* headline principal;
* destaques em dourado;
* texto de apoio;
* frase de apoio secundária;
* botão verde principal;
* imagem principal/estátua;
* elementos comerciais;
* dashboards;
* benefícios/selos inferiores.

Não usar Hero clara antiga.

Não centralizar tudo se a referência usa composição lateral.

Não remover imagem principal.

Não remover elementos comerciais.

Não usar fundo off-white na Hero se a referência é escura.

Não usar apenas texto centralizado.

Não recolocar menu/header se a versão final removeu esse elemento.

Não colocar ícone no botão verde se a versão final pede botão sem ícone.

A Hero precisa parecer visualmente próxima da referência escura.

---

# 15. Regra da seção de formulário

A seção de formulário deve seguir:

`public/references/3/secao-02-formulario-referencia2.png`

Deve conter:

* fundo claro `#FBF8F4`;
* título à esquerda;
* formulário à direita;
* cards informativos;
* bordas finas;
* botão verde;
* composição premium.

Não transformar em layout genérico.

Não remover os cards informativos.

Não alterar os campos obrigatórios.

Não usar ícones nos cards informativos se a versão final removeu esses ícones.

Não usar ícone no botão verde.

Não deixar linha dourada embaixo do botão verde.

Não deixar setas dos selects coladas na borda direita.

---

# 16. Regra da seção Processo Comercial

A seção Processo Comercial deve seguir:

`public/references/3/secao-03-diagnostico-comercial-referencia2.png`

Deve conter:

* texto à esquerda;
* dashboard à direita;
* lista de três pontos;
* destaque em vermelho;
* divisórias;
* fundo claro `#FBF8F4`;
* visual analítico.

Não adicionar cards extras.

Não adicionar blocos antigos.

Não escrever como copy os textos internos do dashboard.

O dashboard deve ser nítido.

Quando imagens de gráficos ficarem embaçadas, recriar com HTML, CSS, SVG ou componentes.

Manter a diagramação final do título definida no projeto.

---

# 17. Regra da seção Método e Receita

A seção Método e Receita deve seguir:

`public/references/3/secao-04-processo-comercial-referencia2.png`

Deve conter:

* texto à esquerda;
* imagem forte à direita;
* elementos comerciais;
* fundo claro `#FBF8F4`;
* título serifado;
* destaque vermelho;
* linha dourada.

Não transformar a imagem em texto.

Não remover a imagem de impacto.

Não trocar a seção por gráfico simples se a referência tiver composição visual completa.

Não criar gráficos novos nessa seção se a referência não pede.

O texto deve ficar mais para cima, conforme a referência.

A imagem de fundo e o Marco Aurélio devem ficar na proporção e posição corretas.

---

# 18. Regra da seção Como Trabalhamos

A seção Como Trabalhamos deve seguir:

`public/references/3/secao-05-metodo-receita-referencia2.png`

Deve ser escura.

Deve conter:

* fundo azul marinho profundo `#000717`;
* título centralizado;
* cards escuros;
* bordas douradas;
* quatro etapas;
* ícones dourados;
* gráficos inferiores;
* frase final destacada.

Não transformar essa seção em clara.

Não usar cards brancos.

Não remover os gráficos inferiores.

Não simplificar demais.

Não deixar a seção compactada demais.

O texto `COMO TRABALHAMOS` deve ficar em dourado.

Remover o traço dourado acima do eyebrow se a versão final pediu isso.

Não deixar uma faixa azul estranha atrás do texto `O OBJETIVO É SIMPLES:`.

As fontes das descrições devem ser legíveis e confortáveis.

---

# 19. Regra da seção Clientes e Parceiros

A seção Clientes e Parceiros deve seguir:

`public/references/3/secao-06-clientes-parceiros-referencia2.png`

Deve conter:

* fundo claro `#FBF8F4`;
* título centralizado;
* texto de apoio;
* caixa horizontal de logos;
* divisórias verticais;
* placeholders de clientes.

Não buscar logos externos.

Não usar marcas reais sem autorização.

Não usar grid de quadrados no fundo.

Manter placeholders até que os logos reais sejam fornecidos.

---

# 20. Regra da seção Assessoria de Vendas

A seção Assessoria de Vendas deve seguir:

`public/references/3/secao-07-assessoria-vendas-referencia2.png`

Deve conter:

* fundo claro `#FBF8F4`;
* título centralizado;
* subtítulo;
* carrossel horizontal;
* cards grandes;
* imagem no topo dos cards;
* setas;
* indicadores;
* CTA textual.

Não transformar o carrossel em grid comum no desktop.

Não deixar os textos pequenos demais.

Não remover as setas se aparecem na referência.

Não instalar biblioteca externa se o carrossel puder ser feito com CSS/JS simples.

O primeiro card deve aparecer corretamente.

O carrossel deve avançar um card por clique.

Todos os nove serviços devem estar disponíveis no carrossel.

Usar imagens da pasta `public/brand/2` quando forem imagens dos serviços.

---

# 21. Regra da seção Assessoria Personalizada

A seção Assessoria Personalizada deve seguir:

`public/references/3/secao-08-radar-comercial-referencia2.png`

Deve ser escura.

Deve conter:

* fundo azul marinho profundo `#000717`;
* texto à esquerda;
* radar comercial à direita;
* título grande serifado;
* destaques em dourado;
* parágrafos claros;
* frase final destacada.

Não transformar essa seção em clara.

Não trocar o radar por gráfico genérico.

Não remover o bloco final.

---

# 22. Regra da seção Inteligência, Tecnologia e Automação

A seção **Inteligência, Tecnologia e Automação** deve ser inserida depois da seção **Assessoria Personalizada** e antes da seção **FAQ**.

## Objetivo

Mostrar que o Grupo Vittore também atua com:

* tecnologia;
* inteligência artificial;
* automação;
* dados;
* integrações;
* eficiência operacional;
* leitura de performance;
* decisões mais lucrativas.

A seção deve reforçar que tecnologia não é enfeite visual.

Tecnologia deve ser apresentada como parte da arquitetura de crescimento da empresa.

## Base visual

Usar base clara premium:

* fundo off-white `#FBF8F4`;
* texto em azul marinho `#000717`;
* destaque vermelho `#960000`;
* detalhes dourados `#B29157`.

Não usar fundo escuro nessa seção, salvo se uma referência futura pedir explicitamente.

Não usar grid de quadrados no fundo.

Não deixar parecer seção SaaS genérica.

Não usar visual colorido demais.

## Estrutura recomendada

No desktop, usar duas colunas:

## Coluna esquerda

Deve conter:

* eyebrow;
* título principal;
* subtítulo;
* bloco interno “Aplicações estratégicas”;
* três descrições.

## Coluna direita

Deve conter composição visual relacionada a:

* IA;
* automação;
* tecnologia;
* integrações;
* dados;
* fluxos;
* sistemas conectados;
* inteligência aplicada.

Usar asset de `public/brand/3`, se existir.

Se não existir asset pronto, criar composição visual com HTML, CSS ou SVG.

Não usar imagem externa.

Não usar logos reais de ferramentas que não estejam nos assets.

## Copy

A copy deve vir de `docs/03-copy-final.md`.

Eyebrow:

`TECNOLOGIA QUE GERA RESULTADOS`

Título:

`Inteligência, Tecnologia e Automação`

Quebra recomendada:

Linha 1:

`Inteligência, Tecnologia`

Linha 2:

`e Automação`

Subtítulo:

`Ajudamos sua empresa a identificar, implementar e usar a tecnologia certa para ganhar eficiência, reduzir desperdícios e transformar dados em decisões mais lucrativas.`

Subtítulo interno:

`Aplicações estratégicas`

Descrições:

1. `Mapeamos oportunidades de automação e inteligência artificial para simplificar processos operacionais, reduzir tarefas manuais e diminuir custos invisíveis na rotina da empresa.`

2. `Aplicamos tecnologia nas ações de marketing e vendas para gerar dados mais claros, melhorar a leitura da performance e apoiar decisões com mais precisão.`

3. `Acompanhamos os indicadores continuamente para entender o que está funcionando, corrigir gargalos e aumentar a conversão com mais controle sobre margens, esforço e resultado.`

## Regras importantes

Não colocar essa seção depois do FAQ.

Não colocar essa seção antes da Assessoria Personalizada.

Não transformar essa seção em lista simples sem força visual.

Não usar excesso de ícones.

Não usar estética infantil ou futurista clichê.

Não usar imagens externas.

Não baixar imagem da internet.

A seção deve parecer parte natural da landing page.

---

# 23. Regra do FAQ

O FAQ deve seguir:

`public/references/3/secao-09-faq-referencia.png`

Deve conter:

* fundo claro `#FBF8F4`;
* eyebrow centralizado;
* título centralizado;
* perguntas em accordion/gaveta;
* caixas largas;
* bordas finas;
* ícone de “+” à direita;
* respostas abrindo ao clicar.

Não criar FAQ genérico.

Não usar cards pequenos.

Não instalar biblioteca externa sem necessidade.

Não usar grid de quadrados no fundo.

---

# 24. Regra do rodapé

O rodapé deve seguir:

`public/references/3/secao-10-rodape-referencia.png`

Deve conter:

* fundo claro `#FBF8F4`;
* linha fina dourada no topo;
* detalhe central;
* logo à esquerda;
* informações institucionais;
* direitos reservados;
* links à direita;
* elementos gráficos sutis, se fizer sentido.

Não usar rodapé escuro.

Não centralizar tudo no desktop se a referência usa layout com logo à esquerda e links à direita.

Não usar grid de quadrados no fundo.

---

# 25. Responsividade

A versão desktop deve ser a mais fiel possível às referências.

A versão mobile deve adaptar sem perder identidade.

No mobile:

* colunas devem empilhar;
* títulos devem reduzir;
* botões devem ficar legíveis;
* cards devem ter boa leitura;
* imagens devem adaptar sem cortes ruins;
* carrossel deve permitir scroll horizontal;
* FAQ deve funcionar;
* rodapé deve empilhar;
* seção de tecnologia deve empilhar texto e visual;
* nada deve estourar a largura da tela;
* nada deve ficar sobreposto;
* nada deve ficar cortado de forma estranha.

Não sacrificar a leitura no mobile.

Não deixar títulos gigantes.

Não deixar textos minúsculos.

---

# 26. Não instalar dependências sem necessidade

Não instalar bibliotecas externas sem autorização.

Evitar dependências para:

* carrossel;
* accordion;
* animações simples;
* ícones simples;
* gráficos simples;
* elementos visuais simples de tecnologia.

Preferir:

* CSS;
* Tailwind;
* componentes React simples;
* SVG;
* HTML.

Instalar dependência apenas se for realmente necessário e justificar.

---

# 27. Não buscar imagens externas

Não buscar imagens na internet.

Não usar imagens de bancos externos.

Não usar logos de terceiros.

Não usar assets que não estejam no projeto.

Usar apenas:

`public/brand/3`

`public/brand/2`, quando for imagem dos serviços da seção Assessoria de Vendas.

E, como referência visual:

`public/references/3`

---

# 28. Qualidade do código

O código deve ser:

* limpo;
* organizado;
* fácil de entender;
* com componentes separados quando fizer sentido;
* sem repetição desnecessária;
* sem gambiarra visual;
* sem estilos conflitantes;
* sem classes inúteis;
* sem código morto.

Evitar misturar muita lógica dentro de um único arquivo se isso dificultar manutenção.

Não refatorar a página inteira sem necessidade.

---

# 29. Validação final obrigatória

Depois de implementar, o Codex deve verificar:

* a página roda sem erro?
* a Hero está parecida com a referência?
* cada seção segue sua referência?
* as seções escuras estão escuras?
* as seções claras estão claras?
* os títulos usam fonte serifada premium?
* o carrossel funciona?
* o FAQ funciona?
* o formulário está visualmente correto?
* a seção de tecnologia foi inserida no lugar certo?
* a seção de tecnologia está visualmente coerente?
* o rodapé está claro?
* o mobile não quebra?
* não existem elementos antigos sobrando?
* não existem regras antigas interferindo?
* não foram usados textos antigos?

---

# 30. Comandos de verificação

Ao finalizar, rodar:

```bash
npm run dev
```

Se o projeto tiver lint configurado, rodar também:

```bash
npm run lint
```

Se houver build configurado e fizer sentido testar:

```bash
npm run build
```

Corrigir qualquer erro antes de considerar a tarefa concluída.

---

# 31. Relatório final do Codex

Ao concluir a tarefa, informar:

1. quais arquivos foram alterados;
2. quais seções foram modificadas;
3. quais assets foram usados;
4. se a nova seção de tecnologia foi implementada;
5. se a seção de tecnologia entrou entre Assessoria Personalizada e FAQ;
6. se houve algum problema;
7. quais comandos foram rodados;
8. se a página está pronta para revisão visual.

---

# 32. Regra final

Se houver dúvida entre seguir uma interpretação própria ou seguir a referência visual, seguir a referência visual.

Se houver dúvida entre regra antiga e referência nova, seguir a referência nova.

Se houver dúvida entre simplificar e reproduzir, reproduzir.

Se houver dúvida sobre a nova seção de tecnologia, seguir:

1. `docs/03-copy-final.md`;
2. `docs/04-page-structure.md`;
3. `docs/06-visual-direction.md`;
4. `AI_DESIGN_GUIDE.md`;
5. este arquivo `docs/07-codex-rules.md`.

A landing page deve parecer feita a partir das referências atuais da pasta:

`public/references/3`

e não a partir da direção antiga.

A nova seção **Inteligência, Tecnologia e Automação** deve parecer parte natural da página, alinhada ao arquétipo do sábio e ao posicionamento do Grupo Vittore como assessoria de crescimento empresarial.
