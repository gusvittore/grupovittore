Estrutura Final da Landing Page — Grupo Vittore

Este documento define a estrutura final da landing page do Grupo Vittore, com base nas referências visuais atuais da pasta:

public/references/3

A partir desta versão, as referências visuais da pasta public/references/3 continuam sendo a principal fonte de verdade para layout, composição, proporção, fundo, espaçamento, hierarquia visual, estilo de cards, posicionamento de elementos, estilo de títulos e direção estética de cada seção.

A copy oficial da página deve vir do arquivo:

docs/03-copy-final.md

A implementação deve respeitar a copy, mas a estrutura visual deve seguir as imagens de referência seção por seção.

A página agora também possui uma seção adicional de Inteligência, Tecnologia e Automação, posicionada depois da seção Assessoria Personalizada e antes da seção FAQ.

1. Regra principal da página

A landing page deve ser construída copiando o padrão visual das referências da pasta:

public/references/3

Cada seção possui uma referência visual específica ou uma direção visual definida neste documento.

O Codex deve reproduzir cada seção com o máximo de fidelidade possível, respeitando:

layout;
proporção;
fundo;
cores;
espaçamento;
tamanho dos títulos;
estilo da fonte;
hierarquia visual;
posição dos elementos;
composição geral;
cards;
botões;
gráficos;
imagens;
ícones;
divisórias;
respiro visual.

Não é para reinterpretar a direção visual.

Não é para criar um layout novo baseado em gosto próprio.

Não é para misturar regras antigas com as novas referências.

Não é para mudar a ordem das seções sem solicitação direta.

A prioridade visual é:

Referência visual da seção em public/references/3;
Copy oficial em docs/03-copy-final.md;
Assets finais em public/brand/3;
Regras gerais deste documento.
2. Regra de conflito entre documentos

Caso exista conflito entre qualquer arquivo antigo e as novas referências visuais da pasta public/references/3, a referência visual da seção deve vencer.

Exemplo:

Se algum documento antigo disser que a página inteira deve ser off-white, mas a referência da Hero for escura, a Hero deve ser escura.

Se algum documento antigo disser para não usar fundo escuro, mas a referência da seção for escura, a seção deve seguir o fundo escuro da referência.

Se algum documento antigo disser para centralizar tudo, mas a referência da seção tiver texto alinhado à esquerda, o alinhamento da referência deve ser seguido.

O objetivo agora é reproduzir a landing page no padrão visual das referências atuais, não no padrão antigo.

3. Paleta visual da landing page

A página trabalha com duas bases visuais principais, conforme as referências.

Base escura premium

Usada nas seções cuja referência visual é escura.

Cores principais:

Azul marinho profundo: #000717
Dourado: #B29157
Branco/off-white para textos: #F8F4F0
Verde para botões: #008723

Essa base aparece em seções como:

Hero;
Como Trabalhamos;
Assessoria Personalizada.
Base clara premium

Usada nas seções cuja referência visual é clara.

Cores principais:

Off-white: #FBF8F4
Azul marinho para textos: #000717
Vermelho imperial para destaques: #960000
Dourado para detalhes: #B29157
Verde para botões: #008723

A escolha entre fundo escuro ou claro não deve ser feita por regra geral.

A escolha deve seguir a referência visual de cada seção.

Regra atual para fundos off-white

Nas seções claras da página, usar o fundo off-white:

#FBF8F4

As seções claras não devem usar grid de fundo, exceto quando uma referência específica exigir um elemento decorativo pontual.

O fundo dessas seções deve ser limpo, premium e leve.

4. Tipografia geral

A tipografia deve seguir o estilo premium das referências.

Títulos principais

Os títulos principais devem usar fonte serifada premium, com aparência editorial, sofisticada e institucional.

Fontes recomendadas:

Cormorant Garamond;
Playfair Display;
Libre Baskerville;
Bodoni Moda.

A fonte deve se aproximar visualmente das referências.

Os títulos não devem parecer fonte padrão de site genérico.

Os títulos não devem ficar grotescamente grandes.

O tamanho deve seguir a proporção da referência de cada seção.

Os títulos das seções claras, a partir da seção 2, devem manter um padrão visual consistente:

fonte serifada premium;
peso um pouco mais forte/visível;
cor azul marinho #000717;
destaque vermelho #960000 quando indicado pela copy;
espaçamento confortável;
boa leitura em desktop e mobile.
Textos de apoio

Parágrafos, descrições, labels e textos menores devem usar uma fonte limpa, legível e refinada.

A fonte dos textos de apoio deve ser consistente ao longo da página.

Descrições, bullets e textos internos de cards não devem ficar pequenos demais.

Eyebrows

Os textos pequenos acima dos títulos devem seguir o padrão das referências:

uppercase;
letter-spacing amplo;
dourado;
fonte sans-serif;
aparência técnica e premium;
tamanho proporcional ao da referência.
5. Arquivos de referência por seção

As referências principais estão na pasta:

public/references/3

Cada seção deve seguir o respectivo arquivo quando ele existir:

Hero
public/references/3/hero-grupo-vittore-referencia2.png
Formulário
public/references/3/secao-02-formulario-referencia2.png
Processo Comercial
public/references/3/secao-03-diagnostico-comercial-referencia2.png
Método e Receita
public/references/3/secao-04-processo-comercial-referencia2.png
Como Trabalhamos
public/references/3/secao-05-metodo-receita-referencia2.png
Clientes e Parceiros
public/references/3/secao-06-clientes-parceiros-referencia2.png
Assessoria de Vendas
public/references/3/secao-07-assessoria-vendas-referencia2.png
Assessoria Personalizada
public/references/3/secao-08-radar-comercial-referencia2.png
Inteligência, Tecnologia e Automação
Esta é uma seção nova. Caso exista uma referência visual específica para ela na pasta public/references/3, ela deve ser seguida. Caso ainda não exista, seguir a estrutura e direção visual definida neste documento.
FAQ
public/references/3/secao-09-faq-referencia.png
Rodapé
public/references/3/secao-10-rodape-referencia.png
6. Assets finais

Os arquivos da pasta public/references/3 são referências visuais.

Os assets finais, imagens prontas, fundos, logos, gráficos, dashboards, estátuas, imagens de cards e elementos que devem aparecer na página devem ser buscados principalmente em:

public/brand/3

Se existir um asset final correspondente na pasta public/brand/3, ele deve ser usado.

Se uma imagem existir apenas como referência em public/references/3, ela deve ser usada como guia visual para recriar a seção com HTML, CSS, SVG ou componentes.

A exceção é quando o arquivo de referência também for explicitamente usado como asset final pelo projeto.

Para a seção de Assessoria de Vendas, as imagens dos cards de serviços podem ser buscadas em:

public/brand/2

Caso existam imagens correspondentes aos serviços:

Arquitetura de Receita;
Processo Comercial Inteligente;
Demanda Qualificada;
Comunicação que Vende;
Gestão de Leads e Follow-up;
Dados e Indicadores Comerciais;
Tecnologia e Automação;
Rotina de Crescimento;
Direção Estratégica.

Para a nova seção de Inteligência, Tecnologia e Automação, usar preferencialmente os assets relacionados a tecnologia, IA, automação, integrações, fluxos, dados e inteligência que estiverem disponíveis em:

public/brand/3

Não buscar imagens externas sem autorização.

Não usar logos de terceiros de forma aleatória.

7. Estrutura final da página

A landing page terá a seguinte ordem:

Hero
Formulário
Processo Comercial
Método e Receita
Como Trabalhamos
Clientes e Parceiros
Assessoria de Vendas
Assessoria Personalizada
Inteligência, Tecnologia e Automação
FAQ
Rodapé

Não alterar essa ordem.

Não criar novas seções além dessas.

Não remover seções.

Não misturar elementos de uma seção dentro de outra.

Seção 1 — Hero
Referência principal

public/references/3/hero-grupo-vittore-referencia2.png

Objetivo

Abrir a página com alto impacto visual, autoridade e posicionamento premium.

A Hero deve transmitir que o Grupo Vittore trabalha com assessoria de vendas, marketing de performance, diagnóstico, método e controle comercial.

Direção visual

A Hero deve seguir o estilo da referência:

fundo escuro premium;
azul marinho profundo #000717;
elementos em dourado;
visual de autoridade;
estética de assessoria estratégica;
imagem do busto de Marco Aurélio em destaque;
elementos gráficos comerciais discretos;
layout amplo;
botão verde principal;
indicadores ou selos inferiores, se estiverem presentes na referência;
composição visual forte, premium e memorável.
Estrutura visual esperada

A Hero deve conter:

Eyebrow da Hero;
Headline principal;
Destaques em dourado, conforme referência;
Texto de apoio;
Frase de apoio secundária;
Botão principal verde;
Elementos de autoridade/benefícios inferiores;
Imagem principal do busto;
Fundo escuro com elementos comerciais, gráficos e linhas conforme referência.
Copy

A copy deve vir do docs/03-copy-final.md.

A frase principal deve manter a ideia:

“Seu comercial não perde vendas só para concorrentes. Ele também perde para o próprio processo.”

A distribuição visual da frase deve seguir a referência, inclusive com os destaques de cor.

Regras importantes

Não transformar a Hero em seção clara.

Não centralizar tudo.

Não usar a versão antiga da Hero off-white.

Não recolocar menu/header se ele tiver sido removido da versão final.

Não inserir botão secundário se a versão final usa apenas um botão principal.

Não adicionar ícone dentro do botão principal se a versão final não usa ícone.

A Hero deve ficar o mais próxima possível da referência atual.

Seção 2 — Formulário
Referência principal

public/references/3/secao-02-formulario-referencia2.png

Objetivo

Captar leads interessados no diagnóstico comercial.

A seção deve transmitir confiança, clareza e sofisticação.

Direção visual

A seção deve seguir a referência clara:

fundo off-white #FBF8F4;
título grande à esquerda;
formulário à direita;
cards informativos à esquerda;
bordas finas em dourado;
botão verde grande;
visual limpo, elegante e premium.
Estrutura visual

No desktop, a seção deve ter duas colunas.

Coluna esquerda
Título principal;
Trecho em vermelho, se indicado na copy;
Divisor decorativo dourado;
Card informativo 1;
Card informativo 2.
Coluna direita
Card do formulário;
Labels dos campos;
Inputs;
Selects;
Botão verde.
Campos do formulário
Nome completo;
Seu melhor e-mail;
DDD + WhatsApp;
Empresa;
Qual o seu setor?;
Faturamento mensal.
Botão

Receber mais informações

Regras importantes

Não colocar ícone dentro do botão verde, se a versão final não usar ícone.

Não colocar linha dourada embaixo do botão verde.

O botão deve ser inteiro verde.

Os selects devem ter a seta visualmente bem posicionada, sem ficar encostada demais na borda direita.

Os cards informativos não devem usar ícones se a versão final removida não usa ícones.

Os textos dos cards informativos devem seguir a mesma fonte dos textos de apoio da página.

Mobile

No mobile, empilhar:

Título;
Cards informativos;
Formulário.

A composição mobile deve manter a elegância e não quebrar o layout.

Seção 3 — Processo Comercial
Referência principal

public/references/3/secao-03-diagnostico-comercial-referencia2.png

Objetivo

Mostrar que o problema comercial não está apenas na falta de esforço, mas na falta de processo, previsibilidade e condução.

Direção visual

A seção deve seguir exatamente a referência clara:

fundo off-white #FBF8F4;
texto à esquerda;
painel/diagnóstico comercial à direita;
título grande serifado;
destaque em vermelho;
lista de três pontos;
linhas divisórias sutis;
painel comercial recriado visualmente à direita;
elementos decorativos leves, sem grid pesado.
Estrutura visual
Lado esquerdo
Eyebrow;
Título principal;
Trecho em vermelho;
Ponto 1;
Divisor fino;
Ponto 2;
Divisor fino;
Ponto 3.
Título

O título deve seguir a diagramação final definida:

Linha 1: Você não tem lucro,
Linha 2: previsibilidade e nem
Linha 3: escala por esse motivo.

A fonte deve ser um pouco maior e mais visível, mantendo o padrão premium das demais seções claras.

Lado direito

O painel comercial deve ser recriado com HTML, CSS, SVG ou componentes.

Não usar imagem embaçada para os gráficos.

O painel deve conter visualmente:

cards superiores de indicadores;
gráfico de evolução de receita;
funil comercial;
jornada do cliente;
qualidade da demanda;
gargalos do processo;
maturidade comercial;
insights inferiores.
Regras importantes

Não escrever como copy principal os textos pequenos dentro do dashboard.

Não adicionar cards extras.

Não adicionar blocos que não aparecem na referência.

Não adicionar frases antigas fora da copy atualizada.

Não usar layout centralizado se a referência for em duas colunas.

Os elementos gráficos devem parecer parte do layout da página, não imagens coladas.

O fundo dos cards gráficos deve conversar com o off-white da seção, evitando branco puro destoante.

Seção 4 — Método e Receita
Referência principal

public/references/3/secao-04-processo-comercial-referencia2.png

Objetivo

Reposicionar a necessidade do visitante: ele não precisa apenas de mais marketing, precisa de vendas acontecendo com método.

Direção visual

A seção deve seguir a referência clara com imagem de impacto:

fundo off-white #FBF8F4;
texto à esquerda;
imagem/estátua e elementos comerciais à direita;
título serifado grande, mas proporcional;
destaque em vermelho;
linha dourada fina;
parágrafo de apoio;
gráficos e elementos comerciais como parte visual;
composição ampla e sofisticada.
Estrutura visual
Eyebrow alinhado à esquerda;
Título principal;
Trecho em vermelho;
Linha dourada;
Texto de apoio;
Imagem/asset principal à direita;
Elementos de gráfico e método comercial conforme referência.
Título

O título deve seguir a estrutura:

Linha 1: Você não precisa de mais marketing,
Linha 2: precisa de vendas acontecendo
Linha 3: com método.

A fonte deve seguir o mesmo padrão visual dos títulos das seções claras anteriores, principalmente seção 2 e seção 3.

O texto, o eyebrow e o conteúdo devem ficar mais para cima, seguindo a referência.

Assets

Usar imagem final da seção, se existir em:

public/brand/3

A imagem deve ficar integrada ao fundo, sem parecer print colado de forma errada.

A imagem de plano de fundo e a imagem do busto devem seguir a proporção, posição e escala da referência.

Regras importantes

Não transformar os elementos gráficos da imagem em texto da copy.

Não criar uma versão simplificada demais.

Não remover a composição visual com a imagem/estátua se ela estiver na referência.

Não criar gráficos novos nessa seção se a referência não pede isso.

Seção 5 — Como Trabalhamos
Referência principal

public/references/3/secao-05-metodo-receita-referencia2.png

Objetivo

Explicar visualmente como o trabalho do Grupo Vittore acontece na prática.

Direção visual

A seção deve seguir a referência escura:

fundo azul marinho profundo #000717;
textos claros;
detalhes em dourado;
cards com bordas douradas;
quatro cards principais;
ícones dourados;
números em destaque;
pequenos gráficos inferiores;
frase final em bloco destacado;
estética premium e estratégica.
Estrutura visual
Eyebrow centralizado;
Título principal centralizado;
Subtítulo centralizado;
Grid de quatro cards principais;
Linha de pequenos gráficos ou indicadores;
Frase final destacada.
Eyebrow

O texto “COMO TRABALHAMOS” deve ficar em dourado, não em branco.

Não usar traço dourado acima do eyebrow se a versão final pedir a remoção desse traço.

Título

O título deve seguir a referência:

“NA PRÁTICA, É ASSIM QUE O NOSSO TRABALHO ACONTECE”

O destaque em dourado deve respeitar a referência.

Subtítulo

O subtítulo deve ser maior e mais legível do que fonte pequena de rodapé.

Deve manter a ideia:

“Com uma arquitetura clara entre marketing, vendas e tecnologia, estruturamos o caminho para que a sua empresa pare de depender de improvisos e comece a vender com mais controle.”

A diagramação atual aprovada do subtítulo pode ser mantida, desde que fique legível e bem espaçada.

Cards principais
Processo Comercial;
Geração de Demanda;
Atendimento e Follow-up;
Dados, Rotina e Tecnologia.

As descrições dentro dos cards devem ter tamanho confortável de leitura.

Não deixar texto muito pequeno.

Os cards devem ter mais respiro interno e seguir a proporção visual da referência.

Gráficos inferiores

Os gráficos inferiores podem ser recriados com HTML, CSS, SVG ou componentes.

Devem conter:

Evolução de Oportunidades;
Distribuição de Funil;
Indicadores-chave;
Desempenho Comercial.

Os gráficos feitos pelo Codex podem ser mantidos se estiverem visualmente melhores que a referência, desde que respeitem a composição da seção.

A fonte dos gráficos deve ser legível.

Não deixar dados minúsculos com muito espaço vazio.

Frase final

A frase final deve seguir a referência:

Eyebrow: O OBJETIVO É SIMPLES:
Frase: Fazer sua empresa vender mais, melhor e com mais previsibilidade.

Não colocar uma faixa azul estranha atrás do “objetivo é simples”.

O bloco final deve parecer igual ou muito próximo da referência, com boa proporção, borda dourada e composição premium.

Regras importantes

Não deixar essa seção clara.

Não usar cards brancos.

Não alterar a composição principal.

Não mudar o estilo para parecer com a versão antiga.

Não compactar demais a seção.

A seção deve ter altura suficiente, respiro superior e inferior e aparência premium.

Seção 6 — Clientes e Parceiros
Referência principal

public/references/3/secao-06-clientes-parceiros-referencia2.png

Objetivo

Apresentar clientes e parceiros de forma institucional, criando autoridade e confiança.

Direção visual

A seção deve seguir a referência clara:

fundo off-white #FBF8F4;
sem grid pesado no fundo;
eyebrow centralizado;
título principal centralizado;
frase de destaque;
texto de apoio;
caixa horizontal de logos;
bordas finas;
divisórias verticais;
logos em cinza ou placeholders discretos.
Estrutura visual
Eyebrow;
Título principal;
Frase de destaque;
Texto de apoio;
Caixa com logos/clientes.
Logos

Enquanto os logos reais não forem adicionados, usar placeholders:

Cliente 01;
Cliente 02;
Cliente 03;
Cliente 04;
Cliente 05;
Cliente 06.

Não buscar logos externos.

Não usar marcas reais sem autorização.

Regras importantes

O título deve seguir o mesmo padrão dos demais títulos de seções claras.

Não usar fundo com grid de quadrados.

Não deixar a seção genérica demais.

Seção 7 — Assessoria de Vendas
Referência principal

public/references/3/secao-07-assessoria-vendas-referencia2.png

Objetivo

Apresentar os serviços e pilares da assessoria de vendas do Grupo Vittore.

Direção visual

A seção deve seguir a referência clara com carrossel:

fundo off-white #FBF8F4;
título centralizado;
subtítulo centralizado;
cards grandes;
cards em carrossel horizontal;
imagens no topo dos cards;
setas no canto superior direito;
indicadores do carrossel;
cards ocupando largura ampla no desktop;
visual premium e organizado.
Estrutura visual
Eyebrow centralizado;
Título principal;
Subtítulo;
Setas de navegação;
Carrossel de cards;
Indicadores inferiores.
Serviços obrigatórios

A seção deve conter os 9 serviços definidos no docs/03-copy-final.md:

Arquitetura de Receita;
Processo Comercial Inteligente;
Demanda Qualificada;
Comunicação que Vende;
Gestão de Leads e Follow-up;
Dados e Indicadores Comerciais;
Tecnologia e Automação;
Rotina de Crescimento;
Direção Estratégica.
Cards

Cada card deve conter:

imagem no topo;
título do serviço;
descrição;
CTA textual pequeno.
CTA textual

Pode seguir o padrão da referência, como:

Quero vender mais

Carrossel

No desktop, o carrossel deve mostrar os cards de forma ampla e elegante.

O primeiro card deve aparecer visível, sem ficar cortado demais à esquerda.

Cada clique na seta deve avançar apenas um card por vez.

O usuário deve conseguir visualizar todos os 9 serviços com cliques sucessivos.

No mobile, permitir scroll horizontal.

Imagens dos cards

Usar as imagens dos serviços disponíveis em:

public/brand/2

Caso exista imagem correspondente para cada entregável, usar essas imagens.

Regras importantes

Não reduzir demais os cards.

Não deixar textos pequenos demais.

Não transformar o carrossel em grid comum no desktop.

Não instalar biblioteca externa sem necessidade.

Não deixar o primeiro card escondido na lateral.

Seção 8 — Assessoria Personalizada
Referência principal

public/references/3/secao-08-radar-comercial-referencia2.png

Objetivo

Explicar por que o Grupo Vittore não trabalha com pacotes prontos como Black, Gold ou Platinum.

Direção visual

A seção deve seguir a referência escura:

fundo azul marinho profundo #000717;
texto à esquerda;
radar comercial à direita;
título grande serifado;
destaques em dourado;
parágrafos claros;
linha/divisor dourado;
frase final em bloco destacado;
gráfico radar grande;
estética premium, sofisticada e consultiva.
Estrutura visual
Eyebrow;
Título principal;
Linha decorativa;
Texto explicativo;
Gráfico radar à direita;
Frase final destacada.
Assets

Usar o gráfico radar final da pasta:

public/brand/3

Se não existir, recriar o radar com SVG/CSS/HTML de forma próxima à referência.

Regras importantes

Não deixar essa seção clara.

Não trocar o radar por imagem genérica.

Não usar layout diferente da referência.

Não aumentar exageradamente o título.

Seção 9 — Inteligência, Tecnologia e Automação
Referência visual

Esta é uma seção nova adicionada à página.

Caso exista uma imagem de referência específica na pasta:

public/references/3

ela deve ser seguida.

Caso ainda não exista referência final, seguir esta direção visual:

fundo off-white #FBF8F4;
texto alinhado à esquerda;
composição em duas colunas no desktop;
título serifado premium;
destaques em vermelho;
detalhes em dourado;
visual de inteligência, tecnologia, automação, dados e IA;
imagem/diagrama tecnológico à direita;
estética limpa, sofisticada e estratégica;
sem grid de quadrados no fundo;
aparência coerente com as seções claras da página.
Objetivo

Mostrar que o Grupo Vittore também atua com tecnologia, inteligência artificial e automação aplicada ao crescimento comercial.

A seção deve reforçar que tecnologia não é usada como enfeite, mas como parte da estrutura comercial, ajudando a empresa a ganhar eficiência, reduzir desperdícios e tomar decisões melhores.

Posição na página

Esta seção deve entrar depois de:

Seção 8 — Assessoria Personalizada

E antes de:

Seção 10 — FAQ

Estrutura visual

No desktop, a seção deve ter duas colunas:

Coluna esquerda
Eyebrow;
Título principal;
Subtítulo/parágrafo de apoio;
Subtítulo menor “Aplicações estratégicas”;
Lista de três aplicações;
Marcadores/linhas/detalhes dourados ou vermelhos, se fizer sentido visualmente.
Coluna direita
Imagem, diagrama, ilustração ou composição visual relacionada a tecnologia, IA, automações, integrações, dados e inteligência;
Elementos conectados por linhas finas;
Ícones ou símbolos tecnológicos, se existirem nos assets;
Composição integrada ao fundo off-white.
Copy oficial

A copy deve vir do docs/03-copy-final.md.

A estrutura textual da seção deve seguir:

Título:

“Inteligência, Tecnologia e Automação”

Subtítulo:

“Ajudamos sua empresa a identificar, implementar e usar a tecnologia certa para ganhar eficiência, reduzir desperdícios e transformar dados em decisões mais lucrativas.”

Subtítulo interno:

“Aplicações estratégicas”

Descrições:

“Mapeamos oportunidades de automação e inteligência artificial para simplificar processos operacionais, reduzir tarefas manuais e diminuir custos invisíveis na rotina da empresa.”
“Aplicamos tecnologia nas ações de marketing e vendas para gerar dados mais claros, melhorar a leitura da performance e apoiar decisões com mais precisão.”
“Acompanhamos os indicadores continuamente para entender o que está funcionando, corrigir gargalos e aumentar a conversão com mais controle sobre margens, esforço e resultado.”
Estilo do título

O título deve seguir o mesmo padrão visual das seções claras:

fonte serifada premium;
azul marinho #000717;
destaque em vermelho #960000 quando aplicado;
tamanho grande, mas elegante;
boa quebra de linha.

Se houver destaque visual no título, usar preferencialmente:

“Inteligência, Tecnologia
e Automação”

com o trecho “e Automação” em vermelho.

Estilo dos textos

O subtítulo deve ser legível e não muito pequeno.

As descrições devem usar fonte limpa, refinada, com boa leitura.

Palavras estratégicas podem receber destaque em vermelho, desde que sem exagero.

Exemplos de palavras que podem ter destaque:

reduzir tarefas manuais;
diminuir custos invisíveis;
melhorar a leitura da performance;
aumentar a conversão.
Assets

Usar preferencialmente assets da pasta:

public/brand/3

Se houver imagem específica de tecnologia, IA ou automação, usar essa imagem.

Se não houver asset pronto, construir a composição com HTML, CSS e SVG de forma elegante, sem usar imagem externa.

Não baixar imagem da internet.

Não usar logos reais de ferramentas sem autorização, exceto se o asset já estiver fornecido pelo usuário dentro do projeto.

Regras importantes

Não deixar a seção com aparência de startup genérica.

Não usar visual colorido demais.

Não usar excesso de ícones.

Não usar fundo azul escuro nessa seção, a menos que uma referência nova peça isso explicitamente.

Não usar grid de quadrados no fundo.

Não transformar a seção em lista simples sem impacto visual.

Não misturar essa seção com o FAQ.

Não colocar essa seção antes da Assessoria Personalizada.

Não colocar essa seção depois do FAQ.

Seção 10 — FAQ
Referência principal

public/references/3/secao-09-faq-referencia.png

Objetivo

Responder dúvidas comuns antes do visitante entrar em contato.

Direção visual

A seção deve seguir a referência clara:

fundo off-white #FBF8F4;
sem grid pesado no fundo;
eyebrow centralizado;
título principal centralizado;
perguntas em accordion;
caixas largas;
bordas finas douradas;
ícone de “+” à direita;
bastante respiro;
fonte serifada nos textos principais.
Estrutura visual
Eyebrow;
Título principal;
Lista de perguntas;
Respostas abrindo em gaveta/accordion.
Perguntas

As perguntas e respostas devem vir do arquivo:

docs/03-copy-final.md

Regras importantes

Não criar FAQ visualmente genérico.

Não usar fundo escuro.

Não usar cards pequenos.

Não instalar biblioteca externa se não for necessário.

Não usar grid de quadrados no fundo.

Seção 11 — Rodapé
Referência principal

public/references/3/secao-10-rodape-referencia.png

Objetivo

Finalizar a página com identidade, sofisticação e informações institucionais.

Direção visual

O rodapé deve seguir a referência clara:

fundo off-white #FBF8F4;
linha fina dourada no topo;
detalhe decorativo central;
logotipo à esquerda;
informações institucionais à esquerda;
links à direita;
elementos gráficos sutis no fundo, se fizer sentido;
composição horizontal no desktop;
visual premium e limpo.
Estrutura visual
Linha decorativa superior;
Ícone/detalhe central;
Logo do Grupo Vittore alinhado à esquerda;
Nome Grupo Vittore;
Descrição institucional;
Direitos reservados;
Links de política de privacidade e termos de uso alinhados à direita.
Conteúdo
Grupo Vittore;
Hub de Crescimento Empresarial;
Marketing, Vendas, Tecnologia e IA;
Todos os direitos reservados;
Políticas de privacidade;
Termos de uso.
Regras importantes

Não usar rodapé azul escuro.

Não usar rodapé preto.

Não centralizar tudo no desktop se a referência usa layout com logo à esquerda e links à direita.

Não usar grid de quadrados no fundo.

No mobile, empilhar de forma organizada.

8. Regras gerais de responsividade

A versão desktop deve ser extremamente fiel às referências.

A versão mobile deve adaptar a estrutura sem perder o padrão visual.

No mobile:

colunas devem empilhar;
títulos devem reduzir proporcionalmente;
botões devem ter boa área de clique;
cards devem manter leitura confortável;
imagens não podem cortar de forma ruim;
carrossel deve permitir scroll horizontal;
FAQ deve funcionar bem;
rodapé deve empilhar com boa organização;
não pode haver sobreposição;
não pode haver texto estourando largura;
não pode haver elementos cortados.

A adaptação mobile deve preservar o estilo da referência, mesmo que a referência principal seja desktop.

9. Regras sobre imagens de referência

As imagens da pasta public/references/3 devem ser usadas como guia visual principal.

Elas indicam:

como a seção deve parecer;
onde cada elemento deve ficar;
qual fundo usar;
qual proporção seguir;
qual estilo tipográfico usar;
qual ritmo visual aplicar.

Essas imagens não devem ser ignoradas.

Essas imagens não são apenas inspiração leve.

Elas são a base visual da implementação.

Quando possível, a seção deve ficar praticamente igual à referência.

10. Regras sobre copy

A copy textual da página deve vir de:

docs/03-copy-final.md

Não usar textos antigos.

Não inventar novas frases.

Não transformar textos internos de imagens, gráficos e dashboards em copy da página.

Elementos visuais, como gráficos, funis, dashboards, radar, números e cards gráficos, devem ser tratados como parte do design.

A nova seção Inteligência, Tecnologia e Automação também deve puxar a copy oficial de:

docs/03-copy-final.md

11. Regras sobre o que não fazer

Não fazer:

não misturar a direção visual antiga com a nova;
não forçar todas as seções a serem off-white;
não proibir fundo escuro quando a referência for escura;
não transformar seções escuras em seções claras;
não centralizar textos quando a referência usa composição lateral;
não criar layout próprio;
não simplificar demais as referências;
não remover imagens principais das seções;
não adicionar blocos que não existem na referência;
não usar cores fora do padrão visual das referências;
não trocar carrossel por grid comum;
não usar rodapé escuro se a referência do rodapé é clara;
não usar fonte sans-serif genérica em títulos principais;
não deixar títulos grotescamente grandes;
não deixar textos pequenos demais nos cards;
não usar grid de quadrados nas seções claras se isso não estiver aprovado;
não colocar a seção de Inteligência, Tecnologia e Automação fora da posição definida;
não usar imagem externa sem autorização;
não criar logos de ferramentas ou marcas de terceiros aleatoriamente.
12. Regras sobre o que fazer

Fazer:

seguir cada referência da pasta public/references/3;
usar assets finais da pasta public/brand/3;
usar imagens de serviços da pasta public/brand/2, quando necessário;
aplicar a copy do docs/03-copy-final.md;
manter a ordem das seções;
respeitar as seções escuras e claras conforme referência;
usar fonte serifada premium nos títulos;
usar detalhes em dourado de forma elegante;
usar botões verdes quando a referência mostrar CTA;
manter layout sofisticado, premium e estratégico;
cuidar muito da responsividade;
preservar o padrão visual de assessoria empresarial de alto nível;
inserir a seção de Inteligência, Tecnologia e Automação entre Assessoria Personalizada e FAQ;
manter as seções claras com fundo off-white #FBF8F4.
13. Ordem final obrigatória

A ordem final da landing page é:

Hero
Formulário
Processo Comercial
Método e Receita
Como Trabalhamos
Clientes e Parceiros
Assessoria de Vendas
Assessoria Personalizada
Inteligência, Tecnologia e Automação
FAQ
Rodapé
14. Critério final de qualidade

A landing page só deve ser considerada correta se parecer visualmente alinhada às referências da pasta:

public/references/3

O resultado deve parecer:

premium;
estratégico;
empresarial;
sofisticado;
forte;
bem diagramado;
visualmente fiel às referências;
com identidade clara do Grupo Vittore;
conectado ao arquétipo do sábio;
coerente com marketing, vendas, tecnologia, IA e inteligência comercial.

Se a página parecer uma versão reinterpretada, genérica, simplificada ou misturada com orientações antigas, a implementação deve ser refeita.